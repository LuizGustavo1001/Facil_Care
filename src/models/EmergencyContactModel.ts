import Dexie from "dexie"
import { PatientSubCategoryModel } from "./PatientSubCategoryModel"
import type { IEmergencyContact } from "../interfaces/IEmergencyContact"

export class EmergencyContactModel extends PatientSubCategoryModel<IEmergencyContact> {
    public constructor(db: Dexie) {
        super(db, "emergencyContacts")
    }
}
