const uuid = require("uuid");
const HttpError = require("../models/http-error");

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
  const { email, name, password } = req.body;
  const newUser = {
    id: uuid.v4(),
    name,
    email,
    password
  };
  USERS.push(newUser);
  res.status(201).json({ users: USERS });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const identifiedUser = USERS.find((user) => user.email === email);
  if (!identifiedUser) {
    return next(new HttpError("Invalid Credentials", 401));
  }
  res.status();
};
const logout = (req, res, next) => {};

exports.getAllUsers = getAllUsers;
exports.createUser = createUser;
exports.login = login;
exports.logout = logout;
