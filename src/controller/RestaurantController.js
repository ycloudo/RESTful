import Restaurant from "../model/Restaurant.js";

const ResInfo = async (req, res) => {
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
    try {
        Restaurant.find({}, (err, rest) => {
            let index = 0;
            rest.forEach((a) => {
                console.log(a.photo);
                result[index++] = {
                    id: a._id,
                    name: a.name,
                    rate: a.rate,
                    address: a.address,
                    res_type: a.restaurant_type,
                    isFavor: a.isFavor,
                    photo: a.photo,
                    class_rate: a.class_rate,
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
