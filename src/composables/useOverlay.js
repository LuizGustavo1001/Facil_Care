import { computed, ref } from "vue"

// Overlay closes when there's no component using him
const activeCount = ref(0)

/**
 * Each component using overlay adds 1 at the activeCount
 **/
export function useOverlay() {
    const isOverlayActive = computed(() => activeCount.value > 0)

    const showOverlay = () => {
        activeCount.value++
    }

    const hideOverlay = () => {
        if(activeCount.value >= 1){
            activeCount.value--
        }
    }

    const resetOverlay = () => {
        activeCount.value = 0
    }

    return { isOverlayActive, showOverlay, hideOverlay, resetOverlay }
}
