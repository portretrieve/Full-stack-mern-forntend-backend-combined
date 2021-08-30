const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({ User: "This is an user" });
});

module.exports = router;
