const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  console.log("register called");
  
  const { name, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: req.i18n.t('auth.register.userExists') });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    console.log(user);

    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ 
      message: req.i18n.t('auth.register.success'),
      token 
    });
  } catch (err) {
    res.status(500).json({ message: req.i18n.t('auth.register.error') });
  }
};

exports.login = async (req, res) => {
    console.log("login called");
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: req.i18n.t('auth.login.invalidCredentials') });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: req.i18n.t('auth.login.invalidCredentials') });

    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ 
      message: req.i18n.t('auth.login.success'),
      token 
    });
  } catch (err) {
    res.status(500).json({ message: req.i18n.t('auth.login.error') });
  }
};
