
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },

  flower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "flower"
  },

  quantity: Number,

  deliveryAddress: String,

  deliveryDate: Date,

  totalPrice: Number

}, { timestamps: true });

module.exports = mongoose.model("order", orderSchema);