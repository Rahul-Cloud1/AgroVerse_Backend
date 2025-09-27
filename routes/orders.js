const express = require('express');
const router = express.Router();
const { createOrder, getUserOrders } = require('../controllers/orderController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, createOrder);
router.get('/', auth, getUserOrders);

module.exports = router;
