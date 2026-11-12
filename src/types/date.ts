import { DAY_PERIODS } from "../constants/dayPeriods"
import { WEEK_DAYS } from "../constants/weekDays"

export type DayPeriod = typeof DAY_PERIODS[keyof typeof DAY_PERIODS]
export type WeekDay = typeof WEEK_DAYS[keyof typeof WEEK_DAYS]
export type DateInput = Date | string | number | null | undefined

export type DateFormatOptions = Intl.DateTimeFormatOptions