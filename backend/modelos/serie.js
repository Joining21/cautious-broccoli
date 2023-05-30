const mongoose = require("mongoose");

let serieSchema = new mongoose.Schema({
  imageURL: {
    type: String,
  },
  title: {
    type: String,
  },
  sinopsis: {
    type: String,
  },
  genre: {
    type: String,
  },
  language: {
    type: String,
  },
  seasons: {
    type: Number,
    integer: true
  },
});

module.exports = mongoose.model("Serie", serieSchema);
