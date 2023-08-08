import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import {config} from 'dotenv'
import ServerSocketManager from './sockets/server/index.js'
import { log } from 'console'
import * as socketIO from 'socket.io';
import {fastify} from 'fastify'

//Setup DOTENV
config()

const port = process.env.PORT
const app  = fastify({ logger: true });
const server = createServer(app.server);
const io = new socketIO.Server(server);

const serverSocketManager = new ServerSocketManager(io)


io.on('connection', (socket) => {
  console.log('Un client est connecté');

  socket.on('disconnect', () => {
    console.log('Un client s\'est déconnecté');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    log(`listening on port ${port}`)
});