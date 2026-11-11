import PatientRecordController from "./PatientRecordController"
import type { ControllerResult } from "./settings"
import { FOLLOW_UPS_PAGES } from "../constants/sysPages"
import type { FollowUp } from "../interfaces/FollowUp"
import { FollowUpModel } from "../models/FollowUpModel"
import type { FollowUpType } from "../types/sysPages"

const codeLabel: string = "FollowUp"

export default class FollowUpController extends PatientRecordController<FollowUp> {
    constructor() {
        super(FollowUpModel, codeLabel);
    }

    async create(newItem: FollowUp, recordType: FollowUpType, patientId: number = 1): Promise<ControllerResult<FollowUp>> {
        try {
            if(FOLLOW_UPS_PAGES.includes(recordType)) {
                return await super.create(newItem, recordType, patientId)
            }

            return {
                success: false,
                code: `${codeLabel}NotFound`,
                data: null
            }
        } catch (err) {
            console.log("Database Error: ", err)

            return {
                success: false,
                code: `${codeLabel}CreationFailed`,
                data: null
            }
        }
    }
}