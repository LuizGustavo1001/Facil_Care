import SubCategoryController from "./SubCategoryController"
import type { IHealthPlan } from "../interfaces/IHealthPlan"
import { HealthPlanModel } from "../models/HealthPlanModel"

export default class HealthPlanController extends SubCategoryController<IHealthPlan> {
    public constructor() {
        super(HealthPlanModel, "HealthPlan")
    }
}