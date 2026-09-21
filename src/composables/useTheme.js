import { ref } from "vue"

const THEMES = ["light", "dark", "highContrast", "system"]

export function useTheme() {
    const currentTheme = ref("light")

    /**
     * @param { String } nextTheme
     **/
    const toggleTheme = (nextTheme = null) => {
        // 1. Specific theme required
        if(nextTheme){
            if(nextTheme === "system") setSystemPreference()
            setBodyClass(nextTheme)
            return
        }

        // 2. No theme specified -> try get from localStorage
        const savedTheme = localStorage.getItem("theme")
        if(savedTheme){
            setBodyClass(savedTheme)
            return
        }

        // 3. System Preference
        setSystemPreference()
    }

    /**
    * @param { String } nextTheme
    **/
    const setBodyClass = (nextTheme) => {
        if(!THEMES.includes(nextTheme)) return

        // Remove all theme classes from body
        document.body.classList.remove(...THEMES)
        document.body.classList.add(nextTheme)

        // Save at LocalStorage + update currentTheme variable
        localStorage.setItem("theme", nextTheme)
        currentTheme.value = nextTheme
    }

    const setSystemPreference = () => {
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        setBodyClass(systemDark ? "dark" : "light")
    }

    return { toggleTheme, currentTheme }
}