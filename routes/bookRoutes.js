const express = require('express');
const router = express.Router();
const bookController = require('../contollers/bookController');
const { isAuthenticated, isAdmin } = require('../middlewares/auth');

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.post('/', isAuthenticated, isAdmin, bookController.addBook);

module.exports = router;
