import SubCategoryController from "./SubCategoryController"
import type { IAllergy } from "../interfaces/IAllergy"
import { AllergyModel } from "../models/AllergyModel"

export default class AllergyController extends SubCategoryController<IAllergy> {
    public constructor() {
        super(AllergyModel, "IAllergy")
    }
}