const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  authorImage: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  blogImage: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
  createdAt: {
    type: String,
    required: true
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Array,
  },
});

const PostModel = mongoose.model("post", PostSchema);
module.exports = PostModel;