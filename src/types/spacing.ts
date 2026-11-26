import { BORDER_RADIUS, PADDING_SIZE } from "../constants/spacing"

export type PaddingSize = typeof PADDING_SIZE[keyof typeof PADDING_SIZE]
export type BorderType = typeof BORDER_RADIUS[keyof typeof BORDER_RADIUS]
export type ComponentSize = `${number}px` | `${number}rem` | `${number}em` | `${number}%`