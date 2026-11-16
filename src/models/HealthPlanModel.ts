import Dexie from "dexie"
import { PatientSubCategoryModel } from "./PatientSubCategoryModel"
import type { IHealthPlan } from "../interfaces/IHealthPlan"

export class HealthPlanModel extends PatientSubCategoryModel<IHealthPlan> {
    public constructor(db: Dexie) {
        super(db, "healthPlans")
    }
}
