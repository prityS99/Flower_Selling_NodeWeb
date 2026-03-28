const express = require("express");
const router = express.Router();
const authCheck = require("../middleware/authMiddleware");
const roleCheck = require("../middleware/roleCheck");
const orderController = require("../controller/orderController");

// GET ALL ORDERS (Admin)
router.get(
  "/",
  authCheck,
  roleCheck("admin"),
  orderController.getOrders
);

// GET SINGLE ORDER
router.get(
  "/:id",
  authCheck,
  orderController.getOrder
);

// CREATE ORDER
router.post(
  "/create",
  authCheck,
  roleCheck("user", "manager", "admin"),
  orderController.createOrder
);

// UPDATE ORDER
router.put(
  "/:id",
  authCheck,
  roleCheck("admin"),
  orderController.updateOrder
);

// DELETE ORDER
router.delete(
  "/:id",
  authCheck,
  roleCheck("admin"),
  orderController.deleteOrder
);

module.exports = router;