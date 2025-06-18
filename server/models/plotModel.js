const mongoose = require('mongoose');

const plotSchema = new mongoose.Schema({
  unlocked: { type: Boolean, default: false },
  building: { type: String, default: null }
});

module.exports = mongoose.model('Plot', plotSchema);
module.exports.plotSchema = plotSchema; // <-- You need to export the schema
