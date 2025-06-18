const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const buildingsData = require('../utils/buildingsData');
const productsData = require('../utils/productsData');

// Helper: Enrich product with static data
function enrichProduct(p) {
  const base = productsData[p.id] || {};
  return {
    ...p,
    name: base.name || p.id,
    image: base.image || '',
    sellPrice: base.sellPrice || 0,
  };
}

// Helper: Enrich building's products
function enrichBuilding(building) {
  const enrichedProducts = (building.products || []).map(enrichProduct);
  return {
    ...building,
    products: enrichedProducts,
  };
}

// Helper: Find building by name across categories
function findBuildingByName(name) {
  for (const category of Object.values(buildingsData)) {
    const b = category.find((b) => b.name === name);
    if (b) return enrichBuilding(b);
  }
  return null;
}

// Get user by ID
router.get('/user/:id', async (req, res) => {
  const u = await User.findById(req.params.id);
  if (!u) return res.status(404).json({ error: 'User not found' });
  res.json(u);
});

// Get user's plots with enriched building & product info
router.get('/plots', async (req, res) => {
  const u = await User.findOne(); // TODO: use auth
  if (!u) return res.status(404).json({ error: 'User not found' });

  const enriched = u.plots.map((p) => {
    const b = p.building;
    const full = b ? findBuildingByName(b.name) : null;

    return {
      ...p.toObject(),
      building: full
        ? { ...full, level: b.level } // Merge static + dynamic level
        : null,
    };
  });

  res.json({ plots: enriched });
});

// Other endpoints
router.get('/level-config', (req, res) =>
  res.json(require('../utils/levelConfig'))
);

router.get(
  '/level-up/:id',
  require('../controllers/userController').checkLevelUp
);

module.exports = router;
