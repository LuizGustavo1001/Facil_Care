/* Operations statements */

export default class BaseController {
    constructor(){}

    /**
     * Execute an operation while controlling it's state
     *
     * @param { Function } operation - operation to be executed by database
     **/
    async execute(operation){
        try{
            return await operation()
        }catch(error){
            return null
        }
    }
}