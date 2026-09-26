import { ref } from "vue"
import { useOverlay } from "./useOverlay.js"
import { useClickOutside } from "./useClickOutside.js"

export function usePopup() {
    const isPopupOpen = ref(false)
    const popupRef = ref(null)
    const triggerRef = ref(null)

    const { showOverlay, hideOverlay } = useOverlay()

    const openPopup = () => {
        if(isPopupOpen.value){
            isPopupOpen.value = true
            showOverlay()
        }
    }

    const closePopup = () => {
        if(isPopupOpen.value){
            isPopupOpen.value = false
            hideOverlay()
        }
    }

    const togglePopup = () => {
        isPopupOpen.value ? closePopup() : openPopup()
    }

    // Handle click outside sidebar
    useClickOutside(popupRef, () => {
        if(isPopupOpen.value) closePopup()
    }, triggerRef)


    return { isPopupOpen, popupRef, triggerRef, openPopup, closePopup, togglePopup }
}