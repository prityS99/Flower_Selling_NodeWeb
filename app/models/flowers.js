const mongoose = require("mongoose");
const { url } = require("../config/cloudinary");

const flowerSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  price: {
    type: String,
    required: true
  },

  description: String,

  flowerImage: 
  {url:String},

  stock: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

module.exports = mongoose.model("flower", flowerSchema);