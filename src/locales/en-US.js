import { PAGES } from "../composables/usePages.js"
import { THEME_PREFERENCES as THEMES } from "../composables/useTheme.js"
import { LANGUAGES } from "../composables/useLanguage.js"
import { UNITS } from "../composables/useUnitSystem.js"
import { FORM_TYPES } from "../composables/useForm.js"

export default {
    pageTitle: {
        [PAGES.VITAL_SIGNS]: "Vital Signs",
        [PAGES.FOLLOW_UPS]: "Physiological and Behavioral Monitoring",
        [PAGES.REGISTER]: "Register",

        [PAGES.EMERGENCY_DATA]: "Emergency Data",

        [PAGES.MEDICINES]: "Medicines",
        [PAGES.MEDICINE_REGISTRIES]: "Medicine Registries",
        [PAGES.ALLERGIES]: "Allergies",
        [PAGES.DOCTORS]: "Doctors",
        [PAGES.CAREGIVERS]: "Caregivers",
        [PAGES.HEALTH_PLANS]: "Health Plans",
        [PAGES.EMERGENCY_CONTACTS]: "Emergency Contacts",

        [PAGES.IMPORT]: "Import Data",
        [PAGES.EXPORT]: "Export Data",

        [PAGES.USER_MANUAL]: "User's Manual",
        [PAGES.TERMS]: "Terms",

        [PAGES.BODY_TEMPERATURE]: "Body Temperature",
        [PAGES.BLOOD_PRESSURE]: "Blood Pressure",
        [PAGES.OXYGEN_SATURATION]: "Oxygen Saturation",
        [PAGES.BLOOD_GLUCOSE]: "Blood Glucose",
        [PAGES.HEART_RATE]: "Heart Rate",

        [PAGES.MOOD]: "Mood",
        [PAGES.PAIN_LEVEL]: "Pain Level",
        [PAGES.SLEEP]: "Slee Quality",
        [PAGES.WATER_INTAKE]: "Water Intake",
        [PAGES.MEAL_ACCEPTANCE]: "Meal Acceptance",
        [PAGES.WEIGHT]: "Weight",
        [PAGES.NECESSITIES]: "Monitoring of Bowel and Urine",

        [PAGES.NOTIFICATIONS]: "Notifications",
        [PAGES.ERASE]: "Erase Data",
        registries: "Registries",
        [PAGES.PREFERENCES]: "Preferences",
    },

    meta: {
        [PAGES.HOME]: "Home",
        [PAGES.MONITORING]: "Monitoring",
        [PAGES.MANAGE]: "Manage",
        [PAGES.EMERGENCY_DATA]: "Emergency Data",
        [PAGES.PREFERENCES]: "Preferences",
        register: "Register",
        [PAGES.USER_MANUAL]: "User's Manual",
        [PAGES.TERMS]: "Terms",
        notFound: 'Page not Found',
        [PAGES.ERASE]: "Erase Data",
        [PAGES.IMPORT]: "Import Data",
        [PAGES.EXPORT]: "Export Data"
    },

    utils: {
        hello: "Hello",
        confirm: "Confirm",
        cancel: "Cancel",
        deleteAccount: "Erase Data",
        homePage: "Back to home page",
        years: "years",
        back: "Back",
        selectOption: "Select an option",
        pageFallback: {
            title: "Page not found",
            button: "Click to go to the homepage",
        },
        notFoundCard: {
            item: "No item found",
            notification: "No new notification found"
        },
        vitalSign: "Vital Sign",
        followUp: "Follow Up",
        measurements: "Measurement",
        systolic: "Systolic",
        diastolic: "Diastolic",
        delete: "Delete",
        viewAdministered: "View Administered Medications"
    },

    options: {
        speciality: {
            cardiology: "Cardiology",
            dermatology: "Dermatology",
            endocrinology: "Endocrinology",
            geriatrics: "Geriatrics",
            gynecology: "Gynecology",
            neurology: "Neurology",
            ophthalmology: "Ophthalmology",
            orthopedics: "Orthopedics",
            pediatrics: "Pediatrics",
            psychiatry: "Psychiatry",
            psychologist: "Psychologist",
            generalPractice: "General Practice",
            other: "Other"
        },
        kinship: {
            son: "Son",
            daughter: "Daughter",
            father: "Father",
            mother: "Mother",
            uncle: "Uncle",
            auntie: "Auntie",
            grandmother: "Grandmother",
            grandfather: "Grandfather",
            husband: "Husband",
            cousin: "Cousin",
            wife: "Wife",
            friend: "Friend",
            other: "Other",
        },
        routeAdmin: {
            oral: "Oral",
            cutaneous: "Cutaneous"
        },
        bloodType: {
            o_negative: "O-",
            o_positive: "O+",
            a_negative: "A-",
            a_positive: "A+",
            b_negative: "B-",
            b_positive: "B+",
            ab_negative: "AB-",
            ab_positive: "AB+"
        },
        units: {
            [UNITS.METRIC]: "Metric",
            [UNITS.IMPERIAL]: "Imperial"
        },
        themes: {
            [THEMES.LIGHT]: "Light Mode",
            [THEMES.DARK]: "Dark Mode",
            [THEMES.SYSTEM]: "Follow System",
            [THEMES.HIGH_CONTRAST]: "High Contrast"
        },
        languages: {
            [LANGUAGES.PT_BR]: "Portuguese Brazil",
            [LANGUAGES.EN_US]: "English"
        },
    },

    views: {
        [PAGES.HOME]: {
            subtitle: "Select one of the options bellow to view the desired information",

            buttons: {
                [PAGES.VITAL_SIGNS]: {
                    title: "Vital Sign Records",
                    description: "Manage daily measurements and view statistics"
                },
                [PAGES.FOLLOW_UPS]: {
                    title: "Physiological and Behavioral Monitoring",
                    description: "Manage physiological and behavioral data and view statistics"
                },
                [PAGES.MEDICINES]: {
                    title: "Medicines",
                    description: "View medications of the day and manage registered ones"
                },
                [PAGES.CAREGIVERS]: {
                    title: "Caregivers",
                    description: "Manage patient's caregivers"
                },
                [PAGES.DOCTORS]: {
                    title: "Doctors",
                    description: "Manage patient's doctors"
                },
                [PAGES.ALLERGIES]: {
                    title: "Allergies",
                    description: "Manage patient's allergies"
                },
                [PAGES.HEALTH_PLANS]: {
                    title: "Health Plans",
                    description: "Manage patient's health plans"
                },
                [PAGES.EMERGENCY_CONTACTS]: {
                    title: "Emergency Contacts",
                    description: "Manage patient's emergency contacts"
                }
            }
        },

        [PAGES.REGISTER]: {
            categories: {
                [PAGES.MEDICINE_REGISTRIES]: {
                    title: "Medicine Administration"
                },
                [PAGES.MEDICINES]: {
                    title: "Medicine"
                },

                [PAGES.BODY_TEMPERATURE]: {
                    title: "Body Temperature"
                },
                [PAGES.BLOOD_PRESSURE]: {
                    title: "Blood Pressure"
                },
                [PAGES.OXYGEN_SATURATION]: {
                    title: "Oxygen Saturation"
                },
                [PAGES.BLOOD_GLUCOSE]: {
                    title: "Blood Glucose"
                },
                [PAGES.HEART_RATE]: {
                    title: "Heart Rate"
                },

                [PAGES.MOOD]: {
                    title: "Mood"
                },
                [PAGES.PAIN_LEVEL]: {
                    title: "Pain Level"
                },
                [PAGES.SLEEP]: {
                    title: "Sleep Quality"
                },
                [PAGES.WATER_INTAKE]: {
                    title: "Water Intake"
                },
                [PAGES.MEAL_ACCEPTANCE]: {
                    title: "Meal Acceptance",
                },
                [PAGES.WEIGHT]: {
                    title: "Weight"
                },
                [PAGES.NECESSITIES]: {
                    title: "Necessities"
                },

                [PAGES.ALLERGIES]: {
                    title: "Allergy"
                },
                [PAGES.DOCTORS]: {
                    title: "Doctor"
                },
                [PAGES.CAREGIVERS]: {
                    title: "Caregiver"
                },
                [PAGES.HEALTH_PLANS]: {
                    title: "Health Plan"
                },
                [PAGES.EMERGENCY_CONTACTS]: {
                    title: "Emergency Contact"
                }
            }
        },

        [PAGES.MONITORING]: {
            [PAGES.VITAL_SIGNS]: {
                subtitle: "Select one of the options bellow to view the desired information individualy",

                items: {
                    [PAGES.BODY_TEMPERATURE]: {
                        title: "Body Temperature",
                    },
                    [PAGES.BLOOD_PRESSURE]: {
                        title: "Blood Pressure"
                    },
                    [PAGES.OXYGEN_SATURATION]: {
                        title: "Oxygen Saturation"
                    },
                    [PAGES.BLOOD_GLUCOSE]: {
                        title: "Glucose"
                    },
                    [PAGES.HEART_RATE]: {
                        title: "Heartbeat"
                    }
                }
            },

            [PAGES.FOLLOW_UPS]: {
                subtitle: "Select one of the options bellow to view the desired information individualy",

                items: {
                    [PAGES.MOOD]: {
                        title: "Mood"
                    },
                    [PAGES.PAIN_LEVEL]: {
                        title: "Pain Level"
                    },
                    [PAGES.SLEEP]: {
                        title: "Sleep Quality"
                    },
                    [PAGES.WATER_INTAKE]: {
                        title: "Water Intake"
                    },
                    [PAGES.MEAL_ACCEPTANCE]: {
                        title: "Meal Acceptance"
                    },
                    [PAGES.WEIGHT]: {
                        title: "Weight"
                    },
                    [PAGES.NECESSITIES]: {
                        title: "Bowel and Urine"
                    }
                }
            }
        },

        [PAGES.EMERGENCY_DATA]: {
            sections: {
                patient: {
                    title: "Patient Information",
                    subtitle: "Click in a option to edit its information",
                    buttons: {
                        name: {
                            title: "Full Name"
                        },
                        birthDate: {
                            title: "Birth Date",
                        },
                        bloodType: {
                            title: "Blood Type",
                        },
                        address: {
                            title: "Address"
                        }
                    }
                },

                [PAGES.EMERGENCY_CONTACTS]: {
                    title: "Emergency Contacts"
                },

                [PAGES.ALLERGIES]: {
                    title: "Known Allergies"
                },

                [PAGES.HEALTH_PLANS]: {
                    title: "Health Ensure Plans"
                },

                others: {
                    title: "Others",
                    buttons: {
                        doctors: {
                            title: "Registered Doctors"
                        },
                        medicines: {
                            title: "Registered Medicines"
                        }
                    }
                }
            },

            fallback: "No Information founded for this category"
        },

        [PAGES.MEDICINES]: {
            sections: {
                registers: {
                    title: "Registered Medicines"
                }
            }
        },

        [PAGES.ALLERGIES]: {
            sections: {
                registers: {
                    title: "Registered Allergies"
                }
            }
        },

        [PAGES.MEDICINE_REGISTRIES]: {
            sections: {
                medicines: {
                    title: "Histórico de Medicamentos Administrados"
                }
            }
        },

        [PAGES.DOCTORS]: {
            sections: {
                registers: {
                    title: "Registered Doctors"
                }
            }
        },

        [PAGES.CAREGIVERS]: {
            sections: {
                registers: {
                    title: "Registered Caregivers"
                }
            }
        },

        [PAGES.HEALTH_PLANS]: {
            sections: {
                registers: {
                    title: "Registered Health Plans"
                }
            }
        },

        [PAGES.EMERGENCY_CONTACTS]: {
            sections: {
                registers: {
                    title: "Registered Emergency Contacts"
                }
            }
        },

        [PAGES.PREFERENCES]: {
            sections: {
                general: {
                    title: "General",
                    items: {
                        themes: {
                            title: "System Theme"
                        },
                        languages: {
                            title: "System Language"
                        },
                        units: {
                            title: "Unit of Measurement"
                        }
                    }
                }
            }
        },

        [PAGES.IMPORT]: {
            sections: {
                importing: {
                    title: "Connecting to Emitter",
                    actions: [
                        "Locating emitter device",
                        "Receiving and applying patient data on database",
                        "Patient data imported with success",
                        "Back to home page",
                        "Try via local file"
                    ]
                },

                localFile: {
                    title: "Import Data via Local File",
                    subtitle: "Select a previously exported backup file to retore patient information",
                    actions: [
                        "Importing Data",
                        "Select JSON file"
                    ]
                }
            }
        },

        [PAGES.EXPORT]: {
            subtitle: "Select one of the options down bellow to export patient data",

            sections: {
                tabSelector: {
                    qrCode: {
                        title: "Via QR Code"
                    },
                    json: {
                        title: "Backup File"
                    }
                },
                cardQR: {
                    title: "Sharing via QR Code (P2P)",
                    regularSubtitles: [
                        "Generate a QR Code to transfer patient data directly to another device",
                    ],
                    destructiveSubtitles: [
                        "Obs: You needs a network connection to generate QR Code"
                    ],
                    actions: [
                        "Generate Tranfer QR Code",
                        "Creating QR Code",
                        "Awaiting other device read",
                        "Cancel QR Code",
                        "Conexão Estabelecida! Enviando dados Connection Established",
                        "Data Transfer Completed Successfully",
                        "New Transfer"
                    ]
                },
                cardJSON:{
                    title: "Local Backup (.json)",
                    regularSubtitles: [
                        "Download a raw copy (file) of the patient data",
                    ],
                    actions: [
                        "Exporting",
                        "Download JSON File"
                    ]
                }
            }
        },

        [PAGES.ERASE]: {
            sections: {
                erase: {
                    title: "Erase Patient Data",

                    regularSubtitles: [
                        "By clicking the button below, ALL patient data will be reset to the default"
                    ],
                    destructiveSubtitles: [
                        "Make sure to export the patient data if you want to save them"
                    ],
                    buttons: [
                        "Reset Patient Data"
                    ],
                    confirmDelete: "Are you sure you want to reset patient data to the default",
                    successDelete: "Patient data reset to the default with success"
                }
            }
        },

        [PAGES.USER_MANUAL]: {

        },

        [PAGES.TERMS]: {
            sections: {
                consciousUse: {
                    title: "Disclaimer and Conscious Use",
                    contents: [
                        {
                            title: "Registered Data Responsiblity",
                            regularSubtitles: [
                                `FacilCare acts strictly as a tool to assist with and organize the caregiver's routine`,
                                `We are not responsible for incorrect dosage, schedules, or the medicine name registered, as it 
                                is the sole responsibility of the user to register and verify the data correctly`
                            ]
                        },
                        {
                            title: "Medical Warning",
                            regularSubtitles: [
                                `This app does not replace professional medical opinion, diagnosis, prescription, or monitoring. 
                                In case of a health emergency, immediately contact the emergency services or the doctors listed in the patient's record`
                            ]
                        }
                    ]
                },
                dataPrivacy: {
                    title: "Data Privacy",
                    contents: [
                        {
                            title: "Where is Your Data Stored?",
                            regularSubtitles: [
                                `All personal data (name, age, blood type, and emergency contacts, for example), 
                                 physiological registries (vital signs, mood, sleep, and others), and medical history are stored only 
                                 on the user's device, using the embedded browser's database (IndexedDB)`
                            ]
                        },
                        {
                            title: "Without Cloud Servers",
                            regularSubtitles: [
                                `FacilCare does not have a cloud database or central storage servers. Personal patient data will never be sent, 
                                collected, or processed by developers or third parties in a deliberate way`
                            ]
                        }
                    ]
                },
                telemetry: {
                    title: "Absence of Trackers and Telemetry",
                    contents: [
                        {
                            title: "No Accounts or External Sign-in",
                            regularSubtitles: [
                                `The system does not require sign-up with an e-mail, passwords, or remote server authentication`
                            ]
                        },
                        {
                            title: "No Tracker Cookies or Analytics",
                            regularSubtitles: [
                                `The system does not use tracking cookies or external telemetry and behavior analytics tools`
                            ]
                        }
                    ]
                },
                devicePermissions: {
                    title: "Device Permissions",
                    subtitle: `To offer a complete experience, the system requires some specific permissions that operate strictly on the user’s device`,
                    contents: [
                        {
                            title: "Notifications",
                            regularSubtitles: [
                                `Notifications are used only to trigger visual and sound alerts at the exact administration time for each registered medication`
                            ]
                        },
                        {
                            title: "Storage Persistence",
                            regularSubtitles: [
                                `The application requests permission from the browser to ensure that the operating system does not delete the database during 
                                the device's automatic memory-clearing routines`
                            ]
                        }
                    ]
                },
                dataManagement: {
                    title: "Data Exchange, Backups and Transfer Between Device",
                    contents: [
                        {
                            title: "Manual Backup (JSON)",
                            regularSubtitles: [
                                `The user is responsible for preventing the physical loss of the device and may generate and download a backup file in '.JSON' 
                                format at any time`
                            ]
                        },
                        {
                            title: "Data Tranfer",
                            regularSubtitles: [
                                `When choosing to transfer data to another device via QR Code, FácilCare establishes a direct peer-to-peer connection between the two browsers`,
                                `Network Note: A temporary internet connection is required to initially establish P2P pairing via QR code. No patient data is stored on that 
                                server—data traffic moves directly between the two devices`
                            ]
                        }
                    ]
                },
                dataExclusion: {
                    title: "Data Exclusion",
                    contents: [
                        {
                            title: "Cleaning Cache/Browser Storage",
                            regularSubtitles: [
                                `Since the data resides strictly within your browser, you can permanently delete it at any time by clearing the browser cache/storage for this site or by 
                                using the system's own reset option`
                            ]
                        }
                    ]
                }
            }
        }
    },

    sidebar: {
        sections: {
            general: {
                title: "General",
                items: {
                    [PAGES.EMERGENCY_DATA]: {
                        title: "Emergency Data"
                    },
                    [PAGES.PREFERENCES]: {
                        title: "Preferences"
                    }
                }
            },

            backup: {
                title: "Manage Data",
                items: {
                    [PAGES.EXPORT]: {
                        title: "Export Data"
                    },
                    [PAGES.IMPORT]: {
                        title: "Import Data"
                    }
                }
            },

            others: {
                title: "Others",
                items: {
                    [PAGES.USER_MANUAL]: {
                        title: "User's Manual"
                    },
                    [PAGES.TERMS]: {
                        title: "Terms"
                    }
                }
            }
        }
    },

    footer: {
        [PAGES.HOME]: {
            buttons: {
                primary: {
                    title: "Administer Medication"
                }
            }
        },

        [PAGES.BODY_TEMPERATURE]: {
            buttons: {
                primary: {
                    title: "Record New Body Temperature"
                }
            }
        },
        [PAGES.BLOOD_PRESSURE]: {
            buttons: {
                primary: {
                    title: "Record New Blood Pressure"
                }
            }
        },
        [PAGES.OXYGEN_SATURATION]: {
            buttons: {
                primary: {
                    title: "Record New Oxygen Saturation"
                }
            }
        },
        [PAGES.BLOOD_GLUCOSE]: {
            buttons: {
                primary: {
                    title: "Record New Blood Glucose"
                }
            }
        },
        [PAGES.HEART_RATE]: {
            buttons: {
                primary: {
                    title: "Record New Heart Rate"
                }
            }
        },

        [PAGES.MOOD]: {
            buttons: {
                primary: {
                    title: "Record New Mood"
                }
            }
        },
        [PAGES.PAIN_LEVEL]: {
            buttons: {
                primary: {
                    title: "Record New Pain Level"
                }
            }
        },
        [PAGES.SLEEP]: {
            buttons: {
                primary: {
                    title: "Record New Sleep Quality"
                }
            }
        },
        [PAGES.WATER_INTAKE]: {
            buttons: {
                primary: {
                    title: "Record New Water Intake"
                }
            }
        },
        [PAGES.MEAL_ACCEPTANCE]: {
            buttons: {
                primary: {
                    title: "Record New Meal Acceptance"
                }
            }
        },
        [PAGES.WEIGHT]: {
            buttons: {
                primary: {
                    title: "Record New Weight"
                }
            }
        },
        [PAGES.NECESSITIES]: {
            buttons: {
                primary: {
                    title: "Record New Necessities"
                }
            }
        },

        [PAGES.MEDICINES]: {
            buttons: {
                primary: {
                    title: "Record New Medicine"
                }
            }
        },

        [PAGES.MEDICINE_REGISTRIES]: {
            buttons: {
                primary: {
                    title: "Administer Medicine"
                }
            }
        },

        [PAGES.ALLERGIES]: {
            buttons: {
                primary: {
                    title: "Record new Allergy"
                }
            }
        },

        [PAGES.DOCTORS]: {
            buttons: {
                primary: {
                    title: "Record New Doctor"
                }
            }
        },

        [PAGES.CAREGIVERS]: {
            buttons: {
                primary: {
                    title: "Record New Caregiver"
                }
            }
        },

        [PAGES.HEALTH_PLANS]: {
            buttons: {
                primary: {
                    title: "Record New Health Plan"
                }
            }
        },

        [PAGES.EMERGENCY_CONTACTS]: {
            buttons: {
                primary: {
                    title: "Record New Emergency Contact"
                }
            }
        }
    },

    [PAGES.NOTIFICATIONS]: {
        title: "Notifications",
        markAsRead: "Mark all as read"
    },

    charts: {
        filters: {
            today: {
                title: "Today"
            },
            week: {
                title: "7 days"
            },
            twoWeeks: {
                title: "14 days"
            },
            threeWeeks: {
                title: "21 days"
            },
            month: {
                title: "30 days"
            },
            twoMonths: {
                title: "60 days"
            },
            all: {
                title: "All"
            }
        },
        fallback: "No chart to the selected element",
        [PAGES.VITAL_SIGNS]: {
            fallback: "No valid measurement to display",

            [PAGES.BLOOD_PRESSURE]: {
                y_axis: "Pressão Arterial",
                x_axis: "Measurement Date",
                values: {
                    systolic: "Systolic",
                    diastolic: "Diastolic"
                }
            },
            [PAGES.BODY_TEMPERATURE]: {
                y_axis: "Body Temperature",
                x_axis: "Measurement Date",
                values: {
                    value: "Body Temperature"
                }
            },
            [PAGES.OXYGEN_SATURATION]: {
                y_axis: "Oxygen Saturation",
                x_axis: "Measurement Date",
                values: {
                    value: "Oxygen Saturation"
                }
            },
            [PAGES.BLOOD_GLUCOSE]: {
                y_axis: "Blood Glucose",
                x_axis: "Measurement Date",
                values: {
                    value: "Blood Glucose"
                }
            },
            [PAGES.HEART_RATE]: {
                y_axis: "Heart Rate",
                x_axis: "Measurement Date",
                values: {
                    value: "Heart Rate"
                }
            }
        },

    },

    formPopupTypes: {
        [FORM_TYPES.CREATE]: {
            title: "Create"
        },
        [FORM_TYPES.EDIT]: {
            title: "Update"
        }
    },

    formTemplates: {
        name: {
            header: {
                title: "Patient's Name"
            },
            main: {
                inputs: {
                    name: {
                        label: "Patient's Name",
                        placeholder: "ex: Joshua Canny"
                    }
                }
            }
        },
        birthDate: {
            header: {
                title: "Birth Date"
            },
            main: {
                inputs: {
                    birthDate: {
                        label: "Birth Date"
                    }
                }
            }
        },
        bloodType: {
            header: {
                title: "Blood Type",
            },
            main: {
                inputs: {
                    bloodType: {
                        label: "Blood Type"
                    }
                }
            }
        },
        address: {
            header: {
                title: "Patient Address"
            },
            main: {
                inputs: {
                    address: {
                        label: "Address",
                        placeholder: "969 Cox Rd - Gastonia, NC"
                    }
                }
            }
        },

        [PAGES.BODY_TEMPERATURE]: {
            header: {
                title: "Body Temperature Registry",
            },
            main: {
                inputs: {
                    value: {
                        label: "Temperature",
                        placeholder: "ex: 33"
                    },
                    dateTime: {
                        label: "Measurement Date-Time"
                    },
                    caregiverId: {
                        label: "Caregiver Responsible"
                    },
                    observations: {
                        label: "Observations",
                        placeholder: "Mention any specific detail..."
                    }
                }
            }
        },

        [PAGES.BLOOD_PRESSURE]: {
            header: {
                title: "Blood Pressure Registry",
            },
            main: {
                inputs: {
                    value: {
                        label: "Blood Pressure",
                        placeholder: "ex: 120/80"
                    },
                    dateTime: {
                        label: "Measurement Date-Time"
                    },
                    caregiverId: {
                        label: "Caregiver Responsible"
                    },
                    observations: {
                        label: "Observations",
                        placeholder: "Mention any specific detail..."
                    }
                }
            }
        },

        [PAGES.OXYGEN_SATURATION]: {
            header: {
                title: "Oxygen Saturation Registry",
            },
            main: {
                inputs: {
                    value: {
                        label: "Saturation",
                        placeholder: "ex: 99"
                    },
                    dateTime: {
                        label: "Measurement Date-Time"
                    },
                    caregiverId: {
                        label: "Caregiver Responsible"
                    },
                    observations: {
                        label: "Observations",
                        placeholder: "Mention any specific detail..."
                    }
                }
            }
        },

        [PAGES.BLOOD_GLUCOSE]: {
            header: {
                title: "Blood Glucose Registry",
            },
            main: {
                inputs: {
                    value: {
                        label: "Glucose",
                        placeholder: "ex: 120"
                    },
                    dateTime: {
                        label: "Measurement Date-Time"
                    },
                    caregiverId: {
                        label: "Caregiver Responsible"
                    },
                    observations: {
                        label: "Observations",
                        placeholder: "Mention any specific detail..."
                    }
                }
            }
        },

        [PAGES.HEART_RATE]: {
            header: {
                title: "Heart Rate Registry",
            },
            main: {
                inputs: {
                    value: {
                        label: "Heart Rate",
                        placeholder: "ex: 75"
                    },
                    dateTime: {
                        label: "Measurement Date-Time"
                    },
                    caregiverId: {
                        label: "Caregiver Responsible"
                    },
                    observations: {
                        label: "Observations",
                        placeholder: "Mention any specific detail..."
                    }
                }
            }
        },

        [PAGES.MOOD]: {
            header: {
                title: "Mood Registry",
            },
            main: {
                inputs: {
                    value: {
                        label: "Mood Description",
                        placeholder: "ex: The patient appears anxious about the tests that will be performed today...."
                    },
                    dateTime: {
                        label: "Measurement Date-Time"
                    },
                    caregiverId: {
                        label: "Caregiver Responsible"
                    },
                    observations: {
                        label: "Observations",
                        placeholder: "Mention any specific detail..."
                    }
                }
            }
        },

        [PAGES.PAIN_LEVEL]: {
            header: {
                title: "Pain Level Registry",
            },
            main: {
                inputs: {
                    value: {
                        label: "Pain Level (0 a 10)",
                        placeholder: "ex: 4"
                    },
                    dateTime: {
                        label: "Measurement Date-Time"
                    },
                    caregiverId: {
                        label: "Caregiver Responsible"
                    },
                    observations: {
                        label: "Observations",
                        placeholder: "Mention any specific detail..."
                    }
                }
            }
        },

        [PAGES.SLEEP]: {
            header: {
                title: "Sleep Quality Registry",
            },
            main: {
                inputs: {
                    value: {
                        label: "Sleep Quality (0 throught 10)",
                        placeholder: "ex: 4"
                    },
                    dateTime: {
                        label: "Measurement Date-Time"
                    },
                    caregiverId: {
                        label: "Caregiver Responsible"
                    },
                    observations: {
                        label: "Observations",
                        placeholder: "Mention any specific detail..."
                    }
                }
            }
        },

        [PAGES.WATER_INTAKE]: {
            header: {
                title: "Water Intake Registry",
            },
            main: {
                inputs: {
                    value: {
                        label: "Amount (liters)",
                        placeholder: "ex: 1.5"
                    },
                    dateTime: {
                        label: "Measurement Date-Time"
                    },
                    caregiverId: {
                        label: "Caregiver Responsible"
                    },
                    observations: {
                        label: "Observations",
                        placeholder: "Mention any specific detail..."
                    }
                }
            }
        },

        [PAGES.MEAL_ACCEPTANCE]: {
            header: {
                title: "Meal Acceptance Registry",
            },
            main: {
                inputs: {
                    value: {
                        label: "Acceptance Description",
                        placeholder: "ex: The patient ate without any chewing difficulties...."
                    },
                    dateTime: {
                        label: "Measurement Date-Time"
                    },
                    caregiverId: {
                        label: "Caregiver Responsible"
                    },
                    observations: {
                        label: "Observations",
                        placeholder: "Mention any specific detail..."
                    }
                }
            }
        },

        [PAGES.WEIGHT]: {
            header: {
                title: "Weight Registry",
            },
            main: {
                inputs: {
                    value: {
                        label: "Weight (Kg)",
                        placeholder: "ex: 65"
                    },
                    dateTime: {
                        label: "Measurement Date-Time"
                    },
                    caregiverId: {
                        label: "Caregiver Responsible"
                    },
                    observations: {
                        label: "Observations",
                        placeholder: "Mention any specific detail..."
                    }
                }
            }
        },

        [PAGES.NECESSITIES]: {
            header: {
                title: "Necessities Registry",
            },
            main: {
                inputs: {
                    value: {
                        label: "Description",
                        placeholder: "ex: Patient evacuating normally..."
                    },
                    dateTime: {
                        label: "Measurement Date-Time"
                    },
                    caregiverId: {
                        label: "Caregiver Responsible"
                    },
                    observations: {
                        label: "Observations",
                        placeholder: "Mention any specific detail..."
                    }
                }
            }
        },

        [PAGES.MEDICINES]: {
            header: {
                title: "Medicine Data"
            },
            main: {
                inputs: {
                    name: {
                        label: "Medicine's Name",
                        placeholder: "Tylenol - 500mg"
                    },
                    routeAdmin: {
                        label: "Administration Route"
                    },
                    administrationTimes: {
                        label: "Horários de Administração"
                    },
                    observations: {
                        label: "Observations",
                        placeholder: "Observations here"
                    }
                }
            }
        },
        [PAGES.MEDICINE_REGISTRIES]: {
            header: {
                title: "Medicine Registry"
            },
            main: {
                inputs: {
                    medicineId: {
                        label: "Medication Name"
                    },
                    dosage: {
                        label: "Medication Dosage",
                        placeholder: "ex: 1 pill"
                    },
                    adminTime: {
                        label: "Administration Time",
                    },
                    observations: {
                        label: "Observations",
                        placeholder: "Observations here"
                    }
                }
            }
        },
        [PAGES.CAREGIVERS]: {
            header: {
                title: "Caregiver Data"
            },
            main: {
                inputs: {
                    name: {
                        label: "Caregiver's Name",
                        placeholder: "ex: Jane Doe"
                    },
                    startDate: {
                        label: "Care Start Date"
                    },
                    phone: {
                        label: "Contact Number",
                        placeholder: "(XXX) XXX-XXXX"
                    }
                }
            }
        },
        [PAGES.DOCTORS]: {
            header: {
                title: "Doctor Data"
            },
            main: {
                inputs: {
                    name: {
                        label: "Doctor's Name",
                        placeholder: "ex: Robert Johnson"
                    },
                    speciality: {
                        label: "Speciality"
                    },
                    phone: {
                        label: "Contact Number",
                        placeholder: "(XXX) XXX-XXXX"
                    }
                }
            }
        },
        [PAGES.ALLERGIES]: {
            header: {
                title: "Allergy Data"
            },
            main: {
                inputs: {
                    name: {
                        label: "Allergy's Name",
                        placeholder: "ex: Penicillin allergy"
                    }
                }
            }
        },
        [PAGES.HEALTH_PLANS]: {
            header: {
                title: "Health Plan Data"
            },
            main: {
                inputs: {
                    name: {
                        label: "Plan's Name",
                        plan: "SUS plan"
                    }
                }
            }
        },
        [PAGES.EMERGENCY_CONTACTS]: {
            header: {
                title: "Emergency Contact Data"
            },
            main: {
                inputs: {
                    name: {
                        label: "Contact's Name",
                        placeholder: "ex: William Larkin"
                    },
                    kinship: {
                        label: "Kinship",
                    },
                    phone: {
                        label: "Contact Number",
                        placeholder: "(XXX) XXX-XXXX"
                    }
                }
            }
        }
    },

    confirmPopupTemplates: {
        deleteConfirm: {
            title: "Are you sure that you want to remove the selected {item}"
        },
        resetData: {
            title: "Are you sure that you want to reset patient's data to default"
        }
    },

    warningMessages: {
        PatientNotFound: {
            title: "Patient not found"
        },
        PatientUpdated: {
            title: "Patient's data updated with success"
        },
        ItemNotFound: {
            title: "Item not found"
        },

        SystemDataReset: {
            title: "The patient data was reset successfully"
        },
        NotificationNotFound: {
            title: "The selected notification was not found"
        },

        NoVitalSignFound: {
            title: "No vital sign was found"
        },
        NoVitalSignByField: {
            title: "No vital sign was found based on the selected field"
        },
        NoVitalSignByDate: {
            title: "No vital sign was found based on the selected date interval"
        },
        NoVitalSignByFieldAndDate: {
            title: "No vital sign was found based on the selected date interval, and the field"
        },
        VitalSignNotFound: {
            title: "The selected vital sign not found"
        },
        VitalSignUpdated: {
            title: "The selected vital sign was updated successfully"
        },
        VitalSignDeleted: {
            title: "The selected vital sing was deleted successfully"
        },
        VitalSignCreated: {
            title:  "The vital sign was added successfully"
        },

        NoFollowUpFound: {
            title: "No follow up was found"
        },
        NoFollowUpByField: {
            title: "No follow up was found based on the selected field"
        },
        NoFollowUpByDate: {
            title: "No follow up was found based on the selected date interval"
        },
        NoFollowUpByFieldAndDate: {
            title: "No follow up was found based on the selected date interval, and the field"
        },
        FollowUpNotFound: {
            title: "The selected follow up was not found"
        },
        FollowUpUpdated: {
            title: "The selected follow up was updated successfully"
        },
        FollowUpDeleted: {
            title: "The selected follow up was deleted successfully"
        },
        FollowUpCreated: {
            title:  "The allergy was added successfully"
        },

        NoAllergyFound: {
            title: "No allergy was found"
        },
        AllergyNotFound: {
            title: "The selected allergy was not found"
        },
        AllergyUpdated: {
            title: "The selected allergy was updated successfully"
        },
        AllergyDeleted: {
            title: "The selected allergy was deleted successfully"
        },
        AllergyCreated: {
            title:  "The allergy was added successfully"
        },
        AllergyCreationFailed: {
            title: "Error trying to add new allergy, try again later"
        },
        AllergyUpdateFailed: {
            title: "Error trying to update allergy data, try again later"
        },
        AllergyDeleteFailed: {
            title: "Error trying to remove allergy, try again later"
        },

        NoCaregiverFound: {
            title:  "No caregiver was found"
        },
        CaregiverNotFound: {
            title: "The selected caregiver was not found"
        },
        CaregiverUpdated: {
            title:  "The selected caregiver was updated successfully"
        },
        CaregiverDeleted: {
            title: "The selected caregiver was deleted successfully"
        },
        CaregiverCreated: {
            title: "The caregiver was added successfully"
        },
        CaregiverCreationFailed: {
            title: "Error trying to add new caregiver, try again later"
        },
        CaregiverUpdateFailed: {
            title: "Error trying to update caregiver data, try again later"
        },
        CaregiverDeleteFailed: {
            title: "Error trying to remove caregiver, try again later"
        },

        NoDoctorFound: {
            title:  "No doctor was found"
        },
        DoctorNotFound: {
            title: "The selected doctor was not found"
        },
        DoctorUpdated: {
            title: "The selected doctor was updated successfully"
        },
        DoctorDeleted: {
            title: "The selected doctor was deleted successfully"
        },
        DoctorCreated: {
            title: "The doctor was added successfully"
        },
        DoctorCreationFailed: {
            title: "Error trying to add new doctor, try again later"
        },
        DoctorUpdateFailed: {
            title: "Error trying to update doctor data, try again later"
        },
        DoctorDeleteFailed: {
            title: "Error trying to remove doctor, try again later"
        },

        NoEmergencyContactFound: {
            title:  "No emergency contact was found"
        },
        EmergencyContactNotFound: {
            title: "The selected emergency contact was not found"
        },
        EmergencyContactUpdated: {
            title: "The selected emergency contact was updated successfully"
        },
        EmergencyContactDeleted: {
            title: "The selected emergency contact was deleted successfully"
        },
        EmergencyContactCreated: {
            title: "The emergency contact was added successfully"
        },
        EmergencyContactCreationFailed: {
            title: "Error trying to add new emergency contact, try again later"
        },
        EmergencyContactUpdateFailed: {
            title: "Error trying to update emergency contact data, try again later"
        },
        EmergencyContactDeleteFailed: {
            title: "Error trying to remove emergency contact, try again later"
        },

        NoHealthPlanFound: {
            title:  "No health plan was found"
        },
        HealthPlanNotFound: {
            title: "The selected health plan contact was not found"
        },
        HealthPlanUpdated: {
            title: "The selected health plan was updated successfully"
        },
        HealthPlanDeleted: {
            title: "The selected health plan was deleted successfully"
        },
        HealthPlanCreated: {
            title: "The health plan was added successfully"
        },
        HealthPlanCreationFailed: {
            title: "Error trying to add new health plan, try again later"
        },
        HealthPlanUpdateFailed: {
            title: "Error trying to update health plan data, try again later"
        },
        HealthPlanDeleteFailed: {
            title: "Error trying to remove health plan, try again later"
        },

        NoMedicineFound: {
            title: "No medicine was found"
        },
        MedicineNotFound: {
            title: "The selected medicine was not found"
        },
        MedicineUpdated: {
            title: "The selected medicine was updated successfully"
        },
        MedicineDeleted: {
            title: "The selected medicine was deleted successfully"
        },
        MedicineCreated: {
            title: "The medicine was added successfully"
        },
        MedicineCreationFailed: {
            title: "Error trying to add new medicine, try again later"
        },
        MedicineUpdateFailed: {
            title: "Error trying to update medicine data, try again later"
        },
        MedicineDeleteFailed: {
            title: "Error trying to remove medicine, try again later"
        },

        NoMedicineRegistryFound: {
            title: "No medicine registries found"
        },
        MedicineRegistryNotFound: {
            title: "Selected medicine registry not found"
        },
        MedicineRegistryUpdated: {
            title: "The selected medicine registry was updated successfully"
        },
        MedicineRegistryDeleted: {
            title: "The selected medicine registry was deleted successfully"
        },
        MedicineRegistryCreated: {
            title: "The medicine registry was added successfully"
        },
        MedicineRegistryCreationFailed: {
            title: "Error trying to add new medicine registry, try again later"
        },
        MedicineRegistryUpdateFailed: {
            title: "Error trying to update medicine registry data, try again later"
        },
        MedicineRegistryDeleteFailed: {
            title: "Error trying to remove medicine registry, try again later"
        },

        InvalidDateInterval: {
            title: "Invalid date interval. Minimum date needs to be lower than maximum date"
        },

        ExportFailed: {
            title: "Error trying to export patient data"
        },
        ImportFailed: {
            title: "Error trying to import patient data"
        },
        P2PExportFailed: {
            title: "Error trying export patient data via QR Code"
        },
        P2PConnectionInterrupted: {
            title: "Connection between emitter and receiver interrupted befere conclusion"
        },
        P2PImportFailed: {
            title: "Error trying to import patient data via QR Code"
        },
        P2PReceiveFailed: {
            title: "Error receiving patient data via QR Code"
        },
        HostNotFound: {
            title: "Data emitter not found. Try again later "
        },
        OfflineDevice: {
            title: "Your device is offline. Try again when online"
        },
        QRCodeGenFailed: {
            title: "Error generating QR Code"
        },
        JSONImportSuccess: {
            title: "Data imported with success"
        },
        exportJSONSuccess: {
            title: "Data exported with success"
        },

        generic: {
            title: "An unexpected error occurred. Try again later"
        }
    }
}