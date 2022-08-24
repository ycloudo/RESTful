import User from "../model/User.js";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
    const user = new User({
        name: req.body.name,
        account: req.body.account,
        password: req.body.password,
    });
    try {
        const savedUser = await user.save();
        const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);
        res.status(200).json({ info: savedUser });
    } catch (err) {
        res.status(400).send(err);
    }
};

const login = async (req, res) => {
    const user = await User.findOne({ account: req.body.account });
    if (!user) {
        return res.status(400).json({ message: "user not found" });
    }
    if (user.password !== req.body.password) {
        return res.status(400).json({ message: "wrong password" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({ token: token, uid: user._id });
};

export default { register, login };
