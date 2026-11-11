import { THEME_PREFERENCES, THEMES } from "../constants/sysThemes"

export type SysTheme = typeof THEMES[keyof typeof THEMES]
export type SysThemePreference = typeof THEME_PREFERENCES[keyof typeof THEME_PREFERENCES]