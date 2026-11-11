import { BUTTON_COLORS, BUTTON_TAGS } from "../constants/buttonComponent"

export type ButtonColor = typeof BUTTON_COLORS[keyof typeof BUTTON_COLORS]
export type ButtonTag = typeof BUTTON_TAGS[keyof typeof BUTTON_TAGS]
