import { useRouter } from 'vue-router'

export function useNavigation(){
    const router = useRouter()

    const handleReturn = () => {
        if(window.history.length > 1){ // tab history exists
            router.back()
        }else{ // fallback
            router.push("/")
        }
    }

    return { handleReturn }
}
