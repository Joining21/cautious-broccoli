const mongoose = require("mongoose");

let movieSchema = new mongoose.Schema({
  imageURL: {
    type: String,
  },
  title: {
    type: String,
  },
  sinopsis: {
    type: String,
  },
  length: {
    type: Number,
    integer: true
  },
  releaseDate: {
    type: String,
  },
  genre: {
    type: String,
  },
  language: {
    type: String,
  },
});

module.exports = mongoose.model("Movie", movieSchema);
