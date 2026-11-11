import { ref } from "vue"
import QRCode from "qrcode"

/**
 * Parse strings/URLs into DataURL (Generate QR Code)
 **/
export function useQRCode() {
    const isGenerating = ref<boolean>(false)
    const URL = ref<string | null>(null) // QR Code URL
    const error = ref<string | null>(null)

    /**
     * Generate QR Code throught text or URL.
     *
     * @param text Content to be encoded.
     * @param options Additional configs (qrcode library).
     *
     * @returns Generated QR Code DataURL or undefined.
     **/
    const generate = async (text: string, options: Object = {}) => {
        if(!navigator.onLine) {
            error.value = 'OfflineDevice'
            return
        }

        isGenerating.value = true
        error.value = null

        try{
            URL.value = await QRCode.toDataURL(text, {
                width: 320,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                },
                ...options
            })
            return URL.value
        }catch(err){
            error.value = "QRCodeGenFailed"
            console.error('[useQRCode]: ', err)
        }finally {
            isGenerating.value = false
        }
    }

    // Clears QR Code data
    const clear = (): void => {
        URL.value = null
        error.value = null
    }

    return { isGenerating, URL, clear, error, generate }
}