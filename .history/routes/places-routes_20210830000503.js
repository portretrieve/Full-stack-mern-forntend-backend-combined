const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("Get Request Recieved");
  res.json(["devesh"]);
});

module.exports = router;
