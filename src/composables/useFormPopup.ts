import { usePopup } from "./usePopup"
import { ref } from "vue"

import { FORM_TYPES } from "../constants/form"
import type { FormRegularTemplate } from "../interfaces/Form"

import type { FormContext } from "../types/formPopup"
import type { FormType, FormValues } from "../types/genericForm"

export function useFormPopup() {
    const popup = usePopup()

    const template = ref<FormRegularTemplate | null>(null) // Represents the desired popup data, based on the select popup template
    const values = ref<FormValues | null>(null) // Represents the value of each input within the popup form
    const context = ref<FormContext | null>(null) // Guide the form behavior when `handleSubmit` is triggered (ex: { sectionId: 'patient', fieldId: 'weight' })
    const type = ref<FormType>(FORM_TYPES.CREATE) // Represents the form type

    /**
     * Opens Form Popup.
     *
     * Cleans old values and fill with the new ones: `nextTemplate`, `nextValues`, and `nextContent`.
     *
     * @param nextTemplate
     * @param nextValues
     * @param nextContext
     * @param nextType
     **/
    const open = (nextTemplate: FormRegularTemplate, nextValues?: FormValues, nextContext?: FormContext, nextType: FormType = FORM_TYPES.CREATE): void => {
        clear()

        template.value = nextTemplate
        values.value = nextValues ?? null
        context.value = nextContext ?? null
        type.value = nextType

        popup.open()
    }

    /**
     * Cleans the old values of the popup
     **/
    const clear = (): void => {
        template.value = null
        values.value = null
        context.value = null
        type.value = FORM_TYPES.CREATE
    }

    /**
     * Closes Form Popup calling the `usePopup.close()` and cleans the old values from the form.
     **/
    const close = (): void => {
        popup.close()
        clear()
    }

    return {
        open,
        clear,
        close,
        template,
        values,
        context,
        type,
        isOpen : popup.isOpen,
        popupRef: popup.popupRef,
        triggerRef: popup.triggerRef
    }
}