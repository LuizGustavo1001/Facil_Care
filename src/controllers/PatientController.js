import Patient from "../models/Patient.js"
import db from "../database/db.js"

export default class PatientController {
    constructor() {
        this.model = new Patient(db)
    }

    /*
     * Returns the patient collection registered in the database.
     **/
    async getPatient() {
        try{
            const patient = await this.model.getPatient()

            if(!patient){
                return {
                    success: false,
                    code: "PatientNotFound",
                    data: []
                }
            }

            return {
                success: true,
                code: null,
                data: patient
            }
        }catch(error){
            console.log("DB error: ", error)
            return {
                success: false,
                code: "DatabaseError",
                data: []
            }
        }
    }

    /**
     * Returns the new patient collection after updating the collection with the new data.
     **/
    async updatePatientData(newData, field){
        try{


        }catch(error){
            console.log("DB error: ", error)
            return {
                success: false,
                code: "DatabaseError",
                data: []
            }
        }
    }

    /**
     * Updates patient root attributes (ex: name, birthDate, ...)
     *
     * @param { Object } newData - Clean object with the attributes to be updated
     **/
    async updatePatientRoot(newData){
        try{
            const dbPatient = await this.model.getPatient()

            if(!dbPatient){
                return {
                    success: false,
                    code: "PatientNotFound",
                    data: []
                }
            }

            await this.model.updatePatient(newData)

            const patient = await this.model.getPatient()

            return {
                success: true,
                code: "PatientUpdated",
                data: patient
            }
        }catch(error){
            console.log("DB error: ", error)
            return {
                success: false,
                code: "DatabaseError",
                data: []
            }
        }
    }

    /**
     * Returns the new patient collection after updating the collection with the new data.
     *
     * @param { String } sectionId - Subcollection `id`
     * @param { String } itemId - Subcollection item `id`
     * @param { String } idKey - Subcollection item `id` label
     * @param { Object } itemData - Contains the attributes to be overwritten or updated
     **/
    async updatePatientSectionItem(sectionId, itemId, idKey, itemData) {
        try{
            const dbPatient = await this.model.getPatient()

            if(!dbPatient){
                return {
                    success: false,
                    code: "PatientNotFound",
                    data: []
                }
            }

            // Stores the selected section (allergies, doctors, ...)
            const currentArray = dbPatient[sectionId] || []

            // Mapping to update just the selected item
            const updatedArray = currentArray.map(item =>
                item[idKey] === itemId ? { ...item, ...itemData } : item
            )

            // Mounting the object property
            const newData = { [sectionId]: updatedArray }

            await this.model.updatePatient(newData)

            // Updated patient data
            const patient = await this.model.getPatient()

            return {
                success: true,
                code: "PatientUpdated",
                data: patient
            }
        }catch(error){
            console.log("DB error: ", error)
            return {
                success: false,
                code: "DatabaseError",
                data: []
            }
        }
    }

    /**
     * Returns the new patient collection after the removing the selected item from the collection (Patient).
     *
     * @param { String } sectionId - Subcollection `id`
     * @param { String } itemId - Subcollection item `id`
     * @param { String } idKey - Subcollection item `id` label
     **/
    async removePatientSectionItem(sectionId, itemId, idKey){
        try{
            const dbPatient = await this.model.getPatient()

            if(!dbPatient){
                return {
                    success: false,
                    code: "PatientNotFound",
                    data: []
                }
            }

            // Stores the selected section (allergies, doctors, ...)
            const currentArray = dbPatient[sectionId] || []

            // Mapping to remove just the select item
            const updatedArray = currentArray.filter(item => item[idKey] !== itemId)

            // Mounting the object property
            const newData = { [sectionId]: updatedArray }

            const removed = await this.model.removeFromSubCategory(newData)

            if(!removed){
                return {
                    success: false,
                    code: "RecordNotFound",
                    data: []
                }
            }

            // Updated patient data
            const patient = await this.model.getPatient()

            return {
                success: true,
                code: "RecordRemoved",
                data: patient
            }
        }catch(error){
            console.log("DB error: ", error)
            return {
                success: false,
                code: "DatabaseError",
                data: []
            }
        }
    }
}