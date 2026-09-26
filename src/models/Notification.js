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
            throw new Error('Notify not found')
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
            throw new Error('Notify not found')
        }

        const updatedNotifications = notifications.map(notification => ({
            ...notification,
            read: true
        }))

        await this.table.bulkPut(updatedNotifications)

        return await this.getAll()
    }
}