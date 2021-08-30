const HttpError = require("../models/http-error");
const uuid = require("uuid");

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

const getPlaceByPlaceId = (req, res, next) => {
  const placeId = req.params.pid; //{pid:"p1"}
  const place = DUMMY_PLACES.find((p) => placeId === p.id);
  if (!place) {
    return next(
      new HttpError(`Could not find place for place id: ${placeId}`, 404)
    );
  }
  res.json({ foundPlace: place });
};

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.filter((p) => p.creator === userId);
  if (places.length === 0) {
    return next(
      new HttpError(`No places found for the given user-id:   ${userId}`, 404)
    );
  }
  res.json({ founPlacesByUserId: places });
};

const createPlace = (req, res, next) => {
  const { title, description, address, creator, coordinates } = req.body;
  const createdPlace = {
    id: uuid.v4(),
    title,
    description,
    location: coordinates,
    address,
    creator
  };

  DUMMY_PLACES.push(createdPlace);
  res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res, next) => {
  const placeId = req.params.pid;

  const placeToEdit = DUMMY_PLACES.map((place) => place.id === placeId);

  const updatePlaceById = {
    ...placeToEdit,
    title: req.params.title,
    description: req.params.description,
    address: req.params.address
  };
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.id;
  const placeToDelete = DUMMY_PLACES.map((place) => place.id === placeId);
  if (placeToDelete) {
    const index = DUMMY_PLACES.indexOf(placeToDelete);
    DUMMY_PLACES.splice(index, 1);
    return res.status(201).json("Delete Successfull");
  } else {
    return next(new HttpError("Place not found", 404));
  }
};

exports.getPlaceByPlaceId = getPlaceByPlaceId;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
