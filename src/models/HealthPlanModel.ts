import Dexie from "dexie"
import { PatientSubCategoryModel } from "./PatientSubCategoryModel"
import type { HealthPlan } from "../interfaces/HealthPlan"

export class HealthPlanModel extends PatientSubCategoryModel<HealthPlan> {
    constructor(db: Dexie) {
        super(db, "healthPlans")
    }
}
