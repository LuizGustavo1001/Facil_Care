import { usePopup } from "./usePopup.js"
import { ref } from "vue"

export function useFormPopup() {
    const popup = usePopup()

    const template = ref(null) // Represents the desired popup data, based on the select popup template
    const values = ref(null) // Represents the value of each input within the popup form
    const context = ref(null) // Guide the form behavior when `handleSubmit` is triggered (ex: { sectionId: 'patient', fieldId: 'weight' })

    /**
     * Opens Form Popup.
     *
     * Cleans old values and fill with the new ones: `nextTemplate`, `nextValues`, and `nextContent`.
     *
     * @param { Object } nextTemplate
     * @param { Object } nextValues
     * @param { Object } nextContext
     **/
    const open = (nextTemplate, nextValues = null, nextContext = null) => {
        clear()

        template.value = nextTemplate
        values.value = nextValues
        context.value = nextContext

        popup.open()
    }

    /**
     * Cleans the old values of the popup
     **/
    const clear = () => {
        template.value = null
        values.value = null
        context.value = null
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
        isOpen : popup.isOpen,
        popupRef: popup.popupRef,
        triggerRef: popup.triggerRef
    }
}