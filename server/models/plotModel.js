const mongoose = require('mongoose');

const plotSchema = new mongoose.Schema({
  unlocked: { type: Boolean, default: false },
  building: {
    type: {
      name: String,
      image: String,
      level: { type: Number, default: 1 }
    },
    default: null
  }
});

module.exports = mongoose.model('Plot', plotSchema);
module.exports.plotSchema = plotSchema;
