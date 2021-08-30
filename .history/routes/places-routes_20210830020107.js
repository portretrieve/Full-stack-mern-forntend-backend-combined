const express = require("express");
const router = express.Router();

const HttpError = require("../models/http-error");
const findPlaceWithPlaceId = require("../controller/places-controller");

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building-1",
    description: "Empire State Building : Part 1",
    address: "20 W 34th St, New York, NY 10001, United States",
    creator: "u1",
    location: {
      lat: 40.7484405,
      lng: -73.9856644
    }
  },
  {
    id: "p2",
    title: "Empire State Building-2",
    description: "Empire State Building : Part 2",
    address: "20 W 34th St, New York, NY 10001, United States",
    creator: "u2",
    location: {
      lat: 40.7484405,
      lng: -73.9856644
    }
  }
];

router.get("/:pid", findPlaceWithPlaceId);

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.filter((p) => p.creator === userId);
  if (places.length === 0) {
    return next(
      new HttpError(`No places found for the given user-id:   ${userId}`, 404)
    );
  }
  res.json({ founPlacesByUserId: places });
});

module.exports = router;
