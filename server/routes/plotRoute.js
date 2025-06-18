const express = require('express');
const router = express.Router();
const Plot = require('../models/plotModel');
const buildingsData = require('../utils/buildingsData');

router.get('/', async (req, res) => {
  try {
    const plots = await Plot.find();

    const enrichedPlots = plots.map(plot => {
      const plain = plot.toObject();
      if (plain.building) {
        plain.building = buildingsData[plain.building] || null;
      }
      return plain;
    });

    res.json({ plots: enrichedPlots });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch plots' });
  }
});

module.exports = router;
