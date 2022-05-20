const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const app = express();

const PostModel = require("./models/Post.model");
const UserModel = require("./models/User.model");

app.use(express.json());
app.use(cors());


// Routes

app.get('/', (req, res) => {
    res.send("Hello")
});

app.get("/getPosts", (req, res) => {
    PostModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

app.post("/post/getPost", async (req, res) => {
    const post = req.body;
    var getPostDetail = (await PostModel.find({ "_id": post.id }))
    if (getPostDetail.length === 0)
        res.send({ message: "No Post found. Something went wrong...", status: 400 })
    else {
        res.send({ message: JSON.stringify(getPostDetail) })
    }
});

app.post("/post/updateLike", async (req, res) => {
    const post = req.body;
    console.log(post.id)
    var isPostExist = (await PostModel.find({ "_id": post.id })).length

    if (isPostExist === 0) {
        res.sendStatus(400);
    } else {
        await PostModel.findOneAndUpdate(
            { "_id": post.id },
            { $inc: { "likeCount": 1 } }
        )
        res.sendStatus(200)
    }

});

app.post("/createPost", async (req, res) => {
    const post = req.body;
    const newPost = new PostModel(post);
    await newPost.save();
    res.json(post);
});

app.get("/getUsers", (req, res) => {
    UserModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

app.post("/login", async (req, res) => {
    const post = req.body;

    var isEmailExist = (await UserModel.find({ "email": post.email })).length

    if (isEmailExist === 0) {
        res.json({ message: "Email does not exist !", status: 400 });
    } else {
        var isPasswordCorrect = (await UserModel.find({ "email": post.email, "password": post.password })).length
        if (isPasswordCorrect === 0)
            res.send({ message: "Wrong Password", status: 400 })
        else {
            var user = (await UserModel.find({ "email": post.email, "password": post.password }))
            res.send({ username: user[0].username, userImage: user[0].userImage, status: 200 })
        }
    }

});
app.post("/createUser", async (req, res) => {
    const post = req.body;
    const newUser = new UserModel(post);
    var isUsernameExist = (await UserModel.find({ "username": post.username })).length
    var isEmailnameExist = (await UserModel.find({ "email": post.email })).length

    if (isUsernameExist === 0 && isEmailnameExist === 0) {
        await newUser.save();
        res.json({ username: post.username, userImage: post.userImage, status: 200 });
    } else {
        if (isEmailnameExist > 0)
            res.send({ message: "Email already exist", status: 400 })
        else
            res.send({ message: "Username already exist", status: 400 })
    }
});

app.post("/profile/getUser", async (req, res) => {
    const post = req.body;

    var getUserDetails = (await UserModel.find({ "username": post.username }))
    if (getUserDetails.length === 0)
        res.send({ message: "No user found. Something went wrong...", status: 400 })
    else {
        res.send({ username: getUserDetails[0].username, email: getUserDetails[0].email, userImage: getUserDetails[0].userImage, following: getUserDetails[0].following, followers: getUserDetails[0].followers, status: 200 })
    }
}

);

const CONNECTION_URL = process.env.DATABASE_URL
const PORT = process.env.PORT || 5000;
mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));