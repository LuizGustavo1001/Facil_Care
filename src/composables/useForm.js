import { ref } from "vue"
import { useUnitSystem } from "./useUnitSystem.js"
import { useDate } from "./useDate.js"
import { useI18n } from "vue-i18n"
import { useUtils } from "./useUtils.js"

import Input from "../components/forms/Input.vue"
import TextArea from "../components/forms/TextArea.vue"
import SelectInput from "../components/forms/SelectInput.vue"

export const FORM_TYPES = {
    CREATE: "create",
    EDIT: "edit"
}

export function useForm(){
    const isSubmitting = ref(false)
    const formWarning = ref(null)

    const unit = useUnitSystem()
    const date = useDate()
    const utils = useUtils()
    const { t, te } = useI18n()

    /**
     * Converts fields according to the provided converter.
     *
     * @param { Object } data
     * @param { Object } template
     * @param { (type: string, value: any) => any } converter
     * @returns { Object }
     */
    const convertFormValues = (data, template, converter) => {
        const result = { ...data }

        for(const input of template?.main?.inputs ?? []){
            if(!input.measurementType || result[input.name] === undefined) continue

            // convert value
            result[input.name] = converter(
                input.measurementType, result[input.name]
            )
        }
        return result
    }

    /**
     * Prepares database values for form inputs.
     *
     * @param { Object | Array } dataSource - Database data source (ex: patient.value, patient.value.emergencyContacts)
     * @param { String } idKey - Specifies the id format (ex: _id, id or doctorId)
     * @param { Object } template - Selected popup template
     *
     * @returns { Object|Array }
     **/
    const getInputValue = (dataSource, template, idKey = "_id") => {
        if(!template || !template.main || !template.main.inputs || !dataSource) return Array.isArray(dataSource) ? [] : {}

        // Helper to extract values from a object
        const extractFields = (dataObj) => {
            const values = {}

            if(dataObj[idKey] !== undefined){
                values[idKey] = dataObj[idKey]
            }

            for(const input of template.main.inputs){
                const fieldName = input.name
                values[fieldName] = dataObj[fieldName]
            }

            return values
            /*
            return convertFormValues(
                values,
                template,
                (type, value) => unit.getMeasurementUnit(type, value).value
            )
             */
        }

        return Array.isArray(dataSource)
            ? dataSource.map(extractFields)
            : extractFields(dataSource)
    }

    /**
     * Normalizes form values to metric units before persistence.
     *
     * @param { Object } data
     * @param { Object } template
     * @returns { Object }
     */
    const normalizeFormValues = (data, template) => {
        return convertFormValues(data, template,  (type, value) => unit.toMetric(type, value))
    }

    /**
     * Extracts data from a submit event.
     *
     * @param { SubmitEvent } event
     * @returns { Object }
     */
    const extractData = (event) => {
        const formData = new FormData(event.target)
        return Object.fromEntries(formData.entries())
    }

    /**
     *  Executes a database operation and tracks its submission state.
     *
     * @param { () => Promise<Object> } actionCallback - Controller method to access the desired model of the database
     *
     * @return { Promise<Object> } New desired database entity data
     *
     * @example
     * actionCallback: `() => patientController.updatePatient(...)`
     **/
    const executeDBSubmit = async (actionCallback) => {
        isSubmitting.value = true
        formWarning.value = null

        try{
            return await actionCallback()
        }finally{
            isSubmitting.value = false
        }
    }

    // Returns the component associated with an input tag
    const getInputComponent = (tag) => {
        switch (tag) {
            case "input":
                return Input

            case "textarea":
                return TextArea

            case "select":
                return SelectInput

            default:
                return null
        }
    }

    // Returns the props required by an input component
    const getInputProps = (input, popupConfig, templateId, inputValue = null) => {
        if(!templateId) return

        const labelKey = `formPopupTemplates.${templateId}.main.inputs.${input.id}.label`
        const placeholderKey = `formPopupTemplates.${templateId}.main.inputs.${input.id}.placeholder`

        const title = te(labelKey) ? t(labelKey) : ""
        const placeholder = te(placeholderKey) ? t(placeholderKey) : ""

        const currentValue = inputValue ? inputValue[input.name] : null

        switch(input.tag){
            case "input":
                return {
                    label: title,
                    placeholder: placeholder,
                    for: input.for,
                    name: input.name,
                    inputType: input.inputType,
                    autoCapitalize: input.autoCapitalize ?? null,
                    autofocus: true,
                    step: input.step ?? null,
                    min: input.min ?? null,
                    max: input.inputType === "date"
                        ? (input.max ?? date.getToday())
                        : (input.max ?? null),
                    modelValue: currentValue ?? "",
                    translate: "no"
                }

            case "select":
                return {
                    label: title,
                    for: input.for,
                    name: input.name,
                    options: getSelectOptions(input),
                    modelValue: currentValue ?? "",
                    translate: "no",
                    disabled: popupConfig?.value?.readOnly ?? null
                }

            case "textarea":
                return {
                    label: title,
                    placeholder: placeholder,
                    for: input.for,
                    name: input.name,
                    modelValue: currentValue ?? "",
                    translate: "no",
                    readonly: popupConfig?.value?.readOnly ?? null
                }

            default:
                return {}
        }
    }

    // Returns options based in translate data
    const getSelectOptions = (input) => {
        let options = []

        for(const option of input.options){
            options.push({
                placeholder: utils.getOptionTranslate(t(`${input.id}.${option.id}`) ?? ""),
                value: option.value
            })
        }

        return options
    }

    // Returns form button props
    const getBtnProps = (btn, type) => {
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

    return { extractData, executeDBSubmit, isSubmitting, formWarning, getInputValue, normalizeFormValues, convertFormValues, getInputComponent, getInputProps, getSelectOptions, getBtnProps }
}