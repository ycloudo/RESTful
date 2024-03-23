import Restaurant from '../model/Restaurant.js';

const ResReviews = async (req, res) => {
  const id = req.params.rid;
  try {
    const restaurant = await Restaurant.findOne({
      _id: id,
    });
    res.status(200).json({
      reviews: restaurant.reviews,
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const AllInfo = async (req, res) => {
  let result = [];
  let index = 0;
  const page = req.params.page;
  try {
    const rest = await Restaurant.find({})
      .limit(10)
      .skip((page - 1) * 10);
    rest.forEach((a) => {
      result[index++] = {
        id: a._id,
        name: a.name,
        rate: a.rate,
        address: a.address,
        res_type: a.restaurant_type,
        photo: a.photo,
        class_rate: a.class_rate,
      };
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const infoById = async (req, res) => {
  let result = [];
  let index = 0;
  const favors = req.body.favors;
  try {
    for (let i = 0; i < favors.length; i++) {
      const res = await Restaurant.findOne({
        _id: favors[i],
      });
      result[index++] = {
        id: res._id,
        name: res.name,
        rate: res.rate,
        address: res.address,
        res_type: res.restaurant_type,
        photo: res.photo,
        class_rate: res.class_rate,
      };
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const infoByTag = async (req, res) => {
  const cid = req.params.cid;
  const page = req.params.page;
  let result = [];
  let index = 0;
  try {
    let rest;
    if (cid == 99) {
      rest = await Restaurant.find({})
        .limit(10)
        .skip((page - 1) * 10);
    } else {
      rest = await Restaurant.find({ restaurant_type: cid })
        .limit(10)
        .skip((page - 1) * 10);
    }
    rest.forEach((a) => {
      result[index++] = {
        id: a._id,
        name: a.name,
        rate: a.rate,
        address: a.address,
        res_type: a.restaurant_type,
        photo: a.photo,
        class_rate: a.class_rate,
      };
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

export default { ResReviews, AllInfo, infoById, infoByTag };
