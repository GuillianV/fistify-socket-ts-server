"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const browser_1 = __importDefault(require("./browser"));
class Browsers {
    constructor() {
        this.browsers = [];
    }
    setBrowser(browser) {
        if (!(browser instanceof browser_1.default)) {
            //   socketLogger.error("setBrowser , browser not instance of Browser")
            throw new Error("setBrowser , browser not instance of Browser");
        }
        if (this.checkBrowserIdExists(browser)) {
            this.replaceBrowserSocketId(browser);
            //   socketLogger.info(`Browser ${browser.browserId} reconected !`)
        }
        else {
            //   socketLogger.info(`Browser ${browser.browserId} joined for the first time of the day !`)
            this.browsers.push(browser);
        }
    }
    checkBrowserIdExists(browser) {
        let browsersArray = this.browsers.filter(_browser => _browser.browserId == browser.browserId);
        if (browsersArray.length > 1) {
            //    socketLogger.error("checkBrowserIdExists : More than 1 browser with same browserId Exist")
            throw Error("checkBrowserIdExists : More than 1 browser with same browserId Exist");
        }
        return browsersArray.length == 1;
    }
    replaceBrowserSocketId(browser) {
        let browserFound = this.browsers.find(_browser => _browser.browserId == browser.browserId);
        if (browserFound === undefined) {
            //    socketLogger.error("replaceBrowserSocketId : Trying to replace socketId of undefined browser")
            throw Error("replaceBrowserSocketId : Trying to replace socketId of undefined browser");
        }
        browserFound.socketId = browser.socketId;
    }
}
exports.default = Browsers;
