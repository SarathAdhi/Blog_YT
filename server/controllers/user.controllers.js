const UserModel = require("../models/User.model");
const bcrypt = require("bcrypt");

const Login = async (req, res) => {
  const body = req.body;
  const userDetails = await UserModel.find({ email: body.email });
  if (userDetails.length === 0) {
    res.json({ error: "User does not exist.", status: 400 });
  } else {
    const isValidPassword = await bcrypt.compare(
      body.password,
      userDetails[0].password
    );
    if (isValidPassword) res.send(userDetails[0]);
    else {
      res.json({ error: "Invalid Password.", status: 400 });
    }
  }
};

const CreateUser = async (req, res) => {
  const body = req.body;
  const isUsernameExist = (await UserModel.find({ username: body.username }))
    .length;
  const isEmailnameExist = (await UserModel.find({ email: body.email })).length;

  if (isUsernameExist === 0 && isEmailnameExist === 0) {
    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(body.password, salt);
    const newUser = new UserModel(body);
    await newUser.save();
    res.json({
      username: body.username,
      userImage: body.userImage,
      status: 200,
    });
  } else {
    if (isEmailnameExist > 0)
      res.send({ message: "Email already exist", status: 400 });
    else res.send({ message: "Username already exist", status: 400 });
  }
};

const GetUser = async (req, res) => {
  const post = req.body;

  var getUserDetails = await UserModel.find({ username: post.username });
  if (getUserDetails.length === 0)
    res.send({
      message: "No user found. Something went wrong...",
      status: 400,
    });
  else {
    res.send({
      username: getUserDetails[0].username,
      email: getUserDetails[0].email,
      userImage: getUserDetails[0].userImage,
      following: getUserDetails[0].following,
      followers: getUserDetails[0].followers,
      status: 200,
    });
  }
};

const GetAllUsers = (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

module.exports = {
  Login,
  CreateUser,
  GetUser,
  GetAllUsers,
};
