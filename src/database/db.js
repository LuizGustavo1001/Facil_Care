import { Dexie } from 'dexie'

let db = new Dexie('facilCareDB')

db.version(1).stores({
    patients: '_id, name',
    vitalSigns: '_id, patientId, dateTime, vitalSign, caregiverId',
    followUps: '_id, patientId, dateTime',
    medicines: '_id, patientId, active',
    medicineRegistries: '_id, patientId, medicationId, dateTime, caregiverId',
    notifications: '_id, patientId, red, dateTime'
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
            patientId: 'pat_1001',
            dateTime: '2026-09-15T14:30:00Z',
            vitalSign: 'Pressão Sanguínea',
            value: '120/80',
            unit: 'mmHg',
            caregiverId: 'cg_301',
            caregiverName: 'Marina Souza',
            observation: 'Nenhuma observação'
        }
    ])

    transaction.table('followUps').bulkAdd([
        {
            _id: 'fu_3001',
            patientId: 'pat_1001',
            dateTime: '2026-09-15T20:00:00Z',
            mood: 'Paciente calmo e colaborativo',
            painLevel: {
                numericScale: 3,
                facesScale: 'Dor Leve'
            },
            sleepQuality: 85,
            foodAcceptance: 'Comeu toda a sopa do jantar',
            waterIngestionLiters: 1.5,
            bowelControl: 'Funcionando normalmente',
            diureticControl: 'Sem queixas, urina clara',
            pictureUrl: 'https://storage.seuapp.com/patients/pat_1001/followups/fu_3001.jpg',
            caregiverId: 'cg_301',
            caregiverName: 'Marina Souza'
        }
    ])

    transaction.table('medicines').bulkAdd([
        {
            _id: 'med_4001',
            patientId: 'pat_1001',
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
            patientId: 'pat_1001',
            medicationId: 'med_4001',
            medicationName: 'Metformina 850mg',
            medicationDosage: '1 comprimido',
            dateTime: '2026-09-15T20:05:00Z',
            caregiverId: 'cg_301',
            caregiverName: 'Marina Souza',
            observations: 'Paciente tomou sem resistência'
        }
    ])

    transaction.table('notifications').bulkAdd([
        {
            _id: 'notif_6001',
            patientId: 'pat_1001',
            recipientId: 'cg_301',
            title: 'Horário de Medicamento',
            description: 'Metformina 850mg pendente de administração às 20:00.',
            read: false,
            dateTime: '2026-09-15T20:00:00Z'
        }
    ])
})

// Open connection
db.open().catch(function (err) {
    console.error("Error trying to open IndexedDB: ", err)
})

export default db