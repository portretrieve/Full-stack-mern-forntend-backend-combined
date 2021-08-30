const express = require("express");
const router = express.Router();

const HttpError = require("../models/http-error");
const getPlaceByPlaceId = require("../controller/places-controller");

router.get("/:pid", getPlaceByPlaceId);

router.get("/user/:uid", getPlaceByUserId);

module.exports = router;
