const cloudinary = require("../config/cloudinary");
const Flower = require("../models/flowers");
const { FlowerValidation } = require("../utils/joiValidations");

class FlowerController {
  // CREATE //

  async createFlower(req, res) {
    try {
      const { error, value } = FlowerValidation.validate(req.body);

      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
        });
      }
      const { name, price, description, stock } = value;

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Flower image is required",
        });
      }

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "flowers",
      });
      const imageUrl = result.secure_url;
      const existFlower = await Flower.findOne({ name });

      if (existFlower) {
        return res.status(400).json({
          success: false,
          message: "Flower is already exist",
        });
      }
      const flowerData = new Flower({
        name,
        price,
        description,
        stock,
        flowerImage: {
          url: imageUrl,
        },
      });
      const data = await flowerData.save();

      return res.status(201).json({
        success: true,
        message: "Flower is created successfully",
        data,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        message: error.message,
        message: "Server error",
      });
    }
  }

  // GET //

  async getFlowers(req, res) {
    try {
      const flowers = await Flower.find().sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        count: flowers.length,
        data: flowers,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }

  // GET FLOWER BY ID
  async getFlowerById(req, res) {
    try {
      const flower = await Flower.findById(req.params.id);

      if (!flower) {
        return res.status(404).json({
          success: false,
          message: "Flower not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: flower,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }

  // UPDATE FLOWER
  async updateFlower(req, res) {
    try {
      const flower = await Flower.findById(req.params.id);

      if (!flower) {
        return res.status(404).json({
          success: false,
          message: "Flower not found",
        });
      }

      let imageUrl = flower.flowerImage?.url;
      let public_id = flower.flowerImage?.public_id;

      if (req.file) {
        if (public_id) {
          await cloudinary.uploader.destroy(public_id);
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "flowers",
        });

        imageUrl = result.secure_url;
        public_id = result.public_id;
      }

      flower.name = req.body.name || flower.name;
      flower.price = req.body.price || flower.price;
      flower.description = req.body.description || flower.description;
      flower.stock = req.body.stock || flower.stock;

      flower.flowerImage = {
        url: imageUrl,
        public_id: public_id,
      };

      const updatedFlower = await flower.save();

      return res.status(200).json({
        success: true,
        message: "Flower updated successfully",
        data: updatedFlower,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }

  // DELETE FLOWER
  async deleteFlower(req, res) {
    try {
      const flower = await Flower.findById(req.params.id);

      if (!flower) {
        return res.status(404).json({
          success: false,
          message: "Flower not found",
        });
      }

      if (flower.flowerImage?.public_id) {
        await cloudinary.uploader.destroy(flower.flowerImage.public_id);
      }

      await flower.deleteOne();

      return res.status(200).json({
        success: true,
        message: "Flower deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }
}

module.exports = new FlowerController();
