import type { IPatientSubCategoryBase } from "./IPatientSubCategoryBase"

export interface IMedicine extends IPatientSubCategoryBase {
    routeAdmin: string
    observations?: string

    administrationWeekDays: number[]
    administrationTimes: string[]

    active: boolean
}

// IMedicine + IWeeklyMedicineAdministration
export interface FormattedMedicine extends IMedicine {
    medicineId: number
    scheduledWeekDay: number
    scheduledTime: string
    administeredAt: Date | null
}