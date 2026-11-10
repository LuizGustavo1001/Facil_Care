import { useI18n } from "vue-i18n"
import { AsYouType } from "libphonenumber-js"

export function useUtils() {
    const { t, te } = useI18n()

    /**
     * @param page - From lang or PAGES{}.
     **/
    const getPageTitle = (page: string): string => {
        const key = `pageTitle.${page}`

        return te(key)
            ? t(key)
            : ""
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
        return te(`options.${type}.${translationKey}`)
            ? t(`options.${type}.${translationKey}`)
            : ""
    }

    /**
     * Returns the string that represents the `translationKey` localed by the current language. Returns an `empty string`, if the translationKey doesn't represents a key
     **/
    const getTranslate = (translationKey: string) => {
        return te(translationKey)
            ? t(translationKey)
            : ""
    }

    // Format Brazilian phone numbers
    function formatPhone(value: string){
        const digits = String(value ?? "")
            .replace(/\D/g, "")
            .slice(0, 11)

        if(!digits) return ""

        return new AsYouType("BR").input(digits)
    }

    return { getPageTitle, pageExists, getOptionTranslate, formatPhone, getTranslate }
}