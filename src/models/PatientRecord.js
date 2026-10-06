/* Superclass of patient records (FollowUps & VitalSigns) */
export class PatientRecord {
    constructor(db, tableName, typeField) {
        this.table = db.table(tableName)
        this.typeField = typeField
    }

    async getAll(){
        return await this.table
            .toCollection()
            .toArray()
    }

    async getById(id){
        try{
            return await this.table
                .where("_id")
                .equals(id)
                .first()
        }catch(err){
            console.log("Database Error: ", err)
        }
    }

    /**
     * @param { String } field
     **/
    async getByField(field){
        return await this.table
            .where("record")
            .equals(field)
            .toArray()
    }

    /**
     * @param { Date } minDate
     * @param { Date } maxDate
     **/
    async getByDate(minDate, maxDate){
        return await this.table
            .where('dateTime')
            .between(minDate, maxDate, true, true)
            .toArray()
    }

    /**
     * @param { String } field
     * @param { Date } minDate
     * @param { Date } maxDate
     **/
    async getByFieldAndDate(field, minDate, maxDate = new Date()){
        return await this.table
            .where(`[record+dateTime]`)
            .between(
                [field, minDate],
                [field, maxDate],
                true,
                true
            )
            .toArray()
    }

    /**
     * Updates patient collection merging fields.
     * Retains the record's original `_id` and overwrite the sended keys.
     *
     * @param { Object } newData
     * @param { String } recordId
     **/
    async updateRecord(newData, recordId){
        try {
            const record = await this.getById(recordId)

            if(!record){
                return false
            }

            // update using the original _id
            await this.table.put({
                ...record,
                ...newData,
                _id: recordId
            })

            return true
        }catch(error) {
            console.log("Database Error: ", error)
            throw error
        }
    }

    async removeById(id){
        try{
            const deleted = await this.table
                .where("_id")
                .equals(id)
                .delete()

            return deleted > 0
        }catch(err){
            console.log("Database Error: ", err)
        }
    }
}