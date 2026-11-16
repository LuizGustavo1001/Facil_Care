import Dexie from "dexie"

export default class DatabaseModel {
    private db: Dexie

    public constructor(db: Dexie) {
        this.db = db
    }

    /**
     * Deletes and recreates the local database.
     */
    public async resetAllData(): Promise<void> {
        await this.db.delete()
        await this.db.open()
    }
}