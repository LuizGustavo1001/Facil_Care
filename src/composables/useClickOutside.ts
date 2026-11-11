import { onMounted, onUnmounted, unref } from "vue"
import type { DOMReference } from "../types/formPopup"
import type { MaybeRef } from "vue"

export type ClickOutsideTarget = MaybeRef<DOMReference>

export function useClickOutside(
    targetRef: ClickOutsideTarget,
    callback: (event: MouseEvent
    ) => void, ignoreRef?: ClickOutsideTarget
): void {

    /**
     * Verifies if the `container` reference **contains** the triggered `targetElement`.
     * **Unwraps** Vue refs, components, and arrays to **extract the raw DOM node** for comparison.
     *
     * @return `TRUE` if the container contains the `targetElement`. Otherwise, returns `FALSE`.
     **/
    const containsTarget = (
        container: ClickOutsideTarget,
        targetElement: EventTarget | null
    ): boolean => {
        if (!(targetElement instanceof Node)) return false

        const raw = unref(container)
        const el = raw && "$el" in raw ? raw.$el : raw

        if (!el) return false

        if (Array.isArray(el)) {
            return el.some(item => containsTarget(item, targetElement))
        }

        return el instanceof Element && el.contains(targetElement)
    }

    /**
     * Handles the *DOM* click event to **determinate if it occurred outside the target element**.
     * It evaluates conditions for the main reference and ignored references before executing the callback.
     **/
    const handleClick = (event: MouseEvent): void => {
        // Main element doesn't exist
        if (!unref(targetRef)) return

        // Click inside main element
        if (containsTarget(targetRef, event.target)) return

        // Click inside ignored element
        if (ignoreRef && containsTarget(ignoreRef, event.target)) return

        callback(event)
    }

    // Click outside event
    onMounted(() => {
        window.addEventListener('click', handleClick)
    })

    onUnmounted(() => {
        window.removeEventListener('click', handleClick)
    })
}
