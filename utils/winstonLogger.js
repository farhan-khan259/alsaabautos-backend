const {createLogger,format,transports} = require('winston')


// Define the format for console logging
const logFormat = format.printf(({ level, message,timestamp }) => {
  return `[${level}]: ${message} `;
});

// Create the logger instance
const Logger = createLogger({
  level: 'info', // Default logging level
  format: format.combine(
  format.timestamp(),
  format.colorize(),
    logFormat
  ),
  transports: [
    new transports.Console({
      format:format.combine(
      format.colorize(),
        logFormat
      )
    })
  ]
});

module.exports = {Logger}
 