
export default class Browser{

    socketId:string
    browserId:string

    constructor( socketId : string,browserId : string){

        if(socketId.length == 0){

          //  socketLogger.error('socketId length == 0')
            throw new Error('socketId length == 0')
        }
           
        if(browserId.length == 0){

            //socketLogger.error('browserId length == 0')
            throw new Error('browserId length == 0')
        }
   


        this.socketId = socketId,
        this.browserId = browserId

    }

}