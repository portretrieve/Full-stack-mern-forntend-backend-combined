const express = require("express");
const router = express.Router();

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

router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid; //{pid:"p1"}
  const place = DUMMY_PLACES.find((p) => placeId === p.id);
  if (!place) {
    const error = new Error("Could not find place for place id:  " + placeId);
    error.code = 404;
    next(error);
  }
  res.json({ foundPlace: place });
});

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.filter((p) => p.creator === userId);
  if (places.length === 0) {
    const error = new Error("No places found for the given user-id: " + userId);
    error.code = 404;
    next(error);
  }
  res.json({ founPlacesByUserId: places });
});

module.exports = router;
