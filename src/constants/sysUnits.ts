import { PAGES } from "./sysPages.js"

export const UNITS = {
    METRIC: "metric",
    IMPERIAL: "imperial"
} as const

export const TRANSLATABLE_ITEMS = [
    PAGES.BODY_TEMPERATURE,
    PAGES.WATER_INTAKE,
    PAGES.WEIGHT
] as const
