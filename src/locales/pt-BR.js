export default {
    greetings: {
        hello: "Olá",
    },
    pageTitle: {
        vitalSigns: "Sinais Vitais",
        followUps: "Acompanhamento Fisiológico e Comportamental",
        emergencyData: "Dados de Emergência",
        medicines: "Medicamentos",
        allergies: "Alergias",
        doctors: "Médicos",
        caregivers: "Cuidadores",
        preferences: "Preferências",
        import: "Importar Dados",
        export: "Exportar Dados",
        userManual: "Manual do Usuário",
        terms: "Termos de Responsabilidade",
        bodyTemperature: "Temperatura Corporal",
        bloodPressure: "Pressão Arterial",
        oxygenSaturation: "Saturação de Oxigênio",
        bloodGlucose: "Glicemia",
        heartRate: "Batimentos Cardíacos",
        mood: "Humor",
        painLevel: "Nível de Dor",
        sleep: "Qualidade do Sono",
        waterIntake: "Ingestão de Água",
        mealAcceptance: "Aceitação de Refeições",
        weight: "Peso Corporal",
        necessities: "Controle de Evacuação e Diurese"
    },
    utils: {
        years: "anos",
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
            ptBR: {
                label: "Português Brasil"
            },
            enUS: {
                label: "Inglês"
            }
        },
        pageFallback: {
            title: "Página não encontrada",
            button: "Clique aqui para voltar para a página inicial"
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
            }
        },
        vitalSigns: {
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
            }
        },
        followUps: {
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
            }
        },
        emergencyData: {
            sections: {
                patient: {
                    title: "Informações do Paciente",
                    buttons: {
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
                    buttons: {
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
            sections: {
                registers: {
                    title: "Medicamentos Cadastrados"
                }
            }
        },
        allergies: {
            sections: {
                registers: {
                    title: "Alergias Cadastradas"
                }
            }
        },
        doctors: {
            sections: {
                registers: {
                    title: "Médicos Cadastrados"
                }
            }
        },
        caregivers: {
            sections: {
                registers: {
                    title: "Cuidadores Cadastrados"
                }
            }
        },
        preferences:{
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
            subtitle: ""
        },
        export: {
            subtitle: "Escaneie o código QR abaixo para importar dados de {name}"
        },
        userManual: {

        },
        terms: {

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
                title: "Gerenciar Dados",
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
    footer: {
        home: {
            buttons: {
                primary: {
                    title: "Administrar Medicamento"
                }
            }
        },
        vitalSigns: {
            buttons: {
                primary: {
                    title: "Registrar Sinais Vitais"
                }
            }
        },
        followUps: {
            buttons: {
                primary: {
                    title: "Registrar Estado Físico / Comportamental"
                }
            }
        },
        medicines: {
            buttons: {
                primary: {
                    title: "Registrar Novo Medicamento"
                }
            }
        },
        allergies: {
            buttons: {
                primary: {
                    title: "Registrar Nova Alergia"
                }
            }
        },
        doctors: {
            buttons: {
                primary: {
                    title: "Registrar Novo Médico"
                }
            }
        },
        caregivers: {
            buttons: {
                primary: {
                    title: "Registrar Novo Cuidador"
                }
            }
        }
    },
    warningMessages: {
        PatientNotFound: {
            title: "Paciente não encontrado"
        },
        PatientUpdated: {
            title: "Dados do paciente atualizados com sucesso"
        },
        NoRecords: {
            title: "Nenhum acompanhamento encontrado"
        },
        NoRecordsByType: {
            title: "Nenhum acompanhamento encontrado com base no tipo selecionado"
        },
        NoRecordsByDate: {
            title: "Nenhum acompanhamento encontrado com base nas datas selecionadas"
        },
        NoRecordsByTypeAndDate: {
            title: "Nenhum acompanhamento encontrado com base nas datas e tipo selecionados"
        },
        NoMonitoring: {
            title: "Nenhum acompanhamento encontrado"
        },
        InvalidDateInterval: {
            title: "Intervalo de data inválido. Data mínima deve ser menor que a data máxima"
        },
        generic: {
            title: "Um erro inesperado aconteceu. Tente novamente mais tarde"
        }
    }
}