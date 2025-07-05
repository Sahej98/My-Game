const express = require('express');
const router = express.Router();

const buildingsData = require('../utils/buildingsData');
const productsData = require('../utils/productsData');

// Optional: generateUpgradeCost helper
function generateUpgradeCost(baseCost, levels, multiplier = 1.25) {
  return Array.from({ length: levels - 1 }, (_, i) =>
    Math.round(baseCost * Math.pow(multiplier, i + 1))
  );
}

// Helper: enrich products with product metadata
function enrichBuildingProducts(building) {
  const enriched = {
    ...building,
    products: building.products.map(prod => ({
      ...prod,
      ...(productsData[prod.id] || {}) // name, image, sellPrice
    }))
  };

  // Auto-generate upgrade cost if baseUpgradeCost is provided
  if (!building.upgradeCost && building.baseUpgradeCost && building.maxLevel) {
    enriched.upgradeCost = generateUpgradeCost(building.baseUpgradeCost, building.maxLevel);
  }

  return enriched;
}

// Merge all buildings and enrich products
function getEnrichedBuildings() {
  return {
    production: buildingsData.production.map(enrichBuildingProducts),
    retail: buildingsData.retail.map(enrichBuildingProducts)
  };
}

// GET /api/buildings or /api/buildings?type=production
router.get('/', (req, res) => {
  const { type } = req.query;
  const enriched = getEnrichedBuildings();

  if (type === 'production') return res.json(enriched.production);
  if (type === 'retail') return res.json(enriched.retail);

  res.json(enriched);
});

module.exports = router;
