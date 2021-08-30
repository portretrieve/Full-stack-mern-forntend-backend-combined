const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  createUser,
  login
} = require("../controller/users-controller");

router.get("/", getAllUsers);
router.post("/signup", createUser);
router.post("/login", login);

module.exports = router;
