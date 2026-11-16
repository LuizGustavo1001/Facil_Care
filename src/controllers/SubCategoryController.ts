import type { IPatientSubCategoryBase } from "../interfaces/IPatientSubCategoryBase"
import {type ControllerResult, fallbackReturn} from "./settings"
import type { Dexie, UpdateSpec } from "dexie"
import { PatientSubCategoryModel } from "../models/PatientSubCategoryModel"

import db from "../database/db.js"

/**
 * Defines the expected constructor contract for patient sub-category models.
 **/
interface PatientSubCategoryModelConstructor<T extends IPatientSubCategoryBase, M extends PatientSubCategoryModel<T>> {
    new (db: Dexie): M
}

/**
 * Defines the data required to create a patient sub-category
 **/
export type PatientSubCategoryInput<T extends IPatientSubCategoryBase> =
    Omit<T, "_id" | "patientId" | "name">

export default abstract class SubCategoryController <T extends IPatientSubCategoryBase, M extends PatientSubCategoryModel<T> = PatientSubCategoryModel<T>> {
    private readonly codeLabel: string
    protected readonly model: M

    protected constructor(Model: PatientSubCategoryModelConstructor<T, M>, codeLabel: string) {
        if (!Model) {
            throw new Error("Model class must be provided to PatientSubCategoryController")
        }

        this.model = new Model(db)
        this.codeLabel = codeLabel
    }

    /**
     * Returns all sub-category items.
     **/
    public async getAll(): Promise<ControllerResult<T[]>> {
        try {
            const items = await this.model.getAll()

            if(items.length === 0) {
                return {
                    success: false,
                    code: `No${this.codeLabel}Found`,
                    data: []
                }
            }

            return {
                success: true,
                code: `${this.codeLabel}Found`,
                data: items
            }
        } catch(err: any) {
            return fallbackReturn(err)
        }
    }

    /**
     * Returns item that matches the selected `ID`
     **/
    public async getById(id: number): Promise<ControllerResult<T>> {
        try {
            const item = await this.model.getById(id)

            if(!item) {
                return {
                    success: false,
                    code: `No${this.codeLabel}Found`,
                    data: null
                }
            }

            return {
                success: true,
                code: `${this.codeLabel}Found`,
                data: item
            }
        } catch(err: any) {
            return fallbackReturn(err, false)
        }
    }

    /**
    * Creates a new sub-category item based on the selected patient `ID`
    **/
    public async create(newItem: PatientSubCategoryInput<T>, patientId: number = 1): Promise<ControllerResult<T>> {
        try {
            const itemData = {
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
     * Updates a item that matches the `ID` from selected sub-category.
     **/
    public async update(itemId: number, newData: UpdateSpec<T>): Promise<ControllerResult<T>> {
        try {
            const updated = await this.model.update(itemId, newData)

            if(!updated) {
                return {
                    success: false,
                    code: `${this.codeLabel}NotFound`,
                    data: null
                }
            }

            return {
                success: true,
                code: `${this.codeLabel}Updated`,
                data: null
            }
        } catch(err: any) {
            return fallbackReturn(err, false)
        }
    }

    /**
     * Deletes a item that matches the `ID` from the selected sub-category
     **/
    public async delete(itemId: number): Promise<ControllerResult<T>> {
        try {
            const deleted = await this.model.deleteById(itemId)

            if(!deleted) {
                return {
                    success: false,
                    code: `${this.codeLabel}NotFound`,
                    data: null
                }
            }

            return {
                success: true,
                code: `${this.codeLabel}Deleted`,
                data: null
            }
        } catch(err: any) {
            return fallbackReturn(err, false)
        }
    }
}