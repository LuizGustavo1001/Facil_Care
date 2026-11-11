import PatientModel from "../models/PatientModel"
import db from "../database/db.js"

import type { Patient } from "../interfaces/Patient"
import type { ControllerResult } from "./settings"

export default class PatientController {
    private readonly model: PatientModel

    constructor() {
        this.model = new PatientModel(db)
    }

    /**
     * Returns the patient registered in the database.
     **/
    async getPatient(): Promise<ControllerResult<Patient>> {
        try {
            const patient = await this.model.getPatient()

            if(!patient) {
                return {
                    success: false,
                    code: "PatientNotFound",
                    data: null
                }
            }

            return {
                success: true,
                code: null,
                data: patient
            }
        } catch (err: any) {
            return {
                success: false,
                code: "DatabaseError",
                data: null
            }
        }
    }

    /**
     * Updates patient data,
     * (ex: name, birthDate, ...)
     **/
    async update(newData: Partial<Omit<Patient, "_id">>): Promise<ControllerResult<Patient>> {
        try {
            const updated: boolean = await this.model.updatePatient(newData)

            if(!updated) {
                return {
                    success: false,
                    code: "PatientNotFound",
                    data: null
                }
            }

            return {
                success: true,
                code: "PatientUpdated",
                data: null
            }
        } catch (err: any) {
            return {
                success: false,
                code: "DatabaseError",
                data: null
            }
        }
    }
}