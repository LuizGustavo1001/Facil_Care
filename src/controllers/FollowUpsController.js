import PatientRecordController from "./PatientRecordController.js"
import FollowUp from "../models/FollowUp.js"

export default class FollowUpsController extends PatientRecordController {
    constructor(db) {
        super(db, FollowUp)
    }
}