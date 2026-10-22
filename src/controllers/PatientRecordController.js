import db from "../database/db.js"

export default class PatientRecordController {
    constructor(Model, codeLabel) {
        if(!Model){
            throw new Error("Model class must be provided to PatientRecordController")
        }

        this.model = new Model(db)
        this.codeLabel = codeLabel
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
                    code: `No${this.codeLabel}Found`,
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
                    code: `No${this.codeLabel}ByField`,
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
                    code: `No${this.codeLabel}ByDate`,
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
                    code: `No${this.codeLabel}ByFieldAndDate`,
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
     * Adds a new patient record item to the collection based on the selected patient's Id
     *
     * @param { Object } newItem
     * @param { number } patientId
     * @param { string } recordType
     **/
    async create(newItem, recordType, patientId = 1) {
        try {
            const itemData = {
                ...newItem,
                patientId,
                record: recordType
            }

            await this.model.create(itemData)
            const updatedData = await this.model.getAll()

            return{
                success: true,
                code: `${this.codeLabel}Created`,
                data: updatedData
            }
        }catch(err){
            console.log("Database Error: ", err)
            return{
                success: false,
                code: `${this.codeLabel}CreationFailed`,
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
                    code: `${this.codeLabel}NotFound`,
                    data: []
                }
            }

            const records = await this.model.getByField(type)

            return {
                success: true,
                code: `${this.codeLabel}Updated`,
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

    async delete(id, type){
        try {
            const removed = await this.model.removeById(id)

            if(!removed){
                return {
                    success: false,
                    code: `${this.codeLabel}NotFound`,
                    data: []
                }
            }

            const records = await this.model.getByField(type)

            return {
                success: true,
                code: `${this.codeLabel}Deleted`,
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