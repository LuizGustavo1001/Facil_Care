import { currentLanguage } from "./useLanguage.js"
import { LANGUAGES } from "../constants/sysLanguages.js"
import { computed } from "vue"
import { DAY_PERIODS } from "../constants/dayPeriods.js"

export const formatedLanguage = computed(() => {
    switch (currentLanguage.value) {
        case LANGUAGES.PT_BR:
            return "pt-BR"
        default:
            return "en-US"
    }
})

const formatters = {
    fullDate: computed(() => new Intl.DateTimeFormat(formatedLanguage.value, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    })),
    numericDate: computed(() => new Intl.DateTimeFormat(formatedLanguage.value, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    })),
    numericTime: computed(() => new Intl.DateTimeFormat(formatedLanguage.value, {
        hour: "2-digit",
        minute: "2-digit",
    })),
    numericDateTime: computed(() => new Intl.DateTimeFormat(formatedLanguage.value, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }))
}

export function useDate() {

    /**
     * Returns age based in `ISO` or `String` date
     *
     * @param { Date } birthDate - Birth date
     *
     * @return { int | null }
     **/
    const getAge = (birthDate) => {
        const today = new Date()
        const time = new Date(birthDate)

        if (Number.isNaN(today.getTime())) return null

        let age = today.getFullYear() - time.getFullYear()
        const monthDiff = today.getMonth() - time.getMonth()

        if(monthDiff < 0 || (monthDiff === 0 && today.getDate() < time.getDate())) {
             age --
        }

        return age
    }

    /**
     * Returns formatted date based on the current application language.
     *
     * Accepts Date, ISO String or standalone time (HH:mm).
     *
     * @param { Date | String } dateInput
     * @param { Boolean } fullDate - Include time in the result
     * @returns { String }
     */
    const getFormatted = (dateInput, fullDate = true) => {
        if(!dateInput) return ""

        // 1. Handle standalone times (HH:mm)
        if(typeof dateInput === "string" && /^\d{2}:\d{2}$/.test(dateInput)) {
            formatters.numericTime.value.format(timeToDate(dateInput))
        }

        const date = new Date(dateInput)

        if(Number.isNaN(date.getTime())) return ""

        return fullDate
            ? formatters.numericDateTime.value.format(date)
            : formatters.numericDate.value.format(date)
    }

    /**
     * Returns today's date formatted by YYYY-MM-DD.
     *
     * @returns { String }
     */
    const getToday = () => {
        const today = new Date()
        return formatters.numericDate.value.format(today)
    }

    /**
     * Returns a full date formatted based on the current application language.
     *
     * @param { Date } date
     * @returns { String }
     */
    const getFullDate = (date = new Date()) => {
        return formatters.fullDate.value.format(date)
    }

    /**
     * Returns a numeric hour formatted based on the current application language.
     *
     * @param { Date } date
     * @returns { String }
     */
    const getNumericHour = (date = new Date()) => {
        return formatters.numericTime.value.format(date)
    }

    const getTime = (date = new Date()) => {
        const hour = date.getHours()
        const minutes = date.getMinutes()

        return `${hour}:${minutes}`
    }

    /**
     * Returns a numeric date formatted based on the current application language.
     *
     * @param { Date } date
     * @returns { String }
     */
    const getNumericDate = (date = new Date()) => {
        return formatters.numericDate.value.format(date)
    }

    /**
     * Returns a numeric date and time formatted based on the current application language.
     *
     * @param { Date } date
     * @returns { String }
     */
    const getNumericDateTime = (date = new Date()) => {
        return formatters.numericDateTime.value.format(date)
    }

    /**
     * Returns the current local date and time in datetime-local format.
     *
     * @param {Date} date
     * @returns {String}
     *
     * @example
     * // 2026-11-04T18:26
     */
    const getCurrentDateTimeLocal = (date = new Date()) => {
        if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
            return ""
        }

        const pad = (value) => String(value).padStart(2, "0")

        const year = date.getFullYear()
        const month = pad(date.getMonth() + 1)
        const day = pad(date.getDate())
        const hours = pad(date.getHours())
        const minutes = pad(date.getMinutes())

        return `${year}-${month}-${day}T${hours}:${minutes}`
    }

    /**
     * Formats a date into the datetime-local input format.
     *
     * @param {Date|string|number} value
     * @returns {String}
     *
     * @example
     * // Input: 2026-11-04T21:26:00.000Z
     * // Output (UTC-3): 2026-11-04T18:26
     */
    const formatToDateTimeLocal = (value) => {
        if (value === null || value === undefined || value === "") {
            return ""
        }

        const parsedDate = value instanceof Date
            ? value
            : new Date(value)

        if (Number.isNaN(parsedDate.getTime())) {
            return ""
        }

        const pad = (number) => String(number).padStart(2, "0")

        const year = parsedDate.getFullYear()
        const month = pad(parsedDate.getMonth() + 1)
        const day = pad(parsedDate.getDate())
        const hours = pad(parsedDate.getHours())
        const minutes = pad(parsedDate.getMinutes())

        return `${year}-${month}-${day}T${hours}:${minutes}`
    }

    /**
     * Converts `standalone times` (String) into `date`
     *
     * @param { String } time
     *
     * @example
     * timetoDate("08:00")
     * // Wed Nov 04 2026 08:00:00 GMT-0300 (Brasilia Standard Time)
     **/
    const timeToDate = (time) => {
        const [hours, minutes] = time.split(":").map(Number)

        if(hours > 23 || minutes > 59) return time

        const date = new Date()
        date.setHours(hours, minutes, 0, 0)

        return date
    }

    /**
     * Returns current day period based in the current hour of the `date`
     *
     * @param { Date } date
     *
     * @return { String } String that represents the current day period
     **/
    const getDayPeriod = (date) => {
        const dayPeriod = date.toLocaleString("en-US", { dayPeriod: "short" })

        if(dayPeriod.endsWith(DAY_PERIODS.MORNING)) return DAY_PERIODS.MORNING

        if(dayPeriod.endsWith(DAY_PERIODS.EVENING)) return DAY_PERIODS.EVENING

        else return DAY_PERIODS.AFTERNOON
    }


    return { getAge, getFormatted, getTime, getToday, getFullDate, getNumericDate, getNumericHour, getNumericDateTime, getCurrentDateTimeLocal, formatToDateTimeLocal, timeToDate, getDayPeriod }
}