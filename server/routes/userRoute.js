const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const User = require('../models/userModel');
const levelConfig = require('../utils/levelConfig');

router.get('/level-config', (req, res) => {
  res.json(levelConfig);
});

router.get('/level-up/:id', userController.checkLevelUp);

router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error('Error fetching user by ID:', err); // Add this line
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});


router.get('/plots', async (req, res) => {
  try {
    const user = await User.findOne(); // Using dummy user for now
    if (!user) return res.status(404).json({ error: 'No user found' });

    res.json({ plots: user.plots });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
