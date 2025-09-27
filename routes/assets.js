const express = require('express');
const router = express.Router();
const { createAsset, getAssetsByUser } = require('../controllers/assetController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, createAsset);
router.get('/', auth, getAssetsByUser);

module.exports = router;
