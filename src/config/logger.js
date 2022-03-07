const winston = require('winston')
const config = require('../config')

const myFormat = winston.format.printf(({
  level, message, label, timestamp
}) => {
  return `${timestamp} [${label}] ${level}: ${message}`
})

const logger = winston.createLogger({
  level: process.env.LOGGER_LEVEL || 'debug',
  format: winston.format.combine(
    winston.format.label({ label: config.app }),
    winston.format.timestamp(),
    myFormat
  ),
  transports: [
    new winston.transports.Console()
  ]
})

module.exports = logger

module.exports.stream = {
  write (message) {
    logger.info(message)
  }
}
