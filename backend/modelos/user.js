const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default:false
  }, 
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  phoneNumber: {
    type: String,
    unique: true,
  },
  biography: {
    type: String,
  },
  profilePic: {
    type: String,
  },
  seriesList: [
    {
      serie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Serie",
      },
      seen: {
        type: Boolean,
        default: false,
      },
      toWatch: {
        type: Boolean,
        default: false,
      },
      favourite: {
        type: Boolean,
        default: false,
      },
      score: {
        type: Number,
        integer: true,
        default: 0,
      },
    },
  ],
  moviesList: [
    {
      movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
      },
      seen: {
        type: Boolean,
        default: false,
      },
      toWatch: {
        type: Boolean,
        default: false,
      },
      favourite: {
        type: Boolean,
        default: false,
      },
    },
  ],
  
 
});

module.exports = mongoose.model("User", userSchema);
