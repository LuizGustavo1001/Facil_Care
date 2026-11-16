import type { Table } from "dexie"
import type { IPatient } from "../interfaces/IPatient"

export default class PatientModel {
    private readonly table: Table<IPatient, number>;

    public constructor(db: { table: (name: string) => Table<IPatient, number> }) {
        this.table = db.table("patient")
    }

    /**
     * Returns patient data from the database.
     */
    public async getPatient(): Promise<IPatient | undefined> {
        return this.table
            .toCollection()
            .first()
    }

    /**
     * Updates patient data.
     *
     * @return `TRUE` if the record was updates, `FALSE` if not found.
     **/
    public async updatePatient(newData: Partial<IPatient>) :Promise<boolean> {
        const dbPatient = await this.getPatient()

        if(!dbPatient) {
            return false
        }

        await this.table.put({
            ...dbPatient,
            ...newData,
            _id: dbPatient._id
        })

        return true
    }
}