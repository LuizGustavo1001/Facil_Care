import db from '../database/db.js'

export default class Patients {
    /**
    * Return patient name based on Id (pacientId)
    * @param {String} patientId - patient id (pat_<id>)
    **/
    static async getName(patientId){
        const result = await db.patients
            .where('_id')
            .equals(patientId)
            .toArray()

        return result.length > 0 ? result[0].name : null
    }
}