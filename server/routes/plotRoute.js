// routes/plotRoutes.js
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const user = await User.findOne();

    if (!user) return res.status(404).json({ error: 'No user found' });

    res.json({ plots: user.plots });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch plots' });
  }
});


module.exports = router;
