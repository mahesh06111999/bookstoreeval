const express = require('express');
const router = express.Router();
const reviewController = require('../contollers/reviewController');
const { isAuthenticated } = require('../middlewares/auth');

router.get('/book/:id', reviewController.getReviewsForBook);
router.post('/book/:id/review', isAuthenticated, reviewController.addReview);

module.exports = router;
