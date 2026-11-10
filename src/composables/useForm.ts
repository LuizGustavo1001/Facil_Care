import type { Component, MaybeRef } from "vue"
import { ref, unref } from "vue"
import { useUnitSystem } from "./useUnitSystem"
import { useDate } from "./useDate"
import { useI18n } from "vue-i18n"
import { useUtils } from "./useUtils"

import Input from "../components/inputs/Input.vue"
import TextArea from "../components/inputs/TextArea.vue"
import SelectInput from "../components/inputs/SelectInput.vue"
import MultipleTimeInput from "../components/inputs/MultipleTimeInput.vue"
import WeekDaysInput from "../components/inputs/WeekDaysInput.vue"

import type {
    DynamicOption,
    FormButton,
    FormInput,
    FormRegularTemplate,
    PopupSettings,
    SelectOption
} from "../interfaces/Form"
import type { DynamicData, FormRecord, Converter, FormValues } from "../types/genericForm"

export function useForm(){
    const isSubmitting = ref<boolean>(false)
    const formWarning = ref<string | null>(null)

    const unit = useUnitSystem()
    const date = useDate()
    const utils = useUtils()
    const { t, te } = useI18n()

    /**
     * Converts fields according to the provided converter.
     */
    const convertFormValues = (data: FormValues, template: FormRegularTemplate, converter: Converter): FormValues => {
        const result: FormValues = { ...data }

        for(const input of template?.main?.inputs ?? []) {
            if (!input.measurementType || result[input.name] === undefined) continue

            // convert value
            result[input.name] = converter(
                input.measurementType,
                result[input.name]
            )
        }
        return result
    }

    /**
     * Prepares database values for form inputs.
     *
     * @param dataSource - Database data source (ex: patient.value, patient.value.emergencyContacts)
     * @param idKey - Specifies the id format (ex: _id, id or doctorId)
     * @param template - Selected popup template
     **/
    const getInputValue = (
        dataSource: FormRecord | FormRecord[] | null | undefined,
        template: FormRegularTemplate,
        idKey = "_id"
    ): FormValues | FormValues[] | null => {
        if (!dataSource || !template.main?.inputs) {
            return Array.isArray(dataSource) ? [] : {}
        }

        const extractFields = (dataObj: FormRecord): FormValues => {
            const values: FormValues = {}

            if (dataObj[idKey] !== undefined) {
                values[idKey] = dataObj[idKey]
            }

            for (const input of template.main?.inputs ?? []) {
                values[input.name] = dataObj[input.name]
            }

            return values
        }

        return Array.isArray(dataSource)
            ? dataSource.map(extractFields)
            : extractFields(dataSource)
    }

    /**
     * Normalizes form values to metric units before persistence.
     *
     * @param data
     * @param template
     */
    const normalizeFormValues = (data: FormValues, template: FormRegularTemplate): FormValues => {
        return convertFormValues(
            data,
            template,
            (type: string, value: unknown) => unit.toMetric(type, value as string | number)
        )
    }

    /**
     * Extracts data from a submit event.
     */
    const extractData = (
        event: SubmitEvent,
        template: FormRegularTemplate
    ): FormValues => {
        if (!(event.currentTarget instanceof HTMLFormElement)) {
            return {}
        }

        const formData = new FormData(event.currentTarget)
        const data: FormValues = {}

        const weekDayFields = new Set(
            (template.main?.inputs ?? [])
                .filter(input => input.tag === "mpDays")
                .map(input => input.name)
        )

        // Initialize weekday fields as arrays.
        for (const name of weekDayFields) {
            data[name] = []
        }

        for (const [rawName, value] of formData.entries()) {
            const isArray = rawName.endsWith("[]")
            const name = isArray
                ? rawName.slice(0, -2)
                : rawName

            if (isArray) {
                const current = data[name]
                const values = Array.isArray(current) ? current : []

                values.push(
                    weekDayFields.has(name)
                        ? Number(value)
                        : value
                )

                data[name] = values
            } else {
                data[name] = value
            }
        }

        return data
    }

    /**
     * Executes a database operation and tracks its submission state.
     *
     * @param actionCallback - Controller method to access the desired model of the database.
     *
     * @example
     * actionCallback: `() => patientController.updatePatient(...)`
     **/
    const executeDBSubmit = async <T>(actionCallback: () => Promise<T>): Promise<T> => {
        isSubmitting.value = true
        formWarning.value = null

        try {
            return await actionCallback()
        } finally {
            isSubmitting.value = false
        }
    }

    // Returns the component associated with an input tag
    const getInputComponent = (tag: string): Component | null => {
        switch (tag) {
            case "input":
                return Input

            case "textarea":
                return TextArea

            case "select":
                return SelectInput

            case "mpTime":
                return MultipleTimeInput

            case "mpDays":
                return WeekDaysInput

            default:
                return null
        }
    }

    /**
     * Returns the translated input label.
     **/
    const getInputLabel = (templateId: string | null | undefined, input: FormInput | null | undefined): string => {
        if (!input || !templateId) return ""

        const labelKey = `formTemplates.${templateId}.main.inputs.${input.id}.label`

        const exists = te(labelKey)

        let title = exists ? t(labelKey) : ""

        if (input.mods?.hasMeasurementUnit) {
            let measurementUnit
            if(typeof input !== null && typeof input != undefined) {
                measurementUnit = unit.getUnit(<string>input.mods.measurementUnitType)
            }

            if (measurementUnit) {
                title += ` (${measurementUnit})`
            }
        }

        return title
    }

    /**
     * Returns the translated input placeholder.
     */
    const getInputPlaceholder = (templateId: string | null | undefined, input: FormInput | null | undefined) => {
        if(!input || !templateId) return

        const placeholderKey = `formTemplates.${templateId}.main.inputs.${input.id}.placeholder`

        return t(placeholderKey) ?? ""
    }

    // Returns the props required by an input component
    const getInputProps = (input: FormInput, popupConfig: MaybeRef<PopupSettings | null | undefined>, templateId: string | null | undefined, inputValue: FormValues | null = null, dynamicData = {}): Record<string, unknown> | undefined => {
        if(!templateId) return

        let currentValue = inputValue?.[input.name] ?? null

        const isEmpty = currentValue === null || currentValue === undefined || currentValue === ""

        if(isEmpty) {
            if (input.inputType === 'datetime-local' && input.isDefaultNow) {
                currentValue = date.getCurrentDateTimeLocal()
            } else if (input.inputType === 'date') {
                currentValue = date.getToday()
            } else if (input.inputType === 'time') {
                currentValue = date.getHourWithoutLocale()
            }

            if (input.tag === "mpTime") {
                currentValue = Array.isArray(currentValue) && currentValue.length
                    ? currentValue
                    : [date.getHourWithoutLocale()]
            }

            if (input.tag === "mpDays") {
                currentValue = Array.isArray(currentValue)
                    ? currentValue
                    : [0, 1]
            }
        }

        const title = getInputLabel(templateId, input)
        const placeholder = getInputPlaceholder(templateId, input)
        const readOnly = unref(popupConfig)?.readOnly ?? null

        switch(input.tag) {
            case "input":
                return {
                    label: input.inputType === "hidden"
                        ? ""
                        : title,
                    placeholder: placeholder,
                    for: input.for,
                    name: input.name,
                    inputType: input.inputType,
                    autoCapitalize: input.autoCapitalize ?? null,
                    autofocus: input.inputType !== "hidden",
                    step: input.step ?? null,
                    min: input.min ?? null,
                    max: input.inputType === "date"
                        ? (input.max ?? date.getToday())
                        : (input.max ?? null),
                    modelValue: currentValue ?? "",
                    translate: "no",
                    required: input.required ?? false
                }

            case "select":
                return {
                    label: title,
                    for: input.for,
                    name: input.name,
                    options: getSelectOptions(input, dynamicData),
                    modelValue: currentValue ?? "",
                    translate: "no",
                    disabled: readOnly
                }

            case "textarea":
                return {
                    label: title,
                    placeholder: placeholder,
                    for: input.for,
                    name: input.name,
                    modelValue: currentValue ?? "",
                    translate: "no",
                    readonly: readOnly
                }

            case "mpTime":
                return {
                    label: title,
                    placeholder: placeholder,
                    for: input.for,
                    name: input.name,
                    modelValue: currentValue,
                    translate: "no",
                    readonly: readOnly
                }
            case "mpDays":
                return {
                    label: title ?? "",
                    name: input.name,
                    modelValue: currentValue ?? [],
                }

            default:
                return {}
        }
    }

    /**
     * Generates options for Select input supporting both fixed options and dynamic database records.
     *
     * @param { Object } input - Input configuration object
     * @param { Object } dynamicData - Object containing dynamic datasets (ex: { caregivers: [...] })
     */
    const getSelectOptions = (input: FormInput, dynamicData: DynamicData = {}): SelectOption[] => {
        let options: SelectOption[] = []

        // 1. Static Options
        if (Array.isArray(input.options)) {
            for (const option of input.options) {
                const label = utils.getOptionTranslate(input.id, String(option.id))

                options.push({
                    placeholder: label || option.label || String(option.value),
                    value: option.value
                })
            }
        }

        // 2. Dynamic Options from Database
        if (input.dynamicKey && dynamicData[input.dynamicKey]) {
            const dbItems = dynamicData[input.dynamicKey]
                .map((item: DynamicOption): SelectOption | null => {
                    const placeholder =
                        item.name ?? item.title ?? item.label

                    const value =
                        item.id ?? item._id ?? item.name

                    if (placeholder === undefined || value === undefined) {
                        return null
                    }

                    return {
                        placeholder,
                        value
                    }
                })
                .filter((item): item is SelectOption => item !== null)

            options = [...options, ...dbItems]
        }

        return options
    }

    /**
     * Returns form button props.
     */
    const getBtnProps = (btn: FormButton, type: string) => {
        const key = `formPopupTypes.${type}.title`
        const title = te(key) ? t(key) : ""

        return {
            title: title,
            padding: "md",
            alignCenter: true,
            tag: btn.tag ?? "button",
            type: btn.type ?? "submit"
        }
    }

    return { extractData, executeDBSubmit, isSubmitting, formWarning, getInputValue, normalizeFormValues, convertFormValues, getInputComponent, getInputProps, getSelectOptions, getBtnProps, getInputPlaceholder, getInputLabel }
}