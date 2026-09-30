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

    /**
     * @param { String } field
     **/
    async getByField(field){
        return await this.table
            .where(this.typeField)
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
            .where(`[${this.typeField}+dateTime]`)
            .between(
                [field, minDate],
                [field, maxDate],
                true,
                true
            )
            .toArray()
    }
}