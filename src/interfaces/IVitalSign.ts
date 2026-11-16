import type { IPatientRecordBase } from "./IPatientRecordBase"

export interface IVitalSign extends IPatientRecordBase {
    observations?: string
}