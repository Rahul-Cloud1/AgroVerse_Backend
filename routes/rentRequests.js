const express = require('express');
const router = express.Router();
const rentRequestController = require('../controllers/rentRequestController');

router.post('/', rentRequestController.createRentRequest);
router.get('/', rentRequestController.getRequestsForOwner);
router.post('/:id/approve', rentRequestController.approveRequest);

module.exports = router;