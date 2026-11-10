import { FOLLOW_UPS_PAGES, MANAGE_PAGES, MONITORING_PAGES, VITAL_SIGNS_PAGES } from "../constants/sysPages"

export type FollowUpType = typeof FOLLOW_UPS_PAGES[number]
export type VitalSignType = typeof VITAL_SIGNS_PAGES[number]
export type MonitoringType = FollowUpType | VitalSignType
export type ManagePageType = typeof MANAGE_PAGES[number]
export type MonitoringPageType = typeof MONITORING_PAGES[number]