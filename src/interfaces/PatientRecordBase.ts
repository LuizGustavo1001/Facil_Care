export interface PatientRecordBase {
    _id?: number
    record: string
    dateTime: Date,
    patientId: number,
    value: string,
    caregiverId: number
}