import { PatientSubCategory } from "./PatientSubCategory.js"

export default class HealthPlan extends PatientSubCategory{
    constructor(db){
        super(db, 'healthPlans')
    }
}