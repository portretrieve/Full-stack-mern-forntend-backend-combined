const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const HttpError = require("../models/http-error");
const {
  getPlaceByPlaceId,
  getPlaceByUserId,
  createPlace,
  updatePlace,
  deletePlace
} = require("../controller/places-controller");

router.get("/:pid", getPlaceByPlaceId);

router.get("/user/:uid", getPlaceByUserId);

router.post(
  "/",
  [
    check("title").isLength({ min: 3 }),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty()
  ],
  createPlace
);

router.patch("/:pid", updatePlace);

router.delete("/:pid", deletePlace);

module.exports = router;
