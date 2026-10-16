import { ref } from "vue"
import { useUnitSystem } from "./useUnitSystem.js"

export function useForm(){
    const isSubmitting = ref(false)
    const formWarning = ref(null)

    const unit = useUnitSystem()

    /**
     * Converts measurement fields according to the provided converter.
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

            if(dataObj[idKey] !== undefined) {
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

    return { extractData, executeDBSubmit, isSubmitting, formWarning, getInputValue, normalizeFormValues, convertFormValues }
}