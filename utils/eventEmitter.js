const EventEmitter = require('events');
const orderPlaced = new EventEmitter();
const bookAdded = new EventEmitter();

module.exports = { orderPlaced, bookAdded };
