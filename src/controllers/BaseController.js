/* Operations statements */

import { reactive } from "vue"

/**
 * Base Controller: Controller superclass to:
  - loading: If operation still running
 * - message: any message from the query
 * - messageType: message type (error, warning or success)
 **/
export default class BaseController {
    constructor(){
        this.state = reactive({
            loading: false,
            message: '',
            messageType: ''
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
            const result = await operation()

            return await operation()
        }catch(error){
            this.setMessage(error.message, 'error')
            return null
        }finally{
            this.state.loading = false
        }
    }

    /**
     * Set a controllers message
     *
     * @param { String } message - message text
     * @param { String } type - message type
     **/
    setMessage(message, type= 'error'){
        this.state.message = message
        this.messageType = type
    }

    clearMessage(){
        this.state.message = ''
        this.state.messageType = ''
    }
}