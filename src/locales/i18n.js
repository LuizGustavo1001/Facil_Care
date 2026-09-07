import { createI18n } from "vue-i18n"
import ptBR from "./pt-BR.js"

//const defaultLanguage = navigator.language.startsWith('pt') ? 'ptBR' : 'enUS'
const defaultLanguage = 'ptBR'

export const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: defaultLanguage,
    fallbackLocale: "enUS",
    messages: {
        ptBR
    }
    /*messages: {
        ptBR,
        enUS
    }*/
})