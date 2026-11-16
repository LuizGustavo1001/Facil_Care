import { SNACKBAR_TYPES } from "../../constants/components/appSnackbar"
import { warningMessages } from "../../locales/projectConfig"

export type SnackbarType = typeof SNACKBAR_TYPES[keyof typeof SNACKBAR_TYPES]
export type WarningCode = keyof typeof warningMessages
