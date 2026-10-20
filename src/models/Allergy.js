import { PatientSubCategory } from "./PatientSubCategory.js"

export default class Allergy extends PatientSubCategory{
    constructor(db){
        super(db, 'allergies')
    }
}