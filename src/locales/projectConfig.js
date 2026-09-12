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