import { reactive, ref } from "vue"
import { useI18n } from "vue-i18n"

import { warningMessages } from "../../locales/projectConfig"
import type { WarningCode } from "../../types/components/snackbar"

export function useSnackbar() {
    const isActive = ref<boolean>(false)
    const { t, te } = useI18n()

    let timeout: ReturnType<typeof setTimeout> | null = null

    const data = reactive({
        message: "",
        type: ""
    })

    /**
     * Defines the snackbar content based in:
     * - Warning message from translate files.
     * - Warning type (ex: "error", "success" or "warning").
     *
     * Automatically closes it after **5 seconds**.
     *
     * @param code - Desired warning code
     **/
    const open = (code: WarningCode): void => {
        clear()

        const warningTemplate = warningMessages[code]

        data.message = getWarningTitle(code)

        data.type = warningTemplate || ""
        isActive.value = true

        timeout = setTimeout(() => {
            clear()
        }, 5000)
    }

    /**
     * Closes the snackbar and clears its timeout.
     **/
    const clear = () => {
        if (timeout !== null) {
            clearTimeout(timeout)
            timeout = null
        }

        isActive.value = false
        data.message = ""
        data.type = ""
    }

    const getWarningTitle = (code: WarningCode): string => {
        const key = `warningMessages.${code}.title`
        return te(key)
            ? t(key)
            : t("warningMessages.generic.title")
    }

    return { data, open, isActive, clear, getWarningTitle }
}