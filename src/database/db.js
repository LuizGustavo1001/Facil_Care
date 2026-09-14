import { Dexie } from 'dexie'

var db = new Dexie('facilCareDB')

db.version(1).stores({
    patient: 'id++',
    vitalSigns: 'id++, dateTime',
    vitalSignRecords: '',
    dailyMonitoring: 'id++, dateTime',
    medicines: 'id++, name',
    medicineRecords: 'id++, medicineId, dateTime'
})