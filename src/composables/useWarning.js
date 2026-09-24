import { useI18n } from "vue-i18n"
import { warningMessages } from "../locales/projectConfig.js"
import { reactive } from "vue"

export function useWarning() {
    const { t, te } = useI18n()

    const warning = reactive({
        message: "",
        type: "",
    })

    const getWarning = (code) => {
        clearWarning()

        const warningConfig = warningMessages.find(
            warning => warning.id === code
        )

        const translationKey = `warningMessages.${code}.title`

        warning.message = te(translationKey) ? t(translationKey) : t(`warningMessages.generic.title`)
        warning.type = warningConfig.type ?? ""
    }

    const clearWarning = () => {
        warning.message = ""
        warning.type = ""
    }

    return { warning, getWarning }
}