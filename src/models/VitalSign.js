import db from '../database/db.js'

export default class VitalSign {
    static #availableAttributes= ['_id', 'patientId', 'dateTime', 'vitalSign', 'caregiverId']

    /**
    * Search registries filtered by params and sorted by dateTime
    * @param {string} paramName - Indexed field name
    * @param {any} paramId - Filter value
    * @param {'asc' | 'desc'} order - Sort type ('desc' (default) or 'asc')
    **/
    static async getByParams(paramName, paramId, order = 'desc'){
        // 1. Verify param availability
        if(! this.#availableAttributes.includes(paramName)){
            return []
        }

        // 2. DB query
        const result = await db.vitalSigns
            .where(paramName)
            .equals(paramId)
            .sortBy('dateTime')

        // 3. apply sort
        return order === 'desc' ? result.reverse() : result
    }
}
