import { ref } from "vue"
import { exportDB, importInto } from "dexie-export-import"
import db from "../database/db.js"
import type { DexieError } from "../types/dexie"

/**
 * Import/Export JSON files logic (P2P Tranferring via WebRTC)
 * - STUN Server: PeerJS uses STUN servers to find IP + port from emitter & receiver
 * - Same Network: Connection directly via local IP
 * - QR Code patter: URL with emitter session id ('https://website/import?peerId=8f92a1b4-3c2a-41d9')
 **/

export function useDexieBackup() {
    const isExporting = ref<boolean>(false)
    const isImporting = ref<boolean>(false)
    const error = ref<DexieError>(null)

    /**
     * Export the database as a JSON backup file.
     *
     * @return `TRUE` if the export was successfully done. Otherwise, returns `FALSE`.
     **/
    const exportToJSON = async (): Promise<boolean> => {
        isExporting.value = true
        error.value = null

        let url: string | null = null

        try {
            const blob = await exportDB(db, { prettyJson: true })
            url = URL.createObjectURL(blob)
            const link = document.createElement("a")
            const fileName = `backup-facilCare-${new Date().toISOString().slice(0, 10)}.json`

            link.href = url
            link.download = fileName
            link.click() // simulate click event

            return true
        } catch(err) {
            error.value = "ExportFailed"
            console.error('[useDexieBackup]: ', err)
            return false
        } finally {
            if (url) URL.revokeObjectURL(url)

            isExporting.value = false
        }
    }

    /**
     * Restore database via backup JSON file.
     *
     * @param file - File containing the database backup.
     *
     * @return `TRUE` if the import was successful; otherwise, returns `FALSE`.
     **/
    const importFromJSON = async (file: File): Promise<boolean> => {
        if (!(file instanceof File)) return false

        isImporting.value = true
        error.value = null

        try {
            // Clears all tables before import database
            await importInto(db, file, { clearTablesBeforeImport: true })
        } catch(err) {
            error.value = "ImportFailed"
            console.error('[useDexieBackup]: ', err)
            throw err
        } finally {
            isImporting.value = false
        }

        return true
    }

    return { isExporting, isImporting, error, exportToJSON, importFromJSON }
}
