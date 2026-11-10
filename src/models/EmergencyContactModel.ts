import Dexie from "dexie"
import { PatientSubCategoryModel } from "./PatientSubCategoryModel"
import type { EmergencyContact } from "../interfaces/EmergencyContact"

export class EmergencyContactModel extends PatientSubCategoryModel<EmergencyContact> {
    constructor(db: Dexie) {
        super(db, "emergencyContacts")
    }
}
