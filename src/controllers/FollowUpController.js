import PatientRecordController from "./PatientRecordController.js"
import FollowUp from "../models/FollowUp.js"

export default class FollowUpController extends PatientRecordController {
    constructor() {
        super(FollowUp, "FollowUp")
    }
}