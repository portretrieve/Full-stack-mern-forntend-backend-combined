const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const {
  getAllUsers,
  createUser,
  login
} = require("../controller/users-controller");

router.get("/", getAllUsers);
router.post(
  "/signup",
  [check("name").isLength({ min: 5 }), check("email").isEmail()],
  createUser
);
router.post("/login", login);

module.exports = router;
