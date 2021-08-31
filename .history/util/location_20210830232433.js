const axios = require("axios");

const API_KEY = "AIzaSyB7LOLr5jC4VresY31g3ZO1XTg3mwwDDe4";

async function getCoordsForAddress(address) {
  //   return {
  //     lat: 40.7484405,
  //     lng: -73.9856644
  //   };

  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );

  const data = response.data;
  if (!data || data.status === "ZERO_RESULTS") {
  }
}
