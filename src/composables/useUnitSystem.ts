import { computed, ref } from "vue"
import { PAGES } from "../constants/sysPages"
import { TRANSLATABLE_ITEMS, UNITS } from "../constants/sysUnits"
import type { TranslatableUnitItem, UnitSystem } from "../types/sysUnits"

export const currentUnit = ref<string>(localStorage.getItem("unit") ?? UNITS.METRIC)
export const isImperial = computed((): boolean => currentUnit.value === UNITS.IMPERIAL)

export function useUnitSystem() {

    /**
     * Initializes or updates the application's unit.
     * The unit selection follows a hierarchy:
     * - Explicity provided unit
     * - Saved unit at `localStorage`
     *
     * @param nextUnit - The specific unit code (ex: `metric` or `imperial`). Defaults to "".
     **/
    const initUnitSystem = (nextUnit: UnitSystem | null = null): void => {
        // 1. Next Unit not declared (null) -> fallback
        if(!nextUnit) {
            setUnit(currentUnit.value)
            return
        }

        // 2. Next unit already set
        if(nextUnit && nextUnit === currentUnit.value) return

        // 3. Specific unit required
        if(nextUnit) {
            setUnit(nextUnit)
            return
        }

        // 4. Unit not specified -> Try get from localStorage
        const savedUnit = localStorage.getItem("unit")
        if(savedUnit) {
            setUnit(savedUnit)
        }
    }

    /**
     * Updates the application's unit
     *
     * @param nextUnit - The specific unit code (ex: `metric` or `imperial`). Defaults to "".
     **/
    const setUnit = (nextUnit: UnitSystem | string = ""): void => {
        if(!Object.values(UNITS).includes(nextUnit as UnitSystem)) return

        currentUnit.value = nextUnit as UnitSystem

        localStorage.setItem("unit", nextUnit)
    }

    /**
     * Returns the measurement unit according to the current locale.
     *
     * @param type - Measurement type (ex: "bloodPressure" and "heartRate")
     */
    const getUnit = (type: string) => {
        switch(type) {
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
     * Returns the current measurement unit and converted value.
     *
     * @description If a string value contais "/" = "blood pressure"
     *
     * @param type - Measurement type (ex: "bloodPressure" and "heartRate")
     * @param value - Measurement value (metric system)
     **/
    const getTranslatedUnit = (type: TranslatableUnitItem, value: string | number) => {
        const strValue: string = String(value)

        return {
            unit: getUnit(type),
            value: strValue.includes("/") || !TRANSLATABLE_ITEMS.includes(type)
                ? value
                : toImperial(type, value)
        };
    };

    /**
     * Converts imperial values to metric values
     *
     * @param type - Measurement type (ex: "bloodPressure" and "heartRate")
     * @param value - Measurement value (imperial system)
     **/
    const toMetric = (type: string, value: string | number) => {
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

    /**
     * Converts metric values to imperial values
     *
     * @param type - Measurement type (ex: "bloodPressure" and "heartRate")
     * @param value - Measurement value (metric system)
     **/
    const toImperial = (type: TranslatableUnitItem, value: string | number): string | number => {
        if(!isImperial.value || value === null || value === "" || !TRANSLATABLE_ITEMS.includes(type)) return value

        const numericValue: number = Number(value)

        switch (type) {
            case PAGES.BODY_TEMPERATURE:
                return Number((numericValue * 9 / 5) + 32).toFixed(2)
            case PAGES.WATER_INTAKE:
                return Number(numericValue * 33.8140227).toFixed(2)
            case PAGES.WEIGHT:
                return Number(numericValue * 2.20462262).toFixed(2)
            default:
                return value
        }
    }

    return { currentUnit, initUnitSystem, getTranslatedUnit, toImperial, getUnit, toMetric, isImperial }
}