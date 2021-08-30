const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const placesRoutes = require("./routes/places-routes");
app.use(placesRoutes);

app.listen(5000);
