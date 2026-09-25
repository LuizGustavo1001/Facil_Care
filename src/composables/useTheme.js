import { ref } from "vue"

const THEMES = ["light", "dark", "highContrast"]
const THEME_PREFERENCE = [...THEMES, "system"]

const currentTheme = ref("light") // current applied theme
const currentPreference = ref("system") // user's selection

export function useTheme() {
    /**
     * @param { String } nextPreference
     **/
    const initToggleTheme = (nextPreference = null) => {
        let preference = null

        // 1. Specific preference required
        if(nextPreference && THEME_PREFERENCE.includes(nextPreference)){
            preference = nextPreference
        }

        // 2. Try get preference from localStorage
        const savedPreference = localStorage.getItem("theme")
        if(!preference && savedPreference && THEME_PREFERENCE.includes(savedPreference)){
            preference = savedPreference
        }

        // 3. No local storage item -> set browser default
        if(!preference){
            preference = "system"
        }

        toggleTheme(preference)
    }

    /**
     * @param { String } nextPreference
     **/
    const toggleTheme = (nextPreference = null) => {
        // Update user's preference
        currentPreference.value = nextPreference

        // save user's preference
        setLocalStorage(nextPreference)

        // System preference
        if(nextPreference === "system"){
            setSystemPreference()
            return
        }

        // Specific theme
        setBodyClass(nextPreference)
    }

    /**
    * @param { String } nextTheme
    **/
    const setBodyClass = (nextTheme) => {
        if(!THEMES.includes(nextTheme)) return

        // Remove all theme classes from body and add current one
        document.body.classList.remove(...THEMES)
        document.body.classList.add(nextTheme)

        // Update current applied theme
        currentTheme.value = nextTheme
    }

    // Save at LocalStorage
    const setLocalStorage = (nextTheme) => {
        localStorage.setItem("theme", nextTheme)
    }

    const setSystemPreference = () => {
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches

        setBodyClass(systemDark ? "dark" : "light")
    }

    return { initToggleTheme, currentTheme , currentPreference }
}