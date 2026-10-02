import Notification from "../models/Notification.js"
import db from "../database/db.js"

export default class NotificationsController {
    constructor() {
        this.model = new Notification(db)
    }

    /**
     * Returns all notifications.
     **/
    async getAll(){
        try{
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
        }catch(error){
            console.log("DB error: ", error)
            return {
                success: false,
                code: "DatabaseError",
                data: []
            }
        }
    }

    /**
     * Marks a notification as **read**.
     *
     * @param { string } id - Notification `_id`
     **/
    async markAsRead(id){
        try{
            const notifications = await this.model.markAllAsRead(id)

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
        }catch(error){
            console.log("DB error: ", error)
            return {
                success: false,
                code: "DatabaseError",
                data: []
            }
        }
    }

    /**
     * Marks every notification at database as **read**.
     **/
    async markAllAsRead(){
        try{
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
        }catch(error){
            console.log("DB error: ", error)
            return {
                success: false,
                code: "DatabaseError",
                data: []
            }
        }
    }

    /**
     * Removes old notifications *(30+ days old)*.
     **/
    async removeOldNotifications() {
        try{
            await this.model.removeOldNotifications()
        }catch(error){
            console.log("DB error: ", error)
        }
    }
}