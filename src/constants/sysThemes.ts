export const THEMES = {
    LIGHT: "light",
    DARK: "dark",
    HIGH_CONTRAST: "highContrast"
} as const

export const THEME_PREFERENCES = {
    ...THEMES,
    SYSTEM: "system"
} as const
