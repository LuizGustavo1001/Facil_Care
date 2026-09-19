import { PatientRecord } from "./PatientRecord.js";

export default class FollowUp extends PatientRecord {
    constructor(db) {
        super(db, 'followUps', 'followUp')
    }
}