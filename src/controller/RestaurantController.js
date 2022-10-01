import Restaurant from "../model/Restaurant.js";

const ResInfo = async (req, res) => {
    const rid = req.param.rid;
    try {
        const restaurant = Restaurant.findOne({ _id: rid });
        res.status(200).json({
            name: restaurant.name,
            rate: restaurant.rate,
            address: restaurant.address,
            res_type: restaurant.restaurant_type,
            isFavor: restaurant.isFavor,
            photo: restaurant.photo,
            class_rate: restaurant.class_rate,
        });
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const AllInfo = async (req, res) => {
    let result = [];
    try {
        Restaurant.find({}, (err, rest) => {
            let index = 0;
            rest.forEach((a) => {
                result[index++] = {
                    id: a._id,
                    name: a.name,
                    photo: a.photo,
                    type: a.restaurant_type,
                };
            });
            res.status(200).json(result);
        });
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const infoByTag = async (req, res) => {
    let result = [];
    const tag = req.param.tag;
    try {
        Restaurant.find({ restaurant_type: tag }, (err, rest) => {
            let index = 0;
            rest.forEach((a) => {
                result[index++] = {
                    id: a._id,
                    name: a.name,
                    photo: a.photo,
                };
            });
            res.status(200).json(result);
        });
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

export default { ResInfo, AllInfo, infoByTag };
