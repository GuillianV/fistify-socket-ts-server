
import Browser from '../browser/browser'
import Browsers from '../browser/browsers'
import { Server } from 'socket.io'


export default class ServerSocketManager{

    io:Server
    browsers : Browsers

    constructor(io:Server){

        this.io = io
        this.browsers = new Browsers()
        this.startup()
       
    }


    startup(){

      this.io.on('connection', (socket) => {

        socket.emit('browser-identify-recieve', socket.id)
        socket.on('browser-identify-response',(data,callback) => {
          try{

            const {socketId,browserId} = JSON.parse(data)
            const browser : Browser = new Browser(socketId,browserId)
            this.browsers.setBrowser(browser)
            callback(data)

          }catch(exception){
            
          }
        })
      })

    }

}