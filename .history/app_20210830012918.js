const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const placesRoutes = require("./routes/places-routes");
app.use("/api/places", placesRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
});

app.listen(5000);
