import { BUTTON_COLORS, BUTTON_TAGS } from "../../constants/components/appButtons"
import type { ButtonColor, ButtonTag } from "../../types/components/appButtons"
import type { Component } from "vue"
import { RouterLink } from "vue-router"

export function useButtons() {
    const isButton = (componentTag: ButtonTag): boolean => {
        return componentTag === BUTTON_TAGS.BUTTON
    }

    const isRouterLink = (componentTag: ButtonTag): boolean => {
        return componentTag === BUTTON_TAGS.ROUTER
    }

    const getComponentTag = (componentTag: ButtonTag): ButtonTag | Component => {
        if(isRouterLink(componentTag)) {
            return RouterLink as Component
        }

        return componentTag
    }

    const getColorVariant = (componentColor: ButtonColor | string): ButtonColor => {
        return Object.values(BUTTON_COLORS).includes(componentColor as ButtonColor)
            ? componentColor as ButtonColor
            : BUTTON_COLORS.BLUE
    }

    const getTarget = (componentTarget: string): string => {
        return componentTarget === "external"
            ? "_blank"
            : "internal"
    }

    return { isButton, isRouterLink, getComponentTag, getColorVariant, getTarget }
}