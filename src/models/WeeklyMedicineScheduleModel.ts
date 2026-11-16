import type { Table } from "dexie"
import type { WeeklyMedicineSchedule } from "../interfaces/WeeklyMedicineSchedule"
import {useDate} from "../composables/useDate";

const date = useDate()

export class WeeklyMedicineScheduleModel {
    private readonly table: Table<WeeklyMedicineSchedule, number>

    constructor(db: { table: (name: string) => Table<WeeklyMedicineSchedule, number> }) {
        this.table = db.table("weeklyMedicineSchedules")
    }

    public async getAll(): Promise<WeeklyMedicineSchedule[] | []> {
        return await this.table.toCollection().toArray()
    }

    public async getByDay(weekDay: number = date.getDayNumber()): Promise<WeeklyMedicineSchedule[] | undefined> {
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
    async getScheduleItem(medicineId: number, scheduledWeekDay: number, scheduledTime: string): Promise<WeeklyMedicineSchedule | null> {
        const registry = await this.table
            .where("[medicineId+scheduledWeekDay+scheduledTime]")
            .equals([medicineId, scheduledWeekDay, scheduledTime])
            .first()

        return registry ?? null
    }

    async toggleAdministration(medicineId: number, scheduledWeekDay: number, scheduledTime: string): Promise<boolean> {
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

    async deleteBySchedule(medicineId: number, scheduledWeekDay: number, scheduledTime: string): Promise<boolean> {
        const deleted = await this.table
            .where("[medicineId+scheduledWeekDay+scheduledTime]")
            .equals([medicineId, scheduledWeekDay, scheduledTime])
            .delete()

        return deleted > 0
    }

    async create(medicineId: number, scheduledWeekDay: number, scheduledTime: string): Promise<boolean> {
        await this.table.add({
            medicineId,
            scheduledWeekDay,
            scheduledTime,
            administeredAt: new Date()
        })

        return true
    }

    /**
     * Verifies if the string that represents the Monday of the current week is not equal to the Monday of the current week
     **/
    async clearPreviousWeek(): Promise<void> {
        const today = new Date()
        const lastUpdate = localStorage.getItem("lastUpdateAdminRegistries")

        const day = today.getDate()
        const difference = day === 0 ? 6 : day -1

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