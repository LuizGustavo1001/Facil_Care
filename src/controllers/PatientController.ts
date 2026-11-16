import PatientModel from "../models/PatientModel"
import db from "../database/db.js"

import type { IPatient } from "../interfaces/IPatient"
import {type ControllerResult, fallbackReturn} from "./settings"

export default class PatientController {
    private readonly model: PatientModel

    public constructor() {
        this.model = new PatientModel(db)
    }

    /**
     * Returns the patient registered in the database.
     **/
    public async getPatient(): Promise<ControllerResult<IPatient>> {
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
        } catch(err: any) {
            return fallbackReturn(err, false)
        }
    }

    /**
     * Updates patient data,
     * (ex: name, birthDate, ...)
     **/
    public async update(newData: Partial<Omit<IPatient, "_id">>): Promise<ControllerResult<IPatient>> {
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
        } catch(err: any) {
            return fallbackReturn(err, false)
        }
    }
}