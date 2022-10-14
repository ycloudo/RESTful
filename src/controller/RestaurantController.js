import Restaurant from "../model/Restaurant.js";

const ResInfo = async (req, res) => {
    const id = req.params.rid;
    let i = 0;
    try {
        const restaurant = await Restaurant.findOne({
            _id: id,
        });
        let reviews = restaurant.reviews;
        reviews.forEach((e) => {
            const array = e.type;
            const result = array.filter((item, index, array) => {
                return array.indexOf(item) === index;
            });
            reviews[i++].type = result;
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
        });
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const infoById = async (req, res) => {
    let result = [];
    let index = 0;
    const favors = req.body.favors;
    try {
        favors.forEach((id) => {
            const res = Restaurant.findOne({ _id: id });
            result[index++] = {
                id: res._id,
                name: res.name,
                rate: res.rate,
                address: res.address,
                res_type: res.restaurant_type,
                photo: res.photo,
                class_rate: res.class_rate,
            };
        });
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

export default { ResInfo, AllInfo, infoById };
