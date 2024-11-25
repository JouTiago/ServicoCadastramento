const EventEmitter = require("events");

class CustomEventEmitter extends EventEmitter {}

module.exports = new CustomEventEmitter();