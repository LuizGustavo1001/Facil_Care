import { useI18n } from "vue-i18n"

export function useUtils() {
    const { t, te } = useI18n()

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

    return { getPageTitle, pageExists, getOptionTranslate, getTranslate }
}