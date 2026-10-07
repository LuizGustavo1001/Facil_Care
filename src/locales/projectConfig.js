import { icons } from "../assets/icons/icons.js"
import { THEME_PREFERENCES } from "../composables/useTheme.js"
import { LANGUAGES } from "../composables/useLanguage.js"

const THEME_OPTIONS = [
    { id: THEME_PREFERENCES.LIGHT },
    { id: THEME_PREFERENCES.DARK },
    { id: THEME_PREFERENCES.HIGH_CONTRAST },
    { id: THEME_PREFERENCES.SYSTEM }
]

const LANGUAGE_OPTIONS = [
    { id: LANGUAGES.PT_BR },
    { id: LANGUAGES.EN_US }
]

export const PAGES = {
    VITAL_SIGN: "vitalSigns",
    FOLLOW_UPS: "followUps",
    EMERGENCY_DATA: "emergencyData",
    MEDICINES: "medicines",
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
    ERASE: "eraseData",
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
    PAGES['VITAL_SIGN'],
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


export const homeView = {
    buttons: [
        {
            id: "vitalSigns",
            color: "red",
            icon: icons["heart-fill"],
            route: "/monitoring/vitalSigns"
        },
        {
            id: "followUp",
            color: "yellow",
            icon: icons["mental-health-fill"],
            route: "/monitoring/followUps"
        },
        {
            id: "medicine",
            color: "green",
            icon: icons["capsule-fill"],
            route: "/manage/medicines"
        },
        {
            id: "caregiver",
            color: "orange",
            icon: icons["user-fill"],
            route: "/manage/caregivers"
        },
        {
            id: "doctors",
            color: "blue",
            icon: icons["stethoscope-line"],
            route: "/manage/doctors"
        },
        {
            id: "allergies",
            color: "purple",
            icon: icons["virus-fill"],
            route: "/manage/allergies"
        },
        {
            id: "healthPlans",
            color: "blue",
            icon: icons["first-aid-fill"],
            route: "/manage/healthPlans"
        },
        {
            id: "emergencyContacts",
            color: "green",
            icon: icons['contacts-fill'],
            route: "/manage/emergencyContacts"
        }
    ]
}

export const preferencesView = {
    sections: [
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
                }
            ]
        }
    ]
}

export const monitoringViews = {
    vitalSigns: {
        items: [
            {
                id: "bodyTemperature",
                icon: icons["thermometer-line"],
                color: "red",
                link: "/monitoring/vitalSigns/bodyTemperature"
            },
            {
                id: "bloodPressure",
                icon: icons["blood-pressure-line"],
                color: "orange",
                link: "/monitoring/vitalSigns/bloodPressure"
            },
            {
                id: "oxygenSaturation",
                icon: icons["oxygen-line"],
                color: "blue",
                link: "/monitoring/vitalSigns/oxygenSaturation"
            },
            {
                id: "bloodGlucose",
                icon: icons["glucose-line"],
                color: "red",
                link: "/monitoring/vitalSigns/bloodGlucose"
            },
            {
                id: "heartRate",
                icon: icons["heart-pulse-line"],
                color: "orange",
                link: "/monitoring/vitalSigns/heartRate"
            }
        ]
    },

    followUps: {
        items: [
            {
                id: "mood",
                icon: icons["user-smile-line"],
                color: "blue",
                link: "/monitoring/followUps/mood"
            },
            {
                id: "painLevel",
                icon: icons["emotion-unhappy-line"],
                color: "red",
                link: "/monitoring/followUps/painLevel"
            },
            {
                id: "sleepQuality",
                icon: icons["zzz"],
                color: "blue",
                link: "/monitoring/followUps/sleep"
            },
            {
                id: "waterIntake",
                icon: icons["drop-fill"],
                color: "blue",
                link: "/monitoring/followUps/waterIntake"
            },
            {
                id: "mealAcceptance",
                icon: icons["restaurant"],
                color: "orange",
                link: "/monitoring/followUps/mealAcceptance"
            },
            {
                id: "weight",
                icon: icons["weight-line"],
                color: "green",
                link: "/monitoring/followUps/weight"
            },
            {
                id: "necessities",
                icon: icons["drop-line"],
                color: "orange",
                link: "/monitoring/followUps/necessities"
            }
        ]
    }
}


export const sidebar = {
    sections: [
        {
            id: "general",
            items: [
                {
                    id: "emergency",
                    icon: icons["first-aid-line"],
                    route: "/emergency"
                },
                {
                    id: "preferences",
                    icon: icons["settings-line"],
                    route: "/preferences"
                }
            ]
        },
        {
            id: "backup",
            items: [
                {
                    id: "export",
                    icon: icons["qr-code-line"],
                    route: "/backup/export"
                },
                {
                    id: "import",
                    icon: icons["qr-scan-line"],
                    route: "/backup/import"
                }
            ]
        },
        {
            id: "others",
            items: [
                {
                    id: "manual",
                    icon: icons["book-read-line"],
                    route: "/manual"
                },
                {
                    id: "terms",
                    icon: icons["shield-user-line"],
                    route: "/terms"
                }
            ]
        }
    ]
}

export const emergencyDataView = {
    sections: [
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
                    icon: icons["drop-fill"]
                },
                {
                    id: "weight",
                    color: "orange",
                    icon: icons["weight-fill"]
                },
                {
                    id: "address",
                    color: "blue",
                    icon: icons["pin-user-fill"]
                }
            ]
        },

        {
            id: "emergencyContacts",
            icon: icons['contacts-fill'],
            component: "default",
            action: "none"
        },

        {
            id: "allergies",
            icon: icons['virus-fill'],
            component: "default",
            action: "none"
        },

        {
            id: "healthPlans",
            icon: icons['first-aid-fill'],
            component: "default",
            action: "none"
        },

        {
            id: "others",
            icon: icons['book-read-fill'],
            component: "alt",
            action: "internalLink",
            buttons: [
                {
                    id: "doctors",
                    color: "blue",
                    icon: icons["stethoscope-line"],
                    route: "/manage/doctors"
                },
                {
                    id: "medicines",
                    color: "green",
                    icon: icons["medicine-bottle-fill"],
                    route: "/manage/medicines"
                }
            ]
        }
    ]
}

export const registerView = {
    pages: [
        {
            id: "administeredMedication",
            form: [
                {
                    id: "medicine",
                    inputType: "select"
                },
                {
                    id: "dosage",
                    inputType: "text"
                },
                {
                    id: "caregiver",
                    inputType: "select"
                },
                {
                    id: "observation",
                    inputType: "textarea"
                }
            ]
        },
        {
            id: "vitalSign",
            form: [
                {
                    id: "vitalSign",
                    inputType: "select"
                },
                {
                    id: "measure",
                    inputType: "text"
                },
                {
                    id: "caregiver",
                    inputType: "select"
                },
                {
                    id: "observation",
                    inputType: "textarea"
                }
            ]

        },
        {
            id: "followUp",
            form: [
                {
                    id: "topic",
                    inputType: "select"
                },
                {
                    id: "measure",
                    inputType: "text"
                }
            ]
        }
    ]
}

export const warningMessages = {
    PatientNotFound: "warning",
    PatientUpdated: "success",

    MedicineUpdated: "success",
    MedicineNotFound: "warning",

    RecordUpdated: "success",
    RecordDeleted: "success",
    RecordNotFound: "warning",
    NoRecordsByField: "error",
    NoRecordsByDate: "error",
    NoRecordsByFieldAndDate: "error",
    RecordRemoved: "success",

    InvalidDateInterval: "error",

    NotificationNotFound: "error",

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
    OfflineDevice: "warning",

    MedicineDeleted: "success",

    SystemDataReset: "success"
}

export const formPopupTemplates = [
    {
        id: "name",
        main: {
            inputs: [
                {
                    id: "usr_1",
                    tag: "input",
                    name: "name",
                    for: "name",
                    inputType: "text",
                    autoCapitalize: "words"
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
                    id: "bday",
                    tag: "input",
                    name: "birthDate",
                    for: "birthDate",
                    inputType: "date"
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
        id: "weight",
        main: {
            inputs: [
                {
                    id: "weight",
                    tag: "input",
                    name: "weight",
                    for: "weight",
                    inputType: "number",
                    autoCapitalize: "words",
                    step: "0.1",
                    min: 0
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
                    autoCapitalize: "sentences"
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
        id: "medicines",
        main: {
            inputs: [
                {
                    id: "name",
                    tag: "input",
                    inputType: "text",
                    name: "name",
                    for: "name",
                    autoCapitalize: "words"
                },
                {
                    id: "routeAdmin",
                    tag: "select",
                    name: "routeAdmin",
                    for: "routeAdmin",
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
                    id: "dosage",
                    tag: "text",
                    name: "dosage",
                    for: "dosage",
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
        id: "caregivers",
        main: {
            inputs: [
                {
                    id: "name",
                    tag: "input",
                    inputType: "text",
                    name: "name",
                    for: "name",
                    autoCapitalize: "words"
                },
                {
                    id: "startDate",
                    tag: "input",
                    inputType: "date",
                    name: "startDate",
                    for: "startDate"
                },
                {
                    id: "phone",
                    tag: "input",
                    inputType: "tel",
                    name: "phone",
                    for: "phone"
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
        id: "doctors",
        main: {
            inputs: [
                {
                    id: "name",
                    tag: "input",
                    inputType: "text",
                    name: "name",
                    for: "name",
                    autoCapitalize: "words"
                },
                {
                    id: "speciality",
                    tag: "input",
                    inputType: "text",
                    name: "speciality",
                    for: "speciality",
                    autoCapitalize: "sentences"
                },
                {
                    id: "phone",
                    tag: "input",
                    inputType: "tel",
                    name: "phone",
                    for: "phone"
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
        id: "allergies",
        main: {
            inputs: [
                {
                    id: "name",
                    tag: "input",
                    inputType: "text",
                    name: "name",
                    for: "name",
                    autoCapitalize: "sentences"
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
        id: "healthPlans",
        main: {
            inputs: [
                {
                    id: "name",
                    tag: "input",
                    inputType: "text",
                    name: "name",
                    for: "name",
                    autoCapitalize: "words"
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
        id: "emergencyContacts",
        main: {
            inputs: [
                {
                    id: "name",
                    tag: "input",
                    inputType: "text",
                    name: "name",
                    for: "name",
                    autoCapitalize: "words"
                },
                {
                    id: "kinship",
                    tag: "select",
                    name: "kinship",
                    for: "kinship",
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
                    for: "phone"
                }
            ],
            buttons: [
                {
                    id: "submit"
                }
            ]
        }
    }
]

export const footers = [
    {
        id: "home",
        buttons: [
            {
                id: "primary",
                leftIcon: icons["medicine-bottle-fill"],
                link: "/register/administeredMedication"
            }
        ]
    },
    {
        id: "vitalSigns",
        buttons: [
            {
                id: "primary",
                leftIcon: icons["heart-fill"],
                link: "/register/vitalSigns"
            }
        ]
    },
    {
        id: "followUps",
        buttons: [
            {
                id: "primary",
                leftIcon: icons["mental-health-fill"],
                link: "development"
            }
        ]
    },
    {
        id: "medicines",
        buttons: [
            {
                id: "primary",
                leftIcon: icons["capsule-fill"],
                link: "/register/medicines/"
            }
        ]
    },
    {
        id: "allergies",
        buttons: [
            {
                id: "primary",
                leftIcon: icons["virus-fill"],
                link: "/register/allergies"
            }
        ]
    },
    {
        id: "doctors",
        buttons: [
            {
                id: "primary",
                leftIcon: icons["stethoscope-line"],
                link: "/register/doctors"
            }
        ]
    },
    {
        id: "caregivers",
        buttons: [
            {
                id: "primary",
                leftIcon: icons["user-fill"],
                link: "/register/caregivers"
            }
        ]
    },
    {
        id: "healthPlans",
        buttons: [
            {
                id: "primary",
                leftIcon: icons['first-aid-fill'],
                link: "/register/healtPlans"
            }
        ]
    },
    {
        id: "emergencyContacts",
        buttons: [
            {
                id: "primary",
                leftIcon: icons['contacts-fill'],
                link: "/register/emergencyContacts"
            }
        ]
    }
]