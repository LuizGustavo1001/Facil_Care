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
                .toArray()
        }catch(err){
            console.log("Database Error: ", err)
        }
    }

    /**
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