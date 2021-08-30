const uuid = require("uuid");
const HttpError = require("../models/http-error");

const USERS = [
  {
    id: "u1",
    image:
      "https://www.studying-in-germany.org/wp-content/uploads/2018/07/German-Culture-and-Traditions.jpg",
    name: "Devesh",
    places: 2
  },
  {
    id: "u2",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/3b/Frauenkirche_and_Neues_Rathaus_Munich_March_2013.JPG",
    name: "Sumit",
    places: 4
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

const createUser = (req, res, next) => {};

const login = (req, res, next) => {};
const logout = (req, res, next) => {};

exports.getAllUsers = getAllUsers;
exports.createUser = createUser;
exports.login = login;
exports.logout = logout;
