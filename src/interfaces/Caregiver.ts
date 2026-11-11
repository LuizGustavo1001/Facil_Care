import type { PatientSubCategoryBase } from "./PatientSubCategoryBase"

export interface Caregiver extends PatientSubCategoryBase {
    startDate: string,
    phone: string,
}