import { PatientRecord } from "./PatientRecord.js";

export default class VitalSign extends PatientRecord {
    constructor(db) {
        super(db, 'vitalSigns', 'vitalSign')
    }
}