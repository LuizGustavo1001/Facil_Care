import { FORM_TYPES } from "../../constants/components/form"
import type { DynamicOption } from "../../interfaces/Form"

export type Converter = (type: string, value: unknown) => unknown
export type FormInputTag =
    | "input"
    | "textarea"
    | "select"
    | "mpTime"
    | "mpDays"
export type FormType = typeof FORM_TYPES[keyof typeof FORM_TYPES]
export type FormRecord = Record<string, unknown>
export type DynamicData = Record<string, DynamicOption[]>
export type FormValues = Record<string, unknown>