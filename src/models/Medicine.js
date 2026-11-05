import { PatientSubCategory } from "./PatientSubCategory.js"

export default class Medicine extends PatientSubCategory{
    constructor(db) {
        super(db, "medicines")
    }

    /**
     * Retrieves medicines by the weekday on which they are administered
     *
     * @param { int } weekDay The selected weekDay
     *
     * @returns { Promise<Object|undefined> } - The matching record, or undefined if not found.
     *
     * @throws { Error } If a database operation fails.
     **/
    async getByWeekDay(weekDay) {
        try {
            const table = await this.getTable()

            return table
                .filter(medicine => medicine.administrationWeekDays?.includes(weekDay))
                .toArray()
        } catch(err) {
            throw err
        }
    }
}