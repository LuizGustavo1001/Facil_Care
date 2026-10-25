import { ref } from "vue"
import { exportDB, importDB } from "dexie-export-import"
import db from "../database/db.js"

/**
 * Import/Export JSON files logic (P2P Tranferring via WebRTC)
 * - STUN Server: PeerJS uses STUN servers to find IP + port from emitter & receiver
 * - Same Network: Connection directly via local IP
 * - QR Code patter: URL with emitter session id (https://website/import?peerId=8f92a1b4-3c2a-41d9)
 **/
export function useDexieBackup() {
    const isExporting = ref(false)
    const isImporting = ref(false)
    const error = ref(null)

    /**
     * Export Database via backup JSON file.
     *
     * @return { Promise<boolean> } `true` if the export was successfully done. Otherwise, returns `false`
     **/
    const exportToJSON = async () => {
        isExporting.value = true
        error.value = null

        try{
            const blob = await exportDB(db, { prettyJson: true })
            const url = URL.createObjectURL(blob)
            const link = document.createElement("a")
            const fileName = `backup-facilCare-${new Date().toISOString().slice(0, 10)}.json`

            link.href = url
            link.download = fileName
            link.click() // simulate click event

            URL.revokeObjectURL(url)
        }catch(err){
            error.value = "ExportFailed"
            console.error('[useDexieBackup]: ', err)
            return false
        }finally{
            isExporting.value = false
        }

        return true
    }

    /**
     * Restore database via backup JSON file.
     *
     * @param { File } file Import data
     *
     * @return { Promise<boolean> } `true` if the database was successfuly retored via backup `JSON` file. Otherwise, returns `false`
     **/
    const importFromJSON = async (file) => {
        if(!file) return false

        isImporting.value = true
        error.value = null

        try{
            // Clears all tables before import database
            await importDB(file, { clearTablesBeforeImport: true })
        }catch(err){
            error.value = "ImportFailed"
            console.error('[useDexieBackup]: ', err)
            throw err
        }finally{
            isImporting.value = false
        }

        return true
    }

    return { isExporting, isImporting, error, exportToJSON, importFromJSON }
}
