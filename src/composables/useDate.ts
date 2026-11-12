import { computed } from "vue"
import { currentLanguage } from "./useLanguage"
import { FORMATTED_LANGUAGES, LANGUAGES } from "../constants/sysLanguages"
import { DAY_PERIODS } from "../constants/dayPeriods"

import type { DateInput, DayPeriod, DateFormatOptions } from "../types/date"

export const formatedLanguage = computed<string>(() => {
    switch (currentLanguage.value) {
        case LANGUAGES.PT_BR:
            return FORMATTED_LANGUAGES.PT_BR

        default:
            return FORMATTED_LANGUAGES.EN_US
    }
})

/**
 * Default date formatters.
 * Automatically update when the application language changes.
 */
const formatters = {
    fullDate: computed(() =>
        new Intl.DateTimeFormat(formatedLanguage.value, {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        })
    ),
    numericDate: computed(() =>
        new Intl.DateTimeFormat(formatedLanguage.value, {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        })
    ),
    numericTime: computed(() =>
        new Intl.DateTimeFormat(formatedLanguage.value, {
            hour: "2-digit",
            minute: "2-digit"
        })
    ),
    numericDateTime: computed(() =>
        new Intl.DateTimeFormat(formatedLanguage.value, {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        })
    )
}

export function useDate() {
    const pad = (value: number): string =>
        String(value).padStart(2, "0")

    // Validates a Date instance.
    const isValidDate = (date: unknown): date is Date => {
        return date instanceof Date && !Number.isNaN(date.getTime())
    }

    // Checks whether a string represents a standalone time (HH:mm).
    const isTimeString = (value: string) => {
        return /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value)
    }

    /**
     * Converts an input into a valid Date instance.
     * Date-only strings (YYYY-MM-DD) are interpreted as *local calendar dates*,
     * avoiding `UTC` date shifts.
     **/
    const parseDate = (input: DateInput): Date | null => {
        // 1. Invalid input
        if(input === null || input === undefined || input === "") return null

        // 2. input is already a class of the Object Date
        if(input instanceof Date) {
            return isValidDate(input)
                ? new Date(input.getTime())
                : null
        }

        // 3. Input is a number
        if(typeof input === "number") {
            const date = new Date(input)

            return isValidDate(date)
                ? date
                : null
        }

        // 4. Invalid input
        if(typeof input !== "string") return null

        // 5. Standalone dates: YYYY-MM-DD
        const dateOnlyMatch = input.match(/^(\d{4})-(\d{2})-(\d{2})$/)

        if(dateOnlyMatch) {
            const [, year, month, day] = dateOnlyMatch.map(Number)

            const date = new Date(year, month -1, day)

            // Prevent invalid dates such as February 30
            if(date.getFullYear() !== year || date.getMonth() !== month -1 || date.getDate() !== day) {
                return null
            }

            return date
        }

        // 6. Fallback
        const date = new Date(input)

        return isValidDate(date) ? date : null
    }

    // Creates an Intl.DateTimeFormat using the current language.
    const createFormatter = (options: DateFormatOptions): Intl.DateTimeFormat => {
        return new Intl.DateTimeFormat(formatedLanguage.value, options)
    }

    const formatDate = (input: DateInput, options: DateFormatOptions): string => {
        const date = parseDate(input)

        if(!date) return ""

        return createFormatter(options).format(date)
    }

    // Sorts a standalone times vector ([HH:mm]) (ascending or descending)
    const sortTimes = (times: string[], ascending: boolean = true): string[] => {
        if(ascending) {
            return times.filter(Boolean)
                .sort((a, b) => {
                    const [hourA, minuteA] = a.split(":").map(Number)
                    const [hourB, minuteB] = b.split(":").map(Number)

                    return (hourA * 60 + minuteA) - (hourB * 60 + minuteB)
                })
        }

        return times.filter(Boolean)
            .sort((a, b) => {
                const [hourA, minuteA] = a.split(":").map(Number)
                const [hourB, minuteB] = b.split(":").map(Number)

                return (hourB * 60 + minuteB) - (hourA * 60 + minuteA)
            })
    }


    /**
     * Converts standalone times (HH:mm) into Date Object.
     * Uses the current date unless a reference date is provided.
     **/
    const timeToDate = (time: string, referenceDate: DateInput = new Date()): Date | null => {
        if(!isTimeString(time)) return null

        const date = parseDate(referenceDate)

        if(!date) return null

        const [hours, minutes] = time.split(":").map(Number)

        date.setHours(hours, minutes, 0, 0)

        return date
    }

    /**
     * Converts a Date into a standalone local time (HH:mm) without locale.
     */
    const dateToTime = (input: DateInput = new Date()): string => {

        const date = parseDate(input)

        if (!date) return ""

        return `${pad(date.getHours())}:${pad(date.getMinutes())}`
    }

    /**
    * Returns the current local date in `YYYY-MM-DD` format.
    **/
    const getToday = (): string => {
        const today = new Date()

        return [
            today.getFullYear(),
            pad(today.getMonth() + 1),
            pad(today.getDate())
        ].join("-")
    }

    /**
     * Returns the current local date and time in datetime-local format.
     * Uses the current date unless a reference date is provided.
     *
     * Example: 2026-10-11T18:00
     **/
    const getCurrentDateTimeLocal = (date: DateInput = new Date()): string => {
        const parsedDate = parseDate(date)

        if(!parsedDate) return ""

        const year = parsedDate.getFullYear()
        const month = pad(parsedDate.getMonth() + 1)
        const day = pad(parsedDate.getDate())

        const hours = pad(parsedDate.getHours())
        const minutes = pad(parsedDate.getMinutes())

        return `${year}-${month}-${day}T${hours}:${minutes}`
    }

    /**
     * Converts a date into the datetime-local input format.
     * ISO timestamps are converted to local time.
     **/
    const formatToDateTimeLocal = (input: DateInput): string => {
        return getCurrentDateTimeLocal(input)
    }

    /**
     * Converts a datetime-local value into a valid Date Object.
     * The input is interpreted as local time.
     **/
    const parseDateTimeLocal = (input: string): Date | null => {
        if(!input) return null

        const match = input.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/)

        if(!match) return null

        const [, year, month, day, hours, minutes, seconds = "0"] = match

        const date = new Date(
            Number(year),
            Number(month) - 1,
            Number(day),
            Number(hours),
            Number(minutes),
            Number(seconds)
        )

        if(date.getFullYear() !== Number(year) ||
            date.getMonth() !== Number(month) - 1 ||
            date.getDate() !== Number(day) ||
            date.getHours() !== Number(hours) ||
            date.getMinutes() !== Number(minutes) ||
            date.getSeconds() !== Number(seconds)
        ) {
            return null
        }

        return date
    }

    /**
     * Returns age based on an `ISO` or `String` birth date.
     **/
    const getAge = (birthDate: DateInput): number | null => {
        const date = parseDate(birthDate)

        if(!date) return null

        const today = new Date()

        let age = today.getFullYear() - date.getFullYear()
        const monthDiff = today.getMonth() - date.getMonth()

        if(monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
            age --
        }

        return age
    }

    /**
     * Returns a full date formatted according to the current system language.
     * Uses the current date unless a reference date is provided.
     **/
    const getFullDate = (dateInput: DateInput = new Date()): string => {
        const date = parseDate(dateInput)

        if(!date) return ""

        return formatters.fullDate.value.format(date)
    }

    /**
     * Returns a numeric date.
     * Uses the current date unless a reference date is provided.
     **/
    const getNumericDate = (dateInput: DateInput = new Date()): string => {
        const date = parseDate(dateInput)

        if(!date) return ""

        return formatters.numericDate.value.format(date)
    }

    /**
     * Returns a numeric date and time.
     * Uses the current date unless a reference date is provided.
     **/
    const getNumericDateTime = (dateInput: DateInput = new Date()): string => {
        const date = parseDate(dateInput)

        if(!date) return ""

        return formatters.numericDateTime.value.format(date)
    }

    /**
     * General-purpose formatter.
     *
     * By default, returns `date and time`.
     * Set includeTime to false to return only the `date`.
     *
     * Supports standalone times (HH:mm).
     */
    const getFormatted = (dateInput: DateInput, includeTime: boolean = true): string => {
        if(!dateInput) return ""

        // 1. Handle standalone times (HH:mm)
        if (typeof dateInput === "string" && isTimeString(dateInput)) {
            return getNumericHour(dateInput)
        }

        // 2. ISO String
        return includeTime
            ? getNumericDateTime(dateInput)
            : getNumericDate(dateInput)
    }

    /**
     * Returns a numeric hour formatted based on the current application language.
     * Uses the current date unless a reference date is provided.
     */
    const getNumericHour = (dateInput: DateInput = new Date()): string => {
        const date = parseDate(dateInput)

        if(!date) return ""

        return formatters.numericTime.value.format(date)
    }

    /**
     * Returns current day period based in the current hour of the `date`
     * Uses the current date unless a reference date is provided.
     **/
    const getDayPeriod = (dateInput: DateInput = new Date()): DayPeriod => {
        const date = parseDate(dateInput)

        if(!date) return DAY_PERIODS.AFTERNOON

        const dayPeriod = date.toLocaleString("en-US", { dayPeriod: "short" })

        if(dayPeriod.endsWith(DAY_PERIODS.MORNING)) return DAY_PERIODS.MORNING

        if(dayPeriod.endsWith(DAY_PERIODS.EVENING)) return DAY_PERIODS.EVENING

        else return DAY_PERIODS.AFTERNOON
    }

    return {
        parseDate,
        parseDateTimeLocal,
        timeToDate,
        dateToTime,
        formatDate,
        formatToDateTimeLocal,
        sortTimes,

        getAge,
        getFormatted,
        getFullDate,
        getNumericDate,
        getNumericHour,
        getNumericDateTime,
        getDayPeriod,
        getToday,
        getCurrentDateTimeLocal
    }
}