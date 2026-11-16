import type { Dexie } from "dexie"
import type { IFollowUp } from "../interfaces/IFollowUp"
import PatientRecordModel from "./PatientRecordModel"

export class FollowUpModel extends PatientRecordModel<IFollowUp> {
    public constructor(db: Dexie) {
        super(db, "followUps")
    }
}
