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