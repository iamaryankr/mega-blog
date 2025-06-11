const jwt = require('jsonwebtoken');
const User = require('../models/User');

// POST /api/auth/signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const passwordHash = await User.hashPassword(password);
    const newUser = await User.create({ name, email, passwordHash });
    res.status(201).json({ message: 'User created', userId: newUser._id });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Signup failed' });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const valid = await user.comparePassword(password);
    if (!valid) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login error' });
  }
};
