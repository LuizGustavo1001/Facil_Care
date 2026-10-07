import { useI18n } from "vue-i18n"

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

    return { getPageTitle, pageExists }
}