import Dexie from "dexie"
import { PatientSubCategoryModel } from "./PatientSubCategoryModel"
import type { IDoctor } from "../interfaces/IDoctor"

export class DoctorModel extends PatientSubCategoryModel<IDoctor> {
    public constructor(db: Dexie) {
        super(db, "doctors")
    }
}
