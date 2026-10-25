import { Dexie } from 'dexie'

const db = new Dexie('facilCareDB')

db.version(1).stores({
    patient: '++_id, name, address, birthDate, bloodType, weight',

    allergies: '++_id, patientId, name',
    healthPlans: '++_id, patientId, name',
    doctors: '++_id, patientId, name',
    caregivers: '++_id, patientId, name',
    emergencyContacts: '++_id, patientId, name',

    vitalSigns: '++_id, dateTime, record, caregiverId, [record+dateTime]',
    followUps: '++_id, dateTime, record, caregiverId, [record+dateTime]',

    medicines: '++_id, active',
    medicineRegistries: '++_id, medicineId, dateTime',

    notifications: '++_id, read, dateTime'
})

// Populate Event
db.on("populate", async (transaction) => {
    const patientIds = await transaction.table('patient').bulkAdd([
        {
            name: 'João Carlos Esposito',
            address: 'Av. Afonso Pena, 1537 - Centro, Belo Horizonte',
            birthDate: '1953-03-10T00:00:00.000Z',
            bloodType: 'o_negative',
            weight: '65'
        }
    ], { allKeys: true })

    const patientId = patientIds[0]

    await transaction.table('allergies').bulkAdd([
        {
            name: 'Alergia Grave a Penicilina',
            patientId: patientId
        },
        {
            name: 'Alergia a Ibuprofeno',
            patientId: patientId
        }
    ])

    await transaction.table('healthPlans').bulkAdd([
        { name: 'Plano Usisaúde', patientId: patientId },
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
            dateTime: new Date(),
            observations: 'Adicione mais registros clicando no botão abaixo',
            patientId: patientId,
            caregiverId: caregivers[0]
        },
        {
            record: 'bodyTemperature',
            value: '31',
            dateTime: new Date(),
            observations: 'Adicione mais registros clicando no botão abaixo',
            patientId: patientId,
            caregiverId: caregivers[0]
        },
        {
            record: 'oxygenSaturation',
            value: '98',
            dateTime: new Date(),
            observations: 'Adicione mais registros clicando no botão abaixo',
            patientId: patientId,
            caregiverId: caregivers[0]
        },
        {
            record: 'bloodGlucose',
            value: '110',
            dateTime: new Date(),
            observations: 'Adicione mais registros clicando no botão abaixo',
            patientId: patientId,
            caregiverId: caregivers[0]
        },
        {
            record: 'heartRate',
            value: '76',
            dateTime: new Date(),
            observations: 'Adicione mais registros clicando no botão abaixo',
            patientId: patientId,
            caregiverId: caregivers[0]
        },
        {
            record: 'heartRate',
            value: '80',
            dateTime: new Date(),
            observations: 'Adicione mais registros clicando no botão abaixo',
            patientId: patientId,
            caregiverId: caregivers[0]
        },
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
        },
        {
            record: 'waterIntake',
            value: 1.5,
            dateTime: new Date(),
            patientId: patientId,
            caregiverId: caregivers[0]
        },
        {
            record: "weight",
            value: 65,
            dateTime: new Date(),
            patientId: patientId,
            caregiverId: caregivers[0]
        },
        {
            record: "necessities",
            value: "Urinando sem problemas",
            dateTime: new Date(),
            patientId: patientId,
            caregiverId: caregivers[0]
        },
        {
            record: "painLevel",
            value: 3,
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
            adminTime: new Date(),
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
        }
    ])
})

// Open connection
db.open().catch(function (err) {
    console.error("Error trying to open IndexedDB: ", err)
})

export default db