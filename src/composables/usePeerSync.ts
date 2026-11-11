import { onUnmounted, ref } from "vue"
import { exportDB, importInto } from "dexie-export-import"
import Peer from "peerjs"
import type { DataConnection } from "peerjs"
import db from "../database/db.js"
import type { PeerStatus, PeerSyncError } from "../types/peerSync"

/**
 * PeerJS connection configuration.
 */
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
 * Database backup message.
 */
export interface DatabaseBackupMessage {
    type: "DATABASE_BACKUP"
    payload: string
}

/**
 * Checks whether received data is a database backup message.
 */
const isDatabaseBackupMessage = (
    data: unknown
): data is DatabaseBackupMessage => {
    if (typeof data !== "object" || data === null) {
        return false
    }

    const message = data as Record<string, unknown>

    return (
        message.type === "DATABASE_BACKUP" &&
        typeof message.payload === "string"
    )
}

/**
 * Manage WebRTC P2P connection (PeerJS)
 **/
export function usePeerSync(){
    const peerId = ref<string | null>(null)
    const peerStatus = ref<PeerStatus>('idle')
    const peerError = ref<PeerSyncError>(null)

    let peerInstance: Peer | null = null
    let activeConnection: DataConnection | null = null

    /**
     * Closes active P2P connection in memory and destroys the Peer instance.
     *
     * @param keepStatus - `TRUE` represents the state to keep the `peerStatus` (avoid problems when the P2P transferring is done). Otherwise, `FALSE`
     **/
    const closeSession = (keepStatus: boolean = false): void => {
        // 1. Closes current connection
        if(activeConnection) {
            activeConnection.close()
            activeConnection = null
        }

        // 2. Destroy peerInstace
        if(peerInstance) {
            peerInstance.destroy()
            peerInstance = null
        }

        // 3. Update peerId status
        peerId.value = null
        if(!keepStatus) {
            peerStatus.value = 'idle'
        }
    }

    /**
     * HOST MODE: Creates a P2P lobby, expose peerId and waits for a receiver connection.
     *
     * @returns Host PeerJS ID
     **/
    const startHostSession = () => {
        closeSession()
        peerStatus.value = 'waiting'
        peerError.value = null


        return new Promise((resolve, reject) => {
            // iceServers setup
            peerInstance = new Peer(peerOptions)

            peerInstance.on('open', (id: string) => {
                peerId.value = id
                resolve(id)
            })

            peerInstance.on('connection', (conn: DataConnection): void => {
                activeConnection = conn

                conn.on('open', async () => {
                    peerStatus.value = 'transferring'

                    try {
                        // Export Dexie database
                        const blob = await exportDB(db)
                        const jsonText = await blob.text()

                        // Send database string data directly via WebRTC
                        const message: DatabaseBackupMessage = {
                            type: "DATABASE_BACKUP",
                            payload: jsonText,
                        }

                        conn.send(message)

                        peerStatus.value = 'done'
                    } catch(err) {
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
     * RECEIVER MODE: Connects to the host via hostPeerId and imports the received database.
     *
     * @param hostPeerId Emitter ID from URL *(?peerId=<xxx>)*
     **/
    const connectToHostAndImport = (hostPeerId: string) => {
        closeSession()
        peerStatus.value = 'connecting'
        peerError.value = null

        return new Promise<void>((resolve, reject) => {
            const peer = new Peer(peerOptions)
            peerInstance = peer

            let settled = false

            const rejectTransfer = (
                error: PeerSyncError,
                cause?: unknown
            ): void => {
                if (settled) return

                settled = true
                peerStatus.value = "error"
                peerError.value = error

                if (cause) {
                    console.error("[usePeerSync]:", cause)
                }

                closeSession(true)
                reject(cause ?? new Error(error as string))
            }

            peer.on("error", (err) => {
                rejectTransfer("HostNotFound", err)
            })

            peer.on("open", () => {
                const conn = peer.connect(hostPeerId)
                activeConnection = conn

                conn.on("open", () => {
                    peerStatus.value = "transferring"
                })

                conn.on("data", async (data: unknown) => {
                    if (settled) return

                    if (!isDatabaseBackupMessage(data)) {
                        return
                    }

                    try {
                        const blob = new Blob(
                            [data.payload],
                            { type: "application/json" }
                        )

                        // Import database and replace existing tables.
                        await importInto(db, blob, {
                            clearTablesBeforeImport: true,
                        })

                        settled = true
                        peerStatus.value = "done"

                        resolve()

                    } catch (err: unknown) {
                        rejectTransfer("P2PImportFailed", err)

                    } finally {
                        if (settled) {
                            closeSession(true)
                        }
                    }
                })

                conn.on("error", (err) => {
                    rejectTransfer("P2PReceiveFailed", err)
                })

                conn.on("close", () => {
                    if (!settled) {
                        rejectTransfer("P2PConnectionInterrupted")
                    }
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