import BaseController from "./BaseController.js"
import db from "../database/db.js"

export default class PatientRecordController extends BaseController {
    constructor(Model) {
        super()

        if(!Model){
            throw new Error("Model class must be provided to PatientRecordController")
        }

        this.model = new Model(db)
    }

    /**
     * Returns all data from the patient records subclass.
     **/
    async getAll() {
        return await this.execute(async () => {
            const records = await this.model.getAll()

            if(records.length <= 0){
                return {
                    success: false,
                    code: "NoRecords",
                    data: []
                }
            }

            return {
                success: true,
                code: null,
                data: records
            }
        })
    }

    /**
     * Returns data from the patient records subclass based on the selected subclass field.
     *
     * @param { String } field
     **/
    async getByField(field) {
        return await this.execute(async () => {
            const records = await this.model.getByField(field)

            if(records.length <= 0){
                return {
                    success: false,
                    code: "NoRecordsByField",
                    data: []
                }
            }

            return {
                success: true,
                code: null,
                data: records
            }
        })
    }

    /**
     * Returns data from the patient records subclass within the interval of `dateTime` [`minDate`, `maxDate`].
     *
     * @param { Date } minDate
     * @param { Date } maxDate
     **/
    async getByDate(minDate, maxDate = new Date()) {
        if(minDate > maxDate){
            return {
                success: false,
                code: "InvalidDateInterval",
                data: []
            }
        }

        return await this.execute(async () => {
            const records = await this.model.getByDate(minDate, maxDate)

            if(records.length <= 0){
                return {
                    success: false,
                    code: "NoRecordsByDate",
                    data: []
                }
            }

            return {
                success: true,
                code: null,
                data: records
            }
        })
    }

    /**
     * Returns data from the patient records subclass:
     * - within the interval of `dateTime` [`minDate`, `maxDate`].
     * - Based on the selected subclass field.
     *
     * @param { String } field
     * @param { Date } minDate
     * @param { Date } maxDate
     **/
    async getByFieldAndDate(field, minDate, maxDate = new Date()){
        if(minDate > maxDate){
            return {
                success: false,
                code: "InvalidDateInterval",
                data: []
            }
        }

        return await this.execute(async () => {
            const records = await this.model.getByFieldAndDate(field, minDate, maxDate)

            if(records.length <= 0){
                return {
                    success: false,
                    code: "NoRecordsByFieldAndDate",
                    data: []
                }
            }

            return {
                success: true,
                code: null,
                data: records
            }
        })
    }
}