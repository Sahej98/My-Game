const express = require('express');
const router = express.Router();
const buildingsData = require('../utils/buildingsData');
const productsData = require('../utils/productsData');

// Helper: enrich each product in a building with productData
function enrichBuildingProducts(building) {
  return {
    ...building,
    products: building.products.map(prod => ({
      ...prod,
      ...(productsData[prod.id] || {})  // Merge product image, name, etc.
    }))
  };
}

// Main function to merge all
function getEnrichedBuildings() {
  return {
    production: buildingsData.production.map(enrichBuildingProducts),
    retail: buildingsData.retail.map(enrichBuildingProducts)
  };
}

// GET /api/buildings
router.get('/', (req, res) => {
  const enriched = getEnrichedBuildings();
  res.json(enriched);
});

module.exports = router;
