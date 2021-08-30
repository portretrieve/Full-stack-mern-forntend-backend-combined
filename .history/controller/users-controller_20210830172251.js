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
  },
  {
    id: "u3",
    image:
      "https://www.studying-in-germany.org/wp-content/uploads/2018/07/German-Culture-and-Traditions.jpg",
    name: "Priyanka",
    places: 6
  },
  {
    id: "u4",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/3b/Frauenkirche_and_Neues_Rathaus_Munich_March_2013.JPG",
    name: "Prasang",
    places: 8
  }
];

const getAllUsers = (req, res, next) => {
  res.status(200).json([USERS]);
};

const createUser = (req, res, next) => {
  const { image, name, places } = req.body;
  const newUser = {
    id: uuid.v4(),
    image,
    name,
    places
  };
  USERS.push(newUser);
  res.status(201).json({ users: USERS });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  res.status();
};
const logout = (req, res, next) => {};

exports.getAllUsers = getAllUsers;
exports.createUser = createUser;
exports.login = login;
exports.logout = logout;
