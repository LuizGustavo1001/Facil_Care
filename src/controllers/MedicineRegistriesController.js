import db from "../database/db.js"
import MedicineRegistry from "../models/MedicineRegistry.js"

export default class MedicinesController {
    constructor(){
        this.model = new MedicineRegistry(db)
    }

    /**
     * Returns all medicines registries in the database.
     **/
    async getAll(){
        try{
            const medicines = await this.model.getAll()

            if(!medicines){
                return {
                    success: false,
                    code: "NoMedicineRegistryFound",
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
     * Returns the new medicine registries collection after removing an medicine by the `id`
     *
     * @param { String } id - Selected medicine `id`
     **/
    async removeById(id){
        try {
            const removed = await this.model.removeById(id)

            if(!removed){
                return {
                    success: false,
                    code: "NoMedicineRegistryFound",
                    data: []
                }
            }

            const medicines = await this.model.getAll()

            return {
                success: true,
                code: "MedicineRegistryDeleted",
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
     * Returns the new medicine registries collection after updating.
     *
     * @param { Object } newData - Containing the attributes to be overwritten or updated
     * @param { String } medicineId - Id of the medicine to be updated
     **/
    async updateData(newData, medicineId) {
        try{
            const medicines = await this.model.updateRegistry(newData, medicineId)

            if(!medicines){
                return {
                    success: false,
                    code: "MedicineRegistryNotFound",
                    data: []
                }
            }

            return {
                success: true,
                code: "RegistryUpdated",
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