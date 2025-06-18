const mongoose = require('mongoose');
const { plotSchema } = require('./plotModel'); // Import the schema, not just the model

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  companyName: { type: String, required: true },
  profilePic: { type: String, default: '' },
  level: { type: Number, default: 1 },
  exp: { type: Number, default: 0 },
  cash: { type: Number, default: 20000 },
  inventory: { type: Array, default: [] },
  plots: { 
    type: [plotSchema], 
    default: Array(28).fill().map((_, i) => ({
      unlocked: i < 4,
      building: i === 0 ? 'Farm' : i === 1 ? 'Grocery Store' : null
    }))
  }
});

module.exports = mongoose.model('User', userSchema);
