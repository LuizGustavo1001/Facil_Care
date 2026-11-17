import type { Table } from "dexie"
import type { IWeeklyMedicineAdministration } from "../interfaces/IWeeklyMedicineAdministration"
import { useDate } from "../composables/useDate"

// COMPOSABLES
const date = useDate()

/**
 * Manages weekly records of completed medication administrations.
 *
 * Only administrations explicitly marked as completed are stored.
 *
 * Records are automatically cleared when a new week begins.
 **/
export class WeeklyMedicineAdministrationModel {
    private readonly table: Table<IWeeklyMedicineAdministration, number>

    public constructor(db: { table: (name: string) => Table<IWeeklyMedicineAdministration, number> }) {
        this.table = db.table("weeklyMedicineAdministrations")
    }

    /**
     * Retrieves all medication administration records stored for the
     * current week.
     **/
    public async getAll(): Promise<IWeeklyMedicineAdministration[] | []> {
        return await this.table.toCollection().toArray()
    }

    /**
     * Returns all medication administration records stored for the
     * specified weekday.
     *
     * By default, uses the `current weekday`.
     **/
    public async getByWeekDay(weekDay: number = date.getDayNumber()): Promise<IWeeklyMedicineAdministration[] | undefined> {
        return await this.table
            .where("scheduledWeekDay")
            .equals(weekDay)
            .toArray()
    }

    /**
     * Returns a completed administration record matching the specified
     * medication, scheduled weekday, and scheduled day time.
     **/
    public async getAdministration(medicineId: number, scheduledWeekDay: number, scheduledTime: string): Promise<IWeeklyMedicineAdministration | null> {
        const administration = await this.table
            .where("[medicineId+scheduledWeekDay+scheduledTime]")
            .equals([medicineId, scheduledWeekDay, scheduledTime])
            .first()

        return administration ?? null
    }

    /**
     * Toggles the completion status of a scheduled medication administration.
     * - If a administration record **exists**: it is deleted.
     * - If the scheduled administration is in the **future**: no changes are made.
     * - **Otherwise**, a new completed administration record is created
     *
     * @returns
     * - `delete` if an existing record was removed.
     * - `future` if the administration is scheduled for a future weekday.
     * - `createAdministration` if a new record was successfully created.
     **/
    public async toggleStatus(medicineId: number, scheduledWeekDay: number, scheduledTime: string): Promise<string> {
        return this.table.db.transaction("rw", this.table, async() => {
            const registry = await this.getAdministration(medicineId, scheduledWeekDay, scheduledTime)

            // 1. Deletes the registry
            if(registry) {
                await this.table.delete(registry._id!)
                return "delete"
            }

            // 2. Can't mark as checked a future scheduled
            if(scheduledWeekDay > date.getDayNumber()) {
                return "future"
            }

            // 3. Creates a new registry
            await this.create(medicineId, scheduledWeekDay, scheduledTime)
            return "create"
        })
    }

    /**
     * Deletes a completed administration record matching the specified
     * medication, scheduled weekday, and scheduled day time.
     *
     * @returns `TRUE` if deleted; `FALSE` otherwise.
     **/
    public async delete(medicineId: number, scheduledWeekDay: number, scheduledTime: string): Promise<boolean> {
        const deleted = await this.table
            .where("[medicineId+scheduledWeekDay+scheduledTime]")
            .equals([medicineId, scheduledWeekDay, scheduledTime])
            .delete()

        return deleted > 0
    }

    /**
     * Creates a record indicating that a scheduled medication administration
     * has been completed.
     *
     * The actual administration date and time are stored in `administeredAt`.
     *
     * @returns `TRUE` if the record was successfully created.
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
     * Removes administration records from previous weeks.
     *
     * Compares the Monday of the current week against the last recorded
     * cleanup date.
     * - If the week has changed, all previous administration
     * records are deleted and the current week's date is saved.
     *
     * If no previous cleanup date exists, initializes the tracking value
     * without deleting existing records.
     */
    public async clearPreviousWeek(): Promise<void> {
        const today = new Date()
        const lastUpdate = localStorage.getItem("lastUpdateAdminRegistries")

        const difference = (today.getDay() + 6) % 7

        const monday = new Date(today)
        monday.setDate(today.getDate() - difference)
        monday.setHours(0, 0, 0, 0)

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