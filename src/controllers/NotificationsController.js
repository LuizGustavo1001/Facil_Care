import BaseController from "../controllers/BaseController.js"
import Notification from "../models/Notification.js"
import db from "../database/db.js"

export default class NotificationsController extends BaseController {
    constructor() {
        super()
        this.model = new Notification(db)
    }

    /**
     * Returns all notifications.
     **/
    async getAll(){
        return await this.execute(async () => {
            const notifications = await this.model.getAll()

            if(!notifications){
                return {
                    success: false,
                    code: "NotificationNotFound",
                    data: []
                }
            }

            return {
                success: true,
                code: null,
                data: notifications
            }
        })
    }

    /**
     * Mark a notification as **read**.
     *
     * @param { string } id - Notification `_id`
     **/
    async markAsRead(id){
        return await this.execute(async () => {
            const notifications = await this.model.markAsRead(id)

            if(!notifications){
                return {
                    success: false,
                    code: "NotificationNotFound",
                    data: []
                }
            }

            return {
                success: true,
                code: null,
                data: notifications
            }
        })
    }

    /**
     * Mark every notification at database as **read**.
     **/
    async markAllAsRead(){
        return await this.execute(async () => {
            const notifications = await this.model.markAllAsRead()

            if(!notifications){
                return {
                    success: false,
                    code: "NotificationNotFound",
                    data: []
                }
            }

            return {
                success: true,
                code: null,
                data: notifications
            }
        })
    }

    /**
     * Remove old notifications *(30+ days old)*.
     **/
    async removeOldNotifications() {
        return await this.execute(async () => {
            await this.model.removeOldNotifications()
        })
    }
}