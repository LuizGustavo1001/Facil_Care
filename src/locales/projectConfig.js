import { icons } from "../assets/icons/icons.js"

export const homeView = {
    buttons: [
        {
            id: "vitalSigns",
            color: "red",
            icon: icons["heart-fill"],
            route: "/vital-signs"
        },
        {
            id: "monitoring",
            color: "yellow",
            icon: icons["mental-health-fill"],
            route: "/monitoring"
        },
        {
            id: "medicine",
            color: "green",
            icon: icons["capsule-fill"],
            route: "/medicine"
        },
        {
            id: "caregiver",
            color: "orange",
            icon: icons["user-fill"],
            route: "/caregiver"
        },
        {
            id: "doctors",
            color: "blue",
            icon: icons["stethoscope-line"],
            route: "/doctors"
        },
        {
            id: "allergies",
            color: "purple",
            icon: icons["virus-fill"],
            route: "/allergies"
        }
    ],
    footer: {
        buttons: [
            {
                id: "primary",
                leftIcon: icons["medicine-bottle-fill"]
            }
        ]
    }
}

export const sidebar = {
    section: [
        {
            id: "general",
            items: [
                {
                    id: "emergency",
                    icon: icons["first-aid-fill"],
                    route: "/emergency-data"
                },
                {
                    id: "preferences",
                    icon: icons["settings-fill"],
                    route: "/preferencies"
                }
            ]
        },
        {
            id: "import",
            items: [
                {
                    id: "export",
                    icon: icons["qr-code-fill"],
                    route: "/export-data"
                },
                {
                    id: "import",
                    icon: icons["qr-scan-fill"],
                    route: "/import-data"
                }
            ]
        },
        {
            id: "others",
            items: [
                {
                    id: "manual",
                    icon: icons["book-read-fill"],
                    route: "/manual"
                },
                {
                    id: "terms",
                    icon: icons["shield-user-fill"],
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
            link: "/vital-signs/bodyTemperature"
        },
        {
            id: "bloodPressure",
            icon: icons["blood-pressure-line"],
            color: "orange",
            link: "/vital-signs/bloodPressure"
        },
        {
            id: "oxygenSaturation",
            icon: icons["oxygen-line"],
            color: "blue",
            link: "/vital-signs/oxygenSaturation"
        },
        {
            id: "glucose",
            icon: icons["glucose-line"],
            color: "red",
            link: "/vital-signs/glucose"
        },
        {
            id: "heartBeat",
            icon: icons["heart-pulse-line"],
            color: "orange",
            link: "/vital-signs/heartBeat"
        }
    ],
    footer: {
        buttons: [
            {
                id: "primary",
                leftIcon: icons["heart-pulse-fill"],
                link: "/apply/vitalSigns"
            }
        ]
    }
}

export const monitoringView = {
    items: [
        {
            id: "mood",
            icon: icons["user-smile-line"],
            color: "blue",
            link: "/monitoring/mood"
        },
        {
            id: "painLevel",
            icon: icons["emotion-unhappy-line"],
            color: "red",
            link: "/monitoring/painLevel"
        },
        {
            id: "sleepQuality",
            icon: icons["zzz"],
            color: "blue",
            link: "/monitoring/sleep"
        },
        {
            id: "waterIntake",
            icon: icons["drop-fill"],
            color: "blue",
            link: "/monitoring/waterIntake"
        },
        {
            id: "mealAcceptance",
            icon: icons["restaurant"],
            color: "orange",
            link: "/monitoring/mealAcceptance"
        },
        {
            id: "weight",
            icon: icons["weight-line"],
            color: "green",
            link: "/monitoring/weight"
        },
        {
            id: "necessities",
            icon: icons["drop-line"],
            color: "orange",
            link: "/monitoring/necessities"
        }
    ],
    footer: {
        buttons: [
            {
                id: "primary",
                leftIcon: icons["mental-health-fill"],
                link: "/apply/monitoring"
            }
        ]
    }
}