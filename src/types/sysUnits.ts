import { TRANSLATABLE_ITEMS, UNITS } from "../constants/sysUnits"

export type UnitSystem = typeof UNITS[keyof typeof UNITS]
export type TranslatableUnitItem = typeof TRANSLATABLE_ITEMS[number]