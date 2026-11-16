import Dexie from "dexie"
import { PatientSubCategoryModel } from "./PatientSubCategoryModel"
import type { ICaregiver } from "../interfaces/ICaregiver"

export class CaregiverModel extends PatientSubCategoryModel<ICaregiver> {
    public constructor(db: Dexie) {
        super(db, "caregivers")
    }
}
