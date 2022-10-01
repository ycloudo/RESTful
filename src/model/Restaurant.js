import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    rate: {
        type: Number,
        require: true,
    },
    address: {
        type: String,
        require: true,
    },
    restaurant_type: {
        type: Number,
        require: true,
    },
    photo: {
        type: String,
        require: true,
    },
    reviews: {
        type: Array,
        require: false,
    },
    class_rate: {
        type: Array,
        require: true,
    },
});

export default mongoose.model("Restaurant", RestaurantSchema);
