import { computed, ref } from "vue"

/**
 * Number of active components using the overlay.
 *
 * Each component that shows the overlay increments the count,
 * and decrements it when the overlay is no longer needed.
 */
const activeCount = ref(0)

export function useOverlay() {
    const isActive = computed(() => activeCount.value > 0)

    const show = () => {
        activeCount.value++
    }

    const hide = () => {
        if(activeCount.value > 0){
            activeCount.value--
        }
    }

    const reset = () => {
        activeCount.value = 0
    }

    return { isActive, show, hide, reset }
}
