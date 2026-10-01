import { useI18n } from "vue-i18n"
import { warningMessages } from "../locales/projectConfig.js"
import { reactive, ref } from "vue"

export function useWarning() {
    const isWarningActive = ref(false)
    const { t, te } = useI18n()

    const warning = reactive({
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
    const showWarning = (code) => {
        clearWarning()

        const warningConfig = warningMessages.find(
            warning => warning.id === code
        )

        const translationKey = `warningMessages.${code}.title`

        warning.message = te(translationKey)
            ? t(translationKey)
            : t("warningMessages.generic.title")

        warning.type = warningConfig?.type || ""
        isWarningActive.value = true
    }

    const clearWarning = () => {
        isWarningActive.value = false
        warning.message = ""
        warning.type = ""
    }

    return { warning, getWarning: showWarning, isWarningActive, clearWarning }
}