import SubCategoryController from "./SubCategoryController.js"
import HealthPlan from "../models/HealthPlan.js"

export default class HealthPlanController extends SubCategoryController{
    constructor() {
        super(HealthPlan, "HealthPlan")
    }
}