import Patient from "../models/Patient.js"
import db from "../database/db.js"

export default class PatientController {
    constructor() {
        this.model = new Patient(db)
    }

    /*
     * Returns patient data.
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
     * Updates patient data merging fields.
     * Retains the record's original `_id` and overwrite the sended keys.
     *
     * @param { Object } newData - Containing the attributes to be overwritten or updated
     **/
    async updatePatient(newData) {
        try{
            const patient = await this.model.updatePatient(newData)

            if(!patient){
                return {
                    success: false,
                    code: "PatientNotFound",
                    data: []
                }
            }

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
}