const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({

  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order"
  },

  status: {
    type: String,
    enum: ["pending", "shipped", "delivered"],
    default: "pending"
  }

});

module.exports = mongoose.model("delivery", deliverySchema);