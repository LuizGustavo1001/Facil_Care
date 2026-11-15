import type { ComponentPublicInstance } from "vue"

export type DOMReference =
    | HTMLElement
    | ComponentPublicInstance
    | DOMReference[]
    | null

export type FormContext = Record<string, unknown>