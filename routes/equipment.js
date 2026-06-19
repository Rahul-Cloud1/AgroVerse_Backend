const express = require('express');
const router = express.Router();
const equipmentController = require('../controllers/equipmentController');
const auth = require('../middleware/authMiddleware');

router.post('/', equipmentController.createEquipment);
router.post('/', auth, equipmentController.createEquipment);
router.get('/', equipmentController.getAllEquipment);

module.exports = router;