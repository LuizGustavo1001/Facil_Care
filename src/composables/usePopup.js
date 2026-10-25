import { ref } from "vue"
import { useOverlay } from "./useOverlay.js"
import { useClickOutside } from "./useClickOutside.js"

export function usePopup() {
    const isOpen = ref(false)
    const popupRef = ref(null) //  Document reference for the popup component
    const triggerRef = ref(null) // Document reference (HTML element) for the popup event trigger (ex: button to trigger popup event)

    const overlay = useOverlay()

    const open = () => {
        if(!isOpen.value){
            isOpen.value = true
            overlay.show()
        }
    }

    const close = () => {
        if(isOpen.value){
            isOpen.value = false
            overlay.hide()
        }
    }

    const toggle = () => {
        isOpen.value ? close() : open()
    }

    // Handle click outside sidebar
    useClickOutside(popupRef, () => {
        if(isOpen.value) {
            close()
        }
    }, triggerRef)

    return { isOpen, popupRef, triggerRef, toggle, open, close }
}