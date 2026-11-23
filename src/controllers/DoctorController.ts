import SubCategoryController from "./SubCategoryController"
import type { IDoctor } from "../interfaces/IDoctor"
import { DoctorModel } from "../models/DoctorModel"

export default class DoctorController extends SubCategoryController<IDoctor> {
    public constructor() {
        super(DoctorModel, "Doctor")
    }
}