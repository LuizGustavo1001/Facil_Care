import { Dexie } from 'dexie'

const db = new Dexie('facilCareDB')

db.version(1).stores({
    patient: '++_id, name',
    vitalSigns: '++_id, dateTime, record, caregiverId, [record+dateTime]',
    followUps: '++_id, dateTime, record, caregiverId, [record+dateTime]',
    medicines: '++_id, active',
    medicineRegistries: '++_id, medicineId, dateTime, caregiverId',
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
        medicineRegistries: '++_id, medicineId, dateTime, caregiverId',

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
            name: 'Alergia Grave a Penicilina',
            patientId: patientId,
        },
        {
            name: 'Outra Alergia',
            patientId: patientId
        }
    ])

    await transaction.table('healthPlans').bulkAdd([
        { name: 'Unimed Familiar', patientId: patientId },
        { name: 'Plano Municipal SUS', patientId: patientId }
    ])

    await transaction.table('doctors').bulkAdd([
        {
            name: 'Dr. Carlos Eduardo',
            speciality: 'cardiology',
            phone: '(11) 99999-8888',
            patientId: patientId
        }
    ])

    const caregivers = await transaction.table('caregivers').bulkAdd([
        {
            name: 'Marina Souza',
            startDate: '2026-01-15',
            phone: '(11) 98888-7777',
            patientId: patientId
        },
        {
            name: 'Cleiton Gomes',
            startDate: '2026-01-10',
            phone: '(11) 98888-6666',
            patientId: patientId
        }
    ], { allKeys: true })

    transaction.table('emergencyContacts').bulkAdd([
        {
            name: 'Roberto Silva',
            kinship: 'son',
            phone: '(11) 97777-5555',
            patientId: patientId
        },
        {
            name: "Carla Abreu",
            kinship: 'auntie',
            phone: "(11) 97777-4444",
            patientId: patientId
        }
    ])

    transaction.table('vitalSigns').bulkAdd([
        {
            record: 'bloodPressure',
            value: '130/80',
            dateTime: new Date('2026-10-07T08:00:00'),
            observation: 'Nenhuma observação',
            patientId: patientId,
            caregiverId: caregivers[0]
        },
        {
            record: 'bloodPressure',
            value: '110/84',
            dateTime: new Date('2026-10-09T08:00:00'),
            observation: 'Nenhuma observação',
            patientId: patientId,
            caregiverId: caregivers[0]
        },
        {
            record: 'bloodPressure',
            value: '140/80',
            dateTime: new Date('2026-09-09T12:00:00'),
            observation: 'Nenhuma observação',
            patientId: patientId,
            caregiverId: caregivers[0]
        },
        {
            record: 'bodyTemperature',
            value: '31',
            dateTime: new Date('2026-10-07T08:00:00'),
            observation: 'Nenhuma observação',
            patientId: patientId,
            caregiverId: caregivers[0]
        },
        {
            record: 'bodyTemperature',
            value: '33',
            dateTime: new Date('2026-10-09T08:00:00'),
            observation: 'Nenhuma observação',
            patientId: patientId,
            caregiverId: caregivers[0]
        },
        {
            record: 'bodyTemperature',
            value: '30',
            dateTime: new Date('2026-09-09T12:00:00'),
            observation: 'Nenhuma observação',
            patientId: patientId,
            caregiverId: caregivers[0]
        },
        {
            record: 'oxygenSaturation',
            value: '98',
            dateTime: new Date('2026-10-07T08:00:00'),
            observation: 'Nenhuma observação',
            patientId: patientId,
            caregiverId: caregivers[0]
        },
        {
            record: 'oxygenSaturation',
            value: '99',
            dateTime: new Date('2026-10-09T08:00:00'),
            observation: 'Nenhuma observação',
            patientId: patientId,
            caregiverId: caregivers[0]
        },
        {
            record: 'oxygenSaturation',
            value: '95',
            dateTime: new Date('2026-09-09T12:00:00'),
            observation: 'Nenhuma observação',
            patientId: patientId,
            caregiverId: caregivers[0],
        },
        {
            record: 'bloodGlucose',
            value: '110',
            dateTime: new Date('2026-10-07T08:00:00'),
            observation: 'Nenhuma observação',
            patientId: patientId,
            caregiverId: caregivers[0]
        },
        {
            record: 'bloodGlucose',
            value: '85',
            dateTime: new Date('2026-10-09T08:00:00'),
            observation: 'Nenhuma observação',
            patientId: patientId,
            caregiverId: caregivers[0]
        },
        {
            record: 'bloodGlucose',
            value: '90',
            dateTime: new Date('2026-09-09T12:00:00'),
            observation: 'Nenhuma observação',
            patientId: patientId,
            caregiverId: caregivers[0]
        },
        {
            record: 'heartRate',
            value: '76',
            dateTime: new Date('2026-10-07T08:00:00'),
            observation: 'Nenhuma observação',
            patientId: patientId,
            caregiverId: caregivers[0]
        },
        {
            record: 'heartRate',
            value: '80',
            dateTime: new Date('2026-10-09T08:00:00'),
            observation: 'Nenhuma observação',
            patientId: patientId,
            caregiverId: caregivers[0]
        },
        {
            record: 'heartRate',
            value: '67',
            dateTime: new Date('2026-09-09T12:00:00'),
            observation: 'Nenhuma observação',
            patientId: patientId,
            caregiverId: caregivers[0]
        }
    ])

    transaction.table('followUps').bulkAdd([
        {
            record: 'mood',
            value: 'Paciente calmo e colaborativo',
            dateTime: new Date(),
            patientId: patientId,
            caregiverId: caregivers[0]
        },
        {
            record: 'sleep',
            value: '8',
            dateTime: new Date(),
            patientId: patientId,
            caregiverId: caregivers[0]
        },
        {
            record: 'mealAcceptance',
            value: 'Comeu toda a sopa do jantar',
            dateTime: new Date(),
            patientId: patientId,
            caregiverId: caregivers[0]
        }
    ])

    const medicineIds = await transaction.table('medicines').bulkAdd([
        {
            name: 'Metformina 850mg',
            routeAdmin: 'oral',
            administrationTimes: ["08:00", "14:00", "20:00"],
            observations: 'Tomar logo após as refeições',
            patientId: patientId,
            active: true
        },
        {
            name: 'Dipirona Monossódica 1g',
            routeAdmin: 'oral',
            administrationTimes: ["08:00", "14:00", "20:00"],
            observations: '',
            patientId: patientId,
            active: false
        }
    ], {allKeys: true})

    transaction.table('medicineRegistries').bulkAdd([
        {
            patientId: patientId,
            medicineId: medicineIds[0],
            adminTime: new Date('2026-10-09T08:00:00'),
            dosage: '1 comprimido',
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