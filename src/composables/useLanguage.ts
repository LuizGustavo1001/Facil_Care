import { ref } from "vue"
import { LANGUAGES } from "../constants/sysLanguages"
import type { SysLanguage } from "../types/sysLanguages"

export const currentLanguage = ref<SysLanguage>(LANGUAGES.PT_BR)

export function useLanguage() {
    /**
     * Initializes or updates the application's language.
     *
     * @param nextLanguage - The specific language code (ex: `ptBR` or `enUS`). Defaults to `null`.
     **/
    const initLanguage = (nextLanguage: SysLanguage | null = null): void => {
        // 1. Next language already set
        if(nextLanguage && nextLanguage === currentLanguage.value) {
            return
        }

        // 2. Specific Language required
        if(nextLanguage) {
            setLanguage(nextLanguage)
            return
        }

        // 3. Language not specified -> Try get from localStorage
        const savedLanguage = localStorage.getItem("language") as SysLanguage | null
        if (savedLanguage && Object.values(LANGUAGES).includes(savedLanguage)) {
            setLanguage(savedLanguage)
            return
        }

        // 4. System Preference
        setSystemPreference()
    }

    /**
     * Set system preferences for language based in **navigator default language**
     **/
    const setSystemPreference = (): void => {
        const defaultLanguage: SysLanguage = navigator.language.startsWith("pt")
            ? LANGUAGES.PT_BR
            : LANGUAGES.EN_US

        if(currentLanguage.value !== defaultLanguage) {
            setLanguage(defaultLanguage)
        }
    }

    /**
     * Updates the application's language
     *
     * @param nextLanguage - Language to be applied
     **/
    const setLanguage = (nextLanguage: SysLanguage): void => {
        if(!Object.values(LANGUAGES).includes(nextLanguage)) return

        currentLanguage.value = nextLanguage
        localStorage.setItem("language", nextLanguage)
    }

    return { initLanguage, currentLanguage }
}