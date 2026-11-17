export interface IWeeklyMedicineAdministration {
    _id?: number
    medicineId: number
    scheduledWeekDay: number
    scheduledTime: string
    administeredAt: Date
}