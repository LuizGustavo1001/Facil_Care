import Patient from "../models/Patient.js"
import db from "../database/db.js"

export default class PatientController {
    constructor() {
        this.model = new Patient(db)
    }

    /*
     * Returns the patient collection registered in the database.
     **/
    async getPatient() {

        try{
            const patient = await this.model.getPatient()

            if(!patient){
                return {
                    success: false,
                    code: "PatientNotFound",
                    data: []
                }
            }

            return {
                success: true,
                code: null,
                data: patient
            }
        }catch(error){
            console.log("DB error: ", error)
            return {
                success: false,
                code: "DatabaseError",
                data: []
            }
        }
    }

    /**
     * Returns the new patient collection after updating.
     *
     * @param { Object } newData - Containing the attributes to be overwritten or updated
     **/
    async updatePatient(newData) {
        try{
            const updated = await this.model.updatePatient(newData)

            if(!updated){
                return {
                    success: false,
                    code: "PatientNotFound",
                    data: []
                }
            }

            const patient = await this.model.getPatient()

            return {
                success: true,
                code: "PatientUpdated",
                data: patient
            }
        }catch(error){
            console.log("DB error: ", error)
            return {
                success: false,
                code: "DatabaseError",
                data: []
            }
        }
    }

    /**
     * Returns the new patient collection after the removing query (Patient).
     *
     * @param { Object } newData - Containing the attributes to be overwritten or updated
     **/
    async removeFromSubCategory(newData){
        try{
            const removed = await this.model.removeFromSubCategory(newData)

            if(!removed){
                return {
                    success: false,
                    code: "RecordNotFound",
                    data: []
                }
            }

            const patient = await this.model.getPatient()

            return {
                success: true,
                code: "RecordRemoved",
                data: patient
            }
        }catch(error){
            console.log("DB error: ", error)
            return {
                success: false,
                code: "DatabaseError",
                data: []
            }
        }
    }
}