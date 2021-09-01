const HttpError = require("../models/http-error");
const uuid = require("uuid");
const { validationResult } = require("express-validator");
const getCoordsForAddress = require("../util/location");
const Place = require("../models/place-model");

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid Data entered. Please check your data", 422)
    );
  }

  const { title, description, address, creator } = req.body;
  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    location: coordinates,
    address,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/399px-Empire_State_Building_%28aerial_view%29.jpg",
    creator
  });
  try {
    await createdPlace.save();
  } catch (error) {
    return next(new HttpError("Creating place failed, try again!", 500));
  }
  res.status(201).json({ place: createdPlace });
};

const getPlaceByPlaceId = async (req, res, next) => {
  const placeId = req.params.pid; //{pid:"p1"}
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (error) {
    return next(
      new HttpError("Something wrong. Could not retrieve the place!", 500)
    );
  }
  if (!place) {
    return next(
      new HttpError(`Could not find place for place id: ${placeId}`, 404)
    );
  }
  res.json({ foundPlace: place.toObject({ getters: true }) });
};

const getPlaceByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let places;

  try {
    places = await Place.find({ creator: userId });
  } catch (error) {
    return next(new HttpError("Fetching places failed. Try again later", 500));
  }
  if (!places || places.length === 0) {
    return next(
      new HttpError(`No places found for the given user-id:   ${userId}`, 404)
    );
  }
  res.json({
    founPlacesByUserId: places.map((place) => place.toObject({ getters: true }))
  });
};

const updatePlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid Data used to edit. Please check your data", 422)
    );
  }

  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (error) {
    return next(
      new HttpError("Something wrong. Could not retrieve the place!", 500)
    );
  }

  const placeToEdit = DUMMY_PLACES.find((place) => place.id === placeId);
  const placeIndex = DUMMY_PLACES.indexOf(placeToEdit);

  const updatedPlace = {
    ...placeToEdit,
    title: req.body.title,
    description: req.body.description
  };

  res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;

  const foundPlace = DUMMY_PLACES.find((place) => place.id === placeId);
  if (!foundPlace) {
    return next(
      new HttpError("No such place was found to delete for that id", 404)
    );
  }
  DUMMY_PLACES = DUMMY_PLACES.filter((place) => place.id !== placeId);
  res.status(200).json({ remainingPlaces: DUMMY_PLACES });
};

exports.getPlaceByPlaceId = getPlaceByPlaceId;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
