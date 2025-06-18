const User = require('../models/userModel'), bcrypt = require('bcrypt'), jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET_KEY;

exports.register = async (req, res) => {
  const { email, password, companyName } = req.body;
  if (await User.findOne({ email })) return res.status(400).json({ message: 'Email already in use' });
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashed, companyName });
  const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: '2h' });
  res.status(201).json({ userId: user._id, token });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(400).json({ message: 'Invalid email or password' });
  const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: '2h'});
  res.json({ userId: user._id, token });
};
