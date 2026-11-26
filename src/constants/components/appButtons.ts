export const ICON_BTN_VARIANTS = {
    BRAND: "brand",
    W_BORDER: "wBorder",
    PRIMARY: "primary",
    TRANSPARENT: "transparent",
    SUBTLE: "subtle",
    DESTRUCTIVE: "destructive"
} as const

export const ACTION_BUTTON_VARIANTS = {
    BRAND: "brand",
    SUBTLE: "subtle",
    DESTRUCTIVE: "destructive",
    TRANSPARENT: "transparent",
    PRIMARY: "primary"
} as const

export const ACTION_BUTTON_COLORFUL_VARIANTS = {
    SUBTLE: "subtle",
    PRIMARY: "primary"
} as const

export const CHIPS_VARIANTS = {
    BRAND: "brand",
    PRIMARY: "primary",
    TRANSPARENT: "transparent",
    SUBTLE: "subtle",
    W_BORDER: "wBorder"
} as const

export const BUTTON_COLORS = {
    RED: "red",
    YELLOW: "yellow",
    PURPLE: "purple",
    GREEN: "green",
    ORANGE: "orange",
    BLUE: "blue"
} as const

export const BUTTON_TAGS = {
    ROUTER: "router",
    BUTTON: "button",
    LINK: "a",
} as const

export const BUTTON_PADDING = {
    EXTRA_SMALL: { paddingInline: `var(--spacing-xs)`, paddingBlock: `var(--spacing-2xs)` },
    SMALL: { paddingInline: `var(--spacing-sm)`, paddingBlock: `var(--spacing-xs)` },
    MEDIUM: { paddingInline: `var(--spacing-md)`, paddingBlock: `var(--spacing-sm)` },
    LARGE: { paddingInline: `var(--spacing-lg)`, paddingBlock: `var(--spacing-md)` },
} as const
