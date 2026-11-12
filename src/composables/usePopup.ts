import type { Ref } from "vue"
import { ref } from "vue"

import { useOverlay } from "./useOverlay"
import { useClickOutside } from "./useClickOutside"

import type { DOMReference } from "../types/components/formPopup"

export function usePopup() {
    const isOpen = ref<boolean>(false)
    const popupRef: Ref<DOMReference> = ref(null) //  Document reference for the popup component
    const triggerRef: Ref<HTMLElement | null> = ref(null) // Document reference (HTML element) for the popup event trigger (ex: button to trigger popup event)

    const overlay = useOverlay()

    const open = (): void => {
        if (isOpen.value) return

        isOpen.value = true
        overlay.show()
    }

    const close = (): void => {
        if (!isOpen.value) return

        isOpen.value = false
        overlay.hide()
    }

    const toggle = (): void => {
        isOpen.value ? close() : open()
    }

    // Handle click outside sidebar
    useClickOutside(popupRef, (): void => {
        if(isOpen.value) {
            close()
        }
    }, triggerRef)

    return { isOpen, popupRef, triggerRef, toggle, open, close }
}