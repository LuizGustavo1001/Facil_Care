export default class Database {
    constructor(db){
        this.db = db
    }

    async resetAllData() {
        await this.db.delete()
        await this.db.open()

        return true
    }
}