import Dexie from "dexie"
import { PatientSubCategoryModel } from "./PatientSubCategoryModel"
import type { Allergy } from "../interfaces/Allergy"

export class AllergyModel extends PatientSubCategoryModel<Allergy> {
    constructor(db: Dexie) {
        super(db, "allergies")
    }
}
