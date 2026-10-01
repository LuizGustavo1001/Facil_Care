import { ref } from "vue"

/**
 * isSubmitting: Represents the form state
 * formWarning: Represents the warning sended when database query finishes / fails
 **/

export function useForm(){
    const isSubmitting = ref(false) // loading
    const formWarning = ref(null)

    /**
    * Extracts form data from a **`submit` event**
     *
     * @param { event } event - Event triggered data *(submit event)*
     *
     * @return { Object } - Object representing the form data *(ex: { patientName: "name" })*
    **/
    const extractFormData = (event) => {
        const formData = new FormData(event.target)
        return Object.fromEntries(formData.entries())
    }

    /**
     * Executes a database query based in the specified `actionCallback`
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

        const result = await actionCallback()

        isSubmitting.value = false

        return result
    }

    return { extractFormData, executeDBSubmit, isSubmitting, formWarning}
}