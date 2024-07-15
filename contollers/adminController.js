const fs = require('fs');
const { pipeline } = require('stream');
const { Parser } = require('json2csv');
const { getIo } = require('../config/socket');
const db = require('../config/db');
const logger = require('../config/logger');

const exportOrders = (req, res) => {
  const query = 'SELECT * FROM orders';
  db.query(query, (err, rows) => {
    if (err) {
      logger.error('Error fetching orders:', err);
      return res.status(500).json({ message: 'Error fetching orders' });
    }

    const json2csv = new Parser();
    const csv = json2csv.parse(rows);

    res.header('Content-Type', 'text/csv');
    res.attachment('orders.csv');
    return pipeline(csv, res, (err) => {
      if (err) {
        logger.error('Error exporting orders:', err);
        return res.status(500).json({ message: 'Error exporting orders' });
      }
    });
  });
};

const handleOrderUpdate = (order) => {
  const io = getIo();
  io.emit('orderUpdate', order);
};

module.exports = { exportOrders, handleOrderUpdate };
