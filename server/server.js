const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const {
  PostComment,
  GetPost,
  GetTags,
  UpdateLike,
  CreatePost,
  GetAllPosts,
} = require("./controllers/post.controllers.js");
const {
  Login,
  CreateUser,
  GetUser,
  GetAllUsers,
} = require("./controllers/user.controllers.js");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello");
});

// Remove after deployment
app.get("/getPosts", GetAllPosts);
// 
app.post("/post/getPost", GetPost);
app.post("/createPost", CreatePost);
app.post("/post/updateLike", UpdateLike);
app.post("/post/Comment", PostComment);
app.get("/post/tags", GetTags);

// Remove after deployment
app.get("/getUsers", GetAllUsers);
//
app.post("/login", Login);
app.post("/createUser", CreateUser);
app.post("/profile/getUser", GetUser);

const CONNECTION_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT || 5000;
mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
