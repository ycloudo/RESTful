import Restaurant from '../model/Restaurant.js';

const getRestaurants = async (req, res) => {
  let restaurantInfo;
  try {
    if (req.query.rid) {
      restaurantInfo = await fetchRestaurantById(req.query.rid);
    } else if (req.query.text) {
      restaurantInfo = await fetchRestaurantByText(req.query.text);
    } else if (req.query.cid && req.query.page) {
      restaurantInfo = await fetchRestaurantByTag(
        req.query.cid,
        req.query.page
      );
    }
    res.status(200).json(restaurantInfo);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const fetchRestaurantById = async (rid) => {
  try {
    const restaurants = await Restaurant.findOne({
      _id: rid,
    }).select('id name rate address restaurant_type photo class_rate reviews');
    return {
      id: restaurants._id,
      name: restaurants.name,
      rate: restaurants.rate,
      address: restaurants.address,
      res_type: restaurants.restaurant_type,
      photo: restaurants.photo,
      class_rate: restaurants.class_rate,
      reviews: restaurants.reviews,
    };
  } catch (error) {
    console.error('Error fetching restaurants by id:', error);
    throw error;
  }
};

const fetchRestaurantByTag = async (cid, page) => {
  let restaurants;
  try {
    if (cid == 99) {
      restaurants = await Restaurant.find({})
        .select('id name rate address restaurant_type photo class_rate')
        .limit(10)
        .skip((page - 1) * 10);
    } else {
      restaurants = await Restaurant.find({ restaurant_type: cid })
        .select('id name rate address restaurant_type photo class_rate')
        .limit(10)
        .skip((page - 1) * 10);
    }

    return restaurants.map((rest) => ({
      id: rest._id,
      name: rest.name,
      rate: rest.rate,
      address: rest.address,
      res_type: rest.restaurant_type,
      photo: rest.photo,
      class_rate: rest.class_rate,
    }));
  } catch (error) {
    console.error('Error fetching restaurants by tag:', error);
    throw error;
  }
};

const fetchRestaurantByText = async (text) => {
  try {
    const regex = new RegExp('.*' + text + '.*', 'i');
    const restaurants = await Restaurant.find({ name: regex }).select(
      'id name rate address restaurant_type photo class_rate'
    );

    return restaurants.map((rest) => ({
      id: rest._id,
      name: rest.name,
      rate: rest.rate,
      address: rest.address,
      res_type: rest.restaurant_type,
      photo: rest.photo,
      class_rate: rest.class_rate,
    }));
  } catch (error) {
    console.error('Error fetching restaurants by text:', error);
    throw error;
  }
};

export default { getRestaurants };
