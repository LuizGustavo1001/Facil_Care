import PatientRecordController from "./PatientRecordController"
import type { IVitalSign } from "../interfaces/IVitalSign"
import { VitalSignModel } from "../models/VitalSignModel"
import {type ControllerResult, fallbackReturn} from "./settings"
import { VITAL_SIGNS_PAGES } from "../constants/sysPages"
import type { VitalSignType } from "../types/sysPages"

const codeLabel: string = "IVitalSign"

export default class VitalSignController extends PatientRecordController<IVitalSign> {
    public constructor() {
        super(VitalSignModel, codeLabel);
    }

    public async create(newItem: IVitalSign, recordType: VitalSignType, patientId: number = 1): Promise<ControllerResult<IVitalSign>> {
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
            return fallbackReturn(err, false, `${codeLabel}CreationFailed`)
        }
    }
}