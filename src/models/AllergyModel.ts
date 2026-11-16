import Dexie from "dexie"
import { PatientSubCategoryModel } from "./PatientSubCategoryModel"
import type { IAllergy } from "../interfaces/IAllergy"

export class AllergyModel extends PatientSubCategoryModel<IAllergy> {
    public constructor(db: Dexie) {
        super(db, "allergies")
    }
}
