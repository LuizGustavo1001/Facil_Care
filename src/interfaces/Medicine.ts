import type { PatientSubCategoryBase } from "./PatientSubCategoryBase"

export interface Medicine extends PatientSubCategoryBase{
    routeAdmin: string,
    observations?: string,

    administrationWeekDays: number[],
    administrationTimes: string[],

    active: boolean
}