const levelConfig = require('../utils/levelConfig.js');
const User = require('../models/userModel');

exports.checkLevelUp = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const currentLevel = user.level;
    const currentExp = user.exp;

    const nextLevel = levelConfig.find(lvl => lvl.level === currentLevel + 1);
    if (!nextLevel) return res.json({ message: "Max level reached." });

    if (currentExp >= nextLevel.requiredExp) {
      // Level up
      user.level += 1;

      // Unlock new plots
      const unlockedCount = nextLevel.unlockedPlots;
      user.plots = user.plots.map((plot, i) => {
        return i < unlockedCount ? { ...plot, unlocked: true } : plot;
      });

      await user.save();
      res.json({ message: "Level up!", user });
    } else {
      res.json({ message: "Not enough EXP yet." });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
