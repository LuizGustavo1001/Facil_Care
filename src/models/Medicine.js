import { PatientSubCategory } from "./PatientSubCategory.js"

export default class Medicine extends PatientSubCategory{
    constructor(db) {
        super(db, "medicines")
    }
}