import SubCategoryController from "./SubCategoryController.js"
import MedicineRegistry from "../models/MedicineRegistry.js"

export default class MedicinesController extends SubCategoryController{
    constructor(){
        super(MedicineRegistry, "MedicineRegistry")
    }
}