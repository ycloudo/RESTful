import User from '../model/User.js';
import Avatars from '../model/Avatars.js';
import Restaurant from '../model/Restaurant.js';

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
  const uid = req.body.uid;
  const filter = { _id: uid };
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

const getSetting = async (req, res) => {
  const uid = req.params.uid;
  try {
    const result = await User.findOne({ _id: uid });
    res.status(200).json({ setting: result.setting });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const editReord = async (req, res) => {
  const rid = req.body.rid;
  const uid = req.body.uid;
  const filter = { _id: uid };
  let response, counter;
  try {
    const result = await User.findOne({ _id: uid });
    const res2 = await Restaurant.findOne({ _id: rid });
    const records = result.record;
    const popularity = (res2.popularity += 1);
    if (records[rid]) {
      //if rid already in record
      counter = records[rid].counter += 1;
      const updatedoc = {
        $set: {
          record: {
            ...records,
            [rid]: {
              counter: counter,
            },
          },
        },
      };
      response = await User.updateOne(filter, updatedoc);
    } else {
      const updatedoc = {
        $set: {
          record: {
            ...records,
            [rid]: {
              counter: 1,
            },
          },
        },
      };
      response = await User.updateOne(filter, updatedoc);
    }
    const updatedoc2 = {
      $set: {
        popularity: popularity,
      },
    };
    await Restaurant.updateOne({ _id: rid }, updatedoc2);
    res.status(200).json(popularity);
  } catch (e) {
    res.status(400).json({ message: e });
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
  getSetting,
  editReord,
};
