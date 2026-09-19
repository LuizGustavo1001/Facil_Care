import BaseController from "./BaseController.js"
import Patient from "../models/Patient.js"

export default class PatientController extends BaseController {
    constructor(db) {
        super()
        this.model = new Patient(db)
    }

    /*
     * Returns patient data
     **/
    async getPatient() {
        return await this.execute(async () => {
            const patient = await this.model.getPatient()

            if(!patient){
                this.setMessage("PatientNotFound")
                return null
            }

            return patient
        })
    }

    /*
     * Update patient data
     *
     * @param { Object } newData
     **/
    async updatePatient(newData) {
        return await this.execute(async () => {
            const patient = await this.model.updatePatient(newData)

            if(!patient){
                this.setMessage("PatientNotFound")
                return null
            }

            this.setMessage("PatientUpdated")
            return patient
        })
    }
}