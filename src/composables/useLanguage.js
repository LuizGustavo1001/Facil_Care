import { ref } from "vue"

const LANGUAGES = ["ptBR", "enUS"]
export const currentLanguage = ref("ptBR")

export function useLanguage() {
    const initLanguage = (nextLanguage = null) => {

        // 1. Language already set
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

    const setSystemPreference = () => {
        const defaultLanguage = navigator.language.startsWith("pt") ? "ptBR" : "enUS"
        if(currentLanguage.value !== defaultLanguage){
            setLanguage(defaultLanguage)
        }
    }

    const setLanguage = (nextLanguage) => {
        if(!LANGUAGES.includes(nextLanguage)) return

        currentLanguage.value = nextLanguage

        localStorage.setItem("language", nextLanguage)
    }

    return { initLanguage, currentLanguage }
}