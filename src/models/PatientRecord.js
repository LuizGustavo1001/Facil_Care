/* Superclass of patient records (FollowUps & VitalSigns) */
export class PatientRecord {

    /**
     * @param { Object } db - Dexie database instance.
     * @param { string } tableName - Name of the database table (`vitalSigns` or `FollowUps`).
     **/
    constructor(db, tableName) {
        this.table = db.table(tableName)
    }

    /**
     * Retrieves all records from the collection.
     *
     * @returns { Promise<Array<Object>> } All records in the collection.
     **/
    async getAll(){
        return await this.table
            .toCollection()
            .toArray()
    }

    /**
     * Retrieves records by its `id`.
     *
     * @param { string } id - Records Id.
     *
     * @returns { Promise<Object|undefined> } - The matching record, or undefined if not found.
     **/
    async getById(id){
        try{
            return await this.table
                .where("_id")
                .equals(id)
                .first()
        }catch(err){
            console.log("Database Error: ", err)
            throw err
        }
    }

    /**
     * Retrieves records matching a specific record type ordered by `dateTime` in descending order.
     *
     * @param { String } field - Record field to search for.
     *
     * @returns { Promise<Array<Object>> } - The matching records ordered by `dateTime`
     **/
    async getByField(field){
        const records = await this.table
            .where("record")
            .equals(field)
            .toArray()

        return records.sort(
            (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
        )
    }

    /**
     * Retrieves records within a date range, incluing both interval edges ordered by `dateTime` in descending order.
     *
     * @param { Date } minDate - Start of the date range
     * @param { Date } maxDate - End of the date range
     *
     * @returns { Promise<Array<Object>> } - Records within the interval
     **/
    async getByDate(minDate, maxDate){
        const records =  await this.table
            .where('dateTime')
            .between(minDate, maxDate, true, true)
            .toArray()

        return records.sort(
            (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
        )
    }

    /**
     * Retrieves records matching a specific record type and date range, including both inteval edges ordered by `dateTime` in descending order.
     *
     * @param { String } field
     * @param { Date } minDate
     * @param { Date } maxDate
     *
     * @returns { Promise<Array<Object>> } - Records within the interval and that matches the record type
     **/
    async getByFieldAndDate(field, minDate, maxDate = new Date()){
        const records =  await this.table
            .where(`[record+dateTime]`)
            .between(
                [field, minDate],
                [field, maxDate],
                true,
                true
            )
            .toArray()

        return records.sort(
            (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
        )
    }

    /**
     * Adds new patient record item to the database.
     *
     * @param { Object } newItem
     *
     * @returns { Promise<boolean> } `true` if the record was added, or `false` if the patient does not exist.
     *
     * @throws { Error } If a database operation fails.
     **/
    async create(newItem){
        try{
            await this.table.add(newItem)
            return true
        }catch(err){
            console.error("Database Error:", err)
            throw err
        }
    }

    /**
     * Updates an existing record by merging the provided fields with its current data, preserving its original identifier.
     *
     * @param { Object } newData
     * @param { String } recordId
     *
     * @returns { Promise<boolean> } - `true` if the record was updated, `false` if not found.
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

    /**
     * Deletes a record by its `id`
     *
     * @param { string } id - Record `id`
     *
     * @returns { Promise<boolean> } `true` if the record was deleted, `false` if not found
     **/
    async removeById(id){
        try{
            const deleted = await this.table
                .where("_id")
                .equals(id)
                .delete()

            return deleted > 0
        }catch(err){
            console.log("Database Error: ", err)
            throw err
        }

    }
}