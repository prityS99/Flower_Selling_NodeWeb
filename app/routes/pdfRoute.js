const express = require("express");
const router = express.Router();

const PDFController = require("../controller/PDFController");
const authCheck = require("../middleware/authMiddleware");

router.get(
  "/order/:id/pdf",
  authCheck,
  PDFController.downloadOrderPDF
);

module.exports = router;