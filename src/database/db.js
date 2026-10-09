import { Dexie } from 'dexie'

const db = new Dexie('facilCareDB')

db.version(1).stores({
    patient: '_id, name',
    vitalSigns: '_id, dateTime, record, caregiverId, [record+dateTime]',
    followUps: '_id, dateTime, record, caregiverId, [record+dateTime]',
    medicines: '_id, active',
    medicineRegistries: '_id, medicationId, dateTime, caregiverId',
    notifications: '_id, red, dateTime, read'
})

// Populate Event
db.on("populate", (transaction) => {
    transaction.table('patient').bulkAdd([
        {
            _id: 'pat_1001',
            name: 'Patient',
            address: 'S. ABC, 41',
            birthDate: '1953-03-15',
            bloodType: 'o_negative',
            allergies: [
                {
                    allergyId: 'alg_101',
                    name: "Alergia Grave a Penicilina"
                },
                {
                    allergyId: 'alg_102',
                    name: "Outra Alergia"
                }
            ],
            healthPlans: [
                {
                    planId: 'plan_403',
                    name: "Unimed Familiar"
                },
                {
                    planId: 'plan_404',
                    name: "Plano Municipal SUS"
                }
            ],
            doctors: [
                {
                    doctorId: 'doc_501',
                    name: 'Dr. Carlos Eduardo',
                    speciality: 'Geriatra',
                    phone: '(11) 99999-8888'
                }
            ],
            caregivers: [
                {
                    caregiverId: 'cg_301',
                    name: 'Marina Souza',
                    startDate: '2026-01-15',
                    phone: '(11) 98888-7777'
                },
                {
                    caregiverId: 'cg_302',
                    name: 'Cleiton Gomes',
                    startDate: '2026-01-10',
                    phone: '(11) 98888-6666'
                }
            ],
            emergencyContacts: [
                {
                    contactId: "ctt_1001",
                    name: 'Roberto Silva',
                    kinship: 'son',
                    phone: '(11) 97777-5555'
                },
                {
                    contactId: "ctt_1002",
                    name: "Carla Abreu",
                    kinship: 'auntie',
                    phone: "(11) 97777-4444"
                }
            ]
        }
    ])

    transaction.table('vitalSigns').bulkAdd([
        {
            _id: 'vs_2001',
            dateTime: new Date('2026-10-07T08:00:00'),
            record: 'bloodPressure',
            value: '130/80',
            caregiverId: 'cg_301',
            caregiverName: 'Marina Souza',
            observation: 'Nenhuma observação'
        },
        {
            _id: 'vs_2002',
            dateTime: new Date('2026-10-09T08:00:00'),
            record: 'bloodPressure',
            value: '110/84',
            caregiverId: 'cg_301',
            caregiverName: 'Marina Souza',
            observation: 'Nenhuma observação'
        },
        {
            _id: 'vs_2003',
            dateTime: new Date('2026-09-09T12:00:00'),
            record: 'bloodPressure',
            value: '140/80',
            caregiverId: 'cg_301',
            caregiverName: 'Marina Souza',
            observation: 'Nenhuma observação'
        },
        {
            _id: 'vs_2004',
            dateTime: new Date('2026-10-07T08:00:00'),
            record: 'bodyTemperature',
            value: '31',
            caregiverId: 'cg_301',
            caregiverName: 'Marina Souza',
            observation: 'Nenhuma observação'
        },
        {
            _id: 'vs_2005',
            dateTime: new Date('2026-10-09T08:00:00'),
            record: 'bodyTemperature',
            value: '33',
            caregiverId: 'cg_301',
            caregiverName: 'Marina Souza',
            observation: 'Nenhuma observação'
        },
        {
            _id: 'vs_2006',
            dateTime: new Date('2026-09-09T12:00:00'),
            record: 'bodyTemperature',
            value: '30',
            caregiverId: 'cg_301',
            caregiverName: 'Marina Souza',
            observation: 'Nenhuma observação'
        },
        {
            _id: 'vs_2007',
            dateTime: new Date('2026-10-07T08:00:00'),
            record: 'oxygenSaturation',
            value: '98'
        },
        {
            _id: 'vs_2008',
            dateTime: new Date('2026-10-09T08:00:00'),
            record: 'oxygenSaturation',
            value: '99'
        },
        {
            _id: 'vs_2009',
            dateTime: new Date('2026-09-09T12:00:00'),
            record: 'oxygenSaturation',
            value: '95'
        },
        {
            _id: 'vs_2010',
            dateTime: new Date('2026-10-07T08:00:00'),
            record: 'bloodGlucose',
            value: '110'
        },
        {
            _id: 'vs_2011',
            dateTime: new Date('2026-10-09T08:00:00'),
            record: 'bloodGlucose',
            value: '85'
        },
        {
            _id: 'vs_2012',
            dateTime: new Date('2026-09-09T12:00:00'),
            record: 'bloodGlucose',
            value: '90'
        },
        {
            _id: 'vs_2013',
            dateTime: new Date('2026-10-07T08:00:00'),
            record: 'heartRate',
            value: '76'
        },
        {
            _id: 'vs_2014',
            dateTime: new Date('2026-10-09T08:00:00'),
            record: 'heartRate',
            value: '80'
        },
        {
            _id: 'vs_2015',
            dateTime: new Date('2026-09-09T12:00:00'),
            record: 'heartRate',
            value: '67'
        }
    ])

    transaction.table('followUps').bulkAdd([
        {
            _id: 'fu_1001',
            dateTime: new Date(),
            record: 'mood',
            value: 'Paciente calmo e colaborativo',
            caregiverId: 'cg_301',
            caregiverName: 'Marina Souza',
        },
        {
            _id: 'fu_1004',
            dateTime: new Date(),
            record: 'mood',
            value: 'Paciente calmo e colaborativosdada',
            caregiverId: 'cg_301',
            caregiverName: 'Marina Souza',
        },
        {
            _id: 'fu_1002',
            dateTime: new Date(),
            followUp: 'sleep',
            value: 85,
            caregiverId: 'cg_301',
            caregiverName: 'Marina Souza',
        },
        {
            _id: 'fu_1003',
            dateTime: new Date(),
            followUp: 'foodAcceptance',
            value: 'Comeu toda a sopa do jantar',
            caregiverId: 'cg_301',
            caregiverName: 'Marina Souza',
        }
    ])

    transaction.table('medicines').bulkAdd([
        {
            _id: 'med_4001',
            name: 'Metformina 850mg',
            dosage: '1 comprimido',
            routeAdmin: 'oral',
            observations: 'Tomar logo após as refeições',
            active: true
        },
        {
            _id: 'med_4002',
            name: "Dipirona Monosódica 1g",
            dosage: '1 comprimido',
            routeAdmin: "oral",
            observations: '',
            active: false
        }
    ])

    transaction.table('medicineRegistries').bulkAdd([
        {
            _id: 'mr_5001',
            medicationId: 'med_4001',
            medicationName: 'Metformina 850mg',
            medicationDosage: '1 comprimido',
            dateTime: new Date(),
            caregiverId: 'cg_301',
            caregiverName: 'Marina Souza',
            observations: 'Paciente tomou sem resistência'
        }
    ])

    transaction.table('notifications').bulkAdd([
        {
            _id: 'notif_6001',
            title: 'Horário de Medicamento',
            description: 'Metformina 850mg pendente de administração às 20:00.',
            read: false,
            dateTime: new Date()
        },
        {
            _id: 'notif_6002',
            title: "Notificação Lida Teste",
            description: 'Descricação de notificação lida',
            read: true,
            dateTime: new Date()
        }
    ])
})

// Open connection
db.open().catch(function (err) {
    console.error("Error trying to open IndexedDB: ", err)
})

export default db