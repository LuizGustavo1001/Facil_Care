import DatabaseModel from "../models/DatabaseModel"
import db from "../database/db.js"
import {type ControllerResult, fallbackReturn} from "./settings"

export default class DatabaseController {
    private model: DatabaseModel

    public constructor() {
        this.model = new DatabaseModel(db)
    }

    /**
     * Reset all data in the local database.
     **/
    public async resetAllData(): Promise<ControllerResult<null>> {
        try {
            await this.model.resetAllData()

            return {
                success: true,
                code: "SystemDataReset",
                data: null
            }
        } catch(err: any) {
            return fallbackReturn(err)
        }
    }
}