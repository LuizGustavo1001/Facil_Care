import { ref, onMounted, onUnmounted } from "vue"

export function useSidebar(){
    const overlayIsActive = ref(false)
    const sidebarIsActive = ref(false)

    const handleSidebarToggle = () => {
        sidebarIsActive.value = !sidebarIsActive.value
        overlayIsActive.value = sidebarIsActive.value
    }

    const handleClickOutside = (event) => {
        const clickedInsideSidebar = event.target.closest('#sidebar')

        // avoid function when clicking within the sidebar
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

    return{
        overlayIsActive,
        sidebarIsActive,
        handleSidebarToggle
    }
}