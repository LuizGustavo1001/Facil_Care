import { AsYouType } from "libphonenumber-js"

export function usePhone() {
    // Format Brazilian phone numbers
    function formatPhone(value: string){
        const digits = String(value ?? "")
            .replace(/\D/g, "")
            .slice(0, 11)

        if(!digits) return ""

        return new AsYouType("BR").input(digits)
    }

    // Returns the only the numbers of the phone number
    function trimPhone(value: string){
        return String(value ?? "").replace(/\D/g, "")
    }

    return {
        formatPhone,
        trimPhone
    }
}