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
     **/
    const getFormattedDate = (dateInput) => {
        const date = new Date(dateInput);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');

        if(currentLanguage.value !== 'pt-BR'){
            return `${hour}:${minute} - ${year}/${month}/${day}`
        }

        return `${hour}h ${minute} min - ${day}/${month}/${year}`
    }

    return { getAge, getFormattedDate }
}