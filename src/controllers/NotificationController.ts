import NotificationModel from "../models/NotificationModel"
import db from "../database/db.js"

import {type ControllerResult, fallbackReturn} from "./settings"
import type { INotification } from "../interfaces/INotification"

export default class NotificationController {
    private readonly model: NotificationModel

    public constructor() {
        this.model = new NotificationModel(db)
    }

    /**
     * Returns all notifications
     **/
    public async getAll(): Promise<ControllerResult<INotification[]>> {
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
        } catch(err: any) {
            return fallbackReturn(err)
        }
    }

    /**
     * Marks a notification as `READ`
     **/
    public async markAsRead(NotificationId: number | undefined): Promise<ControllerResult<INotification>> {
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
        } catch(err: any) {
            return fallbackReturn(err, false)
        }
    }

    /**
    * Marks every notification as `READ`
    **/
    public async markAllAsRead(): Promise<ControllerResult<INotification>> {
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
        } catch(err: any) {
            return fallbackReturn(err, false)
        }
    }

    /**
     * Removes old notifications *(30+ days old)*.
     **/
    public async removeOlds(): Promise<void> {
        try {
            await this.model.removeOldNotifications()
        } catch(err: any) {
            console.log("DB error: ", err)
        }
    }
}