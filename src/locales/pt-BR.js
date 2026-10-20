import { PAGES } from "../composables/usePages.js"
import { THEME_PREFERENCES as THEMES } from "../composables/useTheme.js"
import { LANGUAGES } from "../composables/useLanguage.js"
import { UNITS } from "../composables/useUnitSystem.js"
import { FORM_TYPES } from "../composables/useForm.js"

export default {
    pageTitle: {
        [PAGES.VITAL_SIGNS]: "Sinais Vitais",
        [PAGES.FOLLOW_UPS]: "Acompanhamento Fisiológico e Comportamental",
        [PAGES.REGISTER]: "Registrar",

        [PAGES.EMERGENCY_DATA]: "Dados de Emergência",

        [PAGES.MEDICINES]: "Medicamentos",
        [PAGES.MEDICINE_REGISTRIES]: "Registros de Medicamentos",
        [PAGES.ALLERGIES]: "Alergias",
        [PAGES.DOCTORS]: "Médicos",
        [PAGES.CAREGIVERS]: "Cuidadores",
        [PAGES.HEALTH_PLANS]: "Planos de Saúde",
        [PAGES.EMERGENCY_CONTACTS]: "Contatos de Emergência",

        [PAGES.IMPORT]: "Importar Dados",
        [PAGES.EXPORT]: "Exportar Dados",

        [PAGES.USER_MANUAL]: "Manual do Usuário",
        [PAGES.TERMS]: "Termos",

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
        [PAGES.TERMS]: "Termos",
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
        selectOption: "Selecione uma opção",
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
        units: {
            [UNITS.METRIC]: {
                label: "Metric"
            },
            [UNITS.IMPERIAL]: {
                label: "Imperial"
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
        measurements: "Medições",
        systolic: "Sistólica",
        diastolic: "Diastólica",
        delete: "Deletar",
        viewAdministered: "Visualizar medicamentos administrados"
    },

    options: {
        speciality: {
            cardiology: "Cardiologista",
            dermatology: "Dermatologista",
            endocrinology: "Endocrinologista",
            geriatrics: "Geriatra",
            gynecology: "Ginecologista",
            neurology: "Neurologista",
            ophthalmology: "Oftalmologista",
            orthopedics: "Ortopedista",
            pediatrics: "Pediatra",
            psychiatry: "Psiquiatra",
            psychologist: "Psicólogo",
            generalPractice: "Médico Geral",
            other: "Outro"
        },
        kinship: {
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
            cousin: "Primo(a)",
            friend: "Amigo(a)",
            other: "Outro",
        },
        routeAdmin: {
            oral: "Oral",
            cutaneous: "Cutânea"
        },
        bloodType: {
            o_negative: "O-",
            o_positive: "O+",
            a_negative: "A-",
            a_positive: "A+",
            b_negative: "B-",
            b_positive: "B+",
            ab_negative: "AB-",
            ab_positive: "AB+"
        }
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

        [PAGES.REGISTER]: {
            categories: {
                [PAGES.MEDICINE_REGISTRIES]: {
                    title: "Administração de Medicamento"
                },
                [PAGES.MEDICINES]: {
                    title: "Medicamento"
                },
                [PAGES.VITAL_SIGNS]: {
                    title: "Sinal Vital"
                },
                [PAGES.FOLLOW_UPS]: {
                    title: "Acompanhamento ou Comportamento"
                },
                [PAGES.ALLERGIES]: {
                    title: "Alergia"
                },
                [PAGES.DOCTORS]: {
                    title: "Médico"
                },
                [PAGES.CAREGIVERS]: {
                    title: "Cuidador"
                },
                [PAGES.HEALTH_PLANS]: {
                    title: "Plano de Saúde"
                },
                [PAGES.EMERGENCY_CONTACTS]: {
                    title: "Contato de Emergência"
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
                            title: "Peso"
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
                        },
                        units: {
                            title: "Unidade de Medida (em desenvolvimento)"
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
                                `Em casos de emergência de saúde, contate imediatamente os serviços de emergência ou o médico responsável registrado
                                 na ficha do paciente`
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
                                 armazenados exclusivamente de forma local no dispositivo do usuário, utilizando o banco de dados embutido
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
                                `O sistema não exige a criação de cadastro com e-mail, senhas ou autenticação em servidores remotos`
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
                                `A responsabilidade pela prevenção contra perda física do dispositivo é do próprio usuário, que pode gerar e baixar a qualquer momento
                                um arquivo de backup em formato .'JSON'`
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
                                `Como os dados residem estritamente no seu navegador, o usuário pode apagá-los permanentemente a qualquer momento limpando o cache/armazenamento 
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
                        title: "Termos"
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

        [PAGES.MEDICINE_REGISTRIES]: {
            buttons: {
                primary: {
                    title: "Administrar Medicamento"
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

    charts: {
        filters: {
            today: {
                title: "Hoje"
            },
            week: {
                title: "7 dias"
            },
            twoWeeks: {
                title: "14 dias"
            },
            threeWeeks: {
                title: "21 dias"
            },
            month: {
                title: "30 dias"
            },
            twoMonths: {
                title: "60 dias"
            },
            all: {
                title: "Todos"
            }
        },
        fallback: "Não há um gráfico configurado para o elemento selecionado",
        [PAGES.VITAL_SIGNS]: {
            fallback: "Não há medições válidas para exibir",

            [PAGES.BLOOD_PRESSURE]: {
                y_axis: "Pressão Arterial",
                x_axis: "Data da medição",
                values: {
                    systolic: "Sistólica",
                    diastolic: "Diastólica"
                }
            },
            [PAGES.BODY_TEMPERATURE]: {
                y_axis: "Temperatura Corporal",
                x_axis: "Data da medição",
                values: {
                    value: "Temperatura"
                }
            },
            [PAGES.OXYGEN_SATURATION]: {
                y_axis: "Saturação",
                x_axis: "Data da medição",
                values: {
                    value: "Saturação"
                }
            },

            [PAGES.BLOOD_GLUCOSE]: {
                y_axis: "Glicemia",
                x_axis: "Data da medição",
                values: {
                    value: "Glicemia"
                }
            },
            [PAGES.HEART_RATE]: {
                y_axis: "Batimentos Cardíacos",
                x_axis: "Data da medição",
                values: {
                    value: "Batimentos Cardíacos"
                }
            }
        },
    },

    formPopupTypes: {
        [FORM_TYPES.CREATE]: {
          title: "Adicionar"
        },
        [FORM_TYPES.EDIT]: {
            title: "Atualizar"
        }
    },

    formPopupTemplates: {
        name: {
            header: {
                title: "Nome do Paciente"
            },
            main: {
                inputs: {
                    usr_1: {
                        label: "Nome de Paciente",
                        placeholder: "ex: João Gomes Pereira"
                    }
                }
            }
        },
        birthDate: {
            header: {
                title: "Data de Nascimento"
            },
            main: {
                inputs: {
                    bday: {
                        label: "Data de Nascimento"
                    }
                }
            }
        },
        bloodType: {
            header: {
                title: "Tipo Sanguíneo"
            },
            main: {
                inputs: {
                    bloodType: {
                        label: "Tipo Sanguíneo"
                    }
                }
            }
        },
        weight: {
            header: {
                title: "Peso do Paciente"
            },
            main: {
                inputs: {
                    weight: {
                        label: "Peso do Paciente",
                        placeholder: "Peso do paciente aqui"
                    }
                }
            }
        },
        address: {
            header: {
                title: "Endereço do Paciente"
            },
            main: {
                inputs: {
                    address: {
                        label: "Endereço",
                        placeholder: "R. Alpha, 135 - Bairro, Cidade"
                    }
                }
            }
        },
        [PAGES.MEDICINES]: {
            header: {
                title: "dados de Medicamento"
            },
            main: {
                inputs: {
                    name: {
                        label: "Nome do Medicamento",
                        placeholder: "Tylenol - 500mg"
                    },
                    routeAdmin: {
                        label: "Rota de Administração"
                    },
                    dosage: {
                        label: "Dosagem",
                        placeholder: "ex: 1 comprimido por dia"
                    },
                    observations: {
                        label: "Observações",
                        placeholder: "Observações aqui"
                    }
                }
            }
        },
        [PAGES.MEDICINE_REGISTRIES]: {
            header: {
                title: "Registro de Medicamento"
            },
            main: {
                inputs: {
                    medicationName: {
                        label: "Nome do Medicamento",
                        placeholder: "Tylenol - 500mg"
                    },
                    medicationDosage: {
                        label: "Dosagem",
                        placeholder: "ex: 1 comprimido"
                    },
                    caregiverName: {
                        label: "Nome do Cuidador",
                        placeholder: "ex: Marcio Cunha Pereira"
                    },
                    observations: {
                        label: "Observações",
                        placeholder: "Observações aqui"
                    }
                }
            }
        },
        [PAGES.CAREGIVERS]: {
            header: {
                title: "Dados de Cuidador"
            },
            main: {
                inputs: {
                    name: {
                        label: "Nome do Cuidador",
                        placeholder: "ex: Marcio Cunha Pereira"
                    },
                    startDate: {
                        label: "Data de Início dos Cuidados"
                    },
                    phone: {
                        label: "Telefone de Contato",
                        placeholder: "(XX) X XXXX-XXXX"
                    }
                }
            }
        },
        [PAGES.DOCTORS]: {
            header: {
                title: "Dados de Médico"
            },
            main: {
                inputs: {
                    name: {
                        label: "Nome do Médico",
                        placeholder: "ex: Pedro Silva Gomes"
                    },
                    speciality: {
                        label: "Especialidade"
                    },
                    phone: {
                        label: "Telefone de Contato",
                        placeholder: "(XX) X XXXX-XXXX"
                    }
                }
            }
        },
        [PAGES.ALLERGIES]: {
            header: {
                title: "Alergia"
            },
            main: {
                inputs: {
                    name: {
                        label: "Nome da Alergia",
                        placeholder: "Alergia a Penicilina"
                    }
                }
            }
        },
        [PAGES.HEALTH_PLANS]: {
            header: {
                title: "Plano de Saúde"
            },
            main: {
                inputs: {
                    name: {
                        label: "Nome do Plano",
                        ex: "Plano SUS"
                    }
                }
            }
        },
        [PAGES.EMERGENCY_CONTACTS]: {
            header: {
                title: "Contato de Emergência"
            },
            main: {
                inputs: {
                    name: {
                        label: "Nome da Pessoa",
                        placeholder: "Augusto Morais Lemos"
                    },
                    kinship: {
                        label: "Parentesco",
                    },
                    phone: {
                        label: "Telefone de Contato",
                        placeholder: "(XX) X XXXX-XXXX"
                    }
                },
            }
        },
        [PAGES.VITAL_SIGNS]: {
            header: {
                title: "Sinais Vitais"
            },
            main: {
                inputs: {
                    record: {
                        label: "Sinal Vital"
                    },
                    value: {
                        label: "Medição",
                        placeholder: "ex: (120/80) para pressão arterial..."
                    },
                    caregiverName: {
                        label: "Nome do Cuidador(a)",
                        placeholder: "ex: Marcio Cunha Pereira"
                    },
                    observations: {
                        label: "Observações",
                        placeholder: "Observações aqui"
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
            title: "O paciente selecionado não foi encontrado"
        },
        PatientUpdated: {
            title: "Os dados do paciente foram atualizados com sucesso"
        },

        SystemDataReset: {
            title: "Os dados do paciente foram redefinidos com sucesso"
        },
        NotificationNotFound: {
            title: "A Notificação selecionada não foi encontrada"
        },

        NoVitalSignFound: {
            title: "Nenhum sinal vital foi encontrado"
        },
        NoVitalSignByField: {
            title: "Nenhum sinal vital foi encontrado com base no campo selecionado"
        },
        NoVitalSignByDate: {
            title: "Nenhum sinal vital foi encontrado com base no intervalo de datas selecionado"
        },
        NoVitalSignByFieldAndDate: {
            title: "Nenhum sinal vital foi encontrado com base no intervalo de datas e no campo selecionado"
        },
        VitalSignNotFound: {
            title: "Sinal vital selecionado não encontrado"
        },
        VitalSignCreated: {
            title: "O sinal vital foi criado com sucesso"
        },
        VitalSignUpdated: {
            title: "Os dados do sinal vital selecionado foram atualizados com sucesso"
        },
        VitalSignDeleted: {
            title: "Sinal vital selecionado foi excluído com sucesso"
        },

        NoFollowUpFound: {
            title: "Nenhum acompanhamento foi encontrado"
        },
        NoFollowUpByField: {
            title: "Nenhum acompanhamento foi encontrado com base no campo selecionado"
        },
        NoFollowUpByDate: {
            title: "Nenhum acompanhamento foi encontrado com base no intervalo de datas selecionado"
        },
        NoFollowUpByFieldAndDate: {
            title: "Nenhum acompanhamento foi encontrado com base no intervalo de datas e no campo selecionado"
        },
        FollowUpNotFound: {
            title: "O acompanhamento selecionado não foi encontrado"
        },
        FollowUpUpdated: {
            title: "Os Dados do acompanhamento selecionado foram atualizados com sucesso"
        },
        FollowUpDeleted: {
            title: "O acompanhamento selecionado foi excluído com sucesso"
        },
        FollowUpCreated: {
            title: "O acompanhamento foi criado com sucesso"
        },

        NoAllergyFound: {
            title: "Nenhuma alergia foi encontrado"
        },
        AllergyNotFound: {
            title: "A alergia selecionada não foi encontrada"
        },
        AllergyUpdated: {
            title: "Os dados da alergia selecionada foram atualizados com sucesso"
        },
        AllergyDeleted: {
            title: "A alergia selecionada foi excluído com sucesso"
        },
        AllergyCreated: {
            title: "Nova alergia adicionada com sucesso"
        },
        AllergyCreationFailed: {
            title: "Erro ao tentar adicionar uma alergia, tente novamente mais tarde"
        },
        AllergyUpdateFailed: {
            title: "Erro ao tentar atualizar dados de uma alergia, tente novamente mais tarde"
        },
        AllergyDeleteFailed: {
            title: "Erro ao tentar remover uma alergia, tente novamente mais tarde"
        },

        NoCaregiverFound: {
            title: "Nenhum cuidador foi encontrado"
        },
        CaregiverNotFound: {
            title: "O cuidador selecionado não foi encontrado"
        },
        CaregiverUpdated: {
            title: "Os ddos do cuidador selecionado foram atualizados com sucesso"
        },
        CaregiverDeleted: {
            title: "O cuidador selecionado foi excluído com sucesso"
        },
        CaregiverCreated: {
            title: "Novo cuidador adicionado com sucesso"
        },
        CaregiverCreationFailed: {
            title: "Erro ao tentar adicionar um cuidador, tente novamente mais tarde"
        },
        CaregiverUpdateFailed: {
            title: "Erro ao tentar atualizar dados de uma cuidador, tente novamente mais tarde"
        },
        CaregiverDeleteFailed: {
            title: "Erro ao tentar remover um cuidador, tente novamente mais tarde"
        },

        NoDoctorFound: {
            title: "Nenhum médico foi encontrado"
        },
        DoctorNotFound: {
            title: "O médico selecionado não foi encontrado"
        },
        DoctorUpdated: {
            title: "Os dados do médico selecionado foram atualizados com sucesso"
        },
        DoctorDeleted: {
            title: "O médico selecionado foi excluído com sucesso"
        },
        DoctorCreated: {
            title: "Novo médico adicionado com sucesso"
        },
        DoctorCreationFailed: {
            title: "Erro ao tentar adicionar um médico, tente novamente mais tarde"
        },
        DoctorUpdateFailed: {
            title: "Erro ao tentar atualizar dados de uma médico, tente novamente mais tarde"
        },
        DoctorDeleteFailed: {
            title: "Erro ao tentar remover um médico, tente novamente mais tarde"
        },

        NoEmergencyContactFound: {
            title: "Nenhum contato de emergência foi encontrado"
        },
        EmergencyContactNotFound: {
            title: "O contato de emergência selecionado não foi encontrado"
        },
        EmergencyContactUpdated: {
            title: "Os dados do contato de emergência selecionado foram atualizados com sucesso"
        },
        EmergencyContactDeleted: {
            title: "O contato de emergência selecionado foi excluído com sucesso"
        },
        EmergencyContactCreated: {
            title: "Novo contato de emergência adicionado com sucesso"
        },
        EmergencyContactCreationFailed: {
            title: "Erro ao tentar adicionar um contato de emergência, tente novamente mais tarde"
        },
        EmergencyContactUpdateFailed: {
            title: "Erro ao tentar atualizar dados de uma contato de emergência, tente novamente mais tarde"
        },
        EmergencyContactDeleteFailed: {
            title: "Erro ao tentar remover um contato de emergência, tente novamente mais tarde"
        },

        NoHealthPlanFound: {
            title: "Nenhum plano de saúde foi encontrado"
        },
        HealthPlanNotFound: {
            title: "O plano de saúde selecionado não foi encontrado"
        },
        HealthPlanUpdated: {
            title: "Os dados do plano de saúde selecionado foram atualizados com sucesso"
        },
        HealthPlanDeleted: {
            title: "O plano de saúde selecionado foi excluído com sucesso"
        },
        HealthPlanCreated: {
            title: "Novo plano de saúde adicionado com sucesso"
        },
        HealthPlanCreationFailed: {
            title: "Erro ao tentar adicionar um plano de saúde, tente novamente mais tarde"
        },
        HealthPlanUpdateFailed: {
            title: "Erro ao tentar atualizar dados de um plano de saúde, tente novamente mais tarde"
        },
        HealthPlanDeleteFailed: {
            title: "Erro ao tentar remover um plano de saúde, tente novamente mais tarde"
        },

        NoMedicineFound: {
            title: "Nenhum medicamento foi encontrado"
        },
        MedicineNotFound: {
            title: "O medicamento selecionado não foi encontrado"
        },
        MedicineUpdated: {
            title: "Os dados do medicamento selecionado foram atualizados com sucesso"
        },
        MedicineDeleted: {
            title: "O medicamento selecionado foi excluído com sucesso"
        },
        MedicineCreated: {
            title: "Novo medicamento adicionado com sucesso"
        },
        MedicineCreationFailed: {
            title: "Erro ao tentar adicionar um medicamento, tente novamente mais tarde"
        },
        MedicineUpdateFailed: {
            title: "Erro ao tentar atualizar dados de um medicamento, tente novamente mais tarde"
        },
        MedicineDeleteFailed: {
            title: "Erro ao tentar remover um medicamento, tente novamente mais tarde"
        },

        NoMedicineRegistryFound: {
            title:  "Nenhum registro de medicamento foi encontrado"
        },
        MedicineRegistryNotFound: {
            title: "O registro do medicamento selecionado não foi encontrada"
        },
        MedicineRegistryUpdated: {
            title: "Os dados do registro do medicamento selecionado foram atualizados com sucesso"
        },
        MedicineRegistryDeleted: {
            title: "O registro do medicamento selecionado foi excluído com sucesso"
        },
        MedicineRegistryCreated: {
            title: "Novo registro de medicamento adicionado com sucesso"
        },
        MedicineRegistryCreationFailed: {
            title: "Erro ao tentar adicionar um registro de um medicamento, tente novamente mais tarde"
        },
        MedicineRegistryUpdateFailed: {
            title: "Erro ao tentar atualizar dados de um registro de um medicamento, tente novamente mais tarde"
        },
        MedicineRegistryDeleteFailed: {
            title: "Erro ao tentar remover um registro de um medicamento, tente novamente mais tarde"
        },

        InvalidDateInterval: {
            title: "Intervalo de data inválido. Data mínima deve ser menor que a data máxima"
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
            title: "O emissor de dados não foi encontrado. Tente novamente mais tarde"
        },
        OfflineDevice: {
            title: "O seu dispositivo está não está conectado à uma rede. Tente novamente quando estiver online"
        },
        QRCodeGenFailed: {
            title: "Erro ao gerar o QR Code"
        },
        JSONImportSuccess: {
            title: "Os dados importados com sucesso"
        },
        exportJSONSuccess: {
            title: "os dados exportados com sucesso"
        },

        generic: {
            title: "Um erro inesperado aconteceu. Tente novamente mais tarde"
        }
    }
}