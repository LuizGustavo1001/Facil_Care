import type { ComponentPublicInstance } from "vue"

export type ConfirmPopupTitle = string | undefined
export type ConfirmPopupMessage = string | null
export type ConfirmPopupAction = (() => void | Promise<void>) | null

export type DOMReference =
    | HTMLElement
    | ComponentPublicInstance
    | DOMReference[]
    | null

export type FormContext = Record<string, unknown>