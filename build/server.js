"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const dotenv_1 = require("dotenv");
const index_js_1 = __importDefault(require("./sockets/server/index.js"));
const console_1 = require("console");
//Setup DOTENV
(0, dotenv_1.config)();
const port = process.env.PORT;
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server);
const socketManaget = new index_js_1.default(io);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
server.listen(port, () => {
    (0, console_1.log)(`listening at port : ${port}`);
});
