import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  account: {
    type: String,
    require: true,
  },
  gender: {
    //male:1 female:0
    type: Boolean,
    require: false,
    default: 0,
  },
  password: {
    type: String,
    require: true,
  },
  avatar_id: {
    type: Number,
    require: true,
  },
  favor: {
    type: Array,
    require: false,
  },
  setting: {
    type: Object,
    required: false,
  },
  record: {
    type: Object,
    required: false,
  },
});

export default mongoose.model('User', UserSchema);
