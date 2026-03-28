const express = require("express");
const router = express.Router();
const FlowerController = require("../controller/flowerController");
const authCheck = require("../middleware/authMiddleware");
const roleCheck = require("../middleware/roleCheck");
const upload = require("../middleware/upload");

router.post(
  "/create",
  authCheck,
  roleCheck("admin"),
  upload.single("flowerImage"),
  FlowerController.createFlower,
);


// GET //
router.get("/", FlowerController.getFlowers);

//SINGLE FLOWER//
router.get("/:id", FlowerController.getFlowerById);

// UPDATE //
router.put(
  "/:id",authCheck,roleCheck("admin"),upload.single("flowerImage"),
  FlowerController.updateFlower,
);

router.delete(
  "/:id",authCheck,roleCheck("admin"),
  FlowerController.deleteFlower,
);

module.exports = router;
