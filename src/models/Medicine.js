export default class Medicine {
    constructor(db){
        this.table = db.table('medicines')
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

    /**
     * Updates medicine collection merging fields.
     * Retains the record's original `_id` and overwrite the sended keys.
     *
     * @param { Object } newData
     * @param { String } medicineId
     **/
    async updateMedicine(newData, medicineId){
        try {
            const medicine = await this.getById(medicineId)

            if(!medicine){
                return null
            }

            // update using the original _id
            await this.table.put({
                ...medicine,
                ...newData,
                _id: medicineId
            })

            return await this.getAll()
        }catch(error) {
            console.log("Database Error: ", error)
            throw error
        }
    }
}