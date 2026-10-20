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
    }

    /**
     * Updates patient root attributes (ex: name, birthDate, ...)
     *
     * @param { Object } newData - Clean object with the attributes to be updated
     **/
    async update(newData){
        try{
            const dbPatient = await this.model.getPatient()

            if(!dbPatient){
                return {
                    success: false,
                    code: "PatientNotFound",
                    data: []
                }
            }

            await this.model.updatePatient(newData)

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
}