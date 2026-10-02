export default class Patient {
    constructor(db){
        this.table = db.table('patient')
    }

    async getPatient(){
        return await this.table
            .toCollection()
            .first()
    }

    /**
     * @param { Object } newData
     **/
    async updatePatient(newData){
        const dbPatient = await this.getPatient()

        if(!dbPatient){
            return []
        }

        // update using the original _id (patientId)
        await this.table.put({
            ...dbPatient,
            ...newData,
            _id: dbPatient._id
        })

        return await this.getPatient()
    }

    async remove(id){

    }
}