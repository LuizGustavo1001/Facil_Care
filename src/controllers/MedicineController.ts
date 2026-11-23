import SubCategoryController from "./SubCategoryController"
import type { IMedicine } from "../interfaces/IMedicine"
import { MedicineModel } from "../models/MedicineModel"
import {type ControllerResult, fallbackReturn} from "./settings"

export default class MedicineController extends SubCategoryController<IMedicine, MedicineModel> {
    public constructor() {
        super(MedicineModel, "Medicine")
    }

    /**
     * Returns medicines based on the selected weekday.
     *
     * @param value - Can be the raw weekday or a Date Object.
     **/
    public async getByWeekDay(value: Date | number | string = new Date()): Promise<ControllerResult<IMedicine[]>> {
        try {
            const weekDay = value instanceof Date
                ? value.getDay()
                : Number(value)

            if(Number.isNaN(weekDay)) {
                return {
                    success: false,
                    code: "InvalidDateValue",
                    data: []
                }
            }

            const result = await this.model.getByWeekDay(weekDay)

            if(result.length === 0) {
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
        } catch(err: any) {
            return fallbackReturn(err)
        }
    }
}