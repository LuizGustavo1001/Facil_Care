import Database from "../models/Database.js"
import db from "../database/db.js"

export default class DatabaseController {
    constructor() {
        this.model = new Database(db)
    }

    /**
     * Reset every data in the local database to `default`.
     **/
    async resetAllData(){
        try{
            await this.model.resetAllData()

            return {
                success: true,
                code: "SystemDataReset",
                data: null
            }
        }catch(error){
            console.log("DB error: ", error)
            return {
                success: false,
                code: "DatabaseError",
                data: []
            }
        }
    }
}