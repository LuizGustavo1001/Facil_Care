import { ref } from "vue"
import QRCode from "qrcode"

/**
* Parse strings/URLs into DataURL (Generate QR Code)
**/
export function useQRCode() {
    const isGenerating = ref(false)
    const qrDataURL = ref(null)
    const qrCodeError = ref(null)

    /**
     * Generate QR Code throught text or URL
     * @param { string } text Content to be encoded
     * @param { Object } options Additional configs (qrcode library)
     **/
    const generateQRCode = async (text, options = {}) => {
        if(!navigator.onLine){
            qrCodeError.value = 'OfflineDevice'
            return
        }

        isGenerating.value = true
        qrCodeError.value = false

        try{
            qrDataURL.value = await QRCode.toDataURL(text, {
                width: 320,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                },
                ...options
            })
            return qrDataURL.value
        }catch(err){
            qrCodeError.value = "QRCodeGenFailed"
            console.error('[useQRCode]: ', err)
        }finally {
            isGenerating.value = false
        }
    }

    // Clears QR Code data
    const clearQRCode = () => {
        qrDataURL.value = null
        qrCodeError.value = null
    }

    return { isGenerating, qrDataURL, clearQRCode, qrCodeError, generateQRCode }
}