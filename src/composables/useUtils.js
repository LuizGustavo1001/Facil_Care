import { useI18n } from "vue-i18n"
import {PAGES} from "./usePages.js";

export function useUtils() {
    const { t, te } = useI18n()

    /**
     *  @param { String } page - From lang or PAGES{}
     *
     *  @return { String } Desired page title
     **/
    const getPageTitle = (page) => {
        const key = `pageTitle.${page}`

        return te(key) ? t(key) : false
    }

    /**
     * Returns if the page exists based in the translate options
     *
     * @param { String } page - Desired page identifier
     **/
    const pageExists = (page) => {
        return te(`pageTitle.${page}`)
    }

    const getMeasurementUnit = (item) => {
        switch(item){
            case PAGES.BLOOD_PRESSURE:
                return "mmHg"
            case PAGES.BODY_TEMPERATURE:
                return "°Celsius"
            case PAGES.OXYGEN_SATURATION:
                return "%"
            case PAGES.BLOOD_GLUCOSE:
                return "mg/dL"
            case PAGES.HEART_RATE:
                return "/min"
            case PAGES.WATER_INTAKE:
                return "l"
            case PAGES.WEIGHT:
                return "Kg"
            default:
                return ""
        }
    }

    return { getPageTitle, pageExists, getMeasurementUnit }
}