import { ref } from "vue"

/**
 * isSubmitting: Represents the form state
 * formWarning: Represents the warning sended when database query finishes / fails
 **/

export function useForm(){
    const isSubmitting = ref(false) // loading
    const formWarning = ref(null)

    /**
     * Defines the input `value` based in the database data of the input.
     *
     * @param { Object | Array } dataSource - Database data source (ex: patient.value, patient.value.emergencyContacts)
     * @param { String } idKey - Specifies the id format (ex: _id, id or doctorId)
     * @param { Object } template - Selected popup template
     **/
    const getInputValue = (dataSource, template, idKey = "_id") => {
        if(!template || !template.main || !template.main.inputs || !dataSource) return Array.isArray(dataSource) ? [] : {}

        // Helper to extract values from a object
        const extractFields = (dataObj) => {
            const values = {}

            if(dataObj[idKey] !== undefined) {
                values[idKey] = dataObj[idKey]
            }

            for(const input of template.main.inputs){
                const fieldName = input.name
                values[fieldName] = dataObj[fieldName]
            }

            return values
        }

        // Handle Array data source
        if(Array.isArray(dataSource)) {
            return dataSource.map(item => extractFields(item))
        }

        // Handle Object data source
        return extractFields(dataSource)
    }

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

    return { extractFormData, executeDBSubmit, isSubmitting, formWarning, getInputValue}
}