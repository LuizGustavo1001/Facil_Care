import SubCategoryController from "./SubCategoryController"
import type { Doctor } from "../interfaces/Doctor"
import { DoctorModel } from "../models/DoctorModel"

export default class DoctorController extends SubCategoryController<Doctor> {
    constructor() {
        super(DoctorModel, "Doctor")
    }
}