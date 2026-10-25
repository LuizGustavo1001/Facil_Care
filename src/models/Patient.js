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
}