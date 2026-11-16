import type { Ref } from "vue"
import { onMounted, onUnmounted, ref } from "vue"

import { useOverlay } from "./useOverlay"
import { useClickOutside } from "../useClickOutside"

import type { DOMReference } from "../../types/components/appPopup"

export function usePopup() {
    const isOpen = ref<boolean>(false)
    const popupRef: Ref<DOMReference> = ref(null) //  Document reference for the popup component
    const triggerRef: Ref<HTMLElement | null> = ref(null) // Document reference (HTML element) for the popup event trigger (ex: button to trigger popup event)

    const overlay = useOverlay()

    // Handle browser/device back button
    let hasHistoryEntry = false

    const open = (): void => {
        if(isOpen.value) return

        isOpen.value = true
        overlay.show()

        // Add a history entry to intercept the back button
        window.history.pushState({ popup: true }, "")
        hasHistoryEntry = true
    }

    const close = (): void => {
        if(!isOpen.value) return

        isOpen.value = false
        overlay.hide()

        if(hasHistoryEntry) {
            hasHistoryEntry = false
            window.history.back()
        }
    }

    const toggle = (): void => {
        isOpen.value ? close() : open()
    }

    // Handle ESC key
    const handleKeydown = (event: KeyboardEvent): void => {
        if(event.key === "Escape" && isOpen.value) {
            close()
        }
    }

    // Handle browser/device back button
    const handlePopstate = (): void => {
        if(isOpen.value) {
            hasHistoryEntry = false
            close()
        }
    }

    // Handle click outside sidebar
    useClickOutside(popupRef, (): void => {
        if(isOpen.value) {
            close()
        }
    }, triggerRef)

    onMounted(() => {
        window.addEventListener("keydown", handleKeydown)
        window.addEventListener("popstate", handlePopstate)
    })

    onUnmounted(() => {
        window.removeEventListener("keydown", handleKeydown)
        window.removeEventListener("popstate", handlePopstate)
    })

    return { isOpen, popupRef, triggerRef, toggle, open, close }
}