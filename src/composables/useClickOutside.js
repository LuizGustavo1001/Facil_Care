import { onMounted, onUnmounted, unref } from "vue"

export function useClickOutside(targetRef, callback, ignoreRef = null){
    const handleClick = (event) => {
        const target = unref(targetRef) // main element (ex: popup and sidebar)
        const ignore = unref(ignoreRef) // ex: toggle button

        const element = target?.$el ?? target
        const ignoreElement = ignoreRef ? ignore?.$el ?? target : null

        // 1. Main element doesn't exists
        if (!element) return

        // 2. Clicks within the main element -> ignore click
        if (element.contains(event.target)) return

        // 3. Clicks within ignored element -> ignore
        if (ignoreElement && ignoreElement?.contains(event.target)) return

        // 4. Clicks outside -> handle click
        callback(event)
    }

    // Click outside event
    onMounted(() => {
        window.addEventListener('click', handleClick)
    })

    onUnmounted(() => {
        window.removeEventListener('click', handleClick)
    })
}
