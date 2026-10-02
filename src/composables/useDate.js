import { currentLanguage } from "./useLanguage.js"

export function useDate() {

    /**
     * Returns age based in `ISO` or `String` date
     *
     * @param { Date } birthDate - Birth date
     *
     * @return { int }
     **/
    const getAge = (birthDate) => {
        const time = new Date(birthDate)
        const today = new Date()

        let age = today.getFullYear() - time.getFullYear()
        const monthDifference = today.getMonth() - time.getMonth()

        if(monthDifference < 0 || (monthDifference === 0 && today.getDate() < today.getDate())){
            age--
        }

        return age
    }

    /**
     * Returns formatted date based in the **current application language**
     *
     * @param { Date | String } dateInput - Patient birth date *(ISO or String)*
     * @param { boolean } fullDate - Date format (Full or Short)
     *
     * @example
     *  getFormattedDate("2026-09-19T14:24:36.172Z", true) -> "11h 24min - 19/09/2026"
     *  getFormattedDate("2026-09-19T14:24:36.172Z", false) -> "19/09/2026"
     **/
    const getFormattedDate = (dateInput, fullDate = true) => {
        const time = new Date(dateInput)

        const day = String(time.getDate()).padStart(2, '0')
        const month = String(time.getMonth() + 1).padStart(2, '0')
        const year = time.getFullYear()
        const hour = String(time.getHours()).padStart(2, '0')
        const minute = String(time.getMinutes()).padStart(2, '0')

        let hoursFormatted = `${hour}h ${minute}min`
        let dateFormatted = currentLanguage.value !== 'pt-BR'
            ? `${day}/${month}/${year}`
            : `${year}/${month}/${day}`

        return fullDate
            ? `${hoursFormatted} - ${dateFormatted}`
            : `${dateFormatted}`
    }

    return { getAge, getFormattedDate }
}