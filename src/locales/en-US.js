export default {
    greetings: {
        hello: "Hello",
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
        },
        bodyTemperature: {
            title: "Body Temperature"
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
        },
        mood: {
            title: "Mood"
        },
        painLevel: {
            title: "Pain Level"
        },
        sleep: {
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
            title: "Monitoring of bowel and urine"
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
            headerTitle: "Vital Signs",
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
        followUp: {
            headerTitle: "Physiological and Behavioral Monitoring",
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
            headerTitle: "Emergency Data",
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
            headerTitle: "Medicines",
            sections: {
                registers: {
                    title: "Registered Medicines"
                }
            }
        },
        allergies: {
            headerTitle: "Allergies",
            sections: {
                registers: {
                    title: "Registered Allergies"
                }
            }
        },
        doctors: {
            headerTitle: "Doctors",
            sections: {
                registers: {
                    title: "Registered Doctors"
                }
            }
        },
        caregivers: {
            headerTitle: "Caregivers",
            sections: {
                registers: {
                    title: "Registered Caregivers"
                }
            }
        },
        preferences:{
            headerTitle: "User Preferences",
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
            headerTitle: "Import Data",
            subtitle: ""
        },
        export: {
            headerTitle: "Export Data",
            subtitle: "Scan the QR code bellow to import data from {name}"
        },
        userManual: {
            headerTitle: "User's Manual"
        },
        terms: {
            headerTitle: "Terms of Service"
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
        followUp: {
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
        InvalidDateInterval: {
            title: "Invalid date interval. Minimum date needs to be lower than maximum date"
        }
    }
}