import { HEADER_TYPES, HEADER_VARIANTS } from "../../constants/components/appHeader"

export type AppHeaderType = typeof HEADER_TYPES[keyof typeof HEADER_TYPES]
export type AppHeaderVariant = typeof HEADER_VARIANTS[keyof typeof HEADER_VARIANTS]