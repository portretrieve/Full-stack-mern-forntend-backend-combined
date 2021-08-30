const HttpError = require("../models/http-error");

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

const findPlaceWithPlaceId = (req, res, next) => {
  const placeId = req.params.pid; //{pid:"p1"}
  const place = DUMMY_PLACES.find((p) => placeId === p.id);
  if (!place) {
    return next(
      new HttpError(`Could not find place for place id: ${placeId}`, 404)
    );
  }
  res.json({ foundPlace: place });
};

module.exports = findPlaceWithPlaceId;
