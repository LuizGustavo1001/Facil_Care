import { Asd } from 'dexie'

var db = new Asd('facilCareDB')

db.version(1).stores({
    patient: 'id++',
    vitalSigns: 'id++, dateTime',
    vitalSignRecords: '',
    dailyMonitoring: 'id++, dateTime',
    medicines: 'id++, name',
    medicineRecords: 'id++, medicineId, dateTime'
})