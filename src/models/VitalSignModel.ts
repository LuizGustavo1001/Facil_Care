import type { Dexie } from "dexie"
import type { VitalSign } from "../interfaces/VitalSign"
import PatientRecordModel from "./PatientRecordModel"

export class VitalSignModel extends PatientRecordModel<VitalSign> {
    constructor(db: Dexie) {
        super(db, "vitalSigns")
    }
}
