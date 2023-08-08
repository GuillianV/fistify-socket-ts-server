"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var browser_1 = __importDefault(require("../browser/browser"));
var browsers_1 = __importDefault(require("../browser/browsers"));
var ServerSocketManager = /** @class */ (function () {
    function ServerSocketManager(io) {
        this.io = io;
        this.browsers = new browsers_1.default();
        this.startup();
    }
    ServerSocketManager.prototype.startup = function () {
        var _this = this;
        this.io.on('connection', function (socket) {
            socket.emit('browser-identify-recieve', socket.id);
            socket.on('browser-identify-response', function (data, callback) {
                try {
                    var _a = JSON.parse(data), socketId = _a.socketId, browserId = _a.browserId;
                    var browser = new browser_1.default(socketId, browserId);
                    _this.browsers.setBrowser(browser);
                    callback(data);
                }
                catch (exception) {
                }
            });
        });
    };
    return ServerSocketManager;
}());
exports.default = ServerSocketManager;
