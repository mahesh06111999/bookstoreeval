const express = require('express');
const router = express.Router();
const orderController = require('../contollers/orderController');
const { isAuthenticated } = require('../middlewares/auth');

router.get('/:customerId', isAuthenticated, orderController.getOrdersByCustomer);
router.post('/:customerId', isAuthenticated, orderController.createOrder);
module.exports = router;
