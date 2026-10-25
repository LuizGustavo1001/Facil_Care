import { ref } from "vue"
import QRCode from "qrcode"

/**
* Parse strings/URLs into DataURL (Generate QR Code)
**/
export function useQRCode() {
    const isGenerating = ref(false)
    const URL = ref(null) // QR Code URL
    const error = ref(null)

    /**
     * Generate QR Code throught text or URL
     * @param { string } text Content to be encoded
     * @param { Object } options Additional configs (qrcode library)
     **/
    const generate = async (text, options = {}) => {
        if(!navigator.onLine){
            error.value = 'OfflineDevice'
            return
        }

        isGenerating.value = true
        error.value = false

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
    const clear = () => {
        URL.value = null
        error.value = null
    }

    return { isGenerating, URL, clear, error, generate }
}