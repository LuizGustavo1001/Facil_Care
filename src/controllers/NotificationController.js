import Notification from "../models/Notification.js"
import db from "../database/db.js"

export default class NotificationController {
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
     * @param { number } id - Notification `_id`
     **/
    async markAsRead(id){
        try{
            const result = await this.model.markAsRead(Number(id))

            if(!result){
                return {
                    success: false,
                    code: "NotificationNotFound",
                    data: []
                }
            }

            const notifications = await this.getAll()

            return {
                success: true,
                code: null,
                data: notifications.data
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
     * Marks every notification as **read**.
     **/
    async markAllAsRead(){
        try{
            const result = await this.model.markAllAsRead()

            if(!result){
                return {
                    success: false,
                    code: "NotificationNotFound",
                    data: []
                }
            }

            const notifications = await this.getAll()

            return {
                success: true,
                code: null,
                data: notifications.data
            }
        }catch(error) {
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
    async removeOlds() {
        try{
            const result = await this.model.removeOldNotifications()

            if(!result){
                return false
            }

            const notifications = await this.getAll()

            return {
                success: true,
                code: null,
                data: notifications
            }

        }catch(error){
            console.log("DB error: ", error)
        }
    }
}