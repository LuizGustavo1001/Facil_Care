import { useI18n } from "vue-i18n"
import type {BorderType, PaddingSize} from "../types/spacing"
import type { DayPeriod } from "../types/date"
import type { ButtonColor } from "../types/components/appButtons"

import { DAY_PERIODS } from "../constants/date"
import { BUTTON_COLORS } from "../constants/components/appButtons"
import { BORDER_RADIUS } from "../constants/spacing"

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
     * Returns if the page exists based in the translation options.
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
     * Returns an `empty string`, if the translationKey doesn't represent a key
     **/
    const getTranslate = (translationKey: string) => {
        return te(translationKey)
            ? t(translationKey)
            : ""
    }

    // Returns the time badge color based at the current day period
    const getBadgeColor = (schedule: string): ButtonColor => {
        const formattedTime = date.timeToDate(schedule) as Date

        const dayPeriod: DayPeriod = date.getDayPeriod(formattedTime)

        switch (dayPeriod) {
            case DAY_PERIODS.AFTERNOON:
                return BUTTON_COLORS.ORANGE

            case DAY_PERIODS.EVENING:
                return BUTTON_COLORS.PURPLE

            default:
                return BUTTON_COLORS.BLUE
        }
    }

    // Returns the translated medicine route admin
    const getRouteAdminLabel = (route: string): string => {
        const key = `options.routeAdmin.${route}`
        return getTranslate(key)
    }

    // Returns the CSS styles that represents the selected radius key
    const getBorderRadius = (radiusKey: BorderType)=> {
        return Object.values(BORDER_RADIUS).includes(radiusKey)
            ? { borderRadius: `var(--radius-${radiusKey})` }
            : {}
    }

    const getPaddingStyle = (padding: PaddingSize): string => {
        return `padding: var(--spacing-${padding})`
    }

    return { getPageTitle, pageExists, getOptionTranslate, getTranslate, getBadgeColor, getRouteAdminLabel, getBorderRadius, getPaddingStyle }
}