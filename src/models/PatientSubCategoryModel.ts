import type { Table, Dexie, UpdateSpec } from "dexie"

export abstract class PatientSubCategoryModel <T extends { _id?: number }> {
    protected readonly table: Table<T, number>

    protected constructor(db: Dexie, tableName: string) {
        this.table = db.table<T, number>(tableName)
    }

    /**
     * Retrieves the underlying table.
     */
    getTable(): Table<T, number> {
        return this.table
    }

    /**
     * Retrieves all sub-category items.
     **/
    async getAll(): Promise<T[]> {
        return this.table
            .toCollection()
            .reverse()
            .toArray()
    }

    /**
     * Retrieves sub-category item by its `ID`
     **/
    async getById(id: number): Promise<T | undefined> {
        return this.table.get(id)
    }

    /**
     * Adds new sub-category item.
     **/
    async create(newItem: T): Promise<boolean> {
        await this.table.add(newItem)

        return true
    }

    /**
     * Updates sub-category item based on its `ID`
     **/
    async update(itemId: number, updatedData: UpdateSpec<T>): Promise<boolean> {
        const updatedCount = await this.table.update(itemId, updatedData)
        return updatedCount > 0
    }

    /**
     * Deletes a sub-category item by its `ID`
     **/
    async deleteById(itemId: number): Promise<boolean> {
        const exists = await this.getById(itemId)

        if(!exists) {
            return false
        }

        await this.table.delete(itemId)

        return true
    }
}