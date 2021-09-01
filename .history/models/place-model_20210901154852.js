const mongoose = require("mongoose");
const placeSchema = new mongoose.Schema({
  title: { tyepe: String, required: true },
  description: "Empire State Building : Part 1",
  address: "20 W 34th St, New York, NY 10001, United States",
  creator: "u1",
  location: {
    lat: 40.7484405,
    lng: -73.9856644
  }
});
