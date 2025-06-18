const User = require('../models/userModel'), levelConfig = require('../utils/levelConfig');

exports.checkLevelUp = async (req, res) => {
  const u = await User.findById(req.params.id);
  if (!u) return res.status(404).json({ message:'User not found' });
  const next = levelConfig.find(l => l.level === u.level + 1);
  if (!next) return res.json({ message:'Max level reached', user: u });

  if (u.exp >= next.requiredExp) {
    u.level++;
    u.plots = u.plots.map((p,i) => ({ ...p.toObject(), unlocked:i < next.unlockedPlots }));
    await u.save();
    return res.json({ message:'Level up!', user: u });
  }
  res.json({ message:'Not enough EXP.', user: u });
};
