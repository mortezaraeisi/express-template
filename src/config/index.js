const winston = require('winston')
const expressWinston = require('express-winston')

module.exports = {
  server: {
    port: 3000
  },
  loggers: {
    defaultLogger: winston.createLogger({
      transports: [
        new winston.transports.Console()
      ]
    }),
    expressLogger: expressWinston.logger({
      transports: [
        new winston.transports.Console()
      ],
      colorize: true,
      meta: true,
      expressFormat: false
    })
  }
}
