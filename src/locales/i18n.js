import { watch } from "vue"
import { createI18n } from "vue-i18n"

import { currentLanguage } from "../composables/useLanguage.js"

import ptBR from "./pt-BR.js"
import enUS from "./en-US.js"

export const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: currentLanguage.value,
    fallbackLocale: "enUS",
    messages: {
        ptBR,
        enUS
    }
})

// Watch language update
watch(currentLanguage, (newLanguage) => {
    i18n.global.locale.value = newLanguage
})