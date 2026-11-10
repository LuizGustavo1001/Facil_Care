export type ConfirmPopupTitle = string | undefined
export type ConfirmPopupMessage = string | null
export type ConfirmPopupAction = (() => void | Promise<void>) | null