import PatientRecordController from "./PatientRecordController.js"
import FollowUp from "../models/FollowUp.js"
import { FOLLOW_UPS_PAGES } from "../composables/usePages.js"

const codeLabel = "FollowUp"

export default class FollowUpController extends PatientRecordController {
    constructor() {
        super(FollowUp, codeLabel)
    }

    async create (newItem, recordType, patientId = 1){
        if(FOLLOW_UPS_PAGES.includes(recordType)){
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