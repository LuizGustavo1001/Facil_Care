import Dexie from "dexie"
import { PatientSubCategoryModel } from "./PatientSubCategoryModel"
import type { Caregiver } from "../interfaces/Caregiver"

export class CaregiverModel extends PatientSubCategoryModel<Caregiver> {
    constructor(db: Dexie) {
        super(db, "caregivers")
    }
}
