const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const User = require("../models/user-model");

const getAllUsers = async (req, res, next) => {
  // res.status(200).json([USERS]);
  let users;
  try {
    places = await User.find();
  } catch (error) {
    return next(
      new HttpError(
        "Unable to retrieve the list of Users. Please try again.",
        500
      )
    );
  }

  if (!places || places.length === 0) {
    return next(new HttpError("unable to find the places. Try Again", 404));
  }

  res.json(places.map((place) => place.toObject({ getters: true })));
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

const login = async (req, res, next) => {
  // const { email: inputEmail, password: inputPassword } = req.body;
  let identifiedUser;
  try {
    identifiedUser = await User.find({
      email: req.body.email
    });
  } catch (error) {
    return next(new HttpError("Sorry unable to login. Try Again Later", 500));
  }

  if (!identifiedUser || identifiedUser.password !== req.body.password) {
    return next(new HttpError("Invalid Credentials", 401));
  }

  res.status(201).json("Login SuccessFull");
};

exports.getAllUsers = getAllUsers;
exports.createUser = createUser;
exports.login = login;
