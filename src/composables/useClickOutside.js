import { onMounted, onUnmounted, unref } from "vue"

export function useClickOutside(targetRef, callback, ignoreRef = null){

    /**
     * Verifies if the `container` reference contains the triggered `targetElement`.
     * **Unwraps** Vue refs, components, and arrays to **extract the raw DOM node** for comparison.
     *
     * @param { HTMLElement | Object | Array } container
     * @param { HTMLElement | EventTarget | Node } targetElement
     *
     * @return { boolean } `true` if the container contains the `targetElement`.
     *      Otherwise, returns `false`.
     **/
    const containsTarget = (container, targetElement) => {
        if(!container) return false

        // Unwrap the container reference and extract the DOM element
        const raw = unref(container)
        const el = raw?.$el ?? raw

        if(!el) return false

        // 1. Element === Array
        if(Array.isArray(el)) {
            return el.some((item) => containsTarget(item, targetElement))
        }

        // 2. Element === DOM node
        if(typeof el.contains === 'function'){
            return el.contains(targetElement)
        }

        return false
    }

    /**
     * Handles the DOM click event to **determinate if it occurred outside the target element**.
     * It evaluates conditions for the main reference and ignored references before executing the callback.
     *
     * @param { Event } event
     *
     **/
    const handleClick = (event) => {
        // 1. Main element doesn't exists
        if (!unref(targetRef)) return

        // 2. Clicks within the main element -> ignore click
        if (containsTarget(targetRef, event.target)) return

        // 3. Clicks within ignored element -> ignore
        if (ignoreRef && containsTarget(ignoreRef, event.target)) return

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
