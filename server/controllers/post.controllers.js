const PostModel = require("../models/Post.model");

async function getPostById(id) {
  var result = await PostModel.findById(id);
  return result;
}

const GetPost = async (req, res) => {
  const post = req.body;
  res.json(await getPostById(post.id));
};

const CreatePost = async (req, res) => {
  const body = req.body;
  const newPost = new PostModel(body);
  await newPost.save();
  res.json(body);
};

const UpdateLike = async (req, res) => {
  const body = req.body;
  if (await getPostById(body.id)) {
    const isUserLikedThisPost = await PostModel.find({
      _id: body.id,
      likeCount: {
        $elemMatch: { $eq: body.username },
      },
    });
    if (isUserLikedThisPost.length === 0) {
      await PostModel.findOneAndUpdate(
        { _id: body.id },
        { $push: { likeCount: body.username } }
      );
      res.json(await getPostById(body.id));
    }
  }
};

const PostComment = async (req, res) => {
  const post = req.body;
  if (await getPostById(post.id)) {
    await PostModel.updateMany(
      { _id: post.id },
      {
        $push: {
          comments: {
            comment: post.comment,
            username: post.username,
            userImage: post.userImage,
          },
        },
      }
    );
    res.json(await getPostById(post.id));
  }
};

const GetTags = async (req, res) => {
  var tags = await PostModel.find({}).select("tags");
  res.json(tags);
};

const GetAllPosts = (req, res) => {
  PostModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

module.exports = {
  GetPost,
  CreatePost,
  PostComment,
  GetTags,
  UpdateLike,
  GetAllPosts,
};
