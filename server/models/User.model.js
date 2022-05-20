const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userImage: {
    type: String,
    required: true,
  },
  following: {
    type: Array,
  },
  followers: {
    type: Array,
  },
});

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;