import User from "../model/User.js";

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
        res.status(200).json({ message: "edit success" });
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

export default { editProfile };
