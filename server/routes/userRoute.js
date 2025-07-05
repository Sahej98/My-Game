const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const buildingsData = require('../utils/buildingsData');
const productsData = require('../utils/productsData');
const levelConfig = require('../utils/levelConfig');
const { checkLevelUp } = require('../controllers/userController');

// ===== Helper Functions =====

function enrichProduct(p) {
  const base = productsData[p.id] || {};
  return {
    ...p,
    name: base.name || p.id,
    image: base.image || '',
    sellPrice: base.sellPrice || 0,
  };
}

function enrichBuilding(building) {
  const enrichedProducts = (building.products || []).map(enrichProduct);
  return {
    ...building,
    products: enrichedProducts,
  };
}

function findBuildingByName(name) {
  for (const category of Object.values(buildingsData)) {
    const b = category.find((b) => b.name === name);
    if (b) return enrichBuilding(b);
  }
  return null;
}

// ===== Routes =====

// Get user by ID
router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get user' });
  }
});

// Get user's plots (use req.user or query param)
router.get('/plots', async (req, res) => {
  try {
    const userId = req.user?.id || req.query.userId;
    if (!userId) return res.status(400).json({ error: 'No user ID provided' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const enrichedPlots = user.plots.map((plot) => {
      const building = plot.building;
      const full = building ? findBuildingByName(building.name) : null;

      return {
        ...plot.toObject(),
        building: full
          ? { ...full, level: building.level }
          : null,
      };
    });

    res.json({ plots: enrichedPlots });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get plots' });
  }
});

// Return level configuration
router.get('/level-config', (req, res) => {
  res.json(levelConfig);
});

// Level up logic
router.get('/level-up/:id', checkLevelUp);

module.exports = router;
