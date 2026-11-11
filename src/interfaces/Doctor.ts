import type { PatientSubCategoryBase } from "./PatientSubCategoryBase"

export interface Doctor extends PatientSubCategoryBase {
    speciality: string,
    phone?: string
}