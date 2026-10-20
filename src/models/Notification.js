export default class Notification {
    /**
     * @param { Object } db - Dexie database instance.
     **/
    constructor(db){
        this.table = db.table('notifications')
    }

    /**
     * Returns all notifications from the collection.
     *
     * @returns { Promise<Array<Object>> } All notifications from the collection.
     **/
    async getAll(){
        return await this.table
            .toCollection()
            .toArray()
    }

    /**
     * Marks an notification as "read" by the notification `id` in the database.
     *
     * @param { String } id - Notification id.
     * @param { boolean } status - `true` = read, and `false` = nonread.
     *
     * @returns { Promise<Array<Object>|boolean> } All notifications after updates or an empty `array` if the notifications does not exists.
     *
     * @throws { Error } If a database operation fails.
     **/
    async markAsRead(id, status = true){
        const notification = await this.table.get(id)

        if(!notification){
            return false
        }

        await this.table.put({
            ...notification,
            read: status
        })

        return await this.getAll()
    }

    /**
     * Marks all notifications in the collection as "read" in the database.
     *
     * @returns { Promise<Array<Object>|boolean> }  All notifications after updates or an empty `array` if the notifications does not exists.
     *
     * @throws {Error} If a database operation fails.
     **/
    async markAllAsRead(){
        const notifications = await this.getAll()

        if(!notifications){
            return false
        }

        const updatedNotifications = notifications.map(notification => ({
            ...notification,
            read: true
        }))

        await this.table.bulkPut(updatedNotifications)

        return await this.getAll()
    }

    /**
     * Deletes notifications with 30+ days old from the database.
     *
     * @returns { Promise<Array<Object>> } Remaining notifications after deleting.
     *
     * @throws {Error} If a database operation fails.
     **/
    async removeOldNotifications() {
        const thirtyDaysAgo = new Date()

        // Calculate 30 days ago date
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

        // Delete old notifications
        await this.table.where('dateTime').below(thirtyDaysAgo).delete()

        return await this.getAll()
    }
}