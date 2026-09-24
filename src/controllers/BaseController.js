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
            loading: false
        })
    }

    /**
     * Execute an operation while controlling its state
     *
     * @param { Function } operation - operation to be executed by database
     **/
    async execute(operation){
        this.state.loading = true

        try{
            return await operation()
        }catch(error){
            return null
        }finally{
            this.state.loading = false
        }
    }
}