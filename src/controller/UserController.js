import User from '../model/User.js';
import Avatars from '../model/Avatars.js';

const editProfile = async (req, res) => {
  const uid = req.params.uid;
  const { name, account, password, gender, avatar_id } = req.body;
  const filter = { _id: uid };
  const updateDoc = {
    $set: {
      name: name,
      account: account,
      password: password,
      gender: gender,
      avatar_id: avatar_id,
    },
  };
  try {
    await User.updateOne(filter, updateDoc);
    res.status(200).json({ message: 'edit success' });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const getProfile = async (req, res) => {
  const uid = req.params.uid;
  try {
    const result = await User.findOne({ _id: uid });
    res.status(200).json({
      name: result.name,
      account: result.account,
      password: result.password,
      gender: result.gender,
      avatar_id: result.avatar_id,
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const getAvatarId = async (req, res) => {
  const aid = req.params.aid;
  try {
    const result = await Avatars.findOne({ aid: aid });
    res.status(200).json({ base64: result.base64 });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const getFavor = async (req, res) => {
  const uid = req.params.uid;
  try {
    const result = await User.findOne({ _id: uid });
    res.status(200).json({ favor: result.favor });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const getDrawerInfo = async (req, res) => {
  const uid = req.params.uid;
  try {
    const result = await User.findOne({ _id: uid });
    res.status(200).json({
      name: result.name,
      avatar_id: result.avatar_id,
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const setFavor = async (req, res) => {
  const favorArray = req.body.favor;
  const uid = req.body.uid;
  const filter = { _id: uid };
  const updateDoc = {
    $set: {
      favor: favorArray,
    },
  };
  try {
    await User.updateOne(filter, updateDoc);
    res.status(200).json({ message: 'edit success' });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const setSetting = async (req, res) => {
  const preferObject = req.body.prefer;
  const filter = { _id: uid };
  const uid = req.body.uid;
  const updateDoc = {
    $set: {
      setting: preferObject,
    },
  };
  try {
    await User.updateOne(filter, updateDoc);
    res.status(200).json({ message: 'edit success' });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

export default {
  editProfile,
  getProfile,
  getAvatarId,
  getFavor,
  getDrawerInfo,
  setFavor,
  setSetting,
};
