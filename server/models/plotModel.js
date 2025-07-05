const mongoose = require('mongoose');

const plotSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
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

const Plot = mongoose.model('Plot', plotSchema);

module.exports = {
  Plot,
  plotSchema
};
