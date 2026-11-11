import { watch } from "vue"
import { createI18n } from "vue-i18n"

import { currentLanguage } from "../composables/useLanguage"
import { LANGUAGES } from "../constants/sysLanguages"
import type { SysLanguage } from "../types/sysLanguages"

import ptBR from "./pt-BR"
import enUS from "./en-US"

export const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: currentLanguage.value,
    fallbackLocale: LANGUAGES.EN_US,
    messages: {
        [LANGUAGES.PT_BR]: ptBR,
        [LANGUAGES.EN_US]: enUS
    }
})

// Watch language update
watch(currentLanguage, (newLanguage: SysLanguage): void => {
    i18n.global.locale.value = newLanguage
})