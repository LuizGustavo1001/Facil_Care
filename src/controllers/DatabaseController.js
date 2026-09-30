import BaseController from "./BaseController.js"
import Database from "../models/Database.js"
import db from "../database/db.js"

export default class DatabaseController extends BaseController {
    constructor() {
        super()
        this.model = new Database(db)
    }

    /**
     * Reset every data in the local database to `default`.
     **/
    async resetAllData(){
        return await this.execute(async () => {
            await this.model.resetAllData()

            return {
                success: true,
                code: "SystemDataReset",
                data: null
            }
        })
    }
}