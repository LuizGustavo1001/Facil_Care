import { WeeklyMedicineScheduleModel } from "../models/WeeklyMedicineScheduleModel"
import db from "../database/db"
import {type ControllerResult, fallbackReturn} from "./settings"
import type { IWeeklyMedicineSchedule } from "../interfaces/IWeeklyMedicineSchedule"
import type { FormattedMedicine, IMedicine } from "../interfaces/IMedicine"
import MedicineController from "./MedicineController"
import { useDate } from "../composables/useDate"

// CONTROLLERS
const medicineController = new MedicineController()

// COMPOSABLES
const date = useDate()

export default class WeeklyMedicineScheduleController {
    private readonly model: WeeklyMedicineScheduleModel

    public constructor() {
        this.model = new WeeklyMedicineScheduleModel(db)
    }

    /**
     * Returns all checked administration schedules.
     **/
    public async getAll(): Promise<ControllerResult<IWeeklyMedicineSchedule[]>> {
        try {
            const result = await this.model.getAll()

            if(!result) {
                return {
                    success: false,
                    code: "MedicineScheduleEmpty",
                    data: null
                }
            }

            return {
                success: true,
                code: null,
                data: result
            }
        } catch (err: any) {
            console.log("DB error: ", err)

            return {
                success: false,
                code: "DatabaseError",
                data: null
            }
        }
    }

    /**
     * Returns every administration scheduled for the selected weekDay.
     *
     * By default, uses the current weekDay.
     **/
    public async getByWeekDay(weekDay: number = date.getDayNumber()): Promise<ControllerResult<IWeeklyMedicineSchedule[]>> {
        try {
            const result = await this.model.getByWeekDay(weekDay)

            if(!result) {
                return {
                    success: false,
                    code: "NoMedicineScheduleBySelectedDay",
                    data: []
                }
            }

            return {
                success: true,
                code: "MedicineScheduleFound",
                data: result
            }
        } catch(err: any) {
            return fallbackReturn(err, false)
        }
    }

    /**
     * Returns an especific administration schedule.
     **/
    public async getScheduleItem(medicineId: number, scheduleWeekDay: number, scheduledTime: string): Promise<ControllerResult<IWeeklyMedicineSchedule>> {
        try {
            const result = await this.model.getScheduleItem(medicineId, scheduleWeekDay, scheduledTime)

            if(!result) {
                return {
                    success: false,
                    code: "MedicineScheduleNotFound",
                    data: null
                }
            }

            return {
                success: true,
                code: "MedicineScheduleFound",
                data: result
            }
        } catch(err: any) {
            return fallbackReturn(err, false)
        }
    }

    /**
     * Deletes or Checks an administration schedule.
     **/
    public async toggleAdministration(medicineId: number, scheduledWeekDay: number, scheduledTime: string): Promise<ControllerResult<IWeeklyMedicineSchedule>> {
        try {
            const result = await this.model.toggleAdministration(medicineId, scheduledWeekDay, scheduledTime)

            // 1. Deletes
            if(!result) {
                return {
                    success: true,
                    code: "MedicineScheduleDeleted",
                    data: null
                }
            }

            // 2. Creates
            return {
                success: true,
                code: "MedicineScheduleCreated",
                data: null
            }
        } catch(err: any) {
            return fallbackReturn(err, false)
        }
    }

    /**
     * Creates a new register that represents a checked administration schedule.
     **/
    public async create(medicineId: number, scheduledWeekDay: number, scheduledTime: string): Promise<ControllerResult<IWeeklyMedicineSchedule>> {
        try {
            const result = await this.model.create(medicineId, scheduledWeekDay, scheduledTime)

            if(!result) {
                return {
                    success: false,
                    code: "MedicineScheduleNotFound",
                    data: null
                }
            }

            return {
                success: true,
                code: "MedicineScheduleCreated",
                data: null
            }
        } catch(err: any) {
            return fallbackReturn(err, false)
        }
    }

    /**
     * Deletes a checked administration schedule.
     **/
    public async deleteBySchedule(medicineId: number, scheduledWeekDay: number, scheduledTime: string): Promise<ControllerResult<IWeeklyMedicineSchedule>> {
        try {
            const result = await this.model.deleteBySchedule(medicineId, scheduledWeekDay, scheduledTime)

            if(!result) {
                return {
                    success: false,
                    code: "ScheduleNotFound",
                    data: null
                }
            }

            return {
                success: true,
                code: "MedicineScheduleDeleted",
                data: null
            }
        } catch(err: any) {
            return fallbackReturn(err, false)
        }
    }

    /**
     * Clears the previous week administration schedules.
     **/
    public async clearPreviousWeek(): Promise<void> {
        try {
            await this.model.clearPreviousWeek()
        } catch (err: any) {
            console.log("[ERROR]: clearPreviousWeek")
        }
    }

    /**
     * Returns the array that represents the merge of `IMedicine + MedicineSchedules`.
     *
     * By default, sorts by scheduled administration time *(ascending)*.
     **/
    public async loadDailyMedicinesByDay(selectedDay: number, sortByTime: boolean = true): Promise<FormattedMedicine[] | undefined> {
        try {
            const [medicinesResult, schedulesResult] = await Promise.all([
                medicineController.getByWeekDay(selectedDay),
                this.getByWeekDay(selectedDay)
            ])

            if(!medicinesResult.success || !medicinesResult.data) {
                return []
            }

            const medicines = medicinesResult.data as IMedicine[]
            const schedules = schedulesResult.data as IWeeklyMedicineSchedule[]

            // Merging medicines and schedules
            if(schedulesResult.success || schedulesResult.data) {
                const result: FormattedMedicine[] = medicines
                    .flatMap((medicine): FormattedMedicine[] => {
                        return medicine.administrationTimes.map(scheduledTime => {
                            const schedule = schedules.find(item =>
                                item.medicineId === medicine._id &&
                                item.scheduledWeekDay === selectedDay &&
                                item.scheduledTime === scheduledTime
                            )

                            return {
                                ...medicine,
                                medicineId: medicine._id!,
                                scheduledWeekDay: selectedDay,
                                scheduledTime,
                                administeredAt: schedule?.administeredAt ?? null
                            }
                        })
                    })

                if(sortByTime) {
                    result.sort((a, b) =>
                        a.scheduledTime.localeCompare(b.scheduledTime)
                    )
                }

                return result
            }
        } catch(err) {
            console.error("Error loading daily medicines:", err)
            return []
        }
    }
}