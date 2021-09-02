const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true, minlength: 4 },
//   image: { type: String, required: true },
//   places: { type: String, required: true }
// });

// userSchema.plugin(uniqueValidator);

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 4 },
  image: { type: String, required: true },
  places: { type: String, required: true }
});

module.exports = mongoose.model("User", userSchema);
