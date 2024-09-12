// Inicializamos el servidor, donde estara el puerto
const express = require('express')
const router = require('./routes/index')
const cors = require("cors");

const server = express()

server.use(cors())
server.disable('x-powered-by')

server.use(router);
module.exports = server