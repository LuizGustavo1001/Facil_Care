import { PatientSubCategory } from "./PatientSubCategory.js"

export default class MedicineRegistry extends PatientSubCategory{
   constructor(db){
       super(db, "medicineRegistries")
   }
}