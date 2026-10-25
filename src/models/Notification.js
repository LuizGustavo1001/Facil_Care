export default class Notification {
    /**
     * @param { Object } db - Dexie database instance.
     **/
    constructor(db) {
        this.table = db.table('notifications')
    }

    /**
     * Returns all notifications from the collection.
     *
     * @returns { Promise<Array<Object>> } All notifications from the collection.
     **/
    async getAll() {
        return await this.table
            .toCollection()
            .reverse()
            .toArray()
    }

    /**
     * Marks an notification as "read" by the notification `id` in the database.
     *
     * @param { number } id - Notification id.
     * @param { boolean } status - `true` = read, and `false` = nonread.
     *
     * @returns { Promise<boolean> } `true` if the notification has been marked as "read", `false` otherwise.
     *
     * @throws { Error } If a database operation fails.
     **/
    async markAsRead(id, status = true) {
        try{
            const notification = await this.table.get(id)

            if(!notification){
                return false
            }

            await this.table.put({
                ...notification,
                read: status
            })

            return true
        }catch(err){
            throw err
        }
    }

    /**
     * Marks all notifications in the collection as "read" in the database.
     *
     * @returns { Promise<boolean> } `true` if all notifications has been marked as "read", `false` otherwise.
     *
     * @throws {Error} If a database operation fails.
     **/
    async markAllAsRead() {
        try{
            const notifications = await this.getAll()

            if(!notifications){
                return false
            }

            const updatedNotifications = notifications.map(notification => ({
                ...notification,
                read: true
            }))

            await this.table.bulkPut(updatedNotifications)

            return true
        }catch(err){
            throw err
        }
    }

    /**
     * Deletes notifications with 30+ days old from the database.
     *
     * @returns { Promise<boolean> } `true` if query was succesfully, `false` otherwise.
     *
     * @throws {Error} If a database operation fails.
     **/
    async removeOldNotifications()  {
        try{
            const thirtyDaysAgo = new Date()

            // Calculate 30 days ago date
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

            // Delete old notifications
            await this.table.where('dateTime').below(thirtyDaysAgo).delete()

            return true
        }catch(err){
            throw err
        }
    }
}