const User = require('../models/userModel');
const levelConfig = require('../utils/levelConfig');

exports.checkLevelUp = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const nextLevel = levelConfig.find(l => l.level === user.level + 1);
    if (!nextLevel) {
      return res.json({ message: 'Max level reached', user });
    }

    if (user.exp >= nextLevel.requiredExp) {
      user.level++;

      // Only update the unlocked status, preserve building data
      user.plots = user.plots.map((plot, index) => ({
        ...plot.toObject(),
        unlocked: index < nextLevel.unlockedPlots ? true : plot.unlocked,
      }));

      await user.save();

      return res.json({ message: 'Level up!', user });
    }

    res.json({ message: 'Not enough EXP.', user });
  } catch (err) {
    console.error('Error in checkLevelUp:', err);
    res.status(500).json({ message: 'Server error while checking level up' });
  }
};
