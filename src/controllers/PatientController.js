import BaseController from "./BaseController.js"
import Patient from "../models/Patient.js"
import db from "../database/db.js"

export default class PatientController extends BaseController {
    constructor() {
        super()
        this.model = new Patient(db)
    }

    /*
     * Returns patient data.
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

    /**
     * Updates patient data merging fields.
     * Retains the record's original `_id` and overwrite the sended keys.
     *
     * @param { Object } newData - Containing the attributes to be overwritten or updated
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