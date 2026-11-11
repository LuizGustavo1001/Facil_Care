import { ref } from "vue"

export function usePersistentStorage(){
    const isPersisted = ref<boolean>(false)

    // Request persistent storage
    const requestPersistence = async (): Promise<boolean> => {
        if(!navigator.storage?.persist) {
            return false
        }

        try {
            // Check whether persistence was already granted
            isPersisted.value = await navigator.storage.persisted()
            console.info('Persistent storage granted:', isPersisted.value)

            return isPersisted.value
        } catch(err) {
            console.error('Failed to request persistent storage:', err)

            return false
        }
    }

    return { requestPersistence, isPersisted }
}