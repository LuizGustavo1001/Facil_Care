import { Dexie } from 'dexie'

const db = new Dexie('facilCareDB')

db.version(1).stores({
    patients: '_id, name',
    vitalSigns: '_id, dateTime, vitalSign, caregiverId, [vitalSign+dateTime]',
    followUps: '_id, dateTime, followUp, caregiverId, [followUp+dateTime]',
    medicines: '_id, active',
    medicineRegistries: '_id, medicationId, dateTime, caregiverId',
    notifications: '_id, red, dateTime, read'
})

// Populate Event
db.on("populate", (transaction) => {
    transaction.table('patients').bulkAdd([
        {
            _id: 'pat_1001',
            name: 'Antônio Silva',
            address: 'R. ABC, 41 - Bairro, Cidade',
            birthDate: '1953-03-15',
            bloodType: 'O-',
            allergies: ['Alergia Grave a Penicilina'],
            healthPlans: ['Unimed Familiar', 'Plano Municipal SUS'],
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
                }
            ],
            emergencyContacts: [
                {
                    name: 'Roberto Silva',
                    kinship: 'Filho',
                    phone: '(11) 97777-6666'
                }
            ]
        }
    ])

    transaction.table('vitalSigns').bulkAdd([
        {
            _id: 'vs_2001',
            dateTime: new Date(),
            vitalSign: 'bloodPressure',
            value: '120/80',
            unit: 'mmHg',
            caregiverId: 'cg_301',
            caregiverName: 'Marina Souza',
            observation: 'Nenhuma observação'
        }
    ])

    transaction.table('followUps').bulkAdd([
        {
            _id: 'fu_1001',
            dateTime: new Date(),
            followUp: 'mood',
            value: 'Paciente calmo e colaborativo',
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
            routeAdmin: 'Via oral',
            schedules: ['08:00', '20:00'],
            observations: 'Tomar logo após as refeições',
            active: true
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
        }
    ])
})

// Open connection
db.open().catch(function (err) {
    console.error("Error trying to open IndexedDB: ", err)
})

export default db