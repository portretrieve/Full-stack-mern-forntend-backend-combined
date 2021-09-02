const HttpError = require("../models/http-error");
const uuid = require("uuid");
const { validationResult } = require("express-validator");
const getCoordsForAddress = require("../util/location");
const Place = require("../models/place-model");
const User = require("../models/user-model");

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

  let user;

  try {
    user = user.findById(creator);
  } catch (error) {
    return next(new HttpError("Creating Place failed. Try again", 500));
  }

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

const updatePlace = async (req, res, next) => {
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
      new HttpError(
        "Something wrong. Could not retrieve the place to edit!",
        500
      )
    );
  }

  place.title = req.body.title;
  place.description = req.body.description;

  try {
    await place.save();
  } catch (error) {
    return next(
      new HttpError("Something went wrong could not update place", 500)
    );
  }

  res.status(200).json({ updatedPlace: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;

  try {
    place = await Place.findById(placeId);
  } catch (error) {
    return next(new HttpError("Could not delete. Please try again", 500));
  }

  if (!place) {
    return next(
      new HttpError("No such place was found to delete for that id", 404)
    );
  }
  try {
    await place.remove();
  } catch (error) {
    return next(new HttpError("Could not delete. Please try again", 404));
  }

  res.status(200).json({ deletedPlace: place.toObject({ getters: true }) });
};

exports.getPlaceByPlaceId = getPlaceByPlaceId;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
