import PatientRecordController from "./PatientRecordController"
import type { VitalSign } from "../interfaces/VitalSign"
import { VitalSignModel } from "../models/VitalSignModel"
import type { ControllerResult } from "./settings"
import { VITAL_SIGNS_PAGES } from "../constants/sysPages"
import type { VitalSignType } from "../types/sysPages"

const codeLabel: string = "VitalSign"

export default class VitalSignController extends PatientRecordController<VitalSign> {
    constructor() {
        super(VitalSignModel, codeLabel);
    }

    async create(newItem: VitalSign, recordType: VitalSignType, patientId: number = 1): Promise<ControllerResult<VitalSign>> {
        try {
            if(VITAL_SIGNS_PAGES.includes(recordType)) {
                return await super.create(newItem, recordType, patientId)
            }

            return {
                success: false,
                code: `${codeLabel}NotFound`,
                data: null
            }
        } catch(err) {
            console.log("Database Error: ", err)

            return {
                success: false,
                code: `${codeLabel}CreationFailed`,
                data: null
            }
        }
    }
}