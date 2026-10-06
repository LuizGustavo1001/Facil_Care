import { ref } from "vue"
import { useOverlay } from "./useOverlay.js"
import { useClickOutside } from "./useClickOutside.js"

export function useSidebar() {
    const isSidebarActive = ref(false)
    const sidebarRef = ref(null)
    const toggleBtnRef = ref(null)

    const overlay = useOverlay()

    const openSidebar = () => {
        if(!isSidebarActive.value){
            isSidebarActive.value = true
            overlay.show()
        }
    }

    const closeSidebar = () => {
        if(isSidebarActive.value){
            isSidebarActive.value = false
            overlay.hide()
        }
    }

    const toggleSidebar = () => {
        isSidebarActive.value ? closeSidebar() : openSidebar()
    }

    // Handle click outside sidebar
    useClickOutside(sidebarRef, () => {
        if(isSidebarActive.value) closeSidebar() // sidebar is active
    })

    return { isSidebarActive, sidebarRef, toggleBtnRef, openSidebar, closeSidebar, toggleSidebar }
}
