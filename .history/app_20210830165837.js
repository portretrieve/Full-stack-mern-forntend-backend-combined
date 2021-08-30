const express = require("express");
const app = express();

const placesRoutes = require("./routes/places-routes");
const userRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use("/api/places", placesRoutes);
app.use("/api/users", userRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  next(error);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

app.listen(5000);
