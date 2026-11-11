import type { PatientRecordBase } from "./PatientRecordBase"

export interface VitalSign extends PatientRecordBase {
    observations?: string
}