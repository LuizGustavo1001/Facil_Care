import Dexie from "dexie"
import type { Table } from "dexie"
import { PatientSubCategoryModel } from "./PatientSubCategoryModel"
import type { IMedicine } from "../interfaces/IMedicine"

export class MedicineModel extends PatientSubCategoryModel<IMedicine> {
    public constructor(db: Dexie) {
        super(db, "medicines")
    }

    /**
     * Retrieves medicines by the weekday on which they are administered
     *
     * @param weekDay The selected weekDay
     *
     * @returns - The matching record, or undefined if not found.
     **/
    public async getByWeekDay(weekDay: number): Promise<IMedicine[]> {
        const table = this.getTable() as Table<IMedicine, string | number>

        return table
            .filter(medicine => medicine.administrationWeekDays?.includes(weekDay) ?? false)
            .toArray()
    }
}
