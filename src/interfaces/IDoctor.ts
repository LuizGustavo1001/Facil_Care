import type { IPatientSubCategoryBase } from "./IPatientSubCategoryBase"

export interface IDoctor extends IPatientSubCategoryBase {
    speciality: string
    phone?: string
}