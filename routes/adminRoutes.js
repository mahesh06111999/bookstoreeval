const express = require('express');
const { exportOrders } = require('../contollers/adminController');
const router = express.Router();

router.get('/export-orders', exportOrders);

module.exports = router;
