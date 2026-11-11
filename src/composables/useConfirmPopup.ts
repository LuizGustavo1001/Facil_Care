import { usePopup } from "./usePopup"
import { ref } from "vue"
import type { ConfirmPopupAction, ConfirmPopupMessage, ConfirmPopupTitle } from "../types/confirmPopup"

export function useConfirmPopup(){
    const popup = usePopup()

    const title = ref<ConfirmPopupTitle>(undefined)
    const message = ref<ConfirmPopupMessage>(null)
    const action = ref<ConfirmPopupAction>(null) // "delete", "reset", ...

    /**
     * Opens the confirmation popup.
     */
    const open = (nextTitle: ConfirmPopupTitle, nextMessage?: ConfirmPopupMessage, nextAction?: ConfirmPopupAction): void => {
        clear()

        title.value = nextTitle
        message.value = nextMessage ?? null
        action.value = nextAction ?? null

        popup.open()
    }

    /**
     * Clears the popup data.
     */
    const clear = ():void => {
        title.value = undefined
        message.value = null
        action.value = null
    }

    /**
     * Closes the popup and clears its data.
     */
    const close = ():void => {
        popup.close()
        clear()
    }

    /**
     * Executes the confirmation action.
     */
    const handleConfirm = async (): Promise<void> => {
        const confirmAction = action.value
        if(!confirmAction) {
            close()
            return
        }

        try {
            await confirmAction()
        } finally {
            close()
        }
    }

    return {
        isOpen: popup.isOpen,
        popupRef: popup.popupRef,
        triggerRef: popup.triggerRef,
        title,
        message,
        open,
        close,
        clear,
        handleConfirm
    }
}