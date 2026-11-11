import { icons } from "../assets/icons/icons.js"

import { THEME_PREFERENCES } from "../constants/sysThemes"
import { LANGUAGES } from "../constants/sysLanguages"
import { PAGES } from "../constants/sysPages"
import { UNITS } from "../constants/sysUnits"
import { BUTTON_COLORS } from "../constants/buttonComponent"
import { WEEK_DAYS } from "../constants/weekDays"

import type { FormRegularTemplate } from "../interfaces/Form"
import type { FormType } from "../types/genericForm"

export const THEME_OPTIONS = [
    { id: THEME_PREFERENCES.LIGHT },
    { id: THEME_PREFERENCES.DARK },
    { id: THEME_PREFERENCES.HIGH_CONTRAST },
    { id: THEME_PREFERENCES.SYSTEM }
]

export const LANGUAGE_OPTIONS = [
    { id: LANGUAGES.PT_BR },
    { id: LANGUAGES.EN_US }
]

export const UNITS_OPTIONS = [
    { id: UNITS.METRIC },
    { id: UNITS.IMPERIAL }
]

export const weekDays = [
    { value: 0, label: WEEK_DAYS.SUNDAY},
    { value: 1, label: WEEK_DAYS.MONDAY },
    { value: 2, label: WEEK_DAYS.TUESDAY },
    { value: 3, label: WEEK_DAYS.WEDNESDAY },
    { value: 4, label: WEEK_DAYS.THURSDAY },
    { value: 5, label: WEEK_DAYS.FRIDAY },
    { value: 6, label: WEEK_DAYS.SATURDAY },
]

export const pages = {
    [PAGES.HOME]: {
        id: PAGES.HOME,
        iconFill: icons['hospital-fill'],
        iconLine: icons['hospital-line'],
        href: "/"
    },
    [PAGES.SERVICES]: {
        id: PAGES.SERVICES,
        iconFill: icons['service-fill'],
        iconLine: icons['service-line'],
        href: `/${PAGES.SERVICES}`
    },
    [PAGES.PATIENT_DATA]: {
        id: PAGES.PATIENT_DATA,
        iconFill: icons['user-fill'],
        iconLine: icons['user-line'],
        href: `/${PAGES.PATIENT_DATA}`
    },
    [PAGES.VITAL_SIGNS]: {
        id: PAGES.VITAL_SIGNS,
        iconFill: icons['health-metric-fill'],
        iconLine: icons['health-metric-line'],
        href: `/${PAGES.MONITORING}/${PAGES.VITAL_SIGNS}`,
        color: BUTTON_COLORS.RED
    },
    [PAGES.FOLLOW_UPS]: {
        id: PAGES.FOLLOW_UPS,
        iconFill: icons['mental-health-fill'],
        iconLine: icons['mental-health-line'],
        href: `/${PAGES.MONITORING}/${PAGES.FOLLOW_UPS}`,
        color: BUTTON_COLORS.BLUE
    },
    [PAGES.MEDICINES]: {
        id: PAGES.MEDICINES,
        iconFill: icons['medicine-bottle-fill'],
        iconLine: icons['medicine-bottle-line'],
        href: `/${PAGES.MANAGE}/${PAGES.MEDICINES}`,
        color: BUTTON_COLORS.GREEN
    },
    [PAGES.ALLERGIES]: {
        id: PAGES.ALLERGIES,
        iconFill: icons['virus-fill'],
        iconLine: icons['virus-line'],
        href: `/${PAGES.MANAGE}/${PAGES.ALLERGIES}`,
        color: BUTTON_COLORS.PURPLE
    },
    [PAGES.HEALTH_PLANS]: {
        id: PAGES.HEALTH_PLANS,
        iconFill: icons['first-aid-fill'],
        iconLine: icons['first-aid-line'],
        href: `${PAGES.MANAGE}/${PAGES.HEALTH_PLANS}`,
        color: BUTTON_COLORS.GREEN
    },
    [PAGES.EMERGENCY_CONTACTS]: {
        id: PAGES.EMERGENCY_CONTACTS,
        iconFill: icons['contacts-fill'],
        iconLine: icons['contacts-line'],
        href: `${PAGES.MANAGE}/${PAGES.EMERGENCY_CONTACTS}`,
        color: BUTTON_COLORS.ORANGE
    },
    [PAGES.CAREGIVERS]: {
        id: PAGES.CAREGIVERS,
        iconFill: icons['nurse-fill'],
        iconLine: icons['nurse-line'],
        href: `${PAGES.MANAGE}/${PAGES.CAREGIVERS}`,
        color: BUTTON_COLORS.YELLOW
    },
    [PAGES.DOCTORS]: {
        id: PAGES.DOCTORS,
        iconFill: icons['stethoscope-line'],
        iconLine: icons['stethoscope-line'],
        href: `${PAGES.MANAGE}/${PAGES.DOCTORS}`,
        color: BUTTON_COLORS.BLUE
    },
    [PAGES.BODY_TEMPERATURE]: {
        id: PAGES['BODY_TEMPERATURE'],
        iconFill: icons["thermometer-line"],
        iconLine: icons["thermometer-line"],
        href: `/${PAGES['MONITORING']}/${PAGES['VITAL_SIGNS']}/${PAGES['BODY_TEMPERATURE']}`,
        color: BUTTON_COLORS.RED
    },
    [PAGES.BLOOD_PRESSURE]: {
        id: PAGES['BLOOD_PRESSURE'],
        iconFill: icons["blood-pressure-fill"],
        iconLine: icons["blood-pressure-line"],
        href: `/${PAGES['MONITORING']}/${PAGES['VITAL_SIGNS']}/${PAGES['BLOOD_PRESSURE']}`,
        color: BUTTON_COLORS.ORANGE
    },
    [PAGES.OXYGEN_SATURATION]: {
        id: PAGES['OXYGEN_SATURATION'],
        iconFill: icons["oxygen-fill"],
        iconLine: icons["oxygen-line"],
        href: `/${PAGES['MONITORING']}/${PAGES['VITAL_SIGNS']}/${PAGES['OXYGEN_SATURATION']}`,
        color: BUTTON_COLORS.BLUE
    },
    [PAGES.BLOOD_GLUCOSE]: {
        id: PAGES['BLOOD_GLUCOSE'],
        iconFill: icons["glucose-fill"],
        iconLine: icons["glucose-line"],
        href: `/${PAGES['MONITORING']}/${PAGES['VITAL_SIGNS']}/${PAGES['BLOOD_GLUCOSE']}`,
        color: BUTTON_COLORS.RED
    },
    [PAGES.HEART_RATE]: {
        id: PAGES['HEART_RATE'],
        iconFill: icons["heart-pulse-fill"],
        iconLine: icons["heart-pulse-line"],
        href: `/${PAGES['MONITORING']}/${PAGES['VITAL_SIGNS']}/${PAGES['HEART_RATE']}`,
        color: BUTTON_COLORS.ORANGE
    },
    [PAGES.MOOD]: {
        id: PAGES['MOOD'],
        iconFill: icons["user-smile-fill"],
        iconLine: icons["user-smile-line"],
        href: `/${PAGES.MONITORING}/${PAGES['FOLLOW_UPS']}/${PAGES['MOOD']}`,
        color: BUTTON_COLORS.BLUE
    },
    [PAGES.PAIN_LEVEL]: {
        id: PAGES['PAIN_LEVEL'],
        iconFill: icons["emotion-unhappy-fill"],
        iconLine:  icons["emotion-unhappy-line"],
        href: `/${PAGES['MONITORING']}/${PAGES['FOLLOW_UPS']}/${PAGES['PAIN_LEVEL']}`,
        color: BUTTON_COLORS.RED
    },
    [PAGES.SLEEP]: {
        id: PAGES['SLEEP'],
        iconFill: icons["rest-time-fill"],
        iconLine: icons["rest-time-line"],
        href: `/${PAGES['MONITORING']}/${PAGES['FOLLOW_UPS']}/${PAGES['SLEEP']}`,
        color: BUTTON_COLORS.PURPLE
    },
    [PAGES.WATER_INTAKE]: {
        id: PAGES['WATER_INTAKE'],
        iconFill: icons["drop-fill"],
        iconLine: icons["drop-line"],
        href: `/${PAGES['MONITORING']}/${PAGES['FOLLOW_UPS']}/${PAGES['WATER_INTAKE']}`,
        color: BUTTON_COLORS.BLUE
    },
    [PAGES.MEAL_ACCEPTANCE]: {
        id:PAGES['MEAL_ACCEPTANCE'],
        iconFill: icons["restaurant"],
        iconLine: icons["restaurant"],
        href: `/${PAGES['MONITORING']}/${PAGES['FOLLOW_UPS']}/${PAGES['MEAL_ACCEPTANCE']}`,
        color: BUTTON_COLORS.ORANGE
    },
    [PAGES.WEIGHT]: {
        id: PAGES['WEIGHT'],
        iconFill: icons["weight-fill"],
        iconLine: icons["weight-line"],
        href: `/${PAGES['MONITORING']}/${PAGES['FOLLOW_UPS']}/${PAGES['WEIGHT']}`,
        color: BUTTON_COLORS.GREEN
    },
    [PAGES.NECESSITIES]: {
        id: PAGES['NECESSITIES'],
        iconFill: icons["drop-line"],
        iconLine: icons["drop-fill"],
        href: `/${PAGES['MONITORING']}/${PAGES['FOLLOW_UPS']}/${PAGES['NECESSITIES']}`,
        color: BUTTON_COLORS.ORANGE
    },
    [PAGES.EMERGENCY_DATA]: {
        id: PAGES['EMERGENCY_DATA'],
        iconFill: icons["first-aid-fill"],
        iconLine: icons["first-aid-line"],
        href: `/${PAGES['EMERGENCY_DATA']}`,
        color: BUTTON_COLORS.RED
    },
    [PAGES.PREFERENCES]: {
        id: PAGES['PREFERENCES'],
        iconFill: icons["settings-fill"],
        iconLine: icons["settings-line"],
        href: `/${PAGES.PREFERENCES}`,
        color: BUTTON_COLORS.YELLOW
    },
    [PAGES.EXPORT]: {
        id: PAGES['EXPORT'],
        iconFill: icons["qr-code-fill"],
        iconLine: icons["qr-code-line"],
        href: `/backup/${PAGES.EXPORT}`,
        color: BUTTON_COLORS.GREEN
    },
    [PAGES.IMPORT]: {
        id: PAGES['IMPORT'],
        iconFill: icons["qr-scan-fill"],
        iconLine: icons["qr-scan-line"],
        href: `/backup/${PAGES.IMPORT}`,
        color: BUTTON_COLORS.YELLOW
    },
    [PAGES.USER_MANUAL]: {
        id: PAGES['USER_MANUAL'],
        iconFill: icons['book-read-fill'],
        iconLine: icons["book-read-line"],
        href: `/${PAGES.USER_MANUAL}`,
        color: BUTTON_COLORS.BLUE
    },
    [PAGES.TERMS]: {
        id: PAGES['TERMS'],
        iconFill: icons["shield-user-fill"],
        iconLine: icons["shield-user-line"],
        href: `/${PAGES.TERMS}`,
        color: BUTTON_COLORS.PURPLE
    },
    [PAGES.ABOUT]: {
        id: PAGES['ABOUT'],
        iconFill: icons['information-circle-fill'],
        iconLine: icons["information-circle-line"],
        href: `/${PAGES.ABOUT}`,
        color: BUTTON_COLORS.BLUE
    },
    [PAGES.ERASE]: {
        id: PAGES['ERASE'],
        iconFill: icons["delete-bin-fill"],
        iconLine: icons["delete-bin-line"],
        href: `/${PAGES.ERASE}`,
        color: BUTTON_COLORS.RED
    }
}

export const homeView = {
    quickAccess: [
        { ...pages[PAGES.VITAL_SIGNS] },
        { ...pages[PAGES.EMERGENCY_DATA] },
        { ...pages[PAGES.IMPORT] },
        { ...pages[PAGES.EXPORT] },
        { ...pages[PAGES.PREFERENCES] }
    ]
}

export const servicesView = [
    {
      id: "registers",
      buttons: [
          pages[PAGES.VITAL_SIGNS],
          pages[PAGES.FOLLOW_UPS]
      ]
    },
    {
        id: "patient",
        buttons: [
            pages[PAGES.MEDICINES],
            pages[PAGES.ALLERGIES],
            pages[PAGES.HEALTH_PLANS],
            pages[PAGES.EMERGENCY_CONTACTS]
        ]
    },
    {
        id: "others",
        buttons: [
            pages[PAGES.CAREGIVERS],
            pages[PAGES.DOCTORS],
        ]
    }
]

export const patientDataView = {
    categories: [
        {
            id: "general",
            buttons: [
                pages[PAGES.EMERGENCY_DATA],
                pages[PAGES.PREFERENCES]
            ]
        },
        {
            id: "manageData",
            buttons: [
                pages[PAGES.EXPORT],
                pages[PAGES.IMPORT],
            ]
        },
        {
            id: "others",
            buttons: [
                pages[PAGES.USER_MANUAL],
                pages[PAGES.TERMS],
                pages[PAGES.ABOUT]
            ]
        }
    ],
    delete: pages[PAGES.ERASE]
}

export const preferencesView = {
    categories: [
        {
            id: "general",
            items: [
                {
                    id: "themes",
                    name: "app-theme",
                    for: "app-theme",
                    event: "toggle-theme",
                    options: THEME_OPTIONS
                },
                {
                    id: "languages",
                    name: "app-lang",
                    for: "app-lang",
                    event: "toggle-language",
                    options: LANGUAGE_OPTIONS
                },
                {
                    id: "units",
                    name: "app-unit",
                    for: "app-unit",
                    event: "toggle-unit",
                    options: UNITS_OPTIONS
                }
            ]
        }
    ]
}

export const monitoringViews = {
    vitalSigns: {
        items: [
            pages[PAGES.BODY_TEMPERATURE],
            pages[PAGES.BLOOD_PRESSURE],
            pages[PAGES.OXYGEN_SATURATION],
            pages[PAGES.BLOOD_GLUCOSE],
            pages[PAGES.HEART_RATE]
        ]
    },

    followUps: {
        items: [
            pages[PAGES.MOOD],
            pages[PAGES.PAIN_LEVEL],
            pages[PAGES.SLEEP],
            pages[PAGES.WATER_INTAKE],
            pages[PAGES.MEAL_ACCEPTANCE],
            pages[PAGES.WEIGHT],
            pages[PAGES.NECESSITIES]
        ]
    }
}

export const emergencyDataView = {
    categories: [
        {
            id: "patient",
            icon: icons['user-fill'],
            component: "alt",
            action: "popup",

            buttons: [
                {
                    id: "name",
                    color: "blue",
                    icon: icons["user-fill"],
                },
                {
                    id: "birthDate",
                    color: "green",
                    icon: icons["cake-fill"]
                },
                {
                    id: "bloodType",
                    color: "red",
                    icon: icons["blood-type-fill"]
                },
                {
                    id: "address",
                    color: "blue",
                    icon: icons["pin-user-fill"]
                }
            ]
        },

        {
            ...pages[PAGES.EMERGENCY_CONTACTS],
            edit: true,
            component: "default",
            action: "none"
        },

        {
            ...pages[PAGES.ALLERGIES],
            edit: true,
            component: "default",
            action: "none"
        },

        {
            ...pages[PAGES.HEALTH_PLANS],
            edit: true,
            component: "default",
            action: "none"
        },

        {
            id: "others",
            icon: icons['health-metric-fill'],
            component: "alt",
            action: "internalLink",
            buttons: [
                pages[PAGES.DOCTORS],
                pages[PAGES.MEDICINES],
                pages[PAGES.CAREGIVERS],
            ]
        }
    ]
}

export const termsView = {
    categories: [
        {
            id: "consciousUse",
            icon: icons['user-smile-fill'],
        },
        {
            id: "dataPrivacy",
            icon: icons['database-fill']
        },
        {
            id: "telemetry",
            icon: icons['pin-user-fill'],
        },
        {
            id: "devicePermissions",
            icon: icons['shield-keyhole-fill']
        },
        {
            id: "dataManagement",
            icon: icons['qr-scan-fill'],
        },
        {
            id: "dataExclusion",
            icon: icons['delete-bin-fill']
        }
    ]
}

export const exportView = {
    categories: {
        buttons: [
            {
                id: "qrCode",
                icon: icons['qr-code-line'],
                color: BUTTON_COLORS.BLUE,
                href: `/backup/${PAGES.EXPORT}/qrCode`
            },
            {
                id: "json",
                icon: icons['file-line'],
                color: BUTTON_COLORS.YELLOW,
                href: `/backup/${PAGES.EXPORT}/json`
            }
        ],

    }
}

export const charts = {
    colors: [
        "#5e81ac",
        "#d08770",
        "#ebcb8b",
        "#a3be8c",
        "#b48ead"
    ],
    filters: [
        {
            id: "today",
            days: 1
        },
        {
            id: "week",
            days: 7
        },
        {
            id: "twoWeeks",
            days: 14
        },
        {
            id: "threeWeeks",
            days: 21
        },
        {
            id: "month",
            days: 30
        },
        {
            id: "twoMonths",
            days: 60
        },
        {
            id: "all",
            days: null
        }
    ]
}

export const warningMessages = {
    PatientNotFound: "warning",
    PatientUpdated: "success",
    ItemNotFound: "warning",

    NotificationNotFound: "error",

    SystemDataReset: "success",
    DatabaseError: "error",

    NoVitalSignFound: "error",
    NoVitalSignByField: "error",
    NoVitalSignByDate: "error",
    NoVitalSignByFieldAndDate: "error",
    VitalSignNotFound: "error",
    VitalSignUpdated: "success",
    VitalSignDeleted: "success",
    VitalSignCreated: "success",

    NoFollowUpFound: "error",
    NoFollowUpByField: "error",
    NoFollowUpByDate: "error",
    NoFollowUpByFieldAndDate: "error",
    FollowUpNotFound: "error",
    FollowUpUpdated: "success",
    FollowUpDeleted: "success",
    FollowUpCreated: "success",

    NoAllergyFound: "error",
    AllergyNotFound: "error",
    AllergyUpdated: "success",
    AllergyDeleted: "success",
    AllergyCreated: "success",
    AllergyCreationFailed: "error",
    AllergyUpdateFailed: "error",
    AllergyDeleteFailed: "error",

    NoCaregiverFound: "error",
    CaregiverNotFound: "error",
    CaregiverUpdated: "success",
    CaregiverDeleted: "success",
    CaregiverCreated: "success",
    CaregiverCreationFailed: "error",
    CaregiverUpdateFailed: "error",
    CaregiverDeleteFailed: "error",

    NoDoctorFound: "error",
    DoctorNotFound: "error",
    DoctorUpdated: "success",
    DoctorDeleted: "success",
    DoctorCreated: "success",
    DoctorCreationFailed: "error",
    DoctorUpdateFailed: "error",
    DoctorDeleteFailed: "error",

    NoEmergencyContactFound: "error",
    EmergencyContactNotFound: "error",
    EmergencyContactUpdated: "success",
    EmergencyContactDeleted: "success",
    EmergencyContactCreated: "success",
    EmergencyContactCreationFailed: "error",
    EmergencyContactUpdateFailed: "error",
    EmergencyContactDeleteFailed: "error",

    NoHealthPlansFound: "error",
    HealthPlansNotFound: "error",
    HealthPlansUpdated: "success",
    HealthPlansDeleted: "success",
    HealthPlansCreated: "success",
    HealthPlansCreationFailed: "error",
    HealthPlansUpdateFailed: "error",
    HealthPlansDeleteFailed: "error",

    NoMedicineFound: "error",
    MedicineNotFound: "error",
    MedicineUpdated: "success",
    MedicineDeleted: "success",
    MedicineCreated: "success",
    MedicineCreationFailed: "error",
    MedicineUpdateFailed: "error",
    MedicineDeleteFailed: "error",

    InvalidDateInterval: "error",

    ExportFailed: "error",
    ImportFailed: "error",
    P2PExportFailed: "error",
    P2PImportFailed: "error",
    P2PConnectionInterrupted: "warning",
    P2PReceiveFailed: "error",
    JSONImportSuccess: "success",
    exportJSONSuccess: "success",
    QRCodeGenFailed: "error",

    HostNotFound: "error",
    OfflineDevice: "warning"
}

export const formTemplates = [
    {
        id: "name",
        main: {
            inputs: [
                {
                    id: "name",
                    tag: "input",
                    name: "name",
                    for: "name",
                    inputType: "text",
                    autoCapitalize: "words",
                    required: true
                }
            ],
            buttons: [
                {
                    id: "submit"
                }
            ]
        }
    },
    {
        id: "birthDate",
        main: {
            inputs: [
                {
                    id: "birthDate",
                    tag: "input",
                    name: "birthDate",
                    for: "birthDate",
                    inputType: "date",
                    required: true
                }
            ],
            buttons: [
                {
                    id: "submit"
                }
            ]
        }
    },
    {
        id: "bloodType",
        main: {
            inputs: [
                {
                    id: "bloodType",
                    tag: "select",
                    name: "bloodType",
                    for: "bloodType",
                    required: true,
                    options: [
                        {
                            id: "o_negative",
                            value: "o_negative",
                        },
                        {
                            id: "o_positive",
                            value: "o_positive",
                        },
                        {
                            id: "a_negative",
                            value: "a_negative",
                        },
                        {
                            id: "a_positive",
                            value: "a_positive",
                        },
                        {
                            id: "b_negative",
                            value: "b_negative"
                        },
                        {
                            id: "b_positive",
                            value: "b_positive",
                        },
                        {
                            id: "ab_negative",
                            value: "ab_negative",
                        },
                        {
                            id: "ab_positive",
                            value: "ab_positive",
                        }
                    ]
                }
            ],
            buttons: [
                {
                    id: "submit"
                }
            ]
        }
    },
    {
        id: "address",
        main: {
            inputs: [
                {
                    id: "address",
                    tag: "input",
                    inputType: "text",
                    name: "address",
                    for: "address",
                    autoCapitalize: "sentences",
                    required: true
                }
            ],
            buttons: [
                {
                    id: "submit"
                }
            ]
        }
    },
    {
        id: PAGES.MEDICINES,
        main: {
            inputs: [
                {
                    id: "administrationWeekDays",
                    tag: "mpDays",
                    name: "administrationWeekDays"
                },
                {
                    id: "name",
                    tag: "input",
                    inputType: "text",
                    name: "name",
                    for: "name",
                    autoCapitalize: "words",
                    required: true
                },
                {
                    id: "routeAdmin",
                    tag: "select",
                    name: "routeAdmin",
                    for: "routeAdmin",
                    required: true,
                    options: [
                        {
                            id: "oral",
                            value: "oral"
                        },
                        {
                            id: "cutaneous",
                            value: "cutaneous"
                        }
                    ]
                },
                {
                    id: "administrationTimes",
                    tag: "mpTime",
                    inputType: "time",
                    name: "administrationTimes",
                    for: "administrationTimes",
                    required: true
                },
                {
                    id: "observations",
                    tag: "textarea",
                    name: "observations",
                    for: "observations"
                }
            ],
            buttons: [
                {
                    id: "submit"
                }
            ]
        }
    },
    {
        id: PAGES.CAREGIVERS,
        main: {
            inputs: [
                {
                    id: "name",
                    tag: "input",
                    inputType: "text",
                    name: "name",
                    for: "name",
                    autoCapitalize: "words",
                    required: true
                },
                {
                    id: "startDate",
                    tag: "input",
                    name: "startDate",
                    for: "startDate",
                    required: true,
                    inputType: "datetime-local",
                    isDefaultNow: true
                },
                {
                    id: "phone",
                    tag: "input",
                    inputType: "tel",
                    name: "phone",
                    for: "phone",
                    required: true
                }
            ],
            buttons: [
                {
                    id: "submit"
                }
            ]
        }
    },
    {
        id: PAGES.DOCTORS,
        main: {
            inputs: [
                {
                    id: "name",
                    tag: "input",
                    inputType: "text",
                    name: "name",
                    for: "name",
                    autoCapitalize: "words",
                    required: true
                },
                {
                    id: "speciality",
                    tag: "select",
                    name: "speciality",
                    for: "speciality",
                    required: true,
                    options: [
                        {
                            id: "cardiology",
                            value: "cardiology"
                        },
                        {
                            id: "dermatology",
                            value: "dermatology"
                        },
                        {
                            id: "endocrinology",
                            value: "endocrinology"
                        },
                        {
                            id: "geriatrics",
                            value: "geriatrics"
                        },
                        {
                            id: "gynecology",
                            value: "gynecology"
                        },
                        {
                            id: "neurology",
                            value: "neurology"
                        },
                        {
                            id: "ophthalmology",
                            value: "ophthalmology"
                        },
                        {
                            id: "orthopedics",
                            value: "orthopedics"
                        },
                        {
                            id: "pediatrics",
                            value: "pediatrics"
                        },
                        {
                            id: "psychiatry",
                            value: "psychiatry"
                        },
                        {
                            id: "generalPractice",
                            value: "generalPractice"
                        },
                        {
                            id: "other",
                            value: "other"
                        }
                    ]
                },
                {
                    id: "phone",
                    tag: "input",
                    inputType: "tel",
                    name: "phone",
                    for: "phone",
                    required: true
                }
            ],
            buttons: [
                {
                    id: "submit"
                }
            ]
        }
    },
    {
        id: PAGES.ALLERGIES,
        main: {
            inputs: [
                {
                    id: "name",
                    tag: "input",
                    inputType: "text",
                    name: "name",
                    for: "name",
                    autoCapitalize: "sentences",
                    required: true
                }
            ],
            buttons: [
                {
                    id: "submit"
                }
            ]
        }
    },
    {
        id: PAGES.HEALTH_PLANS,
        main: {
            inputs: [
                {
                    id: "name",
                    tag: "input",
                    inputType: "text",
                    name: "name",
                    for: "name",
                    autoCapitalize: "words",
                    required: true
                }
            ],
            buttons: [
                {
                    id: "submit"
                }
            ]
        }
    },
    {
        id: PAGES.EMERGENCY_CONTACTS,
        main: {
            inputs: [
                {
                    id: "name",
                    tag: "input",
                    inputType: "text",
                    name: "name",
                    for: "name",
                    autoCapitalize: "words",
                    required: true
                },
                {
                    id: "kinship",
                    tag: "select",
                    name: "kinship",
                    for: "kinship",
                    required: true,
                    options: [
                        {
                            id: "father",
                            value: "father"
                        },
                        {
                          id: "mother",
                          value: "mother"
                        },
                        {
                            id: "husband",
                            value: "husband"
                        },
                        {
                            id: "wife",
                            value: "wife"
                        },
                        {
                            id: "son",
                            value: "son"
                        },
                        {
                            id: "daughter",
                            value: "daughter"
                        },
                        {
                            id: "uncle",
                            value: "uncle"
                        },
                        {
                            id: "auntie",
                            value: "auntie"
                        },
                        {
                            id: "grandfather",
                            value: "grandfather"
                        },
                        {
                            id: "grandmother",
                            value: "grandmother"
                        },
                        {
                            id: "cousin",
                            value: "cousin"
                        },
                        {
                            id: "friend",
                            value: "friend"
                        },
                        {
                            id: "other",
                            value: "other"
                        }
                    ]
                },
                {
                    id: "phone",
                    tag: "input",
                    inputType: "tel",
                    name: "phone",
                    for: "phone",
                    required: true
                }
            ],
            buttons: [
                {
                    id: "submit"
                }
            ]
        }
    },

    {
        id: PAGES.BODY_TEMPERATURE,
        main: {
            inputs: [
                {
                    id: "value",
                    tag: "input",
                    name: "value",
                    for: "value",
                    inputType: "number",
                    step: "0.1",
                    min: 20,
                    max: 200,
                    required: true,
                    mods: {
                        hasMeasurementUnit: true,
                        measurementUnitType: PAGES.BODY_TEMPERATURE
                    }
                },
                {
                    id: "dateTime",
                    tag: "input",
                    name: "dateTime",
                    for: "dateTime",
                    inputType: "datetime-local",
                    isDefaultNow: true,
                    required: true
                },
                {
                    id: "caregiverId",
                    tag: "select",
                    name: "caregiverId",
                    for: "caregiverId",
                    dynamicKey: PAGES.CAREGIVERS,
                    required: true
                },
                {
                    id: "observations",
                    tag: "textarea",
                    name: "observations",
                    for: "observations"
                }
            ],
            buttons: [{ id: "submit" }]
        }
    },
    {
        id: PAGES.BLOOD_PRESSURE,
        main: {
            inputs: [
                {
                    id: "value",
                    tag: "input",
                    name: "value",
                    for: "value",
                    inputType: "text",
                    required: true,
                    mods: {
                        hasMeasurementUnit: true,
                        measurementUnitType: PAGES.BLOOD_PRESSURE
                    },
                },
                {
                    id: "dateTime",
                    tag: "input",
                    name: "dateTime",
                    for: "dateTime",
                    inputType: "datetime-local",
                    isDefaultNow: true,
                    required: true
                },
                {
                    id: "caregiverId",
                    tag: "select",
                    name: "caregiverId",
                    for: "caregiverId",
                    dynamicKey: PAGES.CAREGIVERS,
                    required: true
                },
                {
                    id: "observations",
                    tag: "textarea",
                    name: "observations",
                    for: "observations"
                }
            ],
            buttons: [{ id: "submit" }]
        }
    },
    {
        id: PAGES.OXYGEN_SATURATION,
        main: {
            inputs: [
                {
                    id: "value",
                    tag: "input",
                    name: "value",
                    for: "value",
                    inputType: "number",
                    step: "1",
                    min: 0,
                    max: 100,
                    required: true,
                    mods: {
                        hasMeasurementUnit: true,
                        measurementUnitType: PAGES.OXYGEN_SATURATION
                    },
                },
                {
                    id: "dateTime",
                    tag: "input",
                    name: "dateTime",
                    for: "dateTime",
                    inputType: "datetime-local",
                    isDefaultNow: true,
                    required: true
                },
                {
                    id: "caregiverId",
                    tag: "select",
                    name: "caregiverId",
                    for: "caregiverId",
                    dynamicKey: PAGES.CAREGIVERS,
                    required: true
                },
                {
                    id: "observations",
                    tag: "textarea",
                    name: "observations",
                    for: "observations"
                }
            ],
            buttons: [{ id: "submit" }]
        }
    },
    {
        id: PAGES.BLOOD_GLUCOSE,
        main: {
            inputs: [
                {
                    id: "value",
                    tag: "input",
                    name: "value",
                    for: "value",
                    inputType: "number",
                    step: "1",
                    min: 50,
                    max: 300,
                    required: true,
                    mods: {
                        hasMeasurementUnit: true,
                        measurementUnitType: PAGES.BLOOD_GLUCOSE
                    }
                },
                {
                    id: "dateTime",
                    tag: "input",
                    name: "dateTime",
                    for: "dateTime",
                    inputType: "datetime-local",
                    isDefaultNow: true,
                    required: true
                },
                {
                    id: "caregiverId",
                    tag: "select",
                    name: "caregiverId",
                    for: "caregiverId",
                    dynamicKey: PAGES.CAREGIVERS,
                    required: true
                },
                {
                    id: "observations",
                    tag: "textarea",
                    name: "observations",
                    for: "observations"
                }
            ],
            buttons: [{ id: "submit" }]
        }
    },
    {
        id: PAGES.HEART_RATE,
        main: {
            inputs: [
                {
                    id: "value",
                    tag: "input",
                    name: "value",
                    for: "value",
                    inputType: "number",
                    step: "1",
                    min: 0,
                    max: 200,
                    required: true,
                    mods: {
                        hasMeasurementUnit: true,
                        measurementUnitType: PAGES.HEART_RATE
                    }
                },
                {
                    id: "dateTime",
                    tag: "input",
                    name: "dateTime",
                    for: "dateTime",
                    inputType: "datetime-local",
                    isDefaultNow: true,
                    required: true
                },
                {
                    id: "caregiverId",
                    tag: "select",
                    name: "caregiverId",
                    for: "caregiverId",
                    dynamicKey: PAGES.CAREGIVERS,
                    required: true
                },
                {
                    id: "observations",
                    tag: "textarea",
                    name: "observations",
                    for: "observations"
                }
            ],
            buttons: [{ id: "submit" }]
        }
    },

    {
      id: PAGES.MOOD,
      main: {
          inputs: [
              {
                  id: "value",
                  tag: "input",
                  name: "value",
                  for: "value",
                  inputType: "text",
                  autoCapitalize: "sentences",
                  required: true
              },
              {
                  id: "dateTime",
                  tag: "input",
                  name: "dateTime",
                  for: "dateTime",
                  inputType: "datetime-local",
                  isDefaultNow: true,
                  required: true
              },
              {
                  id: "caregiverId",
                  tag: "select",
                  name: "caregiverId",
                  for: "caregiverId",
                  dynamicKey: PAGES.CAREGIVERS,
                  required: true
              },
              {
                  id: "observations",
                  tag: "textarea",
                  name: "observations",
                  for: "observations"
              }
          ],
          buttons: [{ id: "submit" }]
      }
    },
    {
        id: PAGES.PAIN_LEVEL,
        main: {
            inputs: [
                {
                    id: "value",
                    tag: "input",
                    name: "value",
                    for: "value",
                    inputType: "number",
                    min: 0,
                    max: 10,
                    required: true
                },
                {
                    id: "dateTime",
                    tag: "input",
                    name: "dateTime",
                    for: "dateTime",
                    inputType: "datetime-local",
                    isDefaultNow: true,
                    required: true
                },
                {
                    id: "caregiverId",
                    tag: "select",
                    name: "caregiverId",
                    for: "caregiverId",
                    dynamicKey: PAGES.CAREGIVERS,
                    required: true
                },
                {
                    id: "observations",
                    tag: "textarea",
                    name: "observations",
                    for: "observations"
                }
            ],
            buttons: [{ id: "submit" }]
        }
    },
    {
        id: PAGES.SLEEP,
        main: {
            inputs: [
                {
                    id: "value",
                    tag: "select",
                    name: "value",
                    for: "value",
                    required: true,
                    options: [
                        {
                            id: "0",
                            value: 0
                        },
                        {
                            id: "1",
                            value: 1
                        },
                        {
                            id: "2",
                            value: 2
                        },
                        {
                            id: "3",
                            value: 3
                        },
                        {
                            id: "4",
                            value: 4
                        },
                        {
                            id: "5",
                            value: 5
                        },
                        {
                            id: "6",
                            value: 6
                        },
                        {
                            id: "7",
                            value: 7
                        },
                        {
                            id: "8",
                            value: 8
                        },
                        {
                            id: "9",
                            value: 9
                        },
                        {
                            id: "10",
                            value: 10
                        }
                    ]
                },
                {
                    id: "dateTime",
                    tag: "input",
                    name: "dateTime",
                    for: "dateTime",
                    inputType: "datetime-local",
                    isDefaultNow: true,
                    required: true
                },
                {
                    id: "caregiverId",
                    tag: "select",
                    name: "caregiverId",
                    for: "caregiverId",
                    dynamicKey: PAGES.CAREGIVERS,
                    required: true
                },
                {
                    id: "observations",
                    tag: "textarea",
                    name: "observations",
                    for: "observations"
                }
            ],
            buttons: [{ id: "submit" }]
        }
    },
    {
        id: PAGES.WATER_INTAKE,
        main: {
            inputs: [
                {
                    id: "value",
                    tag: "input",
                    name: "value",
                    for: "value",
                    inputType: "number",
                    step: "0.1",
                    min: 0.1,
                    max: 10,
                    required: true
                },
                {
                    id: "dateTime",
                    tag: "input",
                    name: "dateTime",
                    for: "dateTime",
                    inputType: "datetime-local",
                    isDefaultNow: true,
                    required: true
                },
                {
                    id: "caregiverId",
                    tag: "select",
                    name: "caregiverId",
                    for: "caregiverId",
                    dynamicKey: PAGES.CAREGIVERS,
                    required: true
                },
                {
                    id: "observations",
                    tag: "textarea",
                    name: "observations",
                    for: "observations"
                }
            ],
            buttons: [{ id: "submit" }]
        }
    },
    {
      id: PAGES.MEAL_ACCEPTANCE,
        main: {
            inputs: [
                {
                    id: "value",
                    tag: "input",
                    name: "value",
                    for: "value",
                    inputType: "text",
                    autoCapitalize: "sentence",
                    required: true
                },
                {
                    id: "dateTime",
                    tag: "input",
                    name: "dateTime",
                    for: "dateTime",
                    inputType: "datetime-local",
                    isDefaultNow: true,
                    required: true
                },
                {
                    id: "caregiverId",
                    tag: "select",
                    name: "caregiverId",
                    for: "caregiverId",
                    dynamicKey: PAGES.CAREGIVERS,
                    required: true
                },
                {
                    id: "observations",
                    tag: "textarea",
                    name: "observations",
                    for: "observations"
                }
            ],
            buttons: [{ id: "submit" }]
        }
    },
    {
        id: PAGES.WEIGHT,
        main: {
            inputs: [
                {
                    id: "value",
                    tag: "input",
                    name: "value",
                    for: "value",
                    inputType: "number",
                    step: "0.1",
                    min: 0,
                    max: 300,
                    required: true,
                    mods: {
                        hasMeasurementUnit: true,
                        measurementUnitType: PAGES.WEIGHT
                    }
                },
                {
                    id: "dateTime",
                    tag: "input",
                    name: "dateTime",
                    for: "dateTime",
                    inputType: "datetime-local",
                    isDefaultNow: true,
                    required: true
                },
                {
                    id: "caregiverId",
                    tag: "select",
                    name: "caregiverId",
                    for: "caregiverId",
                    dynamicKey: PAGES.CAREGIVERS,
                    required: true
                },
                {
                    id: "observations",
                    tag: "textarea",
                    name: "observations",
                    for: "observations"
                }
            ],
            buttons: [{ id: "submit" }]
        }
    },
    {
        id: PAGES.NECESSITIES,
        main: {
            inputs: [
                {
                    id: "value",
                    tag: "input",
                    name: "value",
                    for: "value",
                    inputType: "text",
                    autoCapitalize: "sentence",
                    required: true
                },
                {
                    id: "dateTime",
                    tag: "input",
                    name: "dateTime",
                    for: "dateTime",
                    inputType: "datetime-local",
                    isDefaultNow: true,
                    required: true
                },
                {
                    id: "caregiverId",
                    tag: "select",
                    name: "caregiverId",
                    for: "caregiverId",
                    dynamicKey: PAGES.CAREGIVERS,
                    required: true
                },
                {
                    id: "observations",
                    tag: "textarea",
                    name: "observations",
                    for: "observations"
                }
            ],
            buttons: [{ id: "submit" }]
        }
    },
] satisfies FormRegularTemplate[]

export const footers = [
    {
        id: PAGES.BODY_TEMPERATURE,
        buttons: [
            {
                id: "primary",
                leftIcon: icons["thermometer-fill"],
                link: `/register/${PAGES['BODY_TEMPERATURE']}`
            }
        ]
    },
    {
        id: PAGES.BLOOD_PRESSURE,
        buttons: [
            {
                id: "primary",
                leftIcon: icons["blood-pressure-line"],
                link: `/register/${PAGES['BLOOD_PRESSURE']}`
            }
        ]
    },
    {
        id: PAGES.OXYGEN_SATURATION,
        buttons: [
            {
                id: "primary",
                leftIcon: icons["oxygen-line"],
                link: `/register/${PAGES['OXYGEN_SATURATION']}`
            }
        ]
    },
    {
        id: PAGES.BLOOD_GLUCOSE,
        buttons: [
            {
                id: "primary",
                leftIcon: icons["glucose-line"],
                link: `/register/${PAGES['BLOOD_GLUCOSE']}`
            }
        ]
    },
    {
        id: PAGES.HEART_RATE,
        buttons: [
            {
                id: "primary",
                leftIcon: icons["heart-pulse-fill"],
                link: `/register/${PAGES['HEART_RATE']}`
            }
        ]
    },

    {
        id: PAGES.MOOD,
        buttons: [
            {
                id: "primary",
                leftIcon: icons["user-smile-fill"],
                link: `/register/${PAGES['MOOD']}`
            }
        ]
    },
    {
        id: PAGES.PAIN_LEVEL,
        buttons: [
            {
                id: "primary",
                leftIcon: icons["emotion-unhappy-fill"],
                link: `/register/${PAGES['PAIN_LEVEL']}`
            }
        ]
    },
    {
        id: PAGES.SLEEP,
        buttons: [
            {
                id: "primary",
                leftIcon: icons["rest-time-fill"],
                link: `/register/${PAGES['SLEEP']}`
            }
        ]
    },
    {
        id: PAGES.WATER_INTAKE,
        buttons: [
            {
                id: "primary",
                leftIcon: icons["drop-fill"],
                link: `/register/${PAGES['WATER_INTAKE']}`
            }
        ]
    },
    {
        id: PAGES.MEAL_ACCEPTANCE,
        buttons: [
            {
                id: "primary",
                leftIcon: icons["restaurant"],
                link: `/register/${PAGES['MEAL_ACCEPTANCE']}`
            }
        ]
    },
    {
        id: PAGES.WEIGHT,
        buttons: [
            {
                id: "primary",
                leftIcon: icons["weight-fill"],
                link: `/register/${PAGES['WEIGHT']}`
            }
        ]
    },
    {
        id: PAGES.NECESSITIES,
        buttons: [
            {
                id: "primary",
                leftIcon: icons["drop-fill"],
                link: `/register/${PAGES['NECESSITIES']}`
            }
        ]
    },

    {
        id: PAGES['MEDICINES'],
        buttons: [
            {
                id: "primary",
                leftIcon: icons["medicine-bottle-fill"],
                link: `/register/${PAGES['MEDICINES']}`
            }
        ]
    },
    {
        id: PAGES['ALLERGIES'],
        buttons: [
            {
                id: "primary",
                leftIcon: icons["virus-fill"],
                link: `/register/${PAGES['ALLERGIES']}`
            }
        ]
    },
    {
        id: PAGES['DOCTORS'],
        buttons: [
            {
                id: "primary",
                leftIcon: icons["stethoscope-line"],
                link: `/register/${PAGES['DOCTORS']}`,
            }
        ]
    },
    {
        id: PAGES['CAREGIVERS'],
        buttons: [
            {
                id: "primary",
                leftIcon: icons["user-fill"],
                link: `/register/${PAGES['CAREGIVERS']}`
            }
        ]
    },
    {
        id: PAGES['HEALTH_PLANS'],
        buttons: [
            {
                id: "primary",
                leftIcon: icons['first-aid-fill'],
                link: `/register/${PAGES['HEALTH_PLANS']}`
            }
        ]
    },
    {
        id: PAGES['EMERGENCY_CONTACTS'],
        buttons: [
            {
                id: "primary",
                leftIcon: icons['contacts-fill'],
                link: `/register/${PAGES['EMERGENCY_CONTACTS']}`
            }
        ]
    }
]

export const popupTypes = {
    create: {
        title: "create",
        submitLabel: "add",
        readOnly: false,
        showSubmit: true
    },
    edit: {
        title: "edit",
        submitLabel: "save",
        readOnly: false,
        showSubmit: true
    }
} satisfies Record<
    FormType,
    {
        title: string
        submitLabel: string
        readOnly: boolean
        showSubmit: boolean
    }
>

export const mainNavigationBar = {
    [PAGES.HOME]: {
        id: PAGES.HOME,
        icon: icons["hospital-line"],
        iconActive: icons["hospital-fill"],
        href: "/",
        hasText: true
    },
    [PAGES.SERVICES]: {
        id: PAGES.SERVICES,
        icon: icons["service-line"],
        iconActive: icons["service-fill"],
        href: "/services",
        hasText: true
    },
    [PAGES.PATIENT_DATA]: {
        id: PAGES.PATIENT_DATA,
        icon: icons["user-line"],
        iconActive: icons["user-fill"],
        href: "/patientData",
        hasText: true
    }
}

export const socialMedias = {
    github: {
        id: "github",
        iconFill: icons["github-fill"],
        iconLine: icons["github-line"],
        href: "https://github.com/LuizGustavo1001",
        name: "GitHub"
    }
}

export const aboutView = {
    social: [
        socialMedias['github']
    ],
    version: "2.0.0"
}