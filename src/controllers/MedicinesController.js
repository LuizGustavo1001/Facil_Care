import Medicine from "../models/Medicine.js"
import db from "../database/db.js"

export default class MedicinesController {
    constructor() {
        this.model = new Medicine(db)
    }

    /**
     * Returns all medicines registered in the database.
     **/
    async getAll(){
        try{
            const medicines = await this.model.getAll()

            if(!medicines){
                return {
                    success: false,
                    code: "NoMedicinesFound",
                    data: []
                }
            }

            return {
                success: true,
                code: null,
                data: medicines
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
     * Returns the new medicine collection after removing an medicine by the `id`
     *
     * @param { String } id - Selected medicine `id`
     **/
    async removeById(id){
        try {
            const removed = await this.model.removeById(id)

            if(!removed){
                return {
                    success: false,
                    code: "NoMedicinesFound",
                    data: []
                }
            }

            const medicines = await this.model.getAll()

            return {
                success: true,
                code: "MedicineDeleted",
                data: medicines
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
     * Returns the new medicine collection after updating.
     *
     * @param { Object } newData - Containing the attributes to be overwritten or updated
     * @param { String } medicineId - Id of the medicine to be updated
     **/
    async updateMedicineData(newData, medicineId) {
        try{
            const medicines = await this.model.updateMedicine(newData, medicineId)

            if(!medicines){
                return {
                    success: false,
                    code: "MedicineNotFound",
                    data: []
                }
            }

            return {
                success: true,
                code: "MedicineUpdated",
                data: medicines
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