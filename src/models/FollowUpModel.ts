import type { Dexie } from "dexie"
import type { FollowUp } from "../interfaces/FollowUp"
import PatientRecordModel from "./PatientRecordModel"

export class FollowUpModel extends PatientRecordModel<FollowUp> {
    constructor(db: Dexie) {
        super(db, "followUps")
    }
}
