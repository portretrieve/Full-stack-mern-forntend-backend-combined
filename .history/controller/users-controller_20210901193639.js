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

const createUser = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid Data to create an user plaese check.", 422)
    );
  }

  const { email: emailInput, name, password } = req.body;

  const existingUser = User.find({ email: emailInput });
  if (existingUser) {
    return next(
      new HttpError("User Already Exists with that email address", 422)
    );
  }
  const newUser = {
    name,
    emailInput,
    password
  };
  res.status(201).json({ users: USERS });
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
