import { usePopup } from "./usePopup.js"
import { ref } from "vue"
import { FORM_TYPES } from "./useForm.js"

export function useFormPopup() {
    const popup = usePopup()

    const template = ref(null) // Represents the desired popup data, based on the select popup template
    const values = ref(null) // Represents the value of each input within the popup form
    const context = ref(null) // Guide the form behavior when `handleSubmit` is triggered (ex: { sectionId: 'patient', fieldId: 'weight' })
    const type = ref(FORM_TYPES.CREATE) // Represents the form type

    /**
     * Opens Form Popup.
     *
     * Cleans old values and fill with the new ones: `nextTemplate`, `nextValues`, and `nextContent`.
     *
     * @param { Object } nextTemplate
     * @param { Object } nextValues
     * @param { Object } nextContext
     * @param { String } nextType
     **/
    const open = (nextTemplate, nextValues = null, nextContext = null, nextType = FORM_TYPES.CREATE) => {
        clear()

        template.value = nextTemplate
        values.value = nextValues
        context.value = nextContext
        type.value = nextType

        popup.open()
    }

    /**
     * Cleans the old values of the popup
     **/
    const clear = () => {
        template.value = null
        values.value = null
        context.value = null
        type.value = FORM_TYPES.CREATE
    }

    /**
     * Closes Form Popup calling the `usePopup.close()` and cleans the old values from the form.
     **/
    const close = () => {
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