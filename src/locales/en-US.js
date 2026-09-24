export default {
    greetings: {
        hello: "Hello",
    },
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
        necessities: "Monitoring of bowel and urine"
    },
    utils: {
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
        }
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
            subtitle: "Selecione uma das opções abaixo para visualizar cada tópico individualmente",
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
                    buttons: {
                        patientName: {
                            title: "Full Name"
                        },
                        birthDate: {
                            title: "Birth Date",
                        },
                        bloodType: {
                            title: "Blood Type",
                        },
                        weight: {
                            title: "Weight"
                        },
                        address: {
                            title: "Address"
                        }
                    }
                },
                emergencyContact: {
                    title: "Emergency Contacts",
                    subtitle: "Click in a contact to be redirected to your call's app"
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
            }
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
        preferences:{
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
            subtitle: ""
        },
        export: {
            subtitle: "Scan the QR code bellow to import data from {name}"
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
    warningMessages: {
        PatientNotFound: {
            title: "Patient not found"
        },
        PatientUpdated: {
            title: "Patient data updated with success"
        },
        NoRecords: {
            title: "No follow-ups founded"
        },
        NoRecordsByType: {
            title: "No follow-ups founded with selected type"
        },
        NoRecordsByDate: {
            title: "No follow-ups founded with selected dates"
        },
        NoRecordsByTypeAndDate: {
            title: "No follow-ups founded with selected type and dates"
        },
        NoMonitoring: {
            title: "No monitoring founded"
        },
        InvalidDateInterval: {
            title: "Invalid date interval. Minimum date needs to be lower than maximum date"
        },
        generic: {
            title: "An unexpected error occurred. Try again later"
        }
    }
}