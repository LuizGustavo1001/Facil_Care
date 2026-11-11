import SubCategoryController from "./SubCategoryController"
import type { Allergy } from "../interfaces/Allergy"
import { AllergyModel } from "../models/AllergyModel"

export default class AllergyController extends SubCategoryController<Allergy> {
    constructor() {
        super(AllergyModel, "Allergy")
    }
}