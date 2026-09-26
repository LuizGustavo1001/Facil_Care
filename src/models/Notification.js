export default class Notification {
    constructor(db){
        this.table = db.table('notifications')
    }

    /**
     * Returns all recorded notifications
     **/
    async getAll(){
        return await this.table
            .toCollection()
            .toArray()
    }

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

    async removeOldNotifications() {
        const sevenDaysAgo = new Date()

        // Calculate 7 days ago date
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

        // Delete old notifications
        await this.table.where('dateTime').below(sevenDaysAgo).delete()

        return await this.getAll()
    }
}