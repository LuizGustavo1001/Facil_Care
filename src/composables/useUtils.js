import { useI18n } from "vue-i18n"

export function useUtils() {
    const { t, te } = useI18n()

    const PAGES = {
        VITAL_SIGN: "vitalSigns",
        FOLLOW_UPS: "followUps",
        EMERGENCY_DATA: "emergencyData",
        MEDICINES: "medicines",
        ALLERGIES: "allergies",
        DOCTORS: "doctors",
        CAREGIVERS: "caregivers",
        PREFERENCES: "preferences",
        IMPORT: "import",
        EXPORT: "export",
        USER_MANUAL: "userManual",
        TERMS: "terms",
        MOOD: "mood",
        PAIN_LEVEL: "painLevel",
        SLEEP: "sleep",
        WATER_INTAKE: "waterIntake",
        MEAL_ACCEPTANCE: "mealAcceptance",
        WEIGHT: "weight",
        NECESSITIES: "necessities",
        BODY_TEMPERATURE: "bodyTemperature",
        BLOOD_PRESSURE: "bloodPressure",
        OXYGEN_SATURATION: "oxygenSaturation",
        BLOOD_GLUCOSE: "bloodGlucose",
        HEART_RATE: "heartRate",
        NOTIFICATIONS: "notifications",
        ERASE: "erase"
    }

    const MANAGE_PAGES = [
        PAGES['ALLERGIES'],
        PAGES['DOCTORS'],
        PAGES['CAREGIVERS'],
        PAGES['MEDICINES']
    ]

    const MONITORING_PAGES = [
        PAGES['VITAL_SIGN'],
        PAGES['FOLLOW_UPS']
    ]

    const MONITORING_VITAL_SIGNS_PAGES = [
        PAGES['BODY_TEMPERATURE'],
        PAGES['BLOOD_PRESSURE'],
        PAGES['OXYGEN_SATURATION'],
        PAGES['BLOOD_GLUCOSE'],
        PAGES['HEART_RATE']
    ]

    const MONITORING_FOLLOW_UPS_PAGES = [
        PAGES['MOOD'],
        PAGES['PAIN_LEVEL'],
        PAGES['SLEEP'],
        PAGES['WATER_INTAKE'],
        PAGES['MEAL_ACCEPTANCE'],
        PAGES['WEIGHT'],
        PAGES['NECESSITIES']
    ]

    /**
    *  @param { String } page - From lang or PAGES{}
    **/
    const getPageTitle = (page) => {
        const key = `pageTitle.${page}`

        return te(key) ? t(key) : ""
    }

    const pageExists = (page) => {
        return te(`pageTitle.${page}`)
    }

    return { getPageTitle, pageExists, PAGES, MANAGE_PAGES, MONITORING_PAGES, MONITORING_VITAL_SIGNS_PAGES, MONITORING_FOLLOW_UPS_PAGES }
}