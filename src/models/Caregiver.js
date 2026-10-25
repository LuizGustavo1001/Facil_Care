import { PatientSubCategory } from "./PatientSubCategory.js"

export default class Caregiver extends PatientSubCategory{
    constructor(db){
        super(db, 'caregivers')
    }
}