import { ref } from "vue"

export const THEMES = {
    LIGHT: "light",
    DARK: "dark",
    HIGH_CONTRAST: "highContrast"
}

export const THEME_PREFERENCES = {
    ...THEMES,
    SYSTEM: "system"
}

const currentTheme = ref(THEMES.LIGHT) // current applied theme
const currentPreference = ref(THEME_PREFERENCES.SYSTEM) // user's preference selection

export function useTheme() {
    /**
     * Initializes or updates the application's theme.
     * The theme selection follows a hierarchy:
     * - Explicity provided theme
     * - Saved theme in `localStorage`
     * - System preference (or browser preference)
     *
     * @param { string | null } nextPreference - The specific theme code (ex: `dark`, `system`, `light` or `highContrast`). Defaults to `null`.
     **/
    const initToggleTheme = (nextPreference = null) => {
        let preference = null

        // 1. Specific preference required
        if(nextPreference &&  Object.values(THEME_PREFERENCES).includes(nextPreference)) {
            preference = nextPreference
        }

        // 2. Try get preference from localStorage
        const savedPreference = localStorage.getItem("theme")
        if(!preference && savedPreference && Object.values(THEME_PREFERENCES).includes(savedPreference)){
            preference = savedPreference
        }

        // 3. No local storage item -> set browser default
        if(!preference){
            preference = THEME_PREFERENCES.SYSTEM
        }

        toggleTheme(preference)
    }

    /**
     * @param { String } nextPreference
     **/
    const toggleTheme = (nextPreference = null) => {
        if(!nextPreference || !Object.values(THEME_PREFERENCES).includes(nextPreference)) return

        // Update user's preference
        currentPreference.value = nextPreference

        // save user's preference
        setLocalStorage(nextPreference)

        // System preference
        if(nextPreference === THEME_PREFERENCES.SYSTEM){
            setSystemPreference()
            return
        }

        // Specific theme
        setBodyClass(nextPreference)
    }

    /**
     * Set the `body` element class representing the selected theme and update current apllied theme
     *
     * @param { String } nextTheme
     **/
    const setBodyClass = (nextTheme) => {
        if(!Object.values(THEMES).includes(nextTheme) ) return

        // Remove all theme classes from body and add current one
        document.body.classList.remove(...Object.values(THEMES))
        document.body.classList.add(nextTheme)

        // Update current applied theme
        currentTheme.value = nextTheme
    }

    /**
     * Set `localStorage` item that represents the current `theme`
     *
     * @param { String } nextTheme
     **/
    const setLocalStorage = (nextTheme) => {
        localStorage.setItem("theme", nextTheme)
    }

    /**
     * Set system preference theme *(navigator preference)*
     **/
    const setSystemPreference = () => {
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches

        setBodyClass(systemDark
            ? THEMES.DARK
            : THEMES.LIGHT
        )
    }

    return { initToggleTheme, currentTheme, currentPreference }
}