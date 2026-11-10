import { ref } from "vue"
import { THEME_PREFERENCES, THEMES } from "../constants/sysThemes"
import type { SysTheme, SysThemePreference } from "../types/sysThemes"

const currentTheme = ref<SysTheme>(THEMES.LIGHT) // current applied theme
const currentPreference = ref<SysThemePreference>(THEME_PREFERENCES.SYSTEM) // user's preference selection

export function useTheme() {
    /**
     * Initializes or updates the application's theme.
     * The theme selection follows a hierarchy:
     * - Explicity provided theme
     * - Saved theme in `localStorage`
     * - System preference (or browser preference)
     *
     * @param nextPreference - The specific theme code (ex: `dark`, `system`, `light` or `highContrast`). Defaults to `null`.
     **/
    const initToggleTheme = (nextPreference: SysThemePreference | null = null): void => {
        let preference: string | null = null

        // 1. Specific preference required
        if(nextPreference &&  Object.values(THEME_PREFERENCES).includes(nextPreference)) {
            preference = nextPreference
        }

        // 2. Try get preference from localStorage
        const savedPreference: string | null = localStorage.getItem("theme")
        if(!preference && savedPreference && Object.values(THEME_PREFERENCES).includes(savedPreference as SysThemePreference)) {
            preference = savedPreference
        }

        // 3. No local storage item -> set browser default
        if(!preference) {
            preference = THEME_PREFERENCES.SYSTEM
        }

        toggleTheme(preference as SysThemePreference)
    }

    /**
     * @param nextPreference
     **/
    const toggleTheme = (nextPreference: SysThemePreference | null = null): void => {
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
     * @param nextTheme
     **/
    const setBodyClass = (nextTheme: SysTheme): void => {
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
     * @param nextTheme
     **/
    const setLocalStorage = (nextTheme: SysThemePreference): void => {
        localStorage.setItem("theme", nextTheme)
    }

    /**
     * Set system preference theme *(navigator preference)*
     **/
    const setSystemPreference = (): void => {
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches

        setBodyClass(systemDark
            ? THEMES.DARK
            : THEMES.LIGHT
        )
    }

    return { initToggleTheme, currentTheme, currentPreference }
}