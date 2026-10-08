import { PAGES } from "../composables/usePages.js"
import { THEME_PREFERENCES as THEMES } from "../composables/useTheme.js"
import { LANGUAGES } from "../composables/useLanguage.js"

export default {
    pageTitle: {
        [PAGES.VITAL_SIGNS]: "Vital Signs",
        [PAGES.FOLLOW_UPS]: "Physiological and Behavioral Monitoring",

        [PAGES.EMERGENCY_DATA]: "Emergency Data",

        [PAGES.MEDICINES]: "Medicines",
        [PAGES.ALLERGIES]: "Allergies",
        [PAGES.DOCTORS]: "Doctors",
        [PAGES.CAREGIVERS]: "Caregivers",
        [PAGES.HEALTH_PLANS]: "Planos de Saúde",
        [PAGES.EMERGENCY_CONTACTS]: "Contatos de Emergência",

        [PAGES.IMPORT]: "Import Data",
        [PAGES.EXPORT]: "Export Data",

        [PAGES.USER_MANUAL]: "User's Manual",
        [PAGES.TERMS]: "Terms of Service",

        [PAGES.BODY_TEMPERATURE]: "Body Temperature",
        [PAGES.BLOOD_PRESSURE]: "Blood Pressure",
        [PAGES.OXYGEN_SATURATION]: "Oxygen Saturation",
        [PAGES.BLOOD_GLUCOSE]: "Glucose",
        [PAGES.HEART_RATE]: "Heart Rate",

        [PAGES.MOOD]: "Mood",
        [PAGES.PAIN_LEVEL]: "Pain Level",
        [PAGES.SLEEP]: "Slee Quality",
        [PAGES.WATER_INTAKE]: "Water Intake",
        [PAGES.MEAL_ACCEPTANCE]: "Food Acceptance",
        [PAGES.WEIGHT]: "Weight",
        [PAGES.NECESSITIES]: "Monitoring of bowel and urine",

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
        [PAGES.TERMS]: "Terms of Service",
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
        themes: {
            [THEMES.LIGHT]: {
                label: "Light Mode"
            },
            [THEMES.DARK]: {
                label: "Dark Mode"
            },
            [THEMES.SYSTEM]: {
                label: "Follow System"
            },
            [THEMES.HIGH_CONTRAST]: {
                label: "High Contrast"
            }
        },
        languages: {
            [LANGUAGES.PT_BR]: {
                label: "Portuguese Brazil"
            },
            [LANGUAGES.EN_US]: {
                label: "English"
            }
        },
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
        delete: "Delete",
        o_negative: "O-",
        o_positive: "O+",
        a_negative: "A-",
        a_positive: "A+",
        b_negative: "B-",
        b_positive: "B+",
        ab_negative: "AB-",
        ab_positive: "AB+",
        son: "Son",
        daughter: "Daughter",
        father: "Father",
        mother: "Mother",
        uncle: "Uncle",
        auntie: "Auntie",
        grandmother: "Grandmother",
        grandfather: "Grandfather",
        husband: "Husband",
        wife: "Wife",
        friend: "Friend",
        other: "Other",
        cutaneous: "Cutânea",
        oral: "Oral"
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
                    title: "Contatos de Emergência",
                    description: "Manage patient's emergency contacts"
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
                        title: "Water Ingestion"
                    },
                    [PAGES.WATER_INTAKE]: {
                        title: "Food Acceptance"
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
                        weight: {
                            title: "Weight (Kg)"
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
                                `Our system does not require sign-up with an e-mail, passwords, or remote server authentication`
                            ]
                        },
                        {
                            title: "No Tracker Cookies or Analytics",
                            regularSubtitles: [
                                `Our system does not use tracking cookies or external telemetry and behavior analytics tools`
                            ]
                        }
                    ]
                },
                devicePermissions: {
                    title: "Device Permissions",
                    subtitle: `To offer a complete experience, our system requires some specific permissions that operate strictly on the user’s device`,
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
                                `The user is responsible for preventing the physical loss of the device and may generate and download a backup file in .JSON 
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
                        title: "Terms of Service"
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

        [PAGES.VITAL_SIGNS]: {
            buttons: {
                primary: {
                    title: "Record Vital Sign"
                }
            }
        },

        [PAGES.FOLLOW_UPS]: {
            buttons: {
                primary: {
                    title: "Record Physiological / Behavioral State"
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

    formPopupTemplates: {
        name: {
            header: {
                title: "Update Patient's Name"
            },
            main: {
                inputs: {
                    usr_1: {
                        label: "Patient's Name"
                    }
                },
                buttons: {
                    submit: {
                        label: "Update Data"
                    }
                }
            }
        },
        birthDate: {
            header: {
                title: "Update Birth Date"
            },
            main: {
                inputs: {
                    bday: {
                        label: "Birth Date"
                    }
                },
                buttons: {
                    submit: {
                        label: "Update Data"
                    }
                }
            }
        },
        bloodType: {
            header: {
                title: "Update Blood Type",
            },
            main: {
                inputs: {
                    bloodType: {
                        label: "Blood Type",
                        options: {
                            o_negative: {
                                placeholder: "O-"
                            },
                            o_positive: {
                                placeholder: "O+"
                            },
                            a_negative: {
                                placeholder: "A-"
                            },
                            a_positive: {
                                placeholder: "A+"
                            },
                            b_negative: {
                                placeholder: "B-"
                            },
                            b_positive: {
                                placeholder: "B+"
                            },
                            ab_negative: {
                                placeholder: "AB-"
                            },
                            ab_positive: {
                                placeholder: "AB-"
                            }
                        }
                    }
                },
                buttons: {
                    submit: {
                        label: "Update Data"
                    }
                }
            }
        },
        weight: {
            header: {
                title: "Update Patient's Weight"
            },
            main: {
                inputs: {
                    weight: {
                        label: "Patient's Weight"
                    }
                },
                buttons: {
                    submit: {
                        label: "Update Data"
                    }
                }
            }
        },
        address: {
            header: {
                title: "Update Patient's Address"
            },
            main: {
                inputs: {
                    address: {
                        label: "Address"
                    }
                },
                buttons: {
                    submit: {
                        label: "Update Data"
                    }
                }
            }
        },
        medicines: {
            header: {
                title: "Update Medicine's Data"
            },
            main: {
                inputs: {
                    name: {
                        label: "Medicine's Name"
                    },
                    routeAdmin: {
                        label: "Administration Route",
                        options: {
                            oral: {
                                placeholder: "Oral"
                            },
                            cutaneous: {
                                placeholder: "Cutaneous"
                            }
                        }
                    },
                    dosage: {
                        label: "Dosage"
                    },
                    observations: {
                        label: "Observations"
                    }
                },
                buttons: {
                    submit: {
                        label: "Update Data"
                    }
                }
            }
        },
        caregivers: {
            header: {
                title: "Update Caregiver's Data"
            },
            main: {
                inputs: {
                    name: {
                        label: "Caregiver's Name"
                    },
                    startDate: {
                        label: "Care Start Date"
                    },
                    phone: {
                        label: "Contact Number"
                    }
                },
                buttons: {
                    submit: {
                        label: "Update Data"
                    }
                }
            }
        },
        doctors: {
            header: {
                title: "Update Doctor's Data"
            },
            main: {
                inputs: {
                    name: {
                        label: "Doctor's Name"
                    },
                    speciality: {
                        label: "Speciality"
                    },
                    phone: {
                        label: "Contact Number"
                    }
                },
                buttons: {
                    submit: {
                        label: "Update Data"
                    }
                }
            }
        },
        allergies: {
            header: {
                title: "Update Allergy's Data"
            },
            main: {
                inputs: {
                    name: {
                        label: "Allergy's Name"
                    }
                },
                buttons: {
                    submit: {
                        label: "Update Data"
                    }
                }
            }
        },
        healthPlans: {
            header: {
                title: "Update Health Plan's Data"
            },
            main: {
                inputs: {
                    name: {
                        label: "Plan's Name"
                    }
                },
                buttons: {
                    submit: {
                        label: "Update Data"
                    }
                }
            }
        },
        emergencyContacts: {
            header: {
                title: "Update Emergency Contact's Data"
            },
            main: {
                inputs: {
                    name: {
                        label: "Contact's Name"
                    },
                    kinship: {
                        label: "Kinship",
                        options: {
                            father: {
                                placeholder: "Father"
                            },
                            mother: {
                                placeholder: "Mother"
                            },
                            husband: {
                                placeholder: "Husband"
                            },
                            wife: {
                                placeholder: "Wife"
                            },
                            son: {
                                placeholder: "Son"
                            },
                            daughter: {
                                placeholder: "Daughter"
                            },
                            uncle: {
                                placeholder: "Uncle"
                            },
                            auntie: {
                                placeholder: "Auntie"
                            },
                            grandfather: {
                                placeholder: "Grandfather"
                            },
                            grandmother: {
                                placeholder: "Grandmother"
                            },
                            cousin: {
                                placeholder: "Cousin"
                            },
                            friend: {
                                placeholder: "Friend"
                            },
                            other: {
                                placeholder: "Other"
                            }
                        }
                    },
                    phone: {
                        label: "Contact Number"
                    }
                },
                buttons: {
                    submit: {
                        label: "Update Data"
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
        MedicineNotFound: {
            title: "Medicine not found"
        },
        MedicineUpdated: {
            title: "Medicine's data updated with success"
        },
        RecordUpdated: {
            title: "Monitoring's data updated with success"
        },
        RecordNotFound: {
            title: "Record not found"
        },
        NoRecords: {
            title: "No data founded"
        },
        NoRecordsByField: {
            title: "No data founded with selected field"
        },
        NoRecordsByDate: {
            title: "No data founded with selected dates"
        },
        NoRecordsByFieldAndDate: {
            title: "No data founded with selected field and date interval"
        },
        NoMonitoring: {
            title: "No monitoring founded"
        },
        InvalidDateInterval: {
            title: "Invalid date interval. Minimum date needs to be lower than maximum date"
        },
        NotificationNotFound: {
            title: "Selected notification not found"
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
        SystemDataReset: {
            title: "Patient data successfully reset"
        },
        MedicineDeleted: {
            title: "Medicine has been removed with success"
        },
        RecordRemoved: {
            title: "Selected registry has been removed with success"
        },
        generic: {
            title: "An unexpected error occurred. Try again later"
        }
    }
}