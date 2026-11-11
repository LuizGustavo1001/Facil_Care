import { useRouter } from 'vue-router'
import { useOverlay } from "./useOverlay"

export function useNavigation(){
    const router = useRouter()
    const overlay = useOverlay()

    const handleReturn = (): void => {
        if(window.history.length > 1) { // tab history exists
            overlay.reset()
            router.back()
        } else { // fallback -> no tab history
            router.push("/")
        }
    }

    return { handleReturn }
}
