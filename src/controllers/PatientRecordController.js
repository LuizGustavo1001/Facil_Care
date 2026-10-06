import db from "../database/db.js"

export default class PatientRecordController {
    constructor(Model) {
        if(!Model){
            throw new Error("Model class must be provided to PatientRecordController")
        }

        this.model = new Model(db)
    }

    /**
     * Returns all data from the patient records subclass.
     **/
    async getAll() {
        try{
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
        }catch(error){
            console.log("DB error: ", error)
            return {
                success: false,
                code: "DatabaseError",
                data: []
            }
        }
    }

    /**
     * Returns data from the patient records subclass based on the selected subclass field.
     *
     * @param { String } field
     **/
    async getByField(field) {
        try{
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
        }catch(error){
            console.log("DB error: ", error)
            return {
                success: false,
                code: "DatabaseError",
                data: []
            }
        }
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

        try{
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
        }catch(error){
            console.log("DB error: ", error)
            return {
                success: false,
                code: "DatabaseError",
                data: []
            }
        }
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

        try{
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
        }catch(error){
            console.log("DB error: ", error)
            return {
                success: false,
                code: "DatabaseError",
                data: []
            }
        }
    }

    /**
     * Updates patient's record data merging fields.
     * Retains the record's original `_id` and overwrite the sended keys.
     *
     * @param { Object } newData - Containing the attributes to be overwritten or updated
     * @param { String } recordId - Id of the record to be updated
     * @param { String } type - Selected collection's item to be returned
     **/
    async updatePatientRecord(newData, recordId, type) {
        try{
            const updated = await this.model.updateRecord(newData, recordId)

            if(!updated){
                return {
                    success: false,
                    code: "RecordNotFound",
                    data: []
                }
            }

            const records = await this.model.getByField(type)

            return {
                success: true,
                code: "RecordUpdated",
                data: records
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


    async removeRecordById(id, type){
        try {
            const removed = await this.model.removeById(id)

            if(!removed){
                return {
                    success: false,
                    code: "RecordNotFound",
                    data: []
                }
            }

            const records = await this.model.getByField(type)

            return {
                success: true,
                code: "RecordRemoved",
                data: records
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