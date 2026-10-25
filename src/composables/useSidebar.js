import { ref } from "vue"
import { useOverlay } from "./useOverlay.js"
import { useClickOutside } from "./useClickOutside.js"

export function useSidebar() {
    const isActive = ref(false)
    const sidebarRef = ref(null)
    const toggleBtnRef = ref(null)

    const overlay = useOverlay()

    const open = () => {
        if(!isActive.value){
            isActive.value = true
            overlay.show()
        }
    }

    const close = () => {
        if(isActive.value){
            isActive.value = false
            overlay.hide()
        }
    }

    const toggle = () => {
        isActive.value ? close() : open()
    }

    // Handle click outside sidebar
    useClickOutside(sidebarRef, () => {
        if(isActive.value) close() // sidebar is active
    })

    return { isActive, sidebarRef, toggleBtnRef, open, close, toggle }
}
