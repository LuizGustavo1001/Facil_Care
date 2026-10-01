import { ref } from "vue"

const LANGUAGES = ["ptBR", "enUS"]
export const currentLanguage = ref("ptBR")

export function useLanguage() {

    /**
     * Initializes or updates the application's language.
     * The language selection follows a hierarchy:
     * - Explicity provided language
     * - Saved language in `localStorage`
     * - System preference (or browser preference)
     *
     * @param { string | null } nextLanguage - The specific language code (ex: `ptBR` or `enUS`). Defaults to `null`.
     **/
    const initLanguage = (nextLanguage = null) => {
        // 1. Next language already set
        if(nextLanguage && nextLanguage === currentLanguage.value){
            return
        }

        // 2. Specified Languaged required
        if(nextLanguage){
            setLanguage(nextLanguage)
            return
        }

        // 3. Language not specified -> Try get from localStorage
        const savedLanguage = localStorage.getItem("language")
        if(savedLanguage){
            setLanguage(savedLanguage)
            return
        }

        // 4. System Preference
        setSystemPreference()
    }

    /**
     * Set system preferences for language based in **navigator default language**
     **/
    const setSystemPreference = () => {
        const defaultLanguage = navigator.language.startsWith("pt") ? "ptBR" : "enUS"
        if(currentLanguage.value !== defaultLanguage){
            setLanguage(defaultLanguage)
        }
    }

    /**
     * Updates the application's language
     *
     * @param { string } nextLanguage - Language to be applied
     **/
    const setLanguage = (nextLanguage) => {
        if(!LANGUAGES.includes(nextLanguage)) return

        currentLanguage.value = nextLanguage

        localStorage.setItem("language", nextLanguage)
    }

    return { initLanguage, currentLanguage }
}