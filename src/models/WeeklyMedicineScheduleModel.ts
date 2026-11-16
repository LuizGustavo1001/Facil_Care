import type { Table } from "dexie"
import type { IWeeklyMedicineSchedule } from "../interfaces/IWeeklyMedicineSchedule"
import { useDate } from "../composables/useDate"

// COMPOSABLES
const date = useDate()

export class WeeklyMedicineScheduleModel {
    private readonly table: Table<IWeeklyMedicineSchedule, number>

    public constructor(db: { table: (name: string) => Table<IWeeklyMedicineSchedule, number> }) {
        this.table = db.table("weeklyMedicineSchedules")
    }

    /**
     * Returns all checked administration schedules.
     **/
    public async getAll(): Promise<IWeeklyMedicineSchedule[] | []> {
        return await this.table.toCollection().toArray()
    }

    /**
     * Returns every administration scheduled for the selected weekDay.
     **/
    public async getByWeekDay(weekDay: number = date.getDayNumber()): Promise<IWeeklyMedicineSchedule[] | undefined> {
        return await this.table
            .where("scheduledWeekDay")
            .equals(weekDay)
            .toArray()
    }

    /**
     * Retrieves the administration by:
     * - MedicineId
     * - ScheduledTime
     * - ScheduledWeekDay
     **/
    public async getScheduleItem(medicineId: number, scheduledWeekDay: number, scheduledTime: string): Promise<IWeeklyMedicineSchedule | null> {
        const registry = await this.table
            .where("[medicineId+scheduledWeekDay+scheduledTime]")
            .equals([medicineId, scheduledWeekDay, scheduledTime])
            .first()

        return registry ?? null
    }

    /**
     * Deletes or Checks an administration schedule.
     * - If the schedule registry exists: deletes the registry *(unchecking the checkbox)*
     * - Otherwise: Creates a new registry *(checking the checkbox)*
     **/
    public async toggleAdministration(medicineId: number, scheduledWeekDay: number, scheduledTime: string): Promise<boolean> {
        return this.table.db.transaction("rw", this.table, async() => {
            const registry = await this.getScheduleItem(medicineId, scheduledWeekDay, scheduledTime)

            // 1. Deletes the registry
            if(registry) {
                await this.table.delete(registry._id!)
                return false
            }

            // 2. Creates a new registry
            await this.create(medicineId, scheduledWeekDay, scheduledTime)
            return true
        })
    }

    /**
     * Deletes a checked administration schedule.
     *
     * @returns `TRUE` if deleted, `FALSE` if not deleted.
     **/
    public async deleteBySchedule(medicineId: number, scheduledWeekDay: number, scheduledTime: string): Promise<boolean> {
        const deleted = await this.table
            .where("[medicineId+scheduledWeekDay+scheduledTime]")
            .equals([medicineId, scheduledWeekDay, scheduledTime])
            .delete()

        return deleted > 0
    }

    /**
     * Creates a checked administration schedule.
     *
     * @returns `TRUE` if created
     **/
    public async create(medicineId: number, scheduledWeekDay: number, scheduledTime: string): Promise<boolean> {
        await this.table.add({
            medicineId,
            scheduledWeekDay,
            scheduledTime,
            administeredAt: new Date()
        })

        return true
    }

    /**
     * Verifies if the string that represents the Monday of the current week is not equal to the Monday of the current week.
     * - If equals: nothing happens
     * - If not equals: clears the administration schedule registries.
     **/
    public async clearPreviousWeek(): Promise<void> {
        const today = new Date()
        const lastUpdate = localStorage.getItem("lastUpdateAdminRegistries")

        const day = today.getDate()
        const difference = day === 0
            ? 6
            : day -1

        const monday = new Date(today)
        monday.setDate(today.getDate() - difference)
        monday.setHours(0,0,0,0)

        const currentWeek = monday.toISOString().slice(0, 19)

        if(!lastUpdate) {
            localStorage.setItem("lastUpdateAdminRegistries", currentWeek)
            return
        }

        if(lastUpdate !== currentWeek) {
            await this.table.clear()

            localStorage.setItem("lastUpdateAdminRegistries", currentWeek)
        }
    }
}