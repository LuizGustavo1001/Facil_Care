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
        })
    }
}