"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const browser_1 = __importDefault(require("../browser/browser"));
const browsers_1 = __importDefault(require("../browser/browsers"));
class ServerSocketManager {
    constructor(io) {
        this.io = io;
        this.browsers = new browsers_1.default();
        this.startup();
    }
    startup() {
        this.io.on('connection', (socket) => {
            socket.emit('browser-identify-recieve', socket.id);
            socket.on('browser-identify-response', (data, callback) => {
                try {
                    const { socketId, browserId } = JSON.parse(data);
                    const browser = new browser_1.default(socketId, browserId);
                    this.browsers.setBrowser(browser);
                    callback(data);
                }
                catch (exception) {
                }
            });
        });
    }
}
exports.default = ServerSocketManager;
