import PatientRecordController from "./PatientRecordController.js"
import VitalSign from "../models/VitalSign.js"
import { VITAL_SIGNS_PAGES } from "../composables/usePages.js"

const codeLabel = "VitalSign"

export default class VitalSignController extends PatientRecordController {
    constructor() {
        super(VitalSign, codeLabel)
    }

    async create (newItem, recordType, patientId = 1){
        if(VITAL_SIGNS_PAGES.includes(recordType)){
            try{
                return await super.create(newItem, recordType, patientId)
            }catch(err){
                console.log("Database Error: ", err)
                return{
                    success: false,
                    code: `${codeLabel}CreationFailed`,
                    data: []
                }
            }
        }
    }
}