import NotificationModel from "../models/NotificationModel"
import db from "../database/db.js"

import type { ControllerResult } from "./settings"
import type { INotification } from "../interfaces/INotification"

export default class NotificationController {
    private readonly model: NotificationModel

    constructor() {
        this.model = new NotificationModel(db)
    }

    /**
     * Returns all notifications
     **/
    async getAll(): Promise<ControllerResult<INotification[]>> {
        try {
            const notifications = await this.model.getAll()

            if(!notifications) {
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
        } catch(err) {
            console.log("DB error: ", err)
            return {
                success: false,
                code: "DatabaseError",
                data: []
            }
        }
    }

    /**
     * Marks a notification as `READ`
     **/
    async markAsRead(NotificationId: number | undefined): Promise<ControllerResult<INotification>> {
        try {
            const result = await this.model.markAsRead(<number>NotificationId)

            if(!result) {
                return {
                    success: false,
                    code: "NotificationNotFound",
                    data: null
                }
            }

            return {
                success: true,
                code: null,
                data: null
            }
        } catch(err) {
            console.log("DB error: ", err)

            return {
                success: false,
                code: "DatabaseError",
                data: null
            }
        }
    }

    /**
    * Marks every notification as `READ`
    **/
    async markAllAsRead(): Promise<ControllerResult<INotification>> {
        try {
            const result = await this.model.markAllAsRead()

            if(!result) {
                return {
                    success: false,
                    code: "NotificationNotFound",
                    data: null
                }
            }

            return {
                success: true,
                code: null,
                data: null
            }
        } catch(err) {
            console.log("DB error: ", err)

            return {
                success: false,
                code: "DatabaseError",
                data: null
            }
        }
    }

    /**
     * Removes old notifications *(30+ days old)*.
     **/
    async removeOlds(): Promise<void> {
        try{
            const result = await this.model.removeOldNotifications()
        }catch(error) {
            console.log("DB error: ", error)

        }
    }
}