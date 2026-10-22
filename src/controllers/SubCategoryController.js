import db from "../database/db.js"

export default class SubCategoryController {
    constructor(Model, codeLabel){
        if(!Model){
            throw new Error("Model class must be provided to SubCategoryController")
        }

        this.model = new Model(db)
        this.codeLabel = codeLabel
    }

    // Returns all sub-category collection.
    async getAll(){
        try {
            const items = await this.model.getAll()

            if(!items.length){
                return {
                    success: false,
                    code: `No${this.codeLabel}Found`,
                    data: []
                }
            }

            return {
                success: true,
                code: `${this.codeLabel}Found`,
                data: items
            }
        }catch(err){
            console.log("DB Error: ", err)
            return {
                success: false,
                code: `DatabaseError`,
                data: []
            }
        }
    }

    async getById(id){
        try{
            const item = await this.model.getById(id)

            if(!item){
                return {
                    success: false,
                    code: `No${this.codeLabel}Found`,
                    data: []
                }
            }

            return{
                success: true,
                code: `${this.codeLabel}Found`,
                data: item
            }
        }catch(err){
            console.log("DB Error: ", err)
            return{
                success: false,
                code: `DatabaseError`,
                data: []
            }
        }
    }

    /**
     * Adds a new sub-category item to the collection based on the selected patient's Id
     *
     * @param { Object } newItem
     * @param { Number } patientId
     **/
    async create(newItem, patientId = 1) {
        try{
            const itemData = {
                ...newItem,
                patientId
            }

            await this.model.create(itemData)
            const updatedData = await this.model.getAll()

            return{
                success: true,
                code: `${this.codeLabel}Created`,
                data: updatedData
            }
        }catch(err){
            console.log("DB Error: ", err)
            return{
                success: false,
                code: `${this.codeLabel}CreationFailed`,
                data: []
            }
        }
    }

    /**
     * Returns the updated sub-category collection after **update** the item that matches the selected `id`.
     *
     * @param { Number } id - Item Id
     * @param { Object } newData - Containing the attributes to be overwritten or updated
     **/
    async update(id, newData){
        try{
            const updated = await this.model.update(id, newData)

            if(!updated) {
                return {
                    success: false,
                    code: `${this.codeLabel}NotFound`,
                    data: []
                }
            }

            const updatedData = await this.model.getAll()

            return {
                success: true,
                code: `${this.codeLabel}Updated`,
                data: updatedData
            }
        }catch(err){
            console.log("DB Error: ", err)

            return{
                success: false,
                code: `${this.codeLabel}UpdateFailed`,
                data: []
            }
        }
    }

    /**
     * Returns the updated sub-category collection after **delete** the item that matches the selected `id`
     *
     * @param { Number } id - Item Id
     **/
    async delete(id){
        try{
            const deleted = await this.model.removeById(id)

            if(!deleted){
                return {
                    success: false,
                    code: `${this.codeLabel}NotFound`,
                    data: []
                }
            }

            const updatedData = await this.model.getAll()

            return {
                success: true,
                code: `${this.codeLabel}Deleted`,
                data: updatedData
            }
        }catch(err){
            return{
                success: false,
                code: `${this.codeLabel}DeleteFailed`,
                data: []
            }
        }
    }
}