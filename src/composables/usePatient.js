import { ref } from "vue"
import Patients from "../models/Patients.js"


export function usePatient(){
    const patientName = ref('')
    const loading = ref(false)
    const error = ref(null)
    const errorType = ref(null)

    /**
    * @param {String} id - PatientId
    **/
    const fetchPatientName = async (id) => {
        loading.value = true
        error.value = null

        try{
            const result = await Patients.getName(id)
            if(!result){
                error.value     = 'PatientNotFound'
                errorType.value = 'error'
            }
            patientName.value = result
        }catch(err){
            err.value = err.message || 'Database execution error'
        }finally {
            loading.value = false
        }
    }

    return { patientName, loading, error, errorType, fetchPatientName }
}