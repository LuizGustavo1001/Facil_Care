import { FORMATTED_LANGUAGES, LANGUAGES } from "../constants/sysLanguages"

export type SysLanguage = typeof LANGUAGES[keyof typeof LANGUAGES]
export type SysFormattedLanguage = typeof FORMATTED_LANGUAGES[keyof typeof FORMATTED_LANGUAGES]