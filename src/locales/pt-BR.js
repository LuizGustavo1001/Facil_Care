export default {
    greetings: {
        hello: "Olá",
    },
    views: {
        home: {
            subtitle: "Selecione uma das opções abaixo para visualizar as informações desejadas",
            buttons: {
                vitalSigns: {
                    title: "Registros de Sinais Vitais",
                    description: "Gerenciar medições diárias"
                },
                monitoring: {
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
                glucose: {
                    title: "Glicemia"
                },
                heartBeat: {
                    title: "Batimentos Cardíacos"
                }
            },
        },
        monitoring: {
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
    }
}