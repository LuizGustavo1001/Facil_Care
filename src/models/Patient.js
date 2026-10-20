export default class Patient {
    /**
     * @param { Object } db - Dexie database instance.
     **/
    constructor(db){
        this.table = db.table('patient')
    }

    /**
     * Returns all patient data from the database.
     *
     * @returns { Promise<Array<Patient>> } All patient data.
     **/
    async getPatient(){
        return await this.table
            .toCollection()
            .first()
    }

    /**
     * Adds new record to a patient subcollection.
     *
     * @param { string } subCategory
     * @param { Object | Array<Object> } newData - Record or records to add
     *
     * @returns { Promise<boolean> } `true` if the records were added, or `false` if the patient does not exist.
     *
     * @throws { Error } If a database operation fails.
     **/
    async createSubCategory(subCategory, newData){
        const patient = await this.getPatient()

        if(!patient) return false

        const records = Array.isArray(newData) ? newData : [newData]

        const currentRecords = patient[subCategory] ?? []

        await this.table.update(patient._id, {
            [subCategory]: [
                ...currentRecords,
                ...records
            ]
        })

        return true
    }

    /**
     * Updates patient data collection
     *
     * @param { Object } newData
     *
     * @returns { Promise<boolean> } - `true` if the record was updated, `false` if not found.
     **/
    async updatePatient(newData){
        try{
            const dbPatient = await this.getPatient()

            if(!dbPatient){
                return false
            }

            // update using the original _id (patientId)
            await this.table.put({
                ...dbPatient,
                ...newData,
                _id: dbPatient._id
            })

            return true
        }catch(err){
            throw err
        }
    }

    /**
     * Removes an `item` from a `patient subCategory` by updating the `item collection`
     *
     * @param { Object } newData - Sub-category new data object.
     *
     * @returns { Promise<boolean> }  `true` if the record was updated, `false` if not found.
     **/
    async removeFromSubCategory(newData){
        try{
            const dbPatient = await this.getPatient()

            if(!dbPatient){
                return false
            }

            const updated = await this.table.update(
                dbPatient._id,
                newData
            )

            return updated > 0
        }catch(err){
            throw err
        }
    }
}