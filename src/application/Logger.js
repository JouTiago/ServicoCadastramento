const moment = require('moment');

class Logger {
  log(eventType, details) {
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    console.log(`[${timestamp}] [${eventType}]`, details);
  }
}

module.exports = new Logger();