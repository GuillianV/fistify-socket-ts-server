import Browser from "./browser"
import { browserLogger } from "../../logs/pino"
export default class Browsers{

    browsers : Array<Browser>


    constructor(){

         this.browsers = []

    }


    setBrowser(browser : Browser){

        if(!(browser instanceof Browser)){
            browserLogger.error("setBrowser , browser not instance of Browser")
            throw new Error("setBrowser , browser not instance of Browser")
        }

        if(this.checkBrowserIdExists(browser)){
            this.replaceBrowserSocketId(browser)
            browserLogger.info(`Browser ${browser.browserId} reconected !`)
        }else{
            browserLogger.info(`Browser ${browser.browserId} joined for the first time of the day !`)
            this.browsers.push(browser)
        }
     
    }

    checkBrowserIdExists(browser: Browser){
        let browsersArray : Array<Browser> = this.browsers.filter(_browser => _browser.browserId == browser.browserId)
        if(browsersArray.length > 1){
            browserLogger.error("checkBrowserIdExists : More than 1 browser with same browserId Exist")
            throw Error("checkBrowserIdExists : More than 1 browser with same browserId Exist")
        }
        return browsersArray.length == 1
    }

    replaceBrowserSocketId(browser: Browser){
        let browserFound : Browser | undefined = this.browsers.find(_browser => _browser.browserId == browser.browserId)
        if(browserFound === undefined){
            browserLogger.error("replaceBrowserSocketId : Trying to replace socketId of undefined browser")
            throw Error("replaceBrowserSocketId : Trying to replace socketId of undefined browser")
        }

        browserFound.socketId = browser.socketId
    }

}