import PatientRecordController from "./PatientRecordController"
import {type ControllerResult, fallbackReturn} from "./settings"
import { FOLLOW_UPS_PAGES } from "../constants/sysPages"
import type { IFollowUp } from "../interfaces/IFollowUp"
import { FollowUpModel } from "../models/FollowUpModel"
import type { FollowUpType } from "../types/sysPages"

const codeLabel: string = "IFollowUp"

export default class FollowUpController extends PatientRecordController<IFollowUp> {
    public constructor() {
        super(FollowUpModel, codeLabel);
    }

    public async create(newItem: IFollowUp, recordType: FollowUpType, patientId: number = 1): Promise<ControllerResult<IFollowUp>> {
        try {
            if(FOLLOW_UPS_PAGES.includes(recordType)) {
                return await super.create(newItem, recordType, patientId)
            }

            return {
                success: false,
                code: `${codeLabel}NotFound`,
                data: null
            }
        } catch(err: any) {
            return fallbackReturn(err, false, `${codeLabel}CreationFailed`)
        }
    }
}