import { PatientSubCategory } from "./PatientSubCategory.js"

export default class EmergencyContact extends PatientSubCategory{
    constructor(db){
        super(db, 'emergencyContacts')
    }
}