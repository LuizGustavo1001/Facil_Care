import BaseController from "./BaseController.js"
import FollowUp from "../models/FollowUp.js"
import VitalSign from "../models/VitalSign.js"

const MODEL_MAP = {
    followUps: FollowUp,
    vitalSigns: VitalSign
}

export default class PatientRecordController extends BaseController {
    constructor(db, model) {
        super()

        const Model = MODEL_MAP[model]

        if(!Model){
            throw new Error(`Invalid patient record model: ${model}`)
        }

        this.model = new Model(db)
    }

    /**
     * Returns all registered data
     **/
    async getAll() {
        return await this.execute(async () => {
            const followUps = await this.model.getAll()

            if(followUps.length <= 0){
                this.setMessage("NoFollowUps")
                return []
            }

            return followUps
        })
    }

    /**
     * Returns by type
     *
     * @param { String } type
     **/
    async getByType(type) {
        return await this.execute(async () => {
            const followUps = await this.model.getByType(type)

            if(followUps.length <= 0){
                this.setMessage("NoFollowUpsByType")
                return []
            }

            return followUps
        })
    }

    /**
     * Returns within the interval [minDate, maxDate]
     *
     * @param { Date } minDate
     * @param { Date } maxDate
     **/
    async getByDate(minDate, maxDate = new Date()) {
        if(minDate > maxDate){
            this.setMessage("InvalidDateInterval")
            return []
        }

        return await this.execute(async () => {
            const followUps = await this.model.getByDate(minDate, maxDate)

            if(followUps.length <= 0){
                this.setMessage("NoFollowUpsByDate")
                return []
            }

            return followUps
        })
    }

    /**
     * Returns based in type and interval [minDate, maxDate]
     *
     * @param { String } type
     * @param { Date } minDate
     * @param { Date } maxDate
     **/
    async getByTypeAndDate(type, minDate, maxDate = new Date()){
        if(minDate > maxDate){
            this.setMessage("InvalidDateInterval")
            return []
        }

        return await this.execute(async () => {
            const followUps = await this.model.getByDate(minDate, maxDate)

            if(followUps.length <= 0){
                this.setMessage("NoFollowUpsByTypeAndDate")
                return []
            }

            return followUps
        })
    }
}