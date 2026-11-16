import type { IPatientSubCategoryBase } from "./IPatientSubCategoryBase"

export interface ICaregiver extends IPatientSubCategoryBase {
    startDate: string
    phone: string
}