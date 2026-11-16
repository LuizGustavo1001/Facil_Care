import type { PatientSubCategoryBase } from "./PatientSubCategoryBase"

export interface Medicine extends PatientSubCategoryBase {
    routeAdmin: string
    observations?: string

    administrationWeekDays: number[]
    administrationTimes: string[]

    active: boolean
}

// Medicine + WeeklyMedicineSchedule
export interface FormattedMedicine extends Medicine {
    medicineId: number
    scheduledWeekDay: number
    scheduledTime: string
    administeredAt: Date | null
}