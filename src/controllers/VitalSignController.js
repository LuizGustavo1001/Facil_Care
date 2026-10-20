import PatientRecordController from "./PatientRecordController.js"
import VitalSign from "../models/VitalSign.js"

export default class VitalSignController extends PatientRecordController {
    constructor() {
        super(VitalSign, "VitalSign")
    }
}