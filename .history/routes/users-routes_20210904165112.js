const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const {
  getAllUsers,
  createUser,
  login
} = require("../controller/users-controller");
const fileUpload = require("../middleware/file-upload");

router.get("/", getAllUsers);
router.post(
  "/signup",
  fileUpload.single("image"),
  [
    (check("name").isLength({ min: 5 }),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 4 }))
  ],
  createUser
);
router.post("/login", login);

module.exports = router;
