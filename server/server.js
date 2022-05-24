const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const PostModel = require("./models/Post.model");
const UserModel = require("./models/User.model");

const app = express();
require('dotenv').config();

app.use(express.json());
app.use(cors());

// Functions ************************
async function getPostById(id) {
    var result = await PostModel.findById(id);
    return result;
}

// Routes ********************************
app.get('/', (req, res) => {
    res.send("Hello")
});

// Remove after deployment
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
    res.json(await getPostById(post.id))
});

app.get("/post/tags", async (req, res) => {
    // const post = req.body;
    var tags = await PostModel.find({}).select('tags');
    res.json(tags)
});

app.post("/post/updateLike", async (req, res) => {
    const body = req.body;
    if (await getPostById(body.id)) {
        const isUserLikedThisPost = await PostModel.find(
            {
                "_id": body.id,
                likeCount: {
                    $elemMatch: { $eq: body.username }
                }
            }
        )
        if (isUserLikedThisPost.length === 0) {
            await PostModel.findOneAndUpdate(
                { "_id": body.id },
                { $push: { "likeCount": body.username } }
            )
            res.json(await getPostById(body.id))
        }
    }
});

app.post("/post/Comment", async (req, res) => {
    const post = req.body;
    if (await getPostById(post.id)) {
        await PostModel.updateMany(
            { "_id": post.id },
            {
                $push: {
                    "comments": {
                        comment: post.comment,
                        username: post.username,
                        userImage: post.userImage,
                    }
                }
            }
        )
        res.json(await getPostById(post.id))
    }
});

app.post("/createPost", async (req, res) => {
    const body = req.body;
    const newPost = new PostModel(body);
    await newPost.save();
    res.json(body);
});

// Remove after deployment
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
    const body = req.body;
    const userDetails = (await UserModel.find({ "email": body.email }))
    if (userDetails.length === 0) {
        res.json({ error: "User does not exist.", status: 400 });
    }
    else {
        const isValidPassword = await bcrypt.compare(body.password, userDetails[0].password);
        if (isValidPassword)
            res.send(userDetails[0])
        else {
            res.json({ error: "Invalid Password.", status: 400 });
        }
    }
});
app.post("/createUser", async (req, res) => {
    const body = req.body;
    const isUsernameExist = (await UserModel.find({ "username": body.username })).length
    const isEmailnameExist = (await UserModel.find({ "email": body.email })).length

    if (isUsernameExist === 0 && isEmailnameExist === 0) {
        const salt = await bcrypt.genSalt(10);
        body.password = await bcrypt.hash(body.password, salt);
        const newUser = new UserModel(body);
        await newUser.save();
        res.json({ username: body.username, userImage: body.userImage, status: 200 });
    }
    else {
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