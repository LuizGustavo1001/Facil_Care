import type { Table } from "dexie"
import type { INotification } from "../interfaces/INotification"

export default class NotificationModel {
    private readonly table: Table<INotification, number>

    constructor(db: { table: (name: string) => Table<INotification, number> }) {
        this.table = db.table("notifications")
    }

    /**
     * Returns all notifications.
     **/
    async getAll(): Promise<INotification[] | undefined> {
        return await this.table
            .toCollection()
            .reverse()
            .toArray()
    }

    /**
     * Marks an notification as `READ` bu the notification `ID`.
     *
     * @returns `TRUE` if the notification has been marked as read. `FALSE` if not found.
     **/
    async markAsRead(id: number, status: boolean = true): Promise<boolean> {
        const notification = await this.table.get(id)

        if(!notification) {
            return false
        }

        await this.table.put({
            ...notification,
            read: status
        })

        return true
    }

    /**
     * Mark all notifications as `READ`.
     **/
    async markAllAsRead(): Promise<boolean> {
        const notifications = await this.getAll()

        if(!notifications) {
            return false
        }

        const updatedNotifications = notifications.map(notification => ({
            ...notification,
            read: true
        }))

        await this.table.bulkPut(updatedNotifications)

        return true
    }

    /**
     * Deletes notifications within 30+ days old interval.
     **/
    async removeOldNotifications(): Promise<boolean> {
        const thirtyDaysAgo = new Date()

        // Calculate 30 days ago date
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

        // Delete old notifications
        await this.table
            .where('dateTime')
            .below(thirtyDaysAgo)
            .delete()

        return true
    }
}