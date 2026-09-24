import BaseController from "./BaseController.js"
import Medicine from "../models/Medicine.js"

export default class MedicinesController extends BaseController {
    constructor(db) {
        super()
        this.model = new Medicine(db)
    }

    /**
     * Returns all medicines registered
     **/
    async getAll(){
        return await this.execute(async () => {
            const medicines = await this.model.getAll()

            if(!medicines){
                this.setMessage("NoMedicinesFound")
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
        })
    }
}