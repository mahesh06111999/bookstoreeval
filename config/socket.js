const { orderPlaced, bookAdded } = require('../utils/eventEmitter');

const initSockets = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });

    orderPlaced.on('orderPlaced', (order) => {
      io.emit('orderPlaced', order);
    });

    bookAdded.on('bookAdded', (book) => {
      io.emit('bookAdded', book);
    });
  });
};

module.exports = { initSockets };
