export default class Patient {
    constructor(db){
        this.table = db.table('patients')
    }

    /**
     * Returns patient data
     **/
    async getPatient(){
        return await this.table
            .toCollection()
            .first()
    }

    /**
     * Update patient data
     * - Keys sended within newData will override the old ones
     * - Ommited keys will remain as before
     *
     * @param { Object } newData
     **/
    async updatePatient(newData){
        const dbPatient = await this.getPatient()

        if(!dbPatient){
            throw new Error('PatientNotFound')
        }

        // update using the original _id (patientId)
        await this.table.put({
            ...dbPatient,
            ...newData,
            _id: dbPatient._id
        })

        return await this.getPatient()
    }
}