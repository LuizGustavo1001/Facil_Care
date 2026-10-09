import { icons } from "../assets/icons/icons.js"
import { THEME_PREFERENCES } from "../composables/useTheme.js"
import { LANGUAGES } from "../composables/useLanguage.js"
import { PAGES } from "../composables/usePages.js"

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

export const homeView = {
    buttons: [
        {
            id: PAGES['VITAL_SIGNS'],
            color: "red",
            icon: icons["heart-fill"],
            route: `/${PAGES['MONITORING']}/${PAGES['VITAL_SIGNS']}`,
        },
        {
            id: PAGES['FOLLOW_UPS'],
            color: "yellow",
            icon: icons["mental-health-fill"],
            route: `/${PAGES['MONITORING']}/${PAGES['FOLLOW_UPS']}`
        },
        {
            id: PAGES['MEDICINES'],
            color: "green",
            icon: icons["capsule-fill"],
            route: `/${PAGES['MANAGE']}/${PAGES['MEDICINES']}`
        },
        {
            id: PAGES['CAREGIVERS'],
            color: "orange",
            icon: icons["user-fill"],
            route: `/${PAGES['MANAGE']}/${PAGES['CAREGIVERS']}`
        },
        {
            id: PAGES['DOCTORS'],
            color: "blue",
            icon: icons["stethoscope-line"],
            route: `/${PAGES['MANAGE']}/${PAGES['DOCTORS']}`
        },
        {
            id: PAGES['ALLERGIES'],
            color: "purple",
            icon: icons["virus-fill"],
            route: `/${PAGES['MANAGE']}/${PAGES['ALLERGIES']}`
        },
        {
            id: PAGES['HEALTH_PLANS'],
            color: "blue",
            icon: icons["first-aid-fill"],
            route: `/${PAGES['MANAGE']}/${PAGES['HEALTH_PLANS']}`
        },
        {
            id: PAGES['EMERGENCY_CONTACTS'],
            color: "green",
            icon: icons['contacts-fill'],
            route: `/${PAGES['MANAGE']}/${PAGES['EMERGENCY_CONTACTS']}`
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
                id: PAGES['BODY_TEMPERATURE'],
                icon: icons["thermometer-line"],
                color: "red",
                link: `/${PAGES['MONITORING']}/${PAGES['VITAL_SIGNS']}/${PAGES['BODY_TEMPERATURE']}`
            },
            {
                id: PAGES['BLOOD_PRESSURE'],
                icon: icons["blood-pressure-line"],
                color: "orange",
                link: `/${PAGES['MONITORING']}/${PAGES['VITAL_SIGNS']}/${PAGES['BLOOD_PRESSURE']}`
            },
            {
                id: PAGES['OXYGEN_SATURATION'],
                icon: icons["oxygen-line"],
                color: "blue",
                link: `/${PAGES['MONITORING']}/${PAGES['VITAL_SIGNS']}/${PAGES['OXYGEN_SATURATION']}`
            },
            {
                id: PAGES['BLOOD_GLUCOSE'],
                icon: icons["glucose-line"],
                color: "red",
                link: `/${PAGES['MONITORING']}/${PAGES['VITAL_SIGNS']}/${PAGES['BLOOD_GLUCOSE']}`
            },
            {
                id: PAGES['HEART_RATE'],
                icon: icons["heart-pulse-line"],
                color: "orange",
                link: `/${PAGES['MONITORING']}/${PAGES['VITAL_SIGNS']}/${PAGES['HEART_RATE']}`
            }
        ]
    },

    followUps: {
        items: [
            {
                id: PAGES['MOOD'],
                icon: icons["user-smile-line"],
                color: "blue",
                link: `/monitoring/${PAGES['FOLLOW_UPS']}/${PAGES['MOOD']}`
            },
            {
                id: PAGES['PAIN_LEVEL'],
                icon: icons["emotion-unhappy-line"],
                color: "red",
                link: `/${PAGES['MONITORING']}/${PAGES['FOLLOW_UPS']}/${PAGES['PAIN_LEVEL']}`
            },
            {
                id: PAGES['SLEEP'],
                icon: icons["zzz"],
                color: "blue",
                link: `/${PAGES['MONITORING']}/${PAGES['FOLLOW_UPS']}/${PAGES['SLEEP']}`
            },
            {
                id: PAGES['WATER_INTAKE'],
                icon: icons["drop-fill"],
                color: "blue",
                link: `/${PAGES['MONITORING']}/${PAGES['FOLLOW_UPS']}/${PAGES['WATER_INTAKE']}`
            },
            {
                id:PAGES['MEAL_ACCEPTANCE'],
                icon: icons["restaurant"],
                color: "orange",
                link: `/${PAGES['MONITORING']}/${PAGES['FOLLOW_UPS']}/${PAGES['MEAL_ACCEPTANCE']}`
            },
            {
                id: PAGES['WEIGHT'],
                icon: icons["weight-line"],
                color: "green",
                link: `/${PAGES['MONITORING']}/${PAGES['FOLLOW_UPS']}/${PAGES['WEIGHT']}`
            },
            {
                id: PAGES['NECESSITIES'],
                icon: icons["drop-line"],
                color: "orange",
                link: `/${PAGES['MONITORING']}/${PAGES['FOLLOW_UPS']}/${PAGES['NECESSITIES']}`
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
                    id: PAGES['EMERGENCY_DATA'],
                    icon: icons["first-aid-line"],
                    route: `/${PAGES['EMERGENCY_DATA']}`
                },
                {
                    id: PAGES['PREFERENCES'],
                    icon: icons["settings-line"],
                    route: `/${PAGES['PREFERENCES']}`
                }
            ]
        },
        {
            id: "backup",
            items: [
                {
                    id: PAGES['EXPORT'],
                    icon: icons["qr-code-line"],
                    route: `/backup/${PAGES['EXPORT']}`
                },
                {
                    id: PAGES['IMPORT'],
                    icon: icons["qr-scan-line"],
                    route: `/backup/${PAGES['IMPORT']}`
                }
            ]
        },
        {
            id: "others",
            items: [
                {
                    id: PAGES['USER_MANUAL'],
                    icon: icons["book-read-line"],
                    route: `/${PAGES['USER_MANUAL']}`
                },
                {
                    id: PAGES['TERMS'],
                    icon: icons["shield-user-line"],
                    route: `/${PAGES['TERMS']}`
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
            id: PAGES['EMERGENCY_CONTACTS'],
            icon: icons['contacts-fill'],
            component: "default",
            action: "none"
        },

        {
            id: PAGES['ALLERGIES'],
            icon: icons['virus-fill'],
            component: "default",
            action: "none"
        },

        {
            id: PAGES['HEALTH_PLANS'],
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
                    id: PAGES['DOCTORS'],
                    color: "blue",
                    icon: icons["stethoscope-line"],
                    route: `/${PAGES.MANAGE}/${PAGES['DOCTORS']}`
                },
                {
                    id: PAGES['MEDICINES'],
                    color: "green",
                    icon: icons["medicine-bottle-fill"],
                    route: `/${PAGES.MANAGE}/${PAGES['MEDICINES']}`
                }
            ]
        }
    ]
}

export const termsView = {
    sections: [
        {
            id: "consciousUse",
            icon: icons['user-fill'],
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


export const registerView = {}

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

export const formTemplates = {
    patient: {
        id: "patient",
    },
    caregivers: {
        id: "caregivers",
    },
    doctors: {
        id: "doctors",
    },
    allergies: {
        id: "allergies",
    },
    healthPlans: {
        id: "healthPlans",
    },
    emergencyContacts: {
        id: "emergencyContacts",
    },

    medicines: {
        id: "medicines",
    },
    medicinesRegistries: {
        id: "medicinesRegistries",
    },

    vitalSigns: {
        id: "vitalSigns",
    },
    followUps: {
        id: "followUps",
    }
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
    },
    {
        id: "vitalSigns",
        main: {
            inputs: [
                {
                    id: "record",
                    tag: "select",
                    name: "record",
                    for: "record",
                    options: [
                        {
                            id: "bodyTemperature",
                            value: "bodyTemperature"
                        },
                        {
                            id: "bloodPressure",
                            value: "bloodPressure"
                        },
                        {
                            id: "oxygenSaturation",
                            value: "oxygenSaturation"
                        },
                        {
                            id: "glucose",
                            value: "glucose"
                        },
                        {
                            id: "heartRate",
                            value: "heartRate"
                        }
                    ]
                },
                {
                    id: "value",
                    tag: "input",
                    name: "value",
                    for: "value",
                    inputType: "text"
                },
                {
                  id: "dateTime",
                  tag: "input",
                  inputType: "date",
                  name: "dateTime",
                  for: "dateTime"
                },
                {
                    id: "caregiverName",
                    tag: "select",
                    name: "caregiverName",
                    for: "caregiverName",
                    options: [
                        { // não informado (valor nulo no banco de dados)
                          id: "none",
                          value: "none"
                        },
                        // vem do banco de dados (coleção de caregivers dentro de patient)
                    ]
                },
                {
                    id: "observations",
                    tag: "textarea",
                    name: "observations",
                    for: "observations",
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
        id: "followUps",
        main: {
            inputs: [
                {
                    id: "record",
                    tag: "select",
                    name: "record",
                    for: "record",
                    options: [
                        {
                            id: "mood",
                            value: "mood"
                        },
                        {
                            id: "painLevel",
                            value: "painLevel"
                        },
                        {
                            id: "sleepQuality",
                            value: "sleepQuality"
                        },
                        {
                            id: "waterIntake",
                            value: "waterIntake"
                        },
                        {
                            id: "mealAcceptance",
                            value: "mealAcceptance"
                        },
                        {
                            id: "weight",
                            value: "weight"
                        },
                        {
                            id: "necessities",
                            value: "necessities"
                        }
                    ]
                },
                {
                    id: "value",
                    tag: "input",
                    name: "value",
                    for: "value",
                    inputType: "text"
                },
                {
                    id: "dateTime",
                    tag: "input",
                    inputType: "date",
                    name: "dateTime",
                    for: "dateTime"
                },
                {
                    id: "caregiverName",
                    tag: "select",
                    name: "caregiverName",
                    for: "caregiverName",
                    options: [
                        { // não informado (valor nulo no banco de dados)
                            id: "none",
                            value: "none"
                        },
                        // vem do banco de dados (coleção de caregivers dentro de patient)
                    ]
                },
                {
                    id: "observations",
                    tag: "textarea",
                    name: "observations",
                    for: "observations",
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

]

export const footers = [
    {
        id: "home",
        buttons: [
            {
                id: "primary",
                leftIcon: icons["medicine-bottle-fill"],
                link: `/form/register/${PAGES['MEDICINE_REGISTRIES']}`
            }
        ]
    },
    {
        id: PAGES['VITAL_SIGNS'],
        buttons: [
            {
                id: "primary",
                leftIcon: icons["heart-fill"],
                link: `/form/register/${PAGES["VITAL_SIGNS"]}`
            }
        ]
    },
    {
        id: PAGES['FOLLOW_UPS'],
        buttons: [
            {
                id: "primary",
                leftIcon: icons["mental-health-fill"],
                link: `/form/register/${PAGES['FOLLOW_UPS']}`
            }
        ]
    },
    {
        id: PAGES['MEDICINES'],
        buttons: [
            {
                id: "primary",
                leftIcon: icons["capsule-fill"],
                link: `/form/register/${PAGES['MEDICINES']}`
            }
        ]
    },
    {
        id: PAGES['ALLERGIES'],
        buttons: [
            {
                id: "primary",
                leftIcon: icons["virus-fill"],
                link: `/form/register/${PAGES['ALLERGIES']}`
            }
        ]
    },
    {
        id: PAGES['DOCTORS'],
        buttons: [
            {
                id: "primary",
                leftIcon: icons["stethoscope-line"],
                link: `/form/register/${PAGES['DOCTOR']}`,
            }
        ]
    },
    {
        id: PAGES['CAREGIVERS'],
        buttons: [
            {
                id: "primary",
                leftIcon: icons["user-fill"],
                link: `/form/register/${PAGES['CAREGIVERS']}`
            }
        ]
    },
    {
        id: PAGES['HEALTH_PLANS'],
        buttons: [
            {
                id: "primary",
                leftIcon: icons['first-aid-fill'],
                link: `/form/register/${PAGES['HEALTH_PLANS']}`
            }
        ]
    },
    {
        id: PAGES['EMERGENCY_CONTACTS'],
        buttons: [
            {
                id: "primary",
                leftIcon: icons['contacts-fill'],
                link: `/form/register/${PAGES['EMERGENCY_CONTACTS']}`
            }
        ]
    }
]
