import Allergy from "../models/Allergy.js"
import SubCategoryController from "./SubCategoryController.js"

export default class AllergyController extends SubCategoryController{
    constructor() {
        super(Allergy, "Allergy")
    }
}