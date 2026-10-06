export default {
    pageTitle: {
        vitalSigns: "Vital Signs",
        followUps: "Physiological and Behavioral Monitoring",
        emergencyData: "Emergency Data",
        medicines: "Medicines",
        allergies: "Allergies",
        doctors: "Doctors",
        caregivers: "Caregivers",
        preferences: "Preferences",
        import: "Import Data",
        export: "Export Data",
        userManual: "User's Manual",
        terms: "Terms of Service",
        bodyTemperature: "Body Temperature",
        bloodPressure: "Blood Pressure",
        oxygenSaturation: "Oxygen Saturation",
        bloodGlucose: "Glucose",
        heartRate: "Heart Rate",
        mood: "Mood",
        painLevel: "Pain Level",
        sleep: "Slee Quality",
        waterIntake: "Water Intake",
        mealAcceptance: "Food Acceptance",
        weight: "Weight",
        necessities: "Monitoring of bowel and urine",
        notifications: "Notifications",
        erase: "Erase Data"
    },

    meta: {
        home: "Home",
        monitoring: "Monitoring",
        monitoringOverview: "Monitoring",
        manageOverview: "Manage",
        emergencyData: "Emergency Data",
        preferences: "Preferences",
        register: "Register",
        backup: "Backup",
        manual: "User's Manual",
        terms: "Terms of Service",
        notifications: "Notifications",
        notFound: 'Page not Found',
        erase: "Erase Data",
        import: "Import Data",
        export: "Export Data"
    },

    utils: {
        hello: "Hello",
        confirm: "Confirm",
        cancel: "Cancel",
        deleteAccount: "Erase Data",
        homePage: "Back to home page",
        years: "years",
        themes: {
            light: {
                label: "Light Mode"
            },
            dark: {
                label: "Dark Mode"
            },
            system: {
                label: "Follow System"
            },
            highContrast: {
                label: "High Contrast"
            }
        },
        languages: {
            ptBR: {
                label: "Portuguese Brazil"
            },
            enUS: {
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
        delete: "Delete"
    },

    views: {
        home: {
            subtitle: "Select one of the options bellow to view the desired information",
            buttons: {
                vitalSigns: {
                    title: "Vital Sign Records",
                    description: "Manage daily measurements"
                },
                followUp: {
                    title: "Physiological and Behavioral Monitoring",
                    description: "Manage physiological and behavioral data"
                },
                medicine: {
                    title: "Medicines",
                    description: "Manage medicines used by the patient"
                },
                caregiver: {
                    title: "Caregivers",
                    description: "Manage patient's caregivers"
                },
                doctors: {
                    title: "Doctors",
                    description: "Manage patient's doctors"
                },
                allergies: {
                    title: "Allergies",
                    description: "Manage patient's allergies"
                }
            }
        },
        vitalSigns: {
            subtitle: "Select one of the options bellow to view the desired information individualy",
            items: {
                bodyTemperature: {
                    title: "Body Temperature",
                },
                bloodPressure: {
                    title: "Blood Pressure"
                },
                oxygenSaturation: {
                    title: "Oxygen Saturation"
                },
                bloodGlucose: {
                    title: "Glucose"
                },
                heartRate: {
                    title: "Heartbeat"
                }
            }
        },
        followUps: {
            subtitle: "Select one of the options bellow to view the desired information individualy",
            items: {
                mood: {
                    title: "Mood"
                },
                painLevel: {
                    title: "Pain Level"
                },
                sleepQuality: {
                    title: "Sleep Quality"
                },
                waterIntake: {
                    title: "Water Ingestion"
                },
                mealAcceptance: {
                    title: "Food Acceptance"
                },
                weight: {
                    title: "Weight"
                },
                necessities: {
                    title: "Bowel and Urine"
                }
            }
        },
        emergencyData: {
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
                emergencyContacts: {
                    title: "Emergency Contacts"
                },
                allergies: {
                    title: "Known Allergies"
                },
                healthPlans: {
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
        medicines: {
            sections: {
                registers: {
                    title: "Registered Medicines"
                }
            }
        },
        allergies: {
            sections: {
                registers: {
                    title: "Registered Allergies"
                }
            }
        },
        doctors: {
            sections: {
                registers: {
                    title: "Registered Doctors"
                }
            }
        },
        caregivers: {
            sections: {
                registers: {
                    title: "Registered Caregivers"
                }
            }
        },
        preferences: {
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
        import: {
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
        export: {
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
        eraseData: {
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
        userManual: {

        },
        terms: {

        }
    },

    sidebar: {
        sections: {
            general: {
                title: "General",
                items: {
                    emergency: {
                        title: "Emergency Data"
                    },
                    preferences: {
                        title: "Preferences"
                    }
                }
            },
            import: {
                title: "Manage Data",
                items: {
                    export: {
                        title: "Export Data"
                    },
                    import: {
                        title: "Import Data"
                    }
                }
            },
            others: {
                title: "Others",
                items: {
                    manual: {
                        title: "User's Manual"
                    },
                    terms: {
                        title: "Terms of Service"
                    }
                }
            }
        }
    },

    footer: {
        home: {
            buttons: {
                primary: {
                    title: "Administer Medication"
                }
            }
        },
        vitalSigns: {
            buttons: {
                primary: {
                    title: "Record Vital Sign"
                }
            }
        },
        followUps: {
            buttons: {
                primary: {
                    title: "Record Physiological / Behavioral State"
                }
            }
        },
        medicines: {
            buttons: {
                primary: {
                    title: "Record New Medicine"
                }
            }
        },
        allergies: {
            buttons: {
                primary: {
                    title: "Record new Allergie"
                }
            }
        },
        doctors: {
            buttons: {
                primary: {
                    title: "Record New Doctor"
                }
            }
        },
        caregivers: {
            buttons: {
                primary: {
                    title: "Record New Caregiver"
                }
            }
        }
    },

    notifications: {
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
                        options: [
                            {
                                placeholder: "O-",
                                value: "O-"
                            },
                            {
                                placeholder: "O+",
                                value: "O+"
                            },
                            {
                                placeholder: "A+",
                                value: "A+"
                            },
                            {
                                placeholder: "A-",
                                value: "A-"
                            },
                            {
                                placeholder: "B-",
                                value: "B-"
                            },
                            {
                                placeholder: "AB+",
                                value: "AB+"
                            },
                            {
                                placeholder: "AB-",
                                value: "AB-"
                            }
                        ]
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
                        options: [
                            {
                                placeholder: "Oral",
                                value: "Oral"
                            },
                            {
                                placeholder: "Cutaneous",
                                value: "Cutaneous"
                            }
                        ]
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