import type { Table } from "dexie"
import type { Patient } from "../interfaces/Patient"

export default class PatientModel {
    // type: Patient
    // id: number type
    private readonly table: Table<Patient, number>;

    constructor(db: { table: (name: string) => Table<Patient, number> }) {
        this.table = db.table("patient")
    }

    /**
     * Returns patient data from the database.
     */
    async getPatient(): Promise<Patient | undefined> {
        return this.table
            .toCollection()
            .first()
    }

    /**
     * Updates patient data.
     *
     * @return `TRUE` if the record was updates, `FALSE` if not found.
     **/
    async updatePatient(newData: Partial<Patient>) :Promise<boolean> {
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