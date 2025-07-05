const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /api/plots
router.get('/', async (req, res) => {
  try {
    const userId = req.user?.id; // Get user ID from request (e.g., after authentication middleware)

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized: No user ID provided' });
    }

    const user = await User.findById(req.user.id);


    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ plots: user.plots });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch plots' });
  }
});

module.exports = router;
