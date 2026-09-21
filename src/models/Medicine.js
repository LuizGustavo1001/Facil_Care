export default class Medicine {
    constructor(db){
        this.table = db.table('medicines')
    }

    /**
     * Returns all recorded medicines
     **/
    async getAll(){
        return await this.table
        .toCollection()
        .toArray()
    }
}