import { computed, ref } from "vue"

/**
 * activeCount: Number of elements using the overlay component (Each component using overlay adds "1" to the count)
 **/

const activeCount = ref(0)

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
