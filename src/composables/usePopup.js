import { ref } from "vue"
import { useOverlay } from "./useOverlay.js"
import { useClickOutside } from "./useClickOutside.js"

/**
 * @param isPopupOpen - Represents the popup state
 * @param { HTMLElement } popupRef - Document reference for the popup component
 * @param { HTMLElement } triggerRef - Document reference (HTML element) for the popup event trigger (ex: button to trigger popup event)
 * @param { Object } popupTemplate - Represents the desired popup data, based on the select popup template
 * @param { Object } popupValues - Represents the value of each input within the popup form
 * @param { Object } popupContext - Guide the form behavior when `handleSubmit` is triggered (ex: { sectionId: 'patient', fieldId: 'weight' })
 **/

const isPopupOpen = ref(false)
const popupRef = ref(null)
const triggerRef = ref(null)
const popupTemplate = ref(null)
const popupValues = ref(null)
const popupContext = ref(null)

export function usePopup() {
    const { showOverlay, hideOverlay } = useOverlay()

    const openPopup = () => {
        if(!isPopupOpen.value){
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

    const fillPopup = (template, value = null, context = null) => {
        clearPopup()
        popupTemplate.value = template
        popupValues.value = value
        popupContext.value = context
        openPopup()
    }

    // Clears popup content
    const clearPopup = () => {
        popupTemplate.value = null
        popupValues.value = null
        popupContext.value = null
    }

    // Handle click outside sidebar
    useClickOutside(popupRef, () => {
        if(isPopupOpen.value) closePopup()
    }, triggerRef)

    return { isPopupOpen, popupRef, triggerRef, openPopup, closePopup, togglePopup, fillPopup, popupTemplate, popupValues, popupContext }
}