import type { Dexie } from "dexie"
import type { IVitalSign } from "../interfaces/IVitalSign"
import PatientRecordModel from "./PatientRecordModel"

export class VitalSignModel extends PatientRecordModel<IVitalSign> {
    public constructor(db: Dexie) {
        super(db, "vitalSigns")
    }
}
