import Avatars from "../model/Avatars.js";

const getAvatars = async (req, res) => {
    let result = [];
    try {
        Avatars.find({}, (err, avatars) => {
            avatars.forEach((a) => {
                result[a.aid - 1] = a.base64;
            });
            res.status(200).json(result);
        });
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

export default { getAvatars };
