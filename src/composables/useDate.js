import { currentLanguage, LANGUAGES } from "./useLanguage.js"

export function useDate() {
    const today = new Date()

    /**
     * Returns age based in `ISO` or `String` date
     *
     * @param { Date } birthDate - Birth date
     *
     * @return { int }
     **/
    const getAge = (birthDate) => {
        const time = new Date(birthDate)

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
     *  getFormatted("2026-09-19T14:24:36.172Z", true) -> "11h 24min - 19/09/2026"
     *  getFormatted("2026-09-19T14:24:36.172Z", false) -> "19/09/2026"
     **/
    const getFormatted = (dateInput, fullDate = true) => {
        // Handle standalone times (HH:mm)
        if (typeof dateInput === 'string' &&
            /^\d{2}:\d{2}$/.test(dateInput)) {

            const [hour, minute] = dateInput.split(':').map(Number)

            if (hour > 23 || minute > 59) {
                return dateInput
            }

            return currentLanguage.value === LANGUAGES.PT_BR
                ? `${String(hour).padStart(2, '0')}h ${String(minute).padStart(2, '0')}min`
                : `${String(hour % 12 || 12).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`
        }

        const time = new Date(dateInput)

        const day = String(time.getDate()).padStart(2, '0')
        const month = String(time.getMonth() + 1).padStart(2, '0')
        const year = time.getFullYear()
        const hour = String(time.getHours()).padStart(2, '0')
        const minute = String(time.getMinutes()).padStart(2, '0')

        let hoursFormatted = currentLanguage.value === LANGUAGES.PT_BR
            ? `${hour}h ${minute}min`
            : `${hour % 12}:${minute} ${hour > 12 ? "PM" : "AM"}`

        let dateFormatted = currentLanguage.value === LANGUAGES.PT_BR
            ? `${day}/${month}/${year}`
            : `${month}/${day}/${year}`

        return fullDate
            ? `${hoursFormatted} - ${dateFormatted}`
            : `${dateFormatted}`
    }

    /**
     * Returns today's date formatted by `YYYY-MM-DD`.
     *
     * @returns { String } Formatted today's date.
     * @example date.getToday() -> "2026-05-14"
     **/
    const getToday = () => {
        const year = today.getFullYear()
        const month = String(today.getMonth() + 1).padStart(2, "0")
        const day = String(today.getDate()).padStart(2, "0")

        return `${year}-${month}-${day}`
    }

    /**
     * Returns today's time formatted by `HH:MM`.
     *
     * @returns { String } Formatted today's time.
     * @example date.getTime() -> "14:30"
     **/
    const getTime = () => {
        const hours = String(today.getHours()).padStart(2, "0")
        const minutes = String(today.getMinutes()).padStart(2, "0")

        return `${hours}:${minutes}`
    }

    /**
     * Returns current local date and time formatted for `datetime-local` input (`YYYY-MM-DDTHH:mm`).
     *
     * @returns { String } Formatted current local date and time.
     * @example getCurrentDateTimeLocal() -> "2026-05-10T08:10"
     **/
    const getCurrentDateTimeLocal = () => {
        return formatToDateTimeLocal(new Date())
    }

    /**
     * Parse any Date/ISO String to datetime-local formart by the local time zone.
     *
     * @param { Date | String } dateInput
     */
    const formatToDateTimeLocal = (dateInput) => {
        if (!dateInput) return ""

        const d = new Date(dateInput)
        if (isNaN(d.getTime())) return ""

        const year = d.getFullYear()
        const month = String(d.getMonth() + 1).padStart(2, "0")
        const day = String(d.getDate()).padStart(2, "0")
        const hours = String(d.getHours()).padStart(2, "0")
        const minutes = String(d.getMinutes()).padStart(2, "0")

        return `${year}-${month}-${day}T${hours}:${minutes}`
    }

    return { getAge, getFormatted, getToday, formatToDateTimeLocal, getCurrentDateTimeLocal, getTime }
}