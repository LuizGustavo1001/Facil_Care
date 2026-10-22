import { useI18n } from "vue-i18n"
import { warningMessages } from "../locales/projectConfig.js"
import { reactive, ref } from "vue"

export function useSnackbar() {
    const isActive = ref(false)
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
     * @param { String } code - Desired warning code
     **/
    const open = (code) => {
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

    const getWarningTitle = (code) => {
        return te(`warningMessages.${code}.title`)
            ? t(`warningMessages.${code}.title`)
            : t("warningMessages.generic.title")
    }

    return { data, open, isActive, clear, getWarningTitle }
}