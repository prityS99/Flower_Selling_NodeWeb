const Order = require("../models/order");
const Flower = require("../models/flowers")
const mongoose = require("mongoose");
const { OrderValidation } = require("../utils/joiValidations");

class OrderController {
  // GET ALL ORDERS
  async getOrders(req, res) {
    try {
      const orders = await Order.find()
        .populate("user", "name email")
        .populate("flower", "name price image")
        .sort("-createdAt");

      res.status(200).json({
        success: true,
        count: orders.length,
        data: orders,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  }

  // GET SINGLE ORDER
  async getOrder(req, res) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid order ID",
        });
      }

      const order = await Order.findById(req.params.id)
        .populate("user", "name email")
        .populate("flower", "name price image");

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      res.status(200).json({
        success: true,
        data: order,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  }

  // CREATE ORDER

  async createOrder(req, res) {
    try {
      const { error, value } = OrderValidation.validate(req.body);

      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
        });
      }

      const { flowerId, quantity, deliveryAddress, deliveryDate, phone } =
        value;

      if (!mongoose.Types.ObjectId.isValid(flowerId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid flower ID",
        });
      }

      const flower = await Flower.findById(flowerId);

      if (!flower) {
        return res.status(404).json({
          success: false,
          message: "Flower not found",
        });
      }

const flowerPrice = parseFloat(flower.price.replace(/[^\d.]/g, '')) || 0;

if (isNaN(flowerPrice) || flowerPrice <= 0) {
  return res.status(400).json({
    success: false,
    message: "Flower has invalid price",
  });
}

if (flower.stock < quantity) {
  return res.status(400).json({
    success: false,
    message: "Not enough stock",
  });
}

const totalPrice = flowerPrice * quantity;  

      const userId = req.user._id;

      const order = await Order.create({
        user: userId,
        flower: flowerId,
        quantity,
        deliveryAddress,
        deliveryDate,
        phone,
        totalPrice,
      });

      // Reduce stock
      flower.stock -= quantity;
      await flower.save();

      const populatedOrder = await Order.findById(order._id)
        .populate("user", "name email")
        .populate("flower", "name price image");

      res.status(201).json({
        success: true,
        data: populatedOrder,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: error.message,
      });
    }
  }

  // UPDATE ORDER
  async updateOrder(req, res) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid order ID",
        });
      }

      const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      })
        .populate("user", "name email")
        .populate("flower", "name price image");

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      res.status(200).json({
        success: true,
        data: order,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // DELETE ORDER
  async deleteOrder(req, res) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid order ID",
        });
      }

      const order = await Order.findByIdAndDelete(req.params.id);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Order deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  }
}

module.exports = new OrderController();
