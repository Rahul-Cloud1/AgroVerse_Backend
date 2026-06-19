const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

const rentRequestController = require('../controllers/rentRequestController');

router.post('/', auth, rentRequestController.createRentRequest);

router.get('/', auth, rentRequestController.getRequestsForOwner);

router.post('/:id/approve', auth, rentRequestController.approveRequest);

module.exports = router;