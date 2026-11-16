import { WeeklyMedicineScheduleModel } from "../models/WeeklyMedicineScheduleModel"
import db from "../database/db"
import type { ControllerResult } from "./settings"
import type { WeeklyMedicineSchedule } from "../interfaces/WeeklyMedicineSchedule"
import type {WarningCode} from "../types/components/snackbar"
import type {FormattedMedicine, Medicine} from "../interfaces/Medicine"
import MedicineController from "./MedicineController"

const medicineController = new MedicineController()

export default class WeeklyMedicineScheduleController {
    private readonly model: WeeklyMedicineScheduleModel

    constructor() {
        this.model = new WeeklyMedicineScheduleModel(db)
    }

    public async getAll(): Promise<ControllerResult<WeeklyMedicineSchedule[]>> {
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

    public async getByDay(weekDay: number): Promise<ControllerResult<WeeklyMedicineSchedule[]>> {
        try {
            const result = await this.model.getByDay(weekDay)

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
        } catch (err: any) {
            console.log("DB error: ", err)

            return {
                success: false,
                code: "DatabaseError",
                data: null
            }
        }
    }

    public async getScheduleItem(medicineId: number, scheduleWeekDay: number, scheduledTime: string): Promise<ControllerResult<WeeklyMedicineSchedule>> {
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
        } catch (err: any) {
            console.log("DB error: ", err)

            return {
                success: false,
                code: "DatabaseError",
                data: null
            }
        }
    }

    public async isAdministered(medicineId: number, scheduledWeekDay: number, scheduledTime: string): Promise<boolean> {
        return !!(await this.model.getScheduleItem(medicineId, scheduledWeekDay, scheduledTime))
    }

    public async toggleAdministration(medicineId: number, scheduledWeekDay: number, scheduledTime: string): Promise<ControllerResult<WeeklyMedicineSchedule>> {
        try {
            const result = await this.model.toggleAdministration(medicineId, scheduledWeekDay, scheduledTime)

            return {
                success: true,
                code: null,
                data: null
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

    public async create(medicineId: number, scheduledWeekDay: number, scheduledTime: string): Promise<ControllerResult<WeeklyMedicineSchedule>> {
        try {
            const result = await this.model.create(medicineId, scheduledWeekDay, scheduledTime)

            if(!result) {
                return {
                    success: false,
                    code: "ScheduleNotFound",
                    data: null
                }
            }

            return {
                success: true,
                code: "MedicineScheduleCreated",
                data: null
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

    public async deleteBySchedule(medicineId: number, scheduledWeekDay: number, scheduledTime: string): Promise<ControllerResult<WeeklyMedicineSchedule>> {
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
        } catch (err: any) {
            console.log("DB error: ", err)

            return {
                success: false,
                code: "DatabaseError",
                data: null
            }
        }
    }

    public async clearPreviousWeek(): Promise<void> {
        try {
            await this.model.clearPreviousWeek()
        } catch (err: any) {
            console.log("[ERROR]: clearPreviousWeek")
        }
    }


    /**
     * Returns the array that represents the merge of Medicine + MedicineSchedules.
     *
     * By default, sorts by scheduled administration time *(ascending)*.
     **/
    public async loadDailyMedicinesByDay(selectedDay: number, sortByTime: boolean = true): Promise<FormattedMedicine[] | undefined> {
        try {
            const [medicinesResult, schedulesResult] = await Promise.all([
                medicineController.getByWeekDay(selectedDay),
                this.getByDay(selectedDay)
            ])

            if(!medicinesResult.success || !medicinesResult.data) {
                return []
            }

            const medicines = medicinesResult.data as Medicine[]
            const schedules = schedulesResult.data as WeeklyMedicineSchedule[]

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