import { useI18n } from "vue-i18n"
import type { PaddingSize } from "../types/paddingSizes"
import type { DayPeriod } from "../types/date"
import { DAY_PERIODS } from "../constants/dayPeriods"
import { BUTTON_COLORS } from "../constants/components/buttons"
import { useDate } from "./useDate"

export function useUtils() {
    const { t, te } = useI18n()
    const date = useDate()

    /**
     * @param page - From lang or PAGES{}.
     **/
    const getPageTitle = (page: string): string => {
        const key = `pageTitle.${page}`
        return getTranslate(key)
    }

    /**
     * Returns if the page exists based in the translate options.
     *
     * @param page - Desired page identifier.
     **/
    const pageExists = (page: string) => {
        return te(`pageTitle.${page}`)
    }

    /**
     * Returns select input options label translated to the current language.
     *
     * @param type - Option Type (Unit, Language etc.).
     * @param translationKey - i18n translate key.
     **/
    const getOptionTranslate = (type: string, translationKey: string) => {
        const key = `options.${type}.${translationKey}`
        return getTranslate(key)
    }

    /**
     * Returns the string that represents the `translationKey` localed by the current language.
     * Returns an `empty string`, if the translationKey doesn't represents a key
     **/
    const getTranslate = (translationKey: string) => {
        return te(translationKey)
            ? t(translationKey)
            : ""
    }

    const getPaddingStyle = (padding: PaddingSize): string => {
        return `padding: var(--spacing-${padding})`
    }

    // Returns the time badge color based at the current day period
    const getBadgeColor = (schedule: string): string => {
        const formattedTime = date.timeToDate(schedule) as Date

        const dayPeriod: DayPeriod = date.getDayPeriod(formattedTime)

        switch (dayPeriod) {
            case DAY_PERIODS.AFTERNOON:
                return BUTTON_COLORS.PURPLE

            case DAY_PERIODS.EVENING:
                return BUTTON_COLORS.ORANGE

            default:
                return BUTTON_COLORS.BLUE
        }
    }

    // Returns the translated medicine route admin
    const getRouteAdminLabel = (route: string): string => {
        const key = `options.routeAdmin.${route}`
        return getTranslate(key)
    }


    return { getPageTitle, pageExists, getOptionTranslate, getTranslate, getPaddingStyle, getBadgeColor, getRouteAdminLabel }
}