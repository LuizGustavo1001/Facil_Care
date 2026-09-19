/* Superclass of patient records (FollowUps & VitalSigns) */

export class PatientRecord {
    constructor(db, tableName, typeField) {
        this.table = db.table(tableName)
        this.typeField = typeField
    }

    /**
     * Returns all
     **/
    async getAll(){
        return await this.table
            .toCollection()
            .toArray()
    }

    /**
     * Returns by type
     *
     * @param { String } type
     **/
    async getByType(type){
        const result = await this.table
            .where(this.typeField)
            .equals(type)
            .toArray()

        return result
    }

    /**
     * Returns within the interval [minDate, maxDate]
     *
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
     * Returns based in type and interval [minDate, maxDate]
     *
     * @param { String } type
     * @param { Date } minDate
     * @param { Date } maxDate
     **/
    async getByTypeAndDate(type, minDate, maxDate = new Date()){
        return await this.table
            .where(`[${this.typeField}+dateTime]`)
            .between(
                [type, minDate],
                [type, maxDate],
                true,
                true
            )
            .toArray()
    }
}