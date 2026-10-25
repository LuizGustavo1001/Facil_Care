import SubCategoryController from "./SubCategoryController.js"
import Medicine from "../models/Medicine.js"

export default class MedicineController extends SubCategoryController{
    constructor(){
        super(Medicine, "Medicine")
    }
}