import { WeeklyMedicineAdministrationModel } from "../models/WeeklyMedicineAdministrationModel"
import db from "../database/db"
import {type ControllerResult, fallbackReturn} from "./settings"
import type { IWeeklyMedicineAdministration } from "../interfaces/IWeeklyMedicineAdministration"
import type { IFormattedMedicine, IMedicine } from "../interfaces/IMedicine"
import MedicineController from "./MedicineController"
import { useDate } from "../composables/useDate"

// CONTROLLERS
const medicineController = new MedicineController()

// COMPOSABLES
const date = useDate()

export default class WeeklyMedicineAdministrationController {
    private readonly model: WeeklyMedicineAdministrationModel

    public constructor() {
        this.model = new WeeklyMedicineAdministrationModel(db)
    }

    /**
     * Returns all completed medication administration records
     * stored for the current week.
     **/
    public async getAll(): Promise<ControllerResult<IWeeklyMedicineAdministration[]>> {
        try {
            const result = await this.model.getAll()

            if(result.length === 0) {
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
     * Retrieves all completed medication administrations
     * for the specified weekday.
     *
     * Defaults to the current weekday.
     */
    public async getByWeekDay(weekDay: number = date.getDayNumber()): Promise<ControllerResult<IWeeklyMedicineAdministration[]>> {
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
     * Retrieves a completed medication administration record
     * matching the specified medication, weekday, and scheduled day time.
     */
    public async getAdministration(medicineId: number, scheduleWeekDay: number, scheduledTime: string): Promise<ControllerResult<IWeeklyMedicineAdministration>> {
        try {
            const result = await this.model.getAdministration(medicineId, scheduleWeekDay, scheduledTime)

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
     * Toggles the completion status of a scheduled medication administration.
     *
     * - Deletes the existing record if the administration was already marked as completed.
     * - Prevents marking administrations scheduled for future weekdays as completed.
     * - Creates a new record if the administration has not yet been marked as completed.
     */
    public async toggleStatus(medicineId: number, scheduledWeekDay: number, scheduledTime: string): Promise<ControllerResult<IWeeklyMedicineAdministration>> {
        try {
            const result = await this.model.toggleStatus(medicineId, scheduledWeekDay, scheduledTime)

            // 1. Deletes
            if(result === "delete") {
                return {
                    success: true,
                    code: "MedicineScheduleDeleted",
                    data: null
                }
            }

            // 2. Trying to check a future schedule
            if(result === "future") {
                return {
                    success: false,
                    code: "FutureMedicineSchedule",
                    data: null
                }
            }

            // 3. Creates
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
     * Creates a record indicating that a scheduled medication administration
     * has been completed.
     */
    public async create(medicineId: number, scheduledWeekDay: number, scheduledTime: string): Promise<ControllerResult<IWeeklyMedicineAdministration>> {
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
     * Deletes a completed medication administration record
     * matching the specified medication, weekday, and scheduled time.
     */
    public async delete(medicineId: number, scheduledWeekDay: number, scheduledTime: string): Promise<ControllerResult<IWeeklyMedicineAdministration>> {
        try {
            const result = await this.model.delete(medicineId, scheduledWeekDay, scheduledTime)

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
     * Removes completed medication administration records
     * belonging to previous weeks.
     */
    public async clearPreviousWeek(): Promise<void> {
        try {
            await this.model.clearPreviousWeek()
        } catch (err: any) {
            console.log("[ERROR]: clearPreviousWeek")
        }
    }

    /**
     * Retrieves the medications scheduled for a specific weekday
     * and combines them with their corresponding administration records.
     *
     * Each returned medication entry contains:
     * - The medication information.
     * - Its scheduled weekday and administration time.
     * - The actual administration timestamp, if marked as completed.
     *
     * Results are sorted by scheduled administration time in ascending order
     * by default.
     */
    public async loadDailyMedicinesByDay(selectedDay: number, sortByTime: boolean = true): Promise<IFormattedMedicine[]> {
        try {
            const [medicinesResult, administrationsResult] = await Promise.all([
                medicineController.getByWeekDay(selectedDay),
                this.getByWeekDay(selectedDay)
            ])

            if (!medicinesResult.success || !medicinesResult.data) {
                return []
            }

            const medicines = medicinesResult.data as IMedicine[]
            const administrations = administrationsResult.data ?? []

            const result: IFormattedMedicine[] = medicines.flatMap((medicine) => {
                return medicine.administrationTimes.map((scheduledTime) => {
                    const administration = administrations.find(item =>
                        item.medicineId === medicine._id &&
                        item.scheduledWeekDay === selectedDay &&
                        item.scheduledTime === scheduledTime
                    )

                    return {
                        ...medicine,
                        medicineId: medicine._id!,
                        scheduledWeekDay: selectedDay,
                        scheduledTime,
                        administeredAt: administration?.administeredAt ?? null
                    }
                })
            })

            if (sortByTime) {
                result.sort((a, b) =>
                    a.scheduledTime.localeCompare(b.scheduledTime)
                )
            }

            return result
        } catch (err) {
            console.error("Error loading daily medicines:", err)
            return []
        }
    }
}