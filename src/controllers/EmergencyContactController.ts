import SubCategoryController from "./SubCategoryController"
import type { EmergencyContact } from "../interfaces/EmergencyContact"
import { EmergencyContactModel } from "../models/EmergencyContactModel"

export default class EmergencyContactController extends SubCategoryController<EmergencyContact> {
    constructor() {
        super(EmergencyContactModel, "EmergencyContact")
    }
}