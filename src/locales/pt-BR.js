import { PAGES } from "../composables/usePages.js"
import { THEME_PREFERENCES as THEMES } from "../composables/useTheme.js"
import { LANGUAGES } from "../composables/useLanguage.js"

export default {
    pageTitle: {
        [PAGES.VITAL_SIGNS]: "Sinais Vitais",
        [PAGES.FOLLOW_UPS]: "Acompanhamento Fisiológico e Comportamental",

        [PAGES.EMERGENCY_DATA]: "Dados de Emergência",

        [PAGES.MEDICINES]: "Medicamentos",
        [PAGES.ALLERGIES]: "Alergias",
        [PAGES.DOCTORS]: "Médicos",
        [PAGES.CAREGIVERS]: "Cuidadores",
        [PAGES.HEALTH_PLANS]: "Planos de Saúde",
        [PAGES.EMERGENCY_CONTACTS]: "Contatos de Emergência",

        [PAGES.IMPORT]: "Importar Dados",
        [PAGES.EXPORT]: "Exportar Dados",

        [PAGES.USER_MANUAL]: "Manual do Usuário",
        [PAGES.TERMS]: "Termos de Responsabilidade",

        [PAGES.BODY_TEMPERATURE]: "Temperatura Corporal",
        [PAGES.BLOOD_PRESSURE]: "Pressão Arterial",
        [PAGES.OXYGEN_SATURATION]: "Saturação de Oxigênio",
        [PAGES.BLOOD_GLUCOSE]: "Glicemia",
        [PAGES.HEART_RATE]: "Batimentos Cardíacos",

        [PAGES.MOOD]: "Humor",
        [PAGES.PAIN_LEVEL]: "Nível de Dor",
        [PAGES.SLEEP]: "Qualidade do Sono",
        [PAGES.WATER_INTAKE]: "Ingestão de Água",
        [PAGES.MEAL_ACCEPTANCE]: "Aceitação de Refeições",
        [PAGES.WEIGHT]: "Peso Corporal",
        [PAGES.NECESSITIES]: "Controle de Evacuação e Diurese",

        [PAGES.NOTIFICATIONS]: "Notificações",
        [PAGES.ERASE]: "Apagar Dados",
        registries: "Registros",
        [PAGES.PREFERENCES]: "Preferências",
    },

    meta: {
        [PAGES.HOME]: "Início",
        [PAGES.MONITORING]: "Monitoramento",
        [PAGES.MANAGE]: "Gerenciamento",
        [PAGES.EMERGENCY_DATA]: "Dados de Emergência",
        [PAGES.PREFERENCES]: "Preferências",
        register: "Registrar",
        [PAGES.USER_MANUAL]: "Manual do Usuário",
        [PAGES.TERMS]: "Termos de Usuário",
        notFound: 'Página não encontrada',
        [PAGES.ERASE]: "Apagar Dados",
        [PAGES.IMPORT]: "Importar Dados",
        [PAGES.EXPORT]: "Exportar Dados"
    },

    utils: {
        hello: "Olá",
        confirm: "Confirmar",
        cancel: "Cancelar",
        deleteAccount: "Apagar Dados",
        homePage: "Voltar à página inicial",
        years: "anos",
        themes: {
            [THEMES.LIGHT]: {
                label: "Tema Claro"
            },
            [THEMES.DARK]: {
                label: "Tema Escuro"
            },
            [THEMES.SYSTEM]: {
                label: "Seguir Sistema"
            },
            [THEMES.HIGH_CONTRAST]: {
                label: "Alto Contraste"
            }
        },
        languages: {
            [LANGUAGES.PT_BR]: {
                label: "Português Brasil"
            },
            [LANGUAGES.EN_US]: {
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
        },
        vitalSign: "Sinal Vital",
        followUp: "Acompanhamento",
        data: "Deletar",
        o_negative: "O-",
        o_positive: "O+",
        a_negative: "A-",
        a_positive: "A+",
        b_negative: "B-",
        b_positive: "B+",
        ab_negative: "AB-",
        ab_positive: "AB+",
        son: "Filho",
        daughter: "Filha",
        father: "Pai",
        mother: "Mãe",
        uncle: "Tio",
        auntie: "Tia",
        grandmother: "Avó",
        grandfather: "Avô",
        husband: "Marido",
        wife: "Esposa",
        friend: "Amigo(a)",
        other: "Outro(a)",
        cutaneous: "Cutânea",
        oral: "Oral"
    },

    views: {
        [PAGES.HOME]: {
            subtitle: "Selecione uma das opções abaixo para visualizar as informações desejadas",

            buttons: {
                [PAGES.VITAL_SIGNS]: {
                    title: "Registros de Sinais Vitais",
                    description: "Gerenciar medições diárias e visualizar estatísticas"
                },
                [PAGES.FOLLOW_UPS]: {
                    title: "Acompanhamento Fisiológico e Comportamental",
                    description: "Gerenciar dados comportamentais e fisiológicos e visualizar estatísticas"
                },
                [PAGES.MEDICINES]: {
                    title: "Medicamentos",
                    description: "Visualizar medicamentos do dia e gerenciar cadastrados"
                },
                [PAGES.CAREGIVERS]: {
                    title: "Cuidadores",
                    description: "Gerenciar cuidadores do paciente"
                },
                [PAGES.DOCTORS]: {
                    title: "Médicos",
                    description: "Gerenciar médicos do paciente"
                },
                [PAGES.ALLERGIES]: {
                    title: "Alergias",
                    description: "Gerenciar alergias do paciente"
                },
                [PAGES.HEALTH_PLANS]: {
                    title: "Planos de Saúde",
                    description: "Gerenciar planos de saúde que o paciente possui"
                },
                [PAGES.EMERGENCY_CONTACTS]: {
                    title: "Contatos de Emergência",
                    description: "Gerenciar contatos de emergência"
                }
            }
        },

        [PAGES.MONITORING]: {
            [PAGES.VITAL_SIGNS]: {
                subtitle: "Selecione uma das opções abaixo para visualizar cada tópico individualmente",

                items: {
                    [PAGES.BODY_TEMPERATURE]: {
                        title: "Temperatura Corporal"
                    },
                    [PAGES.BLOOD_PRESSURE]: {
                        title: "Pressão Arterial"
                    },
                    [PAGES.OXYGEN_SATURATION]: {
                        title: "Saturação de Oxigênio"
                    },
                    [PAGES.BLOOD_GLUCOSE]: {
                        title: "Glicemia"
                    },
                    [PAGES.HEART_RATE]: {
                        title: "Batimentos Cardíacos"
                    }
                }
            },

            [PAGES.FOLLOW_UPS]: {
                subtitle: "Selecione uma das opções abaixo para visualizar cada tópico individualmente",

                items: {
                    [PAGES.MOOD]: {
                        title: "Humor"
                    },
                    [PAGES.PAIN_LEVEL]: {
                        title: "Nível de dor"
                    },
                    [PAGES.SLEEP]: {
                        title: "Qualidade do Sono"
                    },
                    [PAGES.WATER_INTAKE]: {
                        title: "Ingestão de Água"
                    },
                    [PAGES.MEAL_ACCEPTANCE]: {
                        title: "Aceitação de Refeições"
                    },
                    [PAGES.WEIGHT]: {
                        title: "Peso"
                    },
                    [PAGES.NECESSITIES]: {
                        title: "Controle de Evacuação e Diurese"
                    }
                }
            }
        },

        [PAGES.EMERGENCY_DATA]: {
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

                [PAGES.EMERGENCY_CONTACTS]: {
                    title: "Contatos de Emergência"
                },

                [PAGES.ALLERGIES]: {
                    title: "Alergias Conhecidas"
                },

                [PAGES.HEALTH_PLANS]: {
                    title: "Planos de Saúde"
                },

                others: {
                    title: "Outros",
                    buttons: {
                        [PAGES.DOCTORS]: {
                            title: "Médicos Cadastrados"
                        },
                        [PAGES.MEDICINES]: {
                            title: "Medicamentos Cadastrados"
                        }
                    }
                }
            },

            fallback: "Nenhuma informação encontrada para categoria selecionada"
        },

        [PAGES.MEDICINES]: {
            sections: {
                registers: {
                    title: "Medicamentos Cadastrados"
                }
            }
        },

        [PAGES.ALLERGIES]: {
            sections: {
                registers: {
                    title: "Alergias Cadastradas"
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
                    title: "Médicos Cadastrados"
                }
            }
        },

        [PAGES.CAREGIVERS]: {
            sections: {
                registers: {
                    title: "Cuidadores Cadastrados"
                }
            }
        },

        [PAGES.HEALTH_PLANS]: {
            sections: {
                registers: {
                    title: "Planos de Saúde Cadastrados"
                }
            }
        },

        [PAGES.EMERGENCY_CONTACTS]: {
            sections: {
                registers: {
                    title: "Contatos de Emergência Cadastrados"
                }
            }
        },

        [PAGES.PREFERENCES]: {
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

        [PAGES.IMPORT]: {
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

        [PAGES.EXPORT]: {
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
                        "Nova Tranferência",
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

        [PAGES.ERASE]: {
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

        [PAGES.USER_MANUAL]: {

        },

        [PAGES.TERMS]: {
            sections: {
                consciousUse: {
                    title: "Isenção de Responsabilidade e Uso Consciente",
                    contents: [
                        {
                            title: "Responsabilidade pelos Dados Cadastrados",
                            regularSubtitles: [
                                `O FacilCare atua estritamente como uma ferramenta de auxílio e organização da rotina do cuidador`,
                                `Não nos responsabilizamos por informações incorretas cadastradas sobre dosagens, horários ou nomes de medicamentos, 
                                sendo de inteira responsabilidade do usuário cadastrar e conferir os dados corretamente`
                            ]
                        },
                        {
                            title: "Aviso Médico",
                            regularSubtitles: [
                                `Este aplicativo não substitui o parecer, diagnóstico, prescrição ou acompanhamento médico profissional`,
                                `Em casos de emergência de saúde, contate imediatamente os serviços de emergência ou o médico responsável registrado na ficha do paciente`
                            ]
                        }
                    ]
                },
                dataPrivacy: {
                    title: "Privacidade de Dados",
                    contents: [
                        {
                            title: "Onde seus dados ficam salvos?",
                            regularSubtitles: [
                                `Todos os dados pessoais (nome, idade, tipo sanguíneo e contatos de emergência, por exemplo), 
                                 registros fisiológicos (sinais vitais, humor, sono e etc) e histórico de medicamentos são
                                 armazenados exclusivamente de forma local no seu dispositivo, utilizando o banco de dados embutido
                                 no navegador (IndexedDB)`
                            ]
                        },
                        {
                            title: "Sem Servidores na Nuvem",
                            regularSubtitles: [
                                `O FacilCare não possui banco de dados na nuvem nem servidores centrais de armazenamento. Dados pessoais do paciente nunca são enviados, 
                                coletados ou processados por desenvolvedores ou terceiros de forma deliberada`
                            ]
                        }
                    ]
                },
                telemetry: {
                    title: "Ausência de Rastreamento e Telemetria",
                    contents: [
                        {
                            title: "Sem Contas ou Login Externo",
                            regularSubtitles: [
                                `Nosso sistema não exige a criação de cadastro com e-mail, senhas ou autenticação em servidores remotos`
                            ]
                        },
                        {
                            title: "Sem Cookies de Rastreamento ou Analytics",
                            regularSubtitles: [
                                `O sistema não utiliza cookies de rastreamento ou ferramentas externas de telemetria e análise de comportamento`
                            ]
                        }
                    ]
                },
                devicePermissions: {
                    title: "Permissões de Dispositivo",
                    subtitle: `Para oferecer uma experiência completa, nosso sistema solicita permissões específicas que operam estritamente no seu dispositivo`,
                    contents: [
                        {
                            title: "Notificações",
                            regularSubtitles: [
                                `Notificações são utilizadas exclusivamente para disparar alertas visuais e sonoros no horário exato de administração de cada medicamento 
                                cadastrados, por exemplo`
                            ]
                        },
                        {
                            title: "Persistência de Armazenamento",
                            regularSubtitles: [
                                `O aplicativo solicita ao navegador a permissão para garantir que o sistema operacional não apague a base de dados 
                                durante rotinas automáticas de limpeza de memória do dispositivo`
                            ]
                        }
                    ]
                },
                dataManagement: {
                    title: "Troca de Dados, Backups e Transferências entre Dispositivos",
                    contents: [
                        {
                            title: "Backup Manual (JSON)",
                            regularSubtitles: [
                                `A responsabilidade pela prevenção contra perda física do dispositivo é do usuário, que pode gerar e baixar a qualquer momento
                                um arquivo de backup em formato .JSON`
                            ]
                        },
                        {
                            title: "Transferência de Dados",
                            regularSubtitles: [
                                `Ao optar por transferir dados para outro dispositivo via QR Code, o FácilCare estabelece uma conexão direta ponto-a-ponto (Peer-to-Peer) 
                                entre os dois navegadores`,
                                `Ressalva de Rede: Para estabelecimento inicial do pareamento P2P pelo QR Code, é necessária uma conexão temporária com a internet. 
                                Nenhum dado do paciente fica armazenado nesse servidor — a carga de dados trafega diretamente entre os dois dispositivos`
                            ]
                        }
                    ]
                },
                dataExclusion: {
                    title: "Exclusão de Dados",
                    contents: [
                        {
                            title: "Limpando Cache/Armazenamento do Navegador",
                            regularSubtitles: [
                                `Como os dados residem estritamente no seu navegador, você pode apagá-los permanentemente a qualquer momento limpando o cache/armazenamento 
                                do navegador para este site ou utilizando a opção de redefinição própria do sistema`
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
                title: "Geral",
                items: {
                    [PAGES.EMERGENCY_DATA]: {
                        title: "Dados de Emergência"
                    },
                    [PAGES.PREFERENCES]: {
                        title: "Preferências"
                    }
                }
            },

            backup: {
                title: "Gerenciar Dados",
                items: {
                    [PAGES.EXPORT]: {
                        title: "Exportar Dados"
                    },
                    [PAGES.IMPORT]: {
                        title: "Importar Dados"
                    }
                }
            },

            others: {
                title: "Outros",
                items: {
                    [PAGES.USER_MANUAL]: {
                        title: "Manual do Usuário"
                    },
                    [PAGES.TERMS]: {
                        title: "Termos de Responsabilidade"
                    }
                }
            }
        }
    },

    footer: {
        [PAGES.HOME]: {
            buttons: {
                primary: {
                    title: "Administrar Medicamento"
                }
            }
        },

        [PAGES.VITAL_SIGNS]: {
            buttons: {
                primary: {
                    title: "Registrar Sinais Vitais"
                }
            }
        },

        [PAGES.FOLLOW_UPS]: {
            buttons: {
                primary: {
                    title: "Registrar Estado Físico / Comportamental"
                }
            }
        },

        [PAGES.MEDICINES]: {
            buttons: {
                primary: {
                    title: "Registrar Novo Medicamento"
                }
            }
        },

        [PAGES.ALLERGIES]: {
            buttons: {
                primary: {
                    title: "Registrar Nova Alergia"
                }
            }
        },

        [PAGES.DOCTORS]: {
            buttons: {
                primary: {
                    title: "Registrar Novo Médico"
                }
            }
        },

        [PAGES.CAREGIVERS]: {
            buttons: {
                primary: {
                    title: "Registrar Novo Cuidador"
                }
            }
        },

        [PAGES.HEALTH_PLANS]: {
            buttons: {
                primary: {
                    title: "Registrar Novo Plano de Saúde"
                }
            }
        },

        [PAGES.EMERGENCY_CONTACTS]: {
            buttons: {
                primary: {
                    title: "Registrar Novo Contato de Emergência"
                }
            }
        }
    },

    [PAGES.NOTIFICATIONS]: {
        title: "Notificações",
        markAsRead: "Marque todas como lidas"
    },

    formPopupTemplates: {
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
                        options: {
                            oral: {
                                placeholder: "Oral"
                            },
                            cutaneous: {
                                placeholder: "Cutânea"
                            }
                        }
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
        },
        healthPlans: {
            header: {
                title: "Atualizar Plano de Saúde"
            },
            main: {
                inputs: {
                    name: {
                        label: "Nome do Plano"
                    }
                },
                buttons: {
                    submit: {
                        label: "Atualizar Dados"
                    }
                }
            }
        },
        emergencyContacts: {
            header: {
                title: "Atualizar Contato de Emergência"
            },
            main: {
                inputs: {
                    name: {
                        label: "Nome da Pessoa"
                    },
                    kinship: {
                        label: "Parentesco",
                        options: {
                            father: {
                                placeholder: "Pai"
                            },
                            mother: {
                                placeholder: "Mãe"
                            },
                            husband: {
                                placeholder: "Marido"
                            },
                            wife: {
                                placeholder: "Esposa"
                            },
                            son: {
                                placeholder: "Filho"
                            },
                            daughter: {
                                placeholder: "Filha"
                            },
                            uncle: {
                                placeholder: "Tio"
                            },
                            auntie: {
                                placeholder: "Tia"
                            },
                            grandfather: {
                                placeholder: "Avô"
                            },
                            grandmother: {
                                placeholder: "Avó"
                            },
                            cousin: {
                                placeholder: "Primo(a)"
                            },
                            friend: {
                                placeholder: "Amigo(a)"
                            },
                            other: {
                                placeholder: "Outro"
                            }
                        }
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
        }
    },

    confirmPopupTemplates: {
        deleteConfirm: {
            title: "Tem certeza que deseja remover o {item} selecionado"
        },
        resetData: {
            title: "Tem certeza que deseja redefinir os dados do paciente"
        }
    },

    warningMessages: {
        PatientNotFound: {
            title: "Paciente não encontrado"
        },
        PatientUpdated: {
            title: "Dados do paciente atualizados com sucesso"
        },
        MedicineNotFound: {
            title: "Medicamento não encontrado"
        },
        MedicineUpdated: {
            title: "Dados do medicamento atualizados com sucesso"
        },
        RecordUpdated: {
            title: "Dados do monitoramento atualizados com sucesso"
        },
        RecordNotFound: {
            title: "Monitoramento não encontrado"
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
        MedicineDeleted: {
          title: "Medicamento removido com sucesso"
        },
        RecordRemoved: {
            title: "Registro selecionado foi removido com sucesso"
        },
        generic: {
            title: "Um erro inesperado aconteceu. Tente novamente mais tarde"
        }
    }
}