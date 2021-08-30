const express = require("express");
const router = express.Router();

const HttpError = require("../models/http-error");
const {
  getPlaceByPlaceId,
  getPlaceByUserId,
  createPlace,
  updatePlaceById,
  deletePlaceById
} = require("../controller/places-controller");

router.get("/:pid", getPlaceByPlaceId);

router.get("/user/:uid", getPlaceByUserId);

router.post("/", createPlace);

router.patch("/:pid", updatePlaceById);

router.delete("/:pid", deletePlaceById);

module.exports = router;
