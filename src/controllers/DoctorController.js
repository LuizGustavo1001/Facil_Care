import SubCategoryController from "./SubCategoryController.js"
import Doctor from "../models/Doctor.js"

export default class DoctorController extends SubCategoryController{
    constructor() {
        super(Doctor, "Doctor")
    }
}