const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtExpire, jwtSecret } = require("../config/keys");

exports.addUser = async (req, res) => {
  const { name, email, password, shippingAddress, billingAddress } = req.body;

  if (!name || !email || !password || !shippingAddress || !billingAddress) {
    res.status(400);
    throw new Error("Please add all fields!");
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashPassword,
    shippingAddress,
    billingAddress,
  });

  return res.status(200).json({ user });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(400);
    throw new Error("Incorrect email and password");
  }

  const payload = {
    user: {
      id: user._id,
    },
  };

  jwt.sign(payload, jwtSecret, { expiresIn: jwtExpire }, (err, token) => {
    if (err) {
      res.status(400);
      throw new Error("Server Error");
    }

    return res.status(200).json({ user, token });
  });
};

exports.getUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
};

exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const { email } = req.body;

  if (email) {
    const userExist = await User.findOne({ email });

    if (userExist) {
      res.status(400);
      throw new Error("Email already exists");
    }
  }

  const user = await User.findById(id);

  if (!user) {
    res.status(400);
    throw new Error("User does not exist");
  }

  const updatedUser = await User.findByIdAndUpdate(id, req.body);
  return res.status(200).json(updatedUser);
};
