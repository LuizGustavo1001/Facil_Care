import {
    ACTION_BUTTON_COLORFUL_VARIANTS,
    ACTION_BUTTON_VARIANTS,
    CHIPS_VARIANTS,
    ICON_BTN_VARIANTS
} from "../../constants/components/appButtons"
import { BUTTON_COLORS, BUTTON_TAGS } from "../../constants/components/appButtons"

export type IconBtnVariant = typeof ICON_BTN_VARIANTS[keyof typeof ICON_BTN_VARIANTS]
export type ActionBtnVariant = typeof ACTION_BUTTON_VARIANTS[keyof typeof ACTION_BUTTON_VARIANTS]
export type ActionBtnColorfulVariant = typeof ACTION_BUTTON_COLORFUL_VARIANTS[keyof typeof ACTION_BUTTON_COLORFUL_VARIANTS]
export type ChipsVariant = typeof CHIPS_VARIANTS[keyof typeof CHIPS_VARIANTS]

export type ButtonColor = typeof BUTTON_COLORS[keyof typeof BUTTON_COLORS]
export type ButtonTag = typeof BUTTON_TAGS[keyof typeof BUTTON_TAGS]
