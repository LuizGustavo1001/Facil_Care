import { computed } from "vue"
import { currentLanguage } from "./useLanguage"
import { FORMATTED_LANGUAGES, LANGUAGES } from "../constants/sysLanguages"
import { DAY_PERIODS } from "../constants/dayPeriods"

import type { DateInput, DayPeriod } from "../types/date"

export const formatedLanguage = computed<string>(() => {
    switch (currentLanguage.value) {
        case LANGUAGES.PT_BR:
            return FORMATTED_LANGUAGES.PT_BR

        default:
            return FORMATTED_LANGUAGES.EN_US
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
        minute: "2-digit"
    })),
    numericDateTime: computed(() => new Intl.DateTimeFormat(formatedLanguage.value, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    }))
}

export function useDate() {
    const pad = (value: number): string =>
        String(value).padStart(2, "0")

    /**
     * Returns age based on an `ISO` or `String` date
     **/
    const getAge = (birthDate: DateInput): number | null => {
        const today = new Date()
        const time = new Date(birthDate)

        if (Number.isNaN(time.getTime())) return null

        let age = today.getFullYear() - time.getFullYear()

        const monthDiff = today.getMonth() - time.getMonth()

        if(monthDiff < 0 || (monthDiff === 0 && today.getDate() < time.getDate())) {
            age --
        }

        return age
    }

    /**
     * Returns formatted date based on the current application language.
     * Accepts Date, ISO String or standalone time *(HH:mm)*.
     *
     * @param dateInput - Date to be formatted
     * @param fullDate - Include time in the result
     */
    const getFormatted = (dateInput: DateInput, fullDate: boolean = true): string => {
        if(!dateInput) return ""

        // 1. Handle standalone times (HH:mm)
        if (typeof dateInput === "string" && /^\d{2}:\d{2}$/.test(dateInput)) {
            const currentTime = timeToDate(dateInput)

            if (typeof currentTime === "string") return "---"

            return formatters.numericTime.value.format(currentTime)
        }

        // 2. ISO String
        const date = new Date(dateInput)

        if(Number.isNaN(date.getTime())) return ""

        return fullDate
            ? formatters.numericDateTime.value.format(date)
            : formatters.numericDate.value.format(date)
    }

    /**
     * Returns today's date formatted as `YYYY-MM-DD`.
     */
    const getToday = (): string => {
        const today = new Date()

        return [
            today.getFullYear(),
            pad(today.getMonth() + 1),
            pad(today.getDate())
        ].join("-")
    }
    /**
     * Returns a full date formatted based on the current application language.
     */
    const getFullDate = (date: Date = new Date()): string => {
        return formatters.fullDate.value.format(date)
    }

    /**
     * Returns a numeric hour formatted based on the current application language.
     */
    const getNumericHour = (date?: Date | string): string => {
        console.log(getHourWithoutLocale(date as Date))
        return formatters.numericTime.value.format(date as Date)
    }

    /**
     * Returns time in `HH:mm` format without locale.
     */
    const getHourWithoutLocale = (date = new Date()): string => {
        const hour = date.getHours()
        const minutes = date.getMinutes()

        return `${hour}:${minutes}`
    }

    /**
     * Returns a numeric date formatted based on the current application language.
     */
    const getNumericDate = (date: Date = new Date()): string => {
        return formatters.numericDate.value.format(date)
    }

    /**
     * Returns a numeric date and time formatted based on the current application language.
     */
    const getNumericDateTime = (date: Date = new Date()): string => {
        return formatters.numericDateTime.value.format(date)
    }

    /**
     * Returns the current local date and time in datetime-local format.
     *
     * @example
     * // 2026-11-04T18:26
     */
    const getCurrentDateTimeLocal = (date: Date = new Date()): string => {
        if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
            return ""
        }

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
     * @example
     * // Input: 2026-11-04T21:26:00.000Z
     * // Output (UTC-3): "2026-11-04T18:26"
     */
    const formatToDateTimeLocal = (value: DateInput): string => {
        if (value === null || value === undefined || value === "") {
            return ""
        }

        const parsedDate = value instanceof Date
            ? value
            : new Date(value)

        if (Number.isNaN(parsedDate.getTime())) {
            return ""
        }

        const year = parsedDate.getFullYear()
        const month = pad(parsedDate.getMonth() + 1)
        const day = pad(parsedDate.getDate())
        const hours = pad(parsedDate.getHours())
        const minutes = pad(parsedDate.getMinutes())

        return `${year}-${month}-${day}T${hours}:${minutes}`
    }

    /**
     * Converts standalone times `(HH:mm)` (String) into `date`
     *
     * @example
     * timetoDate("08:00")
     * // Wed Nov 04 2026 08:00:00 GMT-0300 (Brasilia Standard Time)
     **/
    const timeToDate = (time: string): Date | string => {
        if(!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(time)) {
            return ""
        }

        const [hours, minutes] = time.split(":").map(Number)

        const date = new Date()
        date.setHours(hours, minutes, 0, 0)

        return date
    }

    /**
     * Returns current day period based in the current hour of the `date`
     *
     * @return String that represents the current day period
     **/
    const getDayPeriod = (date: Date): DayPeriod => {
        const dayPeriod = date.toLocaleString("en-US", { dayPeriod: "short" })

        if(dayPeriod.endsWith(DAY_PERIODS.MORNING)) return DAY_PERIODS.MORNING

        if(dayPeriod.endsWith(DAY_PERIODS.EVENING)) return DAY_PERIODS.EVENING

        else return DAY_PERIODS.AFTERNOON
    }

    return {
        getAge,
        getFormatted,
        getHourWithoutLocale,
        getToday,
        getFullDate,
        getNumericDate,
        getNumericHour,
        getNumericDateTime,
        getCurrentDateTimeLocal,
        formatToDateTimeLocal,
        timeToDate,
        getDayPeriod
    }
}