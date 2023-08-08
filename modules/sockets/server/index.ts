
import Browser from '../browser/browser'
import Browsers from '../browser/browsers'
import { Server, Socket } from 'socket.io'
import { browserLogger } from '../../logs/pino'

export default class ServerSocketManager{

    io:Server
    browsers : Browsers
    sockets : Array<Socket>

    constructor(io:Server){

        this.io = io
        this.sockets = []
        this.browsers = new Browsers()
        this.startup()
        this.setBrowser()
    }
    setBrowser(){

    }

    startup(){

      

      this.io.on('connection', (socket:Socket) => {
        this.sockets.push(socket)
        socket.on('disconnect', () => {
          const index = this.sockets.indexOf(socket)
          this.sockets.splice(index,1)
        });
      });


      this.io.on('connection', (socket) => {

        socket.emit('browser-identify-recieve', socket.id)
        socket.on('browser-identify-response',(data,callback) => {
          try{

            const {socketId,browserId} = JSON.parse(data)
            const browser : Browser = new Browser(socketId,browserId)
            this.browsers.setBrowser(browser)
            callback(data)

          }catch(exception:any){
            browserLogger.error("on:browser-identify-response "+exception.message)
          }
        })
      })

    }

}