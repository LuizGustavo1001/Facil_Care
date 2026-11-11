import DatabaseModel from "../models/DatabaseModel"
import db from "../database/db.js"
import type { ControllerResult } from "./settings"

export default class DatabaseController {
    private model: DatabaseModel

    constructor() {
        this.model = new DatabaseModel(db)
    }

    /**
     * Reset all data in the local database.
     **/
    async resetAllData(): Promise<ControllerResult<null>> {
        try {
            await this.model.resetAllData()

            return {
                success: true,
                code: "SystemDataReset",
                data: null
            }
        } catch (err: unknown) {
            console.error("Database error:", err)

            return {
                success: false,
                code: "DatabaseError",
                data: null
            }
        }
    }
}