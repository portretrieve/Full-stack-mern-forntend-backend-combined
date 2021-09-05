const HttpError = require("../models/http-error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { validationResult } = require("express-validator");
const User = require("../models/user-model");

const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (error) {
    return next(
      new HttpError(
        "Unable to retrieve the list of Users. Please try again.",
        500
      )
    );
  }

  if (!users || users.length === 0) {
    return next(new HttpError("No Users found.", 404));
  }

  res.json(users.map((user) => user.toObject({ getters: true })));
};

const createUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid Data to create an user plaese check.", 422)
    );
  }

  const { email: emailInput, name, password } = req.body;

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

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    return next(new HttpError("Could not create user, please try again.", 500));
  }

  const createdUser = new User({
    name,
    email: emailInput,
    password: hashedPassword,
    image: req.file.path,
    places: []
  });

  try {
    await createdUser.save();
  } catch (error) {
    return next(
      new HttpError("Unable to create a new user. Please try again", 404)
    );
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      "SuperSecretPrivateKey__Not_to_be_shared",
      { expiresIn: "1h" }
    );
  } catch (error) {
    return next(
      new HttpError("Unable to create a new user. Please try again", 404)
    );
  }

  res.status(201).json({
    userId: createdUser.id,
    email: createdUser.email,
    token: token
  });
};

const login = async (req, res, next) => {
  let existingUser;
  try {
    existingUser = await User.findOne({
      email: req.body.email
    });
  } catch (error) {
    return next(new HttpError("Sorry unable to login. Try Again Later", 500));
  }

  if (!existingUser) {
    return next(new HttpError("Invalid Credentials", 401));
  }

  let isValidPassword;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (error) {
    return next(
      new HttpError("Could not log you in Password. Please try again!", 500)
    );
  }

  if (!isValidPassword) {
    return next(new HttpError("Invalid Credentials.", 401));
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      "SuperSecretPrivateKey__Not_to_be_shared",
      { expiresIn: "1h" }
    );
  } catch (error) {
    return next(
      new HttpError("Could not log you in jwt. Please try again!", 500)
    );
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token
  });
};

exports.getAllUsers = getAllUsers;
exports.createUser = createUser;
exports.login = login;
