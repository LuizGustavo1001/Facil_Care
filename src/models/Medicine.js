export default class Medicine {
    constructor(db){
        this.table = db.table('vitalSigns')
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