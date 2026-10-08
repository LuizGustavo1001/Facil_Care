export const PAGES = {
    HOME: "home",
    MONITORING: "monitoring",
    MANAGE: "manage",

    VITAL_SIGNS: "vitalSigns",
    FOLLOW_UPS: "followUps",

    EMERGENCY_DATA: "emergencyData",

    MEDICINES: "medicines",
    MEDICINE_REGISTRIES: "medicineRegistries",

    ALLERGIES: "allergies",
    DOCTORS: "doctors",
    CAREGIVERS: "caregivers",
    HEALTH_PLANS: "healthPlans",
    EMERGENCY_CONTACTS: "emergencyContacts",

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
    ERASE: "eraseData"
}

export const MANAGE_PAGES = [
    PAGES['ALLERGIES'],
    PAGES['DOCTORS'],
    PAGES['CAREGIVERS'],
    PAGES['MEDICINES'],
    PAGES['HEALTH_PLANS'],
    PAGES['EMERGENCY_CONTACTS']
]

export const MONITORING_PAGES = [
    PAGES['VITAL_SIGNS'],
    PAGES['FOLLOW_UPS']
]

export const VITAL_SIGNS_PAGES = [
    PAGES['BODY_TEMPERATURE'],
    PAGES['BLOOD_PRESSURE'],
    PAGES['OXYGEN_SATURATION'],
    PAGES['BLOOD_GLUCOSE'],
    PAGES['HEART_RATE']
]

export const FOLLOW_UPS_PAGES = [
    PAGES['MOOD'],
    PAGES['PAIN_LEVEL'],
    PAGES['SLEEP'],
    PAGES['WATER_INTAKE'],
    PAGES['MEAL_ACCEPTANCE'],
    PAGES['WEIGHT'],
    PAGES['NECESSITIES']
]
