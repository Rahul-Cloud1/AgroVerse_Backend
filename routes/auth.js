const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');

// Register and Login
router.post('/register', register);
router.post('/login', login);

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      name: user.name,
      contactNo: user.contactNo || '',
      address: user.address || '',
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
  const { name, contactNo, address } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, contactNo, address },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      name: user.name,
      contactNo: user.contactNo || '',
      address: user.address || '',
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
