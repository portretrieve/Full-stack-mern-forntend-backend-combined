const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  createUser,
  login,
  logout
} = require("../controller/users-controller");

router.get("/", getAllUsers);
router.post("/signup", createUser);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
