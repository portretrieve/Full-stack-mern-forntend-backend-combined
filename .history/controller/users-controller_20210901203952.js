const uuid = require("uuid");

const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const User = require("../models/user-model");

const USERS = [
  {
    id: "u1",
    name: "Devesh",
    email: "devesh@devesh.com",
    password: "devesh"
  },
  {
    id: "u2",
    name: "Sumit",
    email: "sumit@sumit.com",
    password: "sumit"
  }
];

const getAllUsers = (req, res, next) => {
  res.status(200).json([USERS]);
};

const createUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid Data to create an user plaese check.", 422)
    );
  }

  const { email: emailInput, name, password, places } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: emailInput });
  } catch (error) {
    return next(new HttpError("Something went wrong. Please try again", 500));
  }

  if (existingUser) {
    return next(
      new HttpError("User Already Exists with that email address", 422)
    );
  }

  const newUser = new User({
    name,
    email: emailInput,
    password,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/399px-Empire_State_Building_%28aerial_view%29.jpg",
    places
  });

  try {
    await newUser.save();
  } catch (error) {
    return next(
      new HttpError("Unable to create a new user. Please try again", 404)
    );
  }

  res.status(201).json({ CreatedUser: newUser.toObject({ getters: true }) });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const identifiedUser = USERS.find((user) => user.email === email);
  if (!identifiedUser) {
    return next(new HttpError("Invalid Credentials", 401));
  }

  res.status(201).json("Login SuccessFull");
};

exports.getAllUsers = getAllUsers;
exports.createUser = createUser;
exports.login = login;
