import Restaurant from "../model/Restaurant.js";

const Searching = async (req, res) => {
    const input = req.params.input;
    let result = [];
    const str = ".*" + input + ".*$";
    const reg = new RegExp(str);
    try {
        Restaurant.find({ name: { $regex: reg } }, (err, rest) => {
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

export default { Searching };
