export default class Notification {
    constructor(db){
        this.table = db.table('notifications')
    }

    async getAll(){
        return await this.table
            .toCollection()
            .toArray()
    }

    /**
     * Marks an notification as "read" by the notification `id` in the database.
     *
     * @param { String } id - Notification id
     * @param { boolean } status - `true` = read, and `false` = nonread
     **/
    async markAsRead(id, status = true){
        const notification = await this.table.get(id)

        if(!notification){
            return []
        }

        await this.table.put({
            ...notification,
            read: status
        })

        return await this.getAll()
    }

    /*
     * Marks all notifications in the collection as "read" in the database.
     **/
    async markAllAsRead(){
        const notifications = await this.getAll()

        if(!notifications){
            return []
        }

        const updatedNotifications = notifications.map(notification => ({
            ...notification,
            read: true
        }))

        await this.table.bulkPut(updatedNotifications)

        return await this.getAll()
    }

    /*
     * Deletes notifications with 30+ days old from the database.
     **/
    async removeOldNotifications() {
        const sevenDaysAgo = new Date()

        // Calculate 7 days ago date
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 30)

        // Delete old notifications
        await this.table.where('dateTime').below(sevenDaysAgo).delete()

        return await this.getAll()
    }
}