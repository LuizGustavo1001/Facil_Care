import SubCategoryController from "./SubCategoryController.js"
import Caregiver from "../models/Caregiver.js"

export default class CaregiverController extends SubCategoryController{
    constructor() {
        super(Caregiver, "Caregiver")
    }
}