import SubCategoryController from "./SubCategoryController.js"
import Medicine from "../models/Medicine.js"

export default class MedicineController extends SubCategoryController{
    constructor(){
        super(Medicine, "Medicine")
    }

    /**
     * Returns medicines based on the selected weekday
     *
     * @param { Date | int } value Can be the **raw weekday** or a **Date Object**
     **/
    async getByWeekDay(value = new Date()) {
        try {
            let result
            if(typeof value != "object" && !Number.isNaN(value)) { // 1. Raw weekday
                result = await this.model.getByWeekDay(Number(value))
            } else { // 2. Date Object
                const weekDay = new Date(value).getDay()

                result = await this.model.getByWeekDay(weekDay)
            }

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
        } catch(err) {
            console.log("DB Error: ", err)
            return{
                success: false,
                code: "DatabaseError",
                data: []
            }
        }
    }
}