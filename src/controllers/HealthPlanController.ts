import SubCategoryController from "./SubCategoryController"
import type { HealthPlan } from "../interfaces/HealthPlan"
import { HealthPlanModel } from "../models/HealthPlanModel"

export default class HealthPlanController extends SubCategoryController<HealthPlan> {
    constructor() {
        super(HealthPlanModel, "HealthPlan")
    }
}