import { useRouter } from 'vue-router'
import { useOverlay } from "./useOverlay.js"

const overlay = useOverlay()

export function useNavigation(){
    const router = useRouter()

    const handleReturn = () => {
        if(window.history.length > 1){ // tab history exists
            overlay.reset()
            router.back()
        }else{ // fallback -> no tab history
            router.push("/")
        }
    }

    return { handleReturn }
}
