import type PatientRecordModel from "../models/PatientRecordModel"
import type { IPatientRecordBase } from "../interfaces/IPatientRecordBase"
import {type ControllerResult, fallbackReturn} from "./settings"
import type { Dexie, UpdateSpec } from "dexie"

import db from "../database/db.js"

import { isImperial, useUnitSystem } from "../composables/useUnitSystem"
import { TRANSLATABLE_ITEMS } from "../constants/sysUnits"

import type { MonitoringType } from "../types/sysPages"
import type { TranslatableUnitItem } from "../types/sysUnits"

/**
 * Defines the expected constructor contract for patient record models.
 **/
interface PatientRecordModelConstructor<T extends IPatientRecordBase> {
    new (db: Dexie): PatientRecordModel<T>
}

/**
 * Defines the data required to create a patient record
 **/
type PatientRecordInput<T extends IPatientRecordBase> =
    Omit<T, "_id" | "record" | "patientId"> & { value?: string }

/**
 * Prevents updates to the primary key and record type.
 */
type PatientRecordUpdate<T extends IPatientRecordBase> =
    UpdateSpec<T> & {
    _id?: never
    record?: never
}

// COMPOSABLES
const unit = useUnitSystem()

export default abstract class PatientRecordController <T extends IPatientRecordBase> {
    private readonly model: PatientRecordModel<T>
    private readonly codeLabel: string

    protected constructor(Model: PatientRecordModelConstructor<T>, codeLabel: string) {
        if(!Model) {
            throw new Error("Model class must be provided to PatientRecordController")
        }

        this.model = new Model(db)
        this.codeLabel = codeLabel
    }

    /**
     * Checks whether the supplied date interval is valid
     **/
    private isValidDateInterval(minDate: Date, maxDate: Date): boolean {
        return(
            minDate instanceof Date &&
            maxDate instanceof Date &&
            !Number.isNaN(minDate.getTime()) &&
            !Number.isNaN(maxDate.getTime()) &&
            minDate <= maxDate
        )
    }

    /**
     * Returns all data from the collection.
     **/
    public async getAll(): Promise<ControllerResult<T[]>> {
        try {
            const records = await this.model.getAll()

            if(records.length === 0) {
                return {
                    success: false,
                    code: `No${this.codeLabel}Found`,
                    data: []
                }
            }

            return {
                success: true,
                code: null,
                data: records
            }

        } catch(err: any) {
            return fallbackReturn(err)
        }
    }

    /**
     * Returns record matching the selected record type
     **/
    public async getByField(field: T["record"]): Promise<ControllerResult<T[]>> {
        try {
            const records = await this.model.getByField(field)

            if(records.length === 0) {
                return {
                    success: false,
                    code: `No${this.codeLabel}ByField`,
                    data: []
                }
            }

            return {
                success: true,
                code: null,
                data: records
            }
        } catch(err: any) {
            return fallbackReturn(err)
        }
    }

    /**
     * Returns records within the specified date interval
     **/
    public async getByDate(minDate: Date, maxDate: Date = new Date()): Promise<ControllerResult<T[]>> {
        if(!this.isValidDateInterval(minDate, maxDate)) {
            return {
                success: false,
                code: "InvalidDateInterval",
                data: []
            }
        }

        try {
            const records = await this.model.getByDate(minDate, maxDate)

            if(records.length === 0) {
                return {
                    success: false,
                    code: `No${this.codeLabel}ByDate`,
                    data: []
                }
            }

            return {
                success: true,
                code: null,
                data: records
            }
        } catch(err: any) {
            return fallbackReturn(err)
        }
    }

    /**
     * Returns records matching the selected type and date interval
     **/
    public async getByFieldAndDate(field: string, minDate: Date, maxDate: Date = new Date()): Promise<ControllerResult<T[]>> {
        if(!this.isValidDateInterval(minDate, maxDate)) {
            return {
                success: false,
                code: "InvalidDateInterval",
                data: []
            }
        }

        try {
            const records = await this.model.getByFieldAndDate(field, minDate, maxDate)

            if(records.length === 0) {
                return {
                    success: false,
                    code: `No${this.codeLabel}ByFieldAndDate`,
                    data: []
                }
            }

            return {
                success: true,
                code: null,
                data: records
            }
        } catch(err: any) {
            return fallbackReturn(err)
        }
    }

    /**
    * Creates a new patient record.
    **/
    public async create(newItem: PatientRecordInput<T>, recordType: MonitoringType, patientId: number = 1): Promise<ControllerResult<T>> {
        let itemValue: string | number = newItem.value

        // Convert measurements back to the metric system
        if(isImperial && TRANSLATABLE_ITEMS.includes(recordType as TranslatableUnitItem) && itemValue) {
            newItem.value = <string>unit.toMetric(recordType, itemValue)
        }

        try {
            const itemData = {
                record: recordType,
                ...newItem,
                patientId
            } as T

            await this.model.create(itemData)

            return {
                success: true,
                code: `${this.codeLabel}Created`,
                data: null
            }
        } catch(err: any) {
            return fallbackReturn(err, false)
        }
    }

    /**
     * Updates an existing patient record
     **/
    public async update(newData: PatientRecordUpdate<T>, recordId: number): Promise<ControllerResult<T[]>> {
        try {
            const updated = await this.model.update(newData, recordId)

            if(!updated) {
                return {
                    success: false,
                    code: `${this.codeLabel}NotFound`,
                    data: []
                }
            }

            return  {
                success: true,
                code: `${this.codeLabel}Updated`,
                data: []
            }
        } catch(err: any) {
            return fallbackReturn(err, false, `${this.codeLabel}UpdateFailed`)
        }
    }

    /**
     * Deletes an existing patient record
     **/
    public async delete(id: number): Promise<ControllerResult<T[]>> {
        try {
            const removed = await this.model.removeById(id)

            if(!removed) {
                return {
                    success: false,
                    code: `${this.codeLabel}NotFound`,
                    data: []
                }
            }

            return {
                success: true,
                code: `${this.codeLabel}Deleted`,
                data: []
            }
        } catch(err: any) {
            return fallbackReturn(err, false, `${this.codeLabel}DeleteFailed`)
        }
    }
}
