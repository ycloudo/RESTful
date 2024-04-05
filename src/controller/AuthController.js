import User from '../model/User.js';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
  const user = new User({
    name: req.body.name,
    account: req.body.account,
    password: req.body.password,
    avatar_id: RandomInt(1, 5),
  });
  try {
    const savedUser = await user.save();
    const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });
    res.status(201).json({ info: savedUser, token: token });
  } catch (err) {
    res.status(400).send(err);
  }
};

const RandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const login = async (req, res) => {
  const user = await User.findOne({ account: req.body.account });
  if (!user) {
    return res.status(400).json({ message: 'user not found' });
  }
  if (user.password !== req.body.password) {
    return res.status(400).json({ message: 'wrong password' });
  }
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });

  res.status(200).json({
    token: token,
    uid: user._id,
    account: user.account,
  });
};

const isTokenValid = async (req, res) => {
  const token = req.body.token;
  try {
    const result = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return false;
      else return true;
    });
    res.status(200).json(result);
  } catch (e) {
    res.status(401).json({ message: 'function failed' });
  }
};

export default { register, login, isTokenValid };
