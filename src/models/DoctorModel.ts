import Dexie from "dexie"
import { PatientSubCategoryModel } from "./PatientSubCategoryModel"
import type { Doctor } from "../interfaces/Doctor"

export class DoctorModel extends PatientSubCategoryModel<Doctor> {
    constructor(db: Dexie) {
        super(db, "doctors")
    }
}
