import BaseController from "./BaseController.js"

export default class PatientRecordController extends BaseController {
    constructor(db, Model) {
        super()

        if(!Model){
            throw new Error("Model class must be provided to PatientRecordController")
        }

        this.model = new Model(db)
    }

    /**
     * Returns all registered data
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
     * Returns by type
     *
     * @param { String } type
     **/
    async getByType(type) {
        return await this.execute(async () => {
            const records = await this.model.getByType(type)

            if(records.length <= 0){
                return {
                    success: false,
                    code: "NoRecordsByType",
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
     * Returns within the interval [minDate, maxDate]
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
     * Returns based in type and interval [minDate, maxDate]
     *
     * @param { String } type
     * @param { Date } minDate
     * @param { Date } maxDate
     **/
    async getByTypeAndDate(type, minDate, maxDate = new Date()){
        if(minDate > maxDate){
            return {
                success: false,
                code: "InvalidDateInterval",
                data: []
            }
        }

        return await this.execute(async () => {
            const records = await this.model.getByTypeAndDate(type, minDate, maxDate)

            if(records.length <= 0){
                return {
                    success: false,
                    code: "NoRecordsByTypeAndDate",
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