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

const recommend = async (req, res) => {
  const uid = req.params.uid;
  const user = await User.findOne({ _id: uid });
  const settingObj = user.setting;
  const recordObj = user.record;
  const s1Array = []; //餐廳類別陣列
  const s2Array = []; //喜好陣列
  const recordArray = []; //使用者瀏覽過餐廳陣列
  let count = 1;
  let index1 = 0,
    index2 = 0;
  let total_Click_Time = 0; //user total click time
  //split the setting object
  Object.keys(settingObj).forEach((e) => {
    if (settingObj[e]) {
      if (count < 5) {
        s1Array[index1++] = count;
      } else {
        s2Array[index2++] = count - 5;
      }
    }
    count += 1;
  });
  //caculate user total click time
  Object.keys(recordObj).forEach((key, index) => {
    total_Click_Time += recordObj[key].counter;
    recordArray[index] = key;
  });
  const platform_Click_Time = await Restaurant.aggregate([
    {
      $group: {
        _id: null,
        count: { $sum: '$popularity' },
      },
    },
  ]);
  const restaurants = [];
  const rest = await Restaurant.find({});
  rest.forEach((obj, index) => {
    let h,
      J = 0,
      L = 0;
    let Ratio_I = 0,
      single_Click_Time = 0,
      Ratio_K = 0;
    const type = obj.restaurant_type;
    const class_rate = obj.class_rate;
    const id = obj._id;
    const popularity = obj.popularity;
    const total_popularity = platform_Click_Time[0].count;
    //caculate H
    if (s2Array.findIndex((e) => e == type) == -1) {
      h = 0.3;
    } else {
      h = 0.7;
    }
    //caculate J
    s1Array.forEach((e) => {
      J += class_rate[e - 1];
    });
    //caculate Ratio_I
    if (recordArray.findIndex((e) => e == id) != -1) {
      single_Click_Time = recordObj[id].counter;
    }
    Ratio_I = single_Click_Time / total_Click_Time;
    //caculate Ratio_K
    Ratio_K = popularity / total_popularity;
    //caculate L
    L = h + Ratio_I * J + Ratio_K;
    restaurants[index] = {
      id: obj.id,
      name: obj.name,
      weight: h,
      J: J,
      L: L,
    };
  });
  restaurants.sort((a, b) => {
    if (a.L < b.L) {
      return 1;
    }
    if (a.L > b.L) {
      return -1;
    }
    return 0;
  });
  res.status(200).json(restaurants.slice(0, 9));
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
  recommend,
};
