const db = require('../config/db');
const eventEmitter = require('../utils/eventEmitter');
const { sendOrderConfirmation } = require('../config/emailConfig');

exports.getOrdersByCustomer = async (req, res) => {
  const customerId = req.params.customerId;

  try {
    const [orders] = await db.query('SELECT * FROM orders WHERE userId = ?', [customerId]);

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
exports.createOrder = async (req, res) => {
  const { userId, totalAmount} = req.body;
  const username = req.session.username;
  console.log(username);
  try {
    const [result] = await db.query('INSERT INTO orders (userId, totalAmount) VALUES (?, ?)', [userId, totalAmount]);
    const order = { id: result.insertId, userId, totalAmount, createdAt: new Date() };

    
    eventEmitter.emit('orderPlaced', order);

   
    sendOrderConfirmation(order,username);

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
};