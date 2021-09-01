const mongoose = require("mongoose");
const placeSchema = new mongoose.Schema({
  title: { tyepe: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  address: { type: String, required: true },
  creator: {},
  location: {
    lat: { type: Number, required: true },
    lng: -73.9856644
  }
});
