import type { IPatientSubCategoryBase } from "./IPatientSubCategoryBase"

export interface IEmergencyContact extends IPatientSubCategoryBase {
    kinship: string
    phone: string
}