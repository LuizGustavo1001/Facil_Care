import PatientRecordController from "./PatientRecordController.js"
import VitalSign from "../models/VitalSign.js"

export default class VitalSignsController extends PatientRecordController {
    constructor(db) {
        super(db, VitalSign)
    }
}