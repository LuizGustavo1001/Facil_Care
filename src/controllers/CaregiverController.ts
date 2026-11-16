import SubCategoryController from "./SubCategoryController"
import type { ICaregiver } from "../interfaces/ICaregiver"
import { CaregiverModel } from "../models/CaregiverModel"

export default class CaregiverController extends SubCategoryController<ICaregiver> {
    public constructor() {
        super(CaregiverModel, "ICaregiver")
    }
}