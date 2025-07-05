const mongoose = require('mongoose');
const { plotSchema } = require('./plotModel');

function generateInitialPlots() {
  return Array(28).fill().map((_, i) => {
    if (i === 0) {
      return {
        unlocked: true,
        building: {
          name: 'Farm',
          image: '/assets/farm.png',
          level: 1,
        },
      };
    } else if (i === 1) {
      return {
        unlocked: true,
        building: {
          name: 'Grocery Store',
          image: '/assets/grocery.png',
          level: 1,
        },
      };
    } else {
      return {
        unlocked: i < 4,
        building: null,
      };
    }
  });
}

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  companyName: String,
  profilePic: { type: String, default: '' },
  level: { type: Number, default: 1 },
  exp: { type: Number, default: 0 },
  cash: { type: Number, default: 20000 },
  inventory: { type: Array, default: [] },
  plots: {
    type: [plotSchema],
    default: generateInitialPlots
  }
});

module.exports = mongoose.model('User', userSchema);
