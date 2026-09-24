/* Operations statements */

import { reactive } from "vue"

/**
 * Base Controller: Controller superclass to:
 * - loading: If operation still running
 * - message: any message from the query
 * - messageType: message type (error, warning or success)
 **/
export default class BaseController {
    constructor(){
        this.state = reactive({
            loading: false,
            message: '',
        })
    }

    /**
     * Execute an operation while controlling its state
     *
     * @param { Function } operation - operation to be executed by database
     **/
    async execute(operation){
        this.state.loading = true
        this.clearMessage()

        try{
            return await operation()
        }catch(error){
            this.setMessage(error.message)
            return null
        }finally{
            this.state.loading = false
        }
    }

    /**
     * Set a controllers message
     *
     * @param { String } message - message text
     **/
    setMessage(message){
        this.state.message = message
    }

    clearMessage(){
        this.state.message = ''
    }
}