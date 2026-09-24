import { ref, onMounted, onUnmounted } from "vue"

const overlayIsActive = ref(false)
const sidebarIsActive = ref(false)

export function useSidebar(){
    const handleSidebarToggle = () => {
        sidebarIsActive.value = !sidebarIsActive.value
        overlayIsActive.value = sidebarIsActive.value
    }

    const handleClickOutside = (event) => {
        const clickedInsideSidebar = event.target.closest('#sidebar')

        // Avoid function when clicking within the sidebar
        if (sidebarIsActive.value && !clickedInsideSidebar) {
            handleSidebarToggle()
        }
    }

    onMounted(() => {
        window.addEventListener("click", handleClickOutside)
    })

    onUnmounted(() => {
        window.removeEventListener("click", handleClickOutside)
    })

    return{ overlayIsActive, sidebarIsActive, handleSidebarToggle }
}