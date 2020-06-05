const Boom = require('@hapi/boom')
const express = require('express')
const config = require('./config')
const path = require('path')
const registerAPI = require('./api')
const errorHandler = require('./middlewares/error-handler')

global.$logger = config.loggers.defaultLogger

const server = new express()
server.use(express.json())
server.use(express.urlencoded({ extended: false }))
server.use(express.static(path.join(__dirname, 'public')))
server.use(config.loggers.expressLogger)

registerAPI(server)

server.all('*', function (req, res, next) {
  next(Boom.notFound())
})

// Register error handler
server.use(errorHandler)

server.listen(config.server.port, function () {
  console.log(`Server is running on ${config.server.port} port`)
})
