import SubCategoryController from "./SubCategoryController"
import type { Medicine } from "../interfaces/Medicine"
import { MedicineModel } from "../models/MedicineModel"
import type { ControllerResult } from "./settings"

export default class MedicineController extends SubCategoryController<Medicine, MedicineModel> {
    constructor() {
        super(MedicineModel, "Medicine")
    }

    /**
     * Returns medicines based on the selected weekday.
     *
     * @param value - Can be the raw weekday or a Date Object.
     **/
    async getByWeekDay(value: Date | number | string = new Date()): Promise<ControllerResult<Medicine[]>> {
        try {
            const weekDay = value instanceof Date
                ? value.getDay()
                : Number(value)

            if (Number.isNaN(weekDay)) {
                return {
                    success: false,
                    code: "InvalidDateValue",
                    data: []
                }
            }

            const result = await this.model.getByWeekDay(weekDay)

            if (result.length === 0) {
                return {
                    success: false,
                    code: "NoMedicineForToday",
                    data: []
                }
            }

            return {
                success: true,
                code: null,
                data: result
            }
        } catch(err) {
            console.error("DB Error: ", err)
            return {
                success: false,
                code: "DatabaseError",
                data: []
            }
        }
    }
}