import { computed, ref } from "vue"
import { PAGES } from "./usePages.js"

export const UNITS = {
    METRIC: "metric",
    IMPERIAL: "imperial"
}

export const TRANSLATABLE_ITEMS = [
    PAGES.BODY_TEMPERATURE,
    PAGES.WATER_INTAKE,
    PAGES.WEIGHT
]

export const currentUnit = ref(localStorage.getItem("unit") ?? UNITS.METRIC)
export const isImperial = computed(() => currentUnit.value === UNITS.IMPERIAL)

export function useUnitSystem() {
    /**
     * Initializes or updates the application's unit.
     * The unit selection follows a hierarchy:
     * - Explicity provided unit
     * - Saved unit at `localStorage`
     *
     * @param { string | null } nextUnit - The specific unit code (ex: `metric` or `imperial`). Defaults to `null`.
     **/
    const initUnitSystem = (nextUnit = null) => {
        // 1. Next unit already set
        if(nextUnit && nextUnit === currentUnit.value) return

        // 2. Specific unit required
        if(nextUnit) {
            setUnit(nextUnit)
            return
        }

        // 3. Unit not specified -> Try get from localStorage
        const savedUnit = localStorage.getItem("unit")
        if(savedUnit) {
            setUnit(savedUnit)
        }
    }

    /**
     * Updates the application's unit
     *
     * @param { String } nextUnit - Unit to be applied
     **/
    const setUnit = (nextUnit = null) => {
        if(!Object.values(UNITS).includes(nextUnit)) return

        currentUnit.value = nextUnit

        localStorage.setItem("unit", nextUnit)
    }

    /**
     * Returns the measurement unit according to the current locale.
     *
     * @param { String } type
     * @returns { String }
     */
    const getUnit = (type) => {
        switch(type){
            case PAGES.BLOOD_PRESSURE:
                return "mmHg"
            case PAGES.BODY_TEMPERATURE:
                return isImperial.value ? "°F" : "°C"
            case PAGES.OXYGEN_SATURATION:
                return "%"
            case PAGES.BLOOD_GLUCOSE:
                return "mg/dL"
            case PAGES.HEART_RATE:
                return "bpm"
            case PAGES.WATER_INTAKE:
                return isImperial.value ? "fl oz" : "L"
            case PAGES.WEIGHT:
                return isImperial.value ? "lb" : "Kg"
            default:
                return ""
        }
    }

    /**
     * Converts metric values to imperial values
     *
     * @param { String } type
     * @param { String | Number } value
     * @returns { String | Number }
     **/
    const parseUnit = (type, value) => {
        if(!isImperial.value || value === null || value === "" || !TRANSLATABLE_ITEMS.includes(type)) return value

        const numericValue = Number(value)

        switch (type) {
            case PAGES.BODY_TEMPERATURE:
                return Number((numericValue * 9 / 5) + 32).toFixed(2)
            case PAGES.WATER_INTAKE:
                return Number(numericValue * 33.8140227).toFixed(2)
            case PAGES.WEIGHT:
                return Number(numericValue * 2.20462262).toFixed(2)
        }
    }

    /**
     * Returns the current measurement unit and converted value.
     *
     * @param { String } type - Measurement type (ex: "bloodPressure" and "heartRate")
     * @param { String | Number } value - Measurement value (metric system)
     * @returns {{ unit: String, value: String|Number }}
     **/
    const getTranslatedUnit = (type, value) => {
        const strValue = String(value)

        return {
            unit: getUnit(type),
            value: strValue.includes("/") || !TRANSLATABLE_ITEMS.includes(type)
                ? value
                : parseUnit(type, value)
        };
    };

    const toMetric = (type, value) => {
        if(!isImperial.value || value === null || value === "") return value

        const numericValue = Number(value)

        if(Number.isNaN(numericValue)) return value

        switch(type) {
            case PAGES.BODY_TEMPERATURE:
                return (numericValue - 32) * 5 / 9
            case PAGES.WATER_INTAKE:
                return numericValue / 33.8140227
            case PAGES.WEIGHT:
                return numericValue / 2.20462262
            default:
                return value
        }
    }

    return { currentUnit, initUnitSystem, getTranslatedUnit, parseUnit, getUnit, toMetric, isImperial }
}