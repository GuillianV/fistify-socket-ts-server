import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import {config} from 'dotenv'
import ServerSocketManager from './sockets/server/index'
import { log } from 'console'
import * as socketIO from 'socket.io';
import {fastify} from 'fastify'
import { serverLogger } from './logs/pino'
//Setup DOTENV
config()

const port = process.env.PORT
const app  = fastify({ logger: true });
const server = createServer(app.server);
const io = new socketIO.Server(server,{});

const serverSocketManager = new ServerSocketManager(io)


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    const serverStart =`listening on port ${port}`
    serverLogger.info(serverStart)
    log(serverStart)
});