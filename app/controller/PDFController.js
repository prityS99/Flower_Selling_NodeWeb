const Order = require("../models/order");
const generateOrderPDF = require("../utils/pdfGenerator");

class PDFController {

  async downloadOrderPDF(req, res) {

    try {

      const order = await Order.findById(req.params.id)
        .populate("user")
        .populate("flower");

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found"
        });
      }

      generateOrderPDF(order, res);

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: "Server error"
      });

    }

  }

}

module.exports = new PDFController();