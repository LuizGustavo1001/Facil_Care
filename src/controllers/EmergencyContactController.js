import SubCategoryController from "./SubCategoryController.js"
import EmergencyContact from "../models/EmergencyContact.js"

export default class EmergencyContactController extends SubCategoryController{
    constructor() {
        super(EmergencyContact, "EmergencyContact")
    }
}