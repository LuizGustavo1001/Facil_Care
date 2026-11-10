import { reactive, ref } from "vue"
import { useI18n } from "vue-i18n"
import { warningMessages } from "../locales/projectConfig"
import type { WarningCode } from "../types/snackbar"

export function useSnackbar() {
    const isActive = ref<boolean>(false)
    const { t, te } = useI18n()

    const data = reactive({
        message: "",
        type: ""
    })

    /**
     * Defines the warning content based in:
     * - Warning message from translate files
     * - Warning type (ex: "error", "success" or "warning")
     *
     * @param code - Desired warning code
     **/
    const open = (code: WarningCode): void => {
        clear()

        const warningTemplate = warningMessages[code]

        data.message = getWarningTitle(code)

        data.type = warningTemplate || ""
        isActive.value = true
    }

    const clear = () => {
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