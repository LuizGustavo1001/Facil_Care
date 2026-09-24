import { currentLanguage } from "./useLanguage.js"

export function useAge() {

    /**
    * Return patient age
    *
    * @param { Date } birthDate - Patient birth date
    **/
    const getAge = (birthDate) => {
        const today = new Date()

        let age = today.getFullYear() - birthDate.getFullYear()
        const monthDifference = today.getMonth() - birthDate.getMonth()

        if(monthDifference < 0 || (monthDifference === 0 && today.getDate() < today.getDate())){
            age--
        }

        return age
    }

    /**
     * example: getFormattedDate("2026-09-19T14:24:36.172Z") -> "11:24 - 19/09/2026"
     *
     * @param { Date | String } dateInput - Patient birth date ISO or String
     * @param { boolean } full - Short date(false) or Full date(true)
     **/
    const getFormattedDate = (dateInput, full = true) => {
        const time = new Date(dateInput)

        const day = String(time.getDate()).padStart(2, '0')
        const month = String(time.getMonth() + 1).padStart(2, '0')
        const year = time.getFullYear()
        const hour = String(time.getHours()).padStart(2, '0')
        const minute = String(time.getMinutes()).padStart(2, '0')

        let hoursFormatted = `${hour}h ${minute} min`
        let dateFormatted = currentLanguage.value !== 'pt-BR' ? `${day}/${month}/${year}` : `${year}/${month}/${day}`

        return full ?
            `${hoursFormatted} - ${dateFormatted}` :
            `${dateFormatted}`
    }

    return { getAge, getFormattedDate }
}