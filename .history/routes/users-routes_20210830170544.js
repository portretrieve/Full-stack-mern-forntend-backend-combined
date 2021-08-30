const express = require("express");
const router = express.Router();

const { getAllUsers } = require("../controller/users-controller");

router.get("/", getAllUsers);

module.exports = router;
