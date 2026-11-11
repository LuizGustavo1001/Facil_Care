import Dexie from "dexie"
import type { Table } from "dexie"
import { PatientSubCategoryModel } from "./PatientSubCategoryModel"
import type { Medicine } from "../interfaces/Medicine"

export class MedicineModel extends PatientSubCategoryModel<Medicine> {
    constructor(db: Dexie) {
        super(db, "medicines")
    }

    /**
     * Retrieves medicines by the weekday on which they are administered
     *
     * @param weekDay The selected weekDay
     *
     * @returns - The matching record, or undefined if not found.
     **/
    async getByWeekDay(weekDay: number): Promise<Medicine[]> {
        const table = this.getTable() as Table<Medicine, string | number>

        return table
            .filter(medicine => medicine.administrationWeekDays?.includes(weekDay) ?? false)
            .toArray()
    }
}
