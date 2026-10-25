import { useI18n } from "vue-i18n"
import { AsYouType } from "libphonenumber-js"

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

    /**
     * Returns select input options label translated to the current language
     *
     * @param { string } type - Option Type (Unit, Language etc.)
     * @param { String } translationKey - i18n translate key
     *
     * @return { String }
     **/
    const getOptionTranslate = (type, translationKey) => {
        return te(`options.${type}.${translationKey}`)
            ? t(`options.${type}.${translationKey}`)
            : ""
    }

    // Format Brazilian phone numbers
    function formatPhone(value){
        const digits = String(value ?? "")
            .replace(/\D/g, "")
            .slice(0, 11)

        if(!digits) return ""

        return new AsYouType("BR").input(digits)
    }

    return { getPageTitle, pageExists, getOptionTranslate, formatPhone }
}