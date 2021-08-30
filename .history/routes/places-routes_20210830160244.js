const express = require("express");
const router = express.Router();

const HttpError = require("../models/http-error");
const {
  getPlaceByPlaceId,
  getPlaceByUserId,
  createPlace,
  editPlace
} = require("../controller/places-controller");

router.get("/:pid", getPlaceByPlaceId);

router.get("/user/:uid", getPlaceByUserId);

router.post("/", createPlace);

router.post("/:pid", editPlace);

module.exports = router;
