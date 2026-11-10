import type { Table, Dexie, UpdateSpec } from "dexie"
import type { PatientRecordBase } from "../interfaces/PatientRecordBase"

export default abstract class PatientRecordModel <T extends PatientRecordBase> {
    private readonly table: Table<T, number>

    protected constructor(db: Dexie, tableName: string) {
        this.table = db.table<T, number>(tableName)
    }

    /**
     * Retrieves all records.
     **/
    async getAll(): Promise<T[]> {
        return await this.table
            .toCollection()
            .toArray()
    }

    /**
     * Retrieves records by its `ID`.
     **/
    async getById(id: number): Promise<T | undefined> {
        return this.table.get(id)
    }

    /**
     * Retrieves records matching a specific `RECORD TYPE`,
     * ordered by `dateTime` *(descending order)*.
     **/
    async getByField(fieldName: string): Promise<T[]> {
        const records = await this.table
            .where("record")
            .equals(fieldName)
            .toArray()

        return records.sort(
            (a, b) => new Date(b.dateTime).getTime() - new Date (a.dateTime).getTime()
        )
    }


    /**
     * Retrieves records within a date range,
     * including both interval edges ordered by `dateTime` *(descending order)*.
     **/
    async getByDate(minDate: Date, maxDate: Date): Promise<T[]> {
        const records = await this.table
            .where("dateTime")
            .between(
                minDate,
                maxDate,
                true,
                true
            )
            .toArray()

        return records.sort(
            (a, b) => new Date(b.dateTime).getTime() - new Date (a.dateTime).getTime()
        )
    }

    /**
     * Retrieves records matching a specific record type and date range,
     * including both interval edges ordered by `dateTime` *(descending order)*.
     **/
    async getByFieldAndDate(
        field: string,
        minDate: Date,
        maxDate: Date = new Date()
    ): Promise<T[]> {
        const records = await this.table
            .where(`[record+dateTime]`)
            .between(
                [field, minDate],
                [field, maxDate],
                true,
                true
            )
            .toArray()

        return records.sort(
            (a, b) => new Date(b.dateTime).getTime() - new Date (a.dateTime).getTime()
        )
    }

    /**
     * Adds a new patient record to the database.
     *
     * @returns `TRUE` if the record was added, or `FALSE` otherwise.
     **/
    async create(newRecord: T): Promise<boolean> {
        await this.table.add(newRecord)

        return true
    }

    /**
     * Updates an existing record by merging the provided fields
     * with its current data, preserving its original `ID`.
     *
     * @returns `TRUE` if the record was updated, `FALSE` if the record wat not found.
     **/
    async update(
        newData: UpdateSpec<T>,
        recordId: number
    ): Promise<boolean> {
        const updatedCount = await this.table.update(
            recordId,
            newData
        )

        return updatedCount > 0
    }

    /**
     * Deletes a record by its `ID`.
     *
     * @returns `TRUE` if deleted, `FALSE` if the record was not found.
     **/
    async removeById(recordId: number): Promise<boolean> {
        const deleted = await this.table
            .where("_id")
            .equals(recordId)
            .delete()

        return deleted > 0
    }
}