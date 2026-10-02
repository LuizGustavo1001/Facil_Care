export default {
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
        necessities: "Controle de Evacuação e Diurese",
        notifications: "Notificações",
        erase: "Apagar Dados"
    },
    meta: {
        home: "Início",
        monitoring: "Monitoramento",
        monitoringOverview: "Monitoramento",
        manageOverview: "Gerenciamento",
        emergencyData: "Dados de Emergência",
        preferences: "Preferências",
        register: "Registrar",
        backup: "Backup",
        manual: "Manual do Usuário",
        terms: "Termos de Usuário",
        notifications: "Notificações",
        notFound: 'Página não encontrada',
        erase: "Apagar Dados",
        import: "Importar Dados",
        export: "Exportar Dados"
    },
    utils: {
        hello: "Olá",
        deleteAccount: "Apagar Dados",
        homePage: "Voltar à página inicial",
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
        },
        notFoundCard: {
            item: "Nenhum item encontrado",
            notification: "Nenhuma nova notificação encontrada"
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
                    subtitle: "Clique em um das opções abaixo para editar seus dados",
                    buttons: {
                        name: {
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
                emergencyContacts: {
                    title: "Contatos de Emergência"
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
            },
            fallback: "Nenhuma informação encontrada para categoria selecionada"
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
        preferences: {
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
            sections: {
                importing: {
                    title: "Conectando ao Emissor",
                    actions: [
                        "Localizando dispositivo emissor",
                        "Recebendo e aplicando os dados no banco de dados local",
                        "Dados do paciente restaurados com sucesso",
                        "Voltar à página inicial",
                        "Tentar via arquivo local"
                    ]
                },
                localFile: {
                    title: "Importar Dados via Arquivo Local",
                    subtitle: "Selecione um arquivo de backup previamente exportado para restaurar as informações do paciente",
                    actions: [
                        "Restaurando Dados",
                        "Selecionar Arquivo JSON"
                    ]
                }
            }
        },
        export: {
            subtitle: "Selecione uma das opções abaixo para exportar dados do paciente",
            sections: {
                tabSelector: {
                    qrCode: {
                        title: "Via QR Code"
                    },
                    json: {
                        title: "Arquivo de Backup"
                    }
                },
                cardQR: {
                    title: "Compartilhamento via QR Code (P2P)",
                    regularSubtitles: [
                        "Gere um QR Code para transferir os dados do paciente diretamente para outro dispositivo",
                    ],
                    destructiveSubtitles: [
                        "Observação: É necessário conexão com a internet para gerar o QR Code"
                    ],
                    actions: [
                        "Gerar QR Code de Transferência",
                        "Criando QR Code",
                        "Aguardando leitura de outro dispositivo",
                        "Cancelar QR Code",
                        "Conexão Estabelecida! Enviando dados",
                        "Transferência dos dados concluída com sucesso",
                        "Nova Tranferência"
                    ]
                },
                cardJSON:{
                    title: "Backup Local (.json)",
                    regularSubtitles: [
                        "Baixe uma cópia bruta (arquivo) dos dados do paciente",
                    ],
                    actions: [
                        "Exportando",
                        "Baixar Arquivo JSON"
                    ]
                }
            }
        },
        eraseData: {
            sections: {
                erase: {
                    title: "Apagar Dados do Paciente",
                    regularSubtitles: [
                        "Ao clicar no botão abaixo TODOS os dados do paciente serão redefinidos para o padrão"
                    ],
                    destructiveSubtitles: [
                        "Tenha certeza de exportar os dados do paciente caso queira salvá-los"
                    ],
                    buttons: [
                        "Redefinir dados do Paciente"
                    ],
                    confirmDelete: "Tem certeza que deseja redefinir os dados do paciente para o padrão",
                    successDelete: "Dados do paciente redefinidos com sucesso"
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
    notifications: {
        title: "Notificações",
        markAsRead: "Marque todas como lidas"
    },
    popupTemplates: {
        name: {
            header: {
                title: "Alterar Nome do Paciente"
            },
            main: {
                inputs: {
                    usr_1: {
                        label: "Nome de Paciente"
                    }
                },
                buttons: {
                    submit: {
                        label: "Atualizar Dados"
                    }
                }
            }
        },
        birthDate: {
            header: {
                title: "Alterar Data de Nascimento"
            },
            main: {
                inputs: {
                    bday: {
                        label: "Data de Nascimento"
                    }
                },
                buttons: {
                    submit: {
                        label: "Atualizar Dados"
                    }
                }
            }
        },
        bloodType: {
            header: {
                title: "Atualizar Tipo Sanguíneo"
            },
            main: {
                inputs: {
                    bloodType: {
                        label: "Tipo Sanguíneo",
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
                        label: "Atualizar Dados"
                    }
                }
            }
        },
        weight: {
            header: {
                title: "Atualizar Peso do Paciente"
            },
            main: {
                inputs: {
                    weight: {
                        label: "Peso do Paciente"
                    }
                },
                buttons: {
                    submit: {
                        label: "Atualizar Dados"
                    }
                }
            }
        },
        address: {
            header: {
                title: "Atualizar Endereço do Paciente"
            },
            main: {
                inputs: {
                    address: {
                        label: "Endereço"
                    }
                },
                buttons: {
                    submit: {
                        label: "Atualizar Dados"
                    }
                }
            }
        },
        medicines: {
            header: {
                title: "Atualizar dados de Medicamento"
            },
            main: {
                inputs: {
                    name: {
                        label: "Nome do Medicamento"
                    },
                    routeAdmin: {
                        label: "Rota de Administração",
                        options: [
                            {
                                placeholder: "Oral",
                                value: "Oral"
                            },
                            {
                                placeholder: "Cutânea",
                                value: "Cutânea"
                            }
                        ]
                    },
                    dosage: {
                        label: "Dosagem"
                    },
                    observations: {
                        label: "Observações"
                    }
                },
                buttons: {
                    submit: {
                        label: "Atualizar Dados"
                    }
                }
            }
        },
        caregivers: {
            header: {
                title: "Atualizar Dados de Cuidador"
            },
            main: {
                inputs: {
                    name: {
                        label: "Nome do Cuidador"
                    },
                    startDate: {
                        label: "Data de Início dos Cuidados"
                    },
                    phone: {
                        label: "Telefone de Contato"
                    }
                },
                buttons: {
                    submit: {
                        label: "Atualizar Dados"
                    }
                }
            }
        },
        doctors: {
            header: {
                title: "Atualizar Dados de Médico"
            },
            main: {
                inputs: {
                    name: {
                        label: "Nome do Médico"
                    },
                    speciality: {
                        label: "Especialidade"
                    },
                    phone: {
                        label: "Telefone de Contato"
                    }
                },
                buttons: {
                    submit: {
                        label: "Atualizar Dados"
                    }
                }
            }
        },
        allergies: {
            header: {
                title: "Atualizar Alergia"
            },
            main: {
                inputs: {
                    name: {
                        label: "Nome da Alergia"
                    }
                },
                buttons: {
                    submit: {
                        label: "Atualizar Dados"
                    }
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
            title: "Nenhum item encontrado"
        },
        NoRecordsByField: {
            title: "Nenhum item encontrado com base no campo selecionado"
        },
        NoRecordsByDate: {
            title: "Nenhum item encontrado com base nas datas selecionadas"
        },
        NoRecordsByFieldAndDate: {
            title: "Nenhum item encontrado com base no intervalo de datas e no campo selecionado"
        },
        NoMonitoring: {
            title: "Nenhum item encontrado"
        },
        InvalidDateInterval: {
            title: "Intervalo de data inválido. Data mínima deve ser menor que a data máxima"
        },
        NotificationNotFound: {
            title: "Notificação selecionado não encontrada"
        },
        ExportFailed: {
            title: "Erro ao tentar exportar dados do paciente"
        },
        ImportFailed: {
            title: "Erro ao tentar importar dados do paciente"
        },
        P2PExportFailed: {
            title: "Erro ao exportar dados do paciente via QR Code"
        },
        P2PConnectionInterrupted: {
            title: "A conexão foi interrompida antes da conclusão"
        },
        P2PImportFailed: {
            title: "Erro ao importar dados do paciente via QR Code"
        },
        P2PReceiveFailed: {
            title: "Erro ao receber dados do paciente via QR Code"
        },
        HostNotFound: {
            title: "Emissor de dados não encontrado. Tente novamente mais tarde"
        },
        OfflineDevice: {
            title: "Seu dispositivo está não está conectado à uma rede. Tente novamente quando estiver online"
        },
        QRCodeGenFailed: {
            title: "Erro ao gerar o QR Code"
        },
        JSONImportSuccess: {
            title: "Dados importados com sucesso"
        },
        exportJSONSuccess: {
            title: "Dados exportados com sucesso"
        },
        SystemDataReset: {
            title: "Dados do paciente redefinidos com sucesso"
        },
        generic: {
            title: "Um erro inesperado aconteceu. Tente novamente mais tarde"
        }
    }
}