import type { PatientSubCategoryBase } from "./PatientSubCategoryBase"

export interface EmergencyContact extends PatientSubCategoryBase {
    kinship: string,
    phone: string
}