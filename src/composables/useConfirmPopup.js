import { usePopup } from "./usePopup.js"
import { ref } from "vue"

export function useConfirmPopup(){
    const popup = usePopup()

    const title = ref(null)
    const message = ref(null)
    const action = ref(null) // "delete", "reset", ...

    const open = (nextTitle, nextMessage = null, nextAction = null) => {
        clear()

        title.value = nextTitle
        message.value = nextMessage
        action.value = nextAction

        popup.open()
    }

    const clear = () => {
        title.value = null
        message.value = null
        action.value = null
    }

    const close = () => {
        popup.close()
        clear()
    }

    const handleConfirm = async () => {
        if(!action.value){
            close()
            return
        }

        try{
            await action.value()
        }finally{
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
        handleConfirm,
    }
}