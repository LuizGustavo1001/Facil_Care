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
     * Updates patient data collection
     *
     * @param { Object } newData
     **/
    async updatePatient(newData){
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
    }

    /**
     * Removes an `item` from a `patient subCategory` by updating the `item collection`
     *
     * @param { Object } newData - Sub-category new data object
     **/
    async removeFromSubCategory(newData){
        const dbPatient = await this.getPatient()

        if(!dbPatient){
            return false
        }

        const updated = await this.table.update(
            dbPatient._id,
            newData
        )

        return updated > 0
    }
}