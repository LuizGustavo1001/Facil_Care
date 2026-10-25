export class PatientSubCategory {
    /**
     * @param { Object } db - Dexie database instance.
     * @param { string } tableName - Sub-category table name
     **/
    constructor(db, tableName){
        this.table = db.table(tableName)
    }

    /**
     * Retrieves all sub-category items from the collection.
     *
     * @returns { Promise<Array<Object>> } All sub-category items within the collection.
     **/
    async getAll(){
        return this.table
            .toCollection()
            .reverse()
            .toArray()
    }

    /**
     * Retrieves sub-category item by the `id`.
     *
     * @param { number } id - Sub-category Id.
     *
     * @returns { Promise<Object|undefined> } - The matching item, or undefined if not found.
     **/
    async getById(id){
        return this.table.get(Number(id))
    }

    /**
     * Adds new sub-category item to the database.
     *
     * @param { Object } newItem
     *
     * @returns { Promise<boolean> } `true` if the record was added, or `false` if the patient does not exist.
     *
     * @throws { Error } If a database operation fails.
     **/
    async create(newItem){
        try{
            await this.table.add(newItem)
            return true
        }catch(err){
            throw err
        }
    }

    /**
     * Updates sub-category item based on the `itemId`.
     *
     * @param { number } id - Item id
     * @param { Object } updatedData - Sub-category item data
     *
     * @returns { Promise<boolean> } `true` if the item was deleted, `false` if not found.
     *
     * @throws { Error } If a database operation fails.
     **/
    async update(id, updatedData){
        try{
            const updatedCount = await this.table.update(id, updatedData)
            return updatedCount > 0
        }catch(err){
            throw err
        }
    }

    /**
     * Deletes a sub-category item by its `id`
     *
     * @param { number } id - Item `id`
     *
     * @returns { Promise<boolean> } `true` if the item was deleted, `false` if not found.
     *
     * @throws { Error } If a database operation fails.
     **/
    async removeById(id){
        try{
            const exists = await this.getById(id)
            if(!exists) return false

            await this.table.delete(id)
            return true
        }catch(err){
            throw err
        }
    }
}