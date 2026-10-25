import { onUnmounted, ref } from "vue"
import { exportDB, importDB } from "dexie-export-import"
import Peer from "peerjs"
import db from "../database/db.js"

/**
 * @param { Object } peerOptions - Stores multiples STUN servers (avoid P2P tranferring failure)
 **/
const peerOptions = {
    config: {
        iceServers: [
            {
                urls: "stun:stun.relay.metered.ca:80",
            },
            {
                urls: "turn:global.relay.metered.ca:80",
                username: import.meta.env.VITE_METERED_USERNAME,
                credential: import.meta.env.VITE_METERED_PASSWORD
            },
            {
                urls: "turn:global.relay.metered.ca:80?transport=tcp",
                username: import.meta.env.VITE_METERED_USERNAME,
                credential: import.meta.env.VITE_METERED_PASSWORD
            },
            {
                urls: "turn:global.relay.metered.ca:443",
                username: import.meta.env.VITE_METERED_USERNAME,
                credential: import.meta.env.VITE_METERED_PASSWORD
            },
            {
                urls: "turns:global.relay.metered.ca:443?transport=tcp",
                username: import.meta.env.VITE_METERED_USERNAME,
                credential: import.meta.env.VITE_METERED_PASSWORD
            },
        ]
    }
}

/**
* Manage WebRTC P2P connection (PeerJS)
**/
export function usePeerSync(){
    const peerId = ref(null)

    // 'idle', 'waiting', 'connecting', 'transferring', 'done' and 'error'
    const peerStatus = ref('idle')
    const peerError = ref(null)

    let peerInstance = null
    let activeConnection = null

    /**
     * Closes active P2P connection in memory
     *
     * @param { boolean } keepStatus - `true` represents the state to keep the `peerStatus` (avoid problems when the P2P transferring is done). Otherwise, `false`
     **/
    const closeSession = (keepStatus = false) => {
        // 1. Closes current connection
        if(activeConnection){
            activeConnection.close()
            activeConnection = null
        }

        // 2. Destroy peerInstace
        if(peerInstance){
            peerInstance.destroy()
            peerInstance = null
        }

        // 3. Update peerId status
        peerId.value = null
        if(!keepStatus){
            peerStatus.value = 'idle'
        }
    }

    /**
     * EMITTER MODE (HOST): Create WebRTC lobby, expose peerId and await for receiver connection
     **/
    const startHostSession = () => {
        return new Promise((resolve, reject) => {
            closeSession()
            peerStatus.value = 'waiting'
            peerError.value = null

            // iceServers setup
            peerInstance = new Peer(peerOptions)

            peerInstance.on('open', (id) => {
                peerId.value = id
                resolve(id)
            })

            peerInstance.on('connection', (conn) => {
                activeConnection = conn
                peerStatus.value = 'transferring'

                conn.on('open', async () => {
                    try{
                        // Serialize Dexie database in memory
                        const blob = await exportDB(db)
                        const jsonText = await blob.text()

                        // Send database string data directly via WebRTC
                        conn.send({
                            type: 'DATABASE_BACKUP',
                            payload: jsonText
                        })

                        peerStatus.value = 'done'
                    }catch(err){
                        peerStatus.value = 'error'
                        peerError.value = 'P2PExportFailed'
                        console.error('[usePeerSync]: ', err)
                    }

                    conn.on('close',  () => {
                        if(peerStatus.value !== 'done'){
                            peerStatus.value = 'error'
                            peerError.value = 'P2PConnectionInterrupted'
                        }
                    })
                })
            })

            peerInstance.on('error', (err) => {
                peerStatus.value = 'error'
                peerError.value = 'HostConnectionFailed'
                console.error('[usePeerSync]: ', err)
                reject(err)
            })
        })
    }

    /**
     * RECEIVER MODE (CLIENT): Connects to host via hostPeerId and await payload
     *
     * @param { string } hostPeerId Emitter ID from URL *(?peerId=<xxx>)*
     **/
    const connectToHostAndImport = (hostPeerId) => {
        return new Promise((resolve, reject) => {
            closeSession()
            peerStatus.value = 'connecting'
            peerError.value = null

            // iceServers setup
            peerInstance = new Peer(peerOptions)

            peerInstance.on('error', (err) => {
                peerStatus.value = 'error'
                peerError.value = 'HostNotFound'
                console.error('[usePeerSync]: ', err)
                reject(err)
            })

            peerInstance.on('open', () => {
                // Ensures sequential delivery of WebRTC packets
                const conn = peerInstance.connect(hostPeerId)
                activeConnection = conn

                conn.on('open', () => {
                    peerStatus.value = 'transferring'
                })

                // Import database info
                conn.on('data', async (data) => {
                    if(data.type === 'DATABASE_BACKUP'){
                        try{
                            const blob = new Blob([data.payload], { type: 'application/json' })

                            // Clears all tables before import database
                            await importDB(blob, { clearTablesBeforeImport: true })
                            peerStatus.value = 'done'
                            resolve()
                        }catch(err){
                            peerStatus.value = 'error'
                            peerError.value = 'P2PImportFailed'
                            console.error('[usePeerSync]: ', err)
                            reject(err)
                        }finally{
                            // remain 'done' status
                            closeSession(true)
                        }
                    }
                })

                // P2P receive error
                conn.on('error', (err) => {
                    peerStatus.value = 'error'
                    peerError.value = 'P2PReceiveFailed'
                    console.log('[usePeerSync]: ', err)
                    reject(err)
                })
            })
        })
    }

    // Destroys all active connections
    onUnmounted(() => {
        closeSession()
    })

    return { peerId, peerStatus, peerError, startHostSession, connectToHostAndImport, closeSession }
}