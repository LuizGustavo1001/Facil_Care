import { PatientSubCategory } from "./PatientSubCategory.js"

export default class Doctor extends PatientSubCategory{
    constructor(db){
        super(db, 'doctors')
    }
}