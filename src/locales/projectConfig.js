import { icons } from "../assets/icons/icons.js"

export const themes = [
    {
        id: "light"
    },
    {
        id: "dark"
    },
    {
        id: "system"
    },
    {
        id: "highContrast"
    }
]

export const languages = [
    {
        id: "ptBR"
    },
    {
        id: "enUS"
    }
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
            route: "/monitoring/followUp"
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
                    options: themes
                },
                {
                    id: "languages",
                    name: "app-lang",
                    for: "app-lang",
                    event: "toggle-language",
                    options: languages
                }
            ]
        }
    ]
}

export const sidebar = {
    section: [
        {
            id: "general",
            items: [
                {
                    id: "emergency",
                    icon: icons["first-aid-line"],
                    route: "/emergency-data"
                },
                {
                    id: "preferences",
                    icon: icons["settings-line"],
                    route: "/preferences"
                }
            ]
        },
        {
            id: "import",
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

/*
* isConst:
*   - false: Every data comes from database (dynamic data)
*   - true: Some data content, at least, is constant
*/
export const emergencyDataView = {
    sections: [
        {
            id: "patientData",
            isConst: true,
            items: [
                {
                    id: "patientName",
                    onClick: "popup",
                    color: "blue",
                    icon: icons["user-line"]
                },
                {
                    id: "birthDate",
                    onClick: "popup",
                    color: "green",
                    icon: icons["cake-line"]
                },
                {
                    id: "bloodType",
                    onClick: "popup",
                    color: "red",
                    icon: icons["drop-fill"]
                },
                {
                    id: "weight",
                    onClick: "popup",
                    color: "orange",
                    icon: icons["weight-line"]
                },
                {
                    id: "address",
                    onClick: "popup",
                    color: "orange",
                    icon: icons["pin-user-line"]
                }
            ]
        },
        {
            id: "emergencyContact",
            isConst: false
        },
        {
            id: "allergies",
            isConst: false
        },
        {
            id: "healthPlans",
            isConst: false
        },
        {
            id: "others",
            isConst: true,
            items: [
                {
                    id: "doctors",
                    onClick: "internalLink",
                    color: "blue",
                    icon: icons["stethoscope-line"],
                },
                {
                    id: "medicines",
                    onClick: "internalLink",
                    color: "green",
                    icon: icons["medicine-bottle-line"]
                }
            ]
        }
    ]
}

export const vitalSignsView = {
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
}

export const followUpView = {
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

export const warningMessages = [
    {
        id: "PatientNotFound",
        type: "error"
    },
    {
        id: "PatientUpdated",
        type: "success"
    },
    {
        id: "NoRecords",
        type: "warning"
    },
    {
        id: "NoRecordsByType",
        type: "warning"
    },
    {
        id: "NoRecordsByDate",
        type: "warning"
    },
    {
        id: "NoRecordsByTypeAndDate",
        type: "warning"
    },
    {
        id: "InvalidDateInterval",
        type: "error"
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
        id: "followUp",
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
                link: "register/medicines/"
            }
        ]
    },
    {
        id: "allergies",
        buttons: [
            {
                id: "primary",
                leftIcon: icons["virus-fill"],
                link: "register/allergies"
            }
        ]
    },
    {
        id: "doctors",
        buttons: [
            {
                id: "primary",
                leftIcon: icons["stethoscope-line"],
                link: "register/doctors"
            }
        ]
    },
    {
        id: "caregivers",
        buttons: [
            {
                id: "primary",
                leftIcon: icons["user-fill"],
                link: "register/caregivers"
            }
        ]
    }
]