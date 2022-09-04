import mongoose from "mongoose";

const AvatarSchema = new mongoose.Schema({
    aid: {
        type: Number,
        require: true,
    },
    base64: {
        type: String,
        require: true,
    },
});

export default mongoose.model("Avatar", AvatarSchema);
