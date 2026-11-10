import SubCategoryController from "./SubCategoryController"
import type { Caregiver } from "../interfaces/Caregiver"
import { CaregiverModel } from "../models/CaregiverModel"

export default class CaregiverController extends SubCategoryController<Caregiver> {
    constructor() {
        super(CaregiverModel, "Caregiver")
    }
}