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
            headerTitle: "Sinais Vitais"
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