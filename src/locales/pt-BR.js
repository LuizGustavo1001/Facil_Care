export default {
    greetings: {
        hello: "Olá",
    },
    utils: {
        themes: {
            light: {
                label: "Tema Claro"
            },
            dark: {
                label: "Tema Escuro"
            },
            system: {
                label: "Seguir Sistema"
            },
            highContrast: {
                label: "Alto Contraste"
            }
        },
        languages: {
            ["pt-BR"]: {
                label: "Português Brasil"
            },
            ["en-US"]: {
                label: "Inglês"
            }
        },
        pageFallback: {
            title: "Página não encontrada",
            button: "Clique aqui para voltar para a página inicial"
        },
        bodyTemperature: {
            title: "Temperatura Corporal"
        },
        bloodPressure: {
            title: "Pressão Arterial"
        },
        oxygenSaturation: {
            title: "Saturação de Oxigênio"
        },
        bloodGlucose: {
            title: "Glicemia"
        },
        heartRate: {
            title: "Batimentos Cardíacos"
        },
        mood: {
            title: "Humor"
        },
        painLevel: {
            title: "Nível de dor"
        },
        sleepQuality: {
            title: "Qualidade do Sono"
        },
        waterIntake: {
            title: "Ingestão de Água"
        },
        mealAcceptance: {
            title: "Aceitação de Refeições"
        },
        weight: {
            title: "Peso"
        },
        necessities: {
            title: "Controle de Evacuação e Diurese"
        }
    },
    views: {
        home: {
            subtitle: "Selecione uma das opções abaixo para visualizar as informações desejadas",
            buttons: {
                vitalSigns: {
                    title: "Registros de Sinais Vitais",
                    description: "Gerenciar medições diárias"
                },
                followUp: {
                    title: "Acompanhamento Fisiológico e Comportamental",
                    description: "Gerenciar dados comportamentais e fisiológicos"
                },
                medicine: {
                    title: "Medicamentos",
                    description: "Gerenciar medicamentos utilizados pelo paciente"
                },
                caregiver: {
                    title: "Cuidadores",
                    description: "Gerenciar cuidadores do paciente"
                },
                doctors: {
                    title: "Médicos",
                    description: "Gerenciar médicos do paciente"
                },
                allergies: {
                    title: "Alergias",
                    description: "Gerenciar alergias do paciente"
                }
            },

            footer: {
                buttons: {
                    primary: {
                        title: "Administrar Medicamento"
                    }
                }
            }
        },
        vitalSigns: {
            headerTitle: "Sinais Vitais",
            subtitle: "Selecione uma das opções abaixo para visualizar cada tópico individualmente",
            items: {
                bodyTemperature: {
                    title: "Temperatura Corporal"
                },
                bloodPressure: {
                    title: "Pressão Arterial"
                },
                oxygenSaturation: {
                    title: "Saturação de Oxigênio"
                },
                bloodGlucose: {
                    title: "Glicemia"
                },
                heartRate: {
                    title: "Batimentos Cardíacos"
                }
            },
            footer:{
                buttons: {
                    primary: {
                        title: "Registrar Sinais Vitais"
                    }
                }
            }
        },
        followUp: {
            headerTitle: "Acompanhamento Fisiológico e Comportamental",
            subtitle: "Selecione uma das opções abaixo para visualizar cada tópico individualmente",
            items: {
                mood: {
                    title: "Humor"
                },
                painLevel: {
                    title: "Nível de dor"
                },
                sleepQuality: {
                    title: "Qualidade do Sono"
                },
                waterIntake: {
                    title: "Ingestão de Água"
                },
                mealAcceptance: {
                    title: "Aceitação de Refeições"
                },
                weight: {
                    title: "Peso"
                },
                necessities: {
                    title: "Controle de Evacuação e Diurese"
                }
            },
            footer:{
                buttons: {
                    primary: {
                        title: "Registrar Estado Físico / Comportamental"
                    }
                }
            }
        },
        emergencyData: {
            headerTitle: "Dados de Emergência",
            sections: {
                patientData: {
                    title: "Informações do Paciente",
                    items: {
                        patientName: {
                            title: "Nome Completo"
                        },
                        birthDate: {
                            title: "Data de Nascimento",
                        },
                        bloodType: {
                            title: "Tipo Sanguíneo",
                        },
                        weight: {
                            title: "Peso (Kg)"
                        },
                        address: {
                            title: "Endereço"
                        }
                    }
                },
                emergencyContact: {
                    title: "Contatos de Emergência",
                    subtitle: "Clique em um contato para ser redirecionado para o aplicativo de telefonia"
                },
                allergies: {
                    title: "Alergias Conhecidas"
                },
                healthPlans: {
                    title: "Planos de Saúde"
                },
                others: {
                    title: "Outros",
                    items: {
                        doctors: {
                            title: "Médicos Cadastrados"
                        },
                        medicines: {
                            title: "Medicamentos Cadastrados"
                        }
                    }
                }
            }
        },
        medicines: {
            headerTitle: "Medicamentos",
            sections: {
                registers: {
                    title: "Medicamentos Cadastrados"
                }
            },
            footer:{
                buttons: {
                    primary: {
                        title: "Registrar Novo Medicamento"
                    }
                }
            }
        },
        allergies: {
            headerTitle: "Alergias",
            sections: {
                registers: {
                    title: "Alergias Cadastradas"
                }
            },
            footer:{
                buttons: {
                    primary: {
                        title: "Registrar Nova Alergia"
                    }
                }
            }
        },
        doctors: {
            headerTitle: "Médicos",
            sections: {
                registers: {
                    title: "Médicos Cadastrados"
                }
            },
            footer:{
                buttons: {
                    primary: {
                        title: "Registrar Novo Médico"
                    }
                }
            }
        },
        caregivers: {
            headerTitle: "Cuidadores",
            sections: {
                registers: {
                    title: "Cuidadores Cadastrados"
                }
            },
            footer:{
                buttons: {
                    primary: {
                        title: "Registrar Novo Cuidador"
                    }
                }
            }
        },
        preferences:{
            headerTitle: "Preferências do Usuário",
            sections: {
                general: {
                    title: "Geral",
                    items: {
                        themes: {
                            title: "Tema do Sistema"
                        },
                        languages: {
                            title: "Idioma do Sistema"
                        }
                    }
                }
            }
        },
        import: {
            headerTitle: "Importar Dados",
            subtitle: ""
        },
        export: {
            headerTitle: "Exportar Dados",
            subtitle: "Leia com a câmera de outro dispositivo o código qr abaixo para importar dados de {name}"
        },
        userManual: {
            headerTitle: "Manual do Usuário"
        },
        terms: {
            headerTitle: "Termos de Responsabilidade"
        }
    },
    sidebar: {
        sections: {
            general: {
                title: "Geral",
                items: {
                    emergency: {
                        title: "Dados de Emergência"
                    },
                    preferences: {
                        title: "Preferências"
                    }
                }
            },
            import: {
                title: "Importar/Exportar",
                items: {
                    export: {
                        title: "Exportar Dados"
                    },
                    import: {
                        title: "Importar Dados"
                    }
                }
            },
            others: {
                title: "Outros",
                items: {
                    manual: {
                        title: "Manual do Usuário"
                    },
                    terms: {
                        title: "Termos de Responsabilidade"
                    }
                }
            }
        }
    },
    warningMessages: {
        PatientNotFound: {
            title: "Paciente não encontrado"
        }
    }
}