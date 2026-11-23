import SubCategoryController from "./SubCategoryController"
import type { IEmergencyContact } from "../interfaces/IEmergencyContact"
import { EmergencyContactModel } from "../models/EmergencyContactModel"

export default class EmergencyContactController extends SubCategoryController<IEmergencyContact> {
    public constructor() {
        super(EmergencyContactModel, "EmergencyContact")
    }
}