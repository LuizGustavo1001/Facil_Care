import type { FormInputTag } from "../types/components/genericForm"

export interface FormPopupTemplate {
    id: string
    [key: string]: unknown
}

export interface FormOption {
    id: string | number
    label?: string
    value: string | number
}

export interface FormInput {
    id: string
    name: string
    tag: FormInputTag
    inputType?: string
    for?: string
    label?: string
    placeholder?: string
    required?: boolean
    autoCapitalize?: string
    autofocus?: boolean
    step?: number | string
    min?: number | string
    max?: number | string
    isDefaultNow?: boolean
    measurementType?: string
    dynamicKey?: string
    options?: FormOption[]
    mods?: {
        hasMeasurementUnit?: boolean
        measurementUnitType?: string
    }
}

export interface FormButton {
    id?: string
    tag?: string
    type?: string
}

export interface FormRegularTemplate {
    id: string
    main?: {
        inputs?: FormInput[]
        buttons?: FormButton[]
    }
}

export interface SelectOption {
    placeholder: string
    value: string | number
}

export interface PopupSettings {
    readOnly?: boolean
}

export interface FormButton {
    id?: string
    tag?: string
    type?: string
}

export interface DynamicOption {
    id?: string | number
    _id?: string | number
    name?: string
    title?: string
    label?: string
}
