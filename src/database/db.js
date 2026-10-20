import { Dexie } from 'dexie'

const db = new Dexie('facilCareDB')

db.version(1).stores({
    patient: '++_id, name',
    vitalSigns: '++_id, dateTime, record, caregiverId, [record+dateTime]',
    followUps: '++_id, dateTime, record, caregiverId, [record+dateTime]',
    medicines: '++_id, active',
    medicineRegistries: '++_id, medicationId, dateTime, caregiverId',
    notifications: '++_id, read, dateTime'
})

db.version(2)
    .stores({
        patient: '++_id, name',

        allergies: '++_id, patientId, name',
        healthPlans: '++_id, patientId, name',
        doctors: '++_id, patientId, name',
        caregivers: '++_id, patientId, name',
        emergencyContacts: '++_id, patientId, name',

        vitalSigns: '++_id, dateTime, record, caregiverId, [record+dateTime]',
        followUps: '++_id, dateTime, record, caregiverId, [record+dateTime]',

        medicines: '++_id, active',
        medicineRegistries: '++_id, medicationId, dateTime, caregiverId',

        notifications: '++_id, read, dateTime'
    })
    .upgrade(async transaction => {
        const patientTable = transaction.table('patient')
        const patient = await patientTable.toCollection().first()

        if (!patient) return

        const patientId = patient._id

        const relations = [
            ['allergies', patient.allergies],
            ['healthPlans', patient.healthPlans],
            ['doctors', patient.doctors],
            ['caregivers', patient.caregivers],
            ['emergencyContacts', patient.emergencyContacts]
        ]

        for (const [tableName, records] of relations) {
            if (!records?.length) continue

            await transaction.table(tableName).bulkAdd(
                records.map(({ allergyId, planId, doctorId, caregiverId, contactId, ...record }) => ({
                    ...record,
                    patientId
                }))
            )
        }

        await patientTable.update(patientId, {
            allergies: undefined,
            healthPlans: undefined,
            doctors: undefined,
            caregivers: undefined,
            emergencyContacts: undefined
        })
    })

// Populate Event
db.on("populate", async (transaction) => {
    const patientIds = await transaction.table('patient').bulkAdd([
        {
            name: 'João Carlos Esposito',
            address: 'S. ABC, 41',
            birthDate: '1953-03-10T00:00:00.000Z',
            bloodType: 'o_negative'
        }
    ], { allKeys: true })

    const patientId = patientIds[0]

    await transaction.table('allergies').bulkAdd([
        {
            patientId,
            name: 'Alergia Grave a Penicilina'
        },
        {
            patientId,
            name: 'Outra Alergia'
        }
    ])

    await transaction.table('healthPlans').bulkAdd([
        { patientId, name: 'Unimed Familiar' },
        { patientId, name: 'Plano Municipal SUS' }
    ])

    await transaction.table('doctors').bulkAdd([
        {
            patientId,
            name: 'Dr. Carlos Eduardo',
            speciality: 'cardiology',
            phone: '(11) 99999-8888'
        }
    ])

    const caregivers = await transaction.table('caregivers').bulkAdd([
        {
            patientId: patientId,
            name: 'Marina Souza',
            startDate: '2026-01-15',
            phone: '(11) 98888-7777'
        },
        {
            patientId: patientId,
            name: 'Cleiton Gomes',
            startDate: '2026-01-10',
            phone: '(11) 98888-6666'
        }
    ], { allKeys: true })

    transaction.table('emergencyContacts').bulkAdd([
        {
            patientId: patientId,
            name: 'Roberto Silva',
            kinship: 'son',
            phone: '(11) 97777-5555'
        },
        {
            patientId: patientId,
            name: "Carla Abreu",
            kinship: 'auntie',
            phone: "(11) 97777-4444"
        }
    ])

    transaction.table('vitalSigns').bulkAdd([
        {
            dateTime: new Date('2026-10-07T08:00:00'),
            record: 'bloodPressure',
            value: '130/80',
            patientId: patientId,
            caregiverId: caregivers[0],
            caregiverName: 'Marina Souza',
            observation: 'Nenhuma observação'
        },
        {
            dateTime: new Date('2026-10-09T08:00:00'),
            record: 'bloodPressure',
            value: '110/84',
            patientId: patientId,
            caregiverId: caregivers[0],
            caregiverName: 'Marina Souza',
            observation: 'Nenhuma observação'
        },
        {
            dateTime: new Date('2026-09-09T12:00:00'),
            record: 'bloodPressure',
            value: '140/80',
            patientId: patientId,
            caregiverId: caregivers[0],
            caregiverName: 'Marina Souza',
            observation: 'Nenhuma observação'
        },
        {
            dateTime: new Date('2026-10-07T08:00:00'),
            record: 'bodyTemperature',
            value: '31',
            patientId: patientId,
            caregiverId: caregivers[0],
            caregiverName: 'Marina Souza',
            observation: 'Nenhuma observação'
        },
        {
            dateTime: new Date('2026-10-09T08:00:00'),
            record: 'bodyTemperature',
            value: '33',
            patientId: patientId,
            caregiverId: caregivers[0],
            caregiverName: 'Marina Souza',
            observation: 'Nenhuma observação'
        },
        {
            dateTime: new Date('2026-09-09T12:00:00'),
            record: 'bodyTemperature',
            value: '30',
            patientId: patientId,
            caregiverId: caregivers[0],
            caregiverName: 'Marina Souza',
            observation: 'Nenhuma observação'
        },
        {
            dateTime: new Date('2026-10-07T08:00:00'),
            record: 'oxygenSaturation',
            value: '98',
            patientId: patientId,
            caregiverId: caregivers[0],
            caregiverName: 'Marina Souza',
            observation: 'Nenhuma observação'
        },
        {
            dateTime: new Date('2026-10-09T08:00:00'),
            record: 'oxygenSaturation',
            value: '99',
            patientId: patientId,
            caregiverId: caregivers[0],
            caregiverName: 'Marina Souza',
            observation: 'Nenhuma observação'
        },
        {
            dateTime: new Date('2026-09-09T12:00:00'),
            record: 'oxygenSaturation',
            value: '95',
            patientId: patientId,
            caregiverId: caregivers[0],
            caregiverName: 'Marina Souza',
            observation: 'Nenhuma observação'
        },
        {
            dateTime: new Date('2026-10-07T08:00:00'),
            record: 'bloodGlucose',
            value: '110',
            patientId: patientId,
            caregiverId: caregivers[0],
            caregiverName: 'Marina Souza',
            observation: 'Nenhuma observação'
        },
        {
            dateTime: new Date('2026-10-09T08:00:00'),
            record: 'bloodGlucose',
            value: '85',
            patientId: patientId,
            caregiverId: caregivers[0],
            caregiverName: 'Marina Souza',
            observation: 'Nenhuma observação'
        },
        {
            dateTime: new Date('2026-09-09T12:00:00'),
            record: 'bloodGlucose',
            value: '90',
            patientId: patientId,
            caregiverId: caregivers[0],
            caregiverName: 'Marina Souza',
            observation: 'Nenhuma observação'
        },
        {
            dateTime: new Date('2026-10-07T08:00:00'),
            record: 'heartRate',
            value: '76',
            patientId: patientId,
            caregiverId: caregivers[0],
            caregiverName: 'Marina Souza',
            observation: 'Nenhuma observação'
        },
        {
            dateTime: new Date('2026-10-09T08:00:00'),
            record: 'heartRate',
            value: '80',
            patientId: patientId,
            caregiverId: caregivers[0],
            caregiverName: 'Marina Souza',
            observation: 'Nenhuma observação'
        },
        {
            dateTime: new Date('2026-09-09T12:00:00'),
            record: 'heartRate',
            value: '67',
            patientId: patientId,
            caregiverId: caregivers[0],
            caregiverName: 'Marina Souza',
            observation: 'Nenhuma observação'
        }
    ])

    transaction.table('followUps').bulkAdd([
        {
            dateTime: new Date(),
            record: 'mood',
            value: 'Paciente calmo e colaborativo',
            patientId: patientId,
            caregiverId: caregivers[0],
            caregiverName: 'Marina Souza',
        },
        {
            dateTime: new Date(),
            record: 'sleep',
            value: 85,
            patientId: patientId,
            caregiverId: caregivers[0],
            caregiverName: 'Marina Souza',
        },
        {
            dateTime: new Date(),
            record: 'foodAcceptance',
            value: 'Comeu toda a sopa do jantar',
            patientId: patientId,
            caregiverId: caregivers[0],
            caregiverName: 'Marina Souza',
        }
    ])

    const medicationIds = await transaction
        .table('medicines')
        .bulkAdd([
            {
                name: 'Metformina 850mg',
                dosage: '1 comprimido',
                routeAdmin: 'oral',
                observations: 'Tomar logo após as refeições',
                patientId: patientId,
                active: true
            },
            {
                name: 'Dipirona Monosódica 1g',
                dosage: '1 comprimido',
                routeAdmin: 'oral',
                observations: '',
                patientId: patientId,
                active: false
            }
        ], {allKeys: true})

    transaction.table('medicineRegistries').bulkAdd([
        {
            patientId: patientId,
            medicationId: medicationIds[0],
            medicationName: 'Metformina 850mg',
            medicationDosage: '1 comprimido',
            dateTime: new Date(),
            caregiverId: caregivers[0],
            caregiverName: 'Marina Souza',
            observations: 'Paciente tomou sem resistência'
        }
    ])

    transaction.table('notifications').bulkAdd([
        {
            title: 'Horário de Medicamento',
            description: 'Metformina 850mg pendente de administração às 20:00.',
            read: false,
            patientId: patientId,
            dateTime: new Date()
        },
        {
            title: "Notificação Lida Teste",
            description: 'Descricação de notificação lida',
            read: true,
            patientId: patientId,
            dateTime: new Date()
        }
    ])
})

// Open connection
db.open().catch(function (err) {
    console.error("Error trying to open IndexedDB: ", err)
})

export default db