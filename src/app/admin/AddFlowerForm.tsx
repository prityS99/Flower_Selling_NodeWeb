"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Upload, Flower2 } from "lucide-react";
import { toast } from "sonner";

export default function AddFlowerForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    stock: ""
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("stock", formData.stock);

    if (image) {
      data.append("flowerImage", image);
    }

    try {
      // Example API call
      // await axios.post("/api/flowers/add", data)

      toast.success("New flower added to the garden 🌸");

      setIsOpen(false);
      setFormData({
        name: "",
        price: "",
        description: "",
        stock: ""
      });

      setImage(null);
      setPreview(null);

    } catch (error) {
      toast.error("Failed to add flower. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-10 flex justify-center">
      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-pink-600 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-pink-700 transition"
        >
          <Plus size={20} /> Add New Flower
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-2xl bg-white border border-pink-100 p-8 rounded-3xl shadow-2xl relative"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-pink-400 hover:text-pink-600 transition"
            >
              <X size={24} />
            </button>

            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Flower2 className="text-pink-500" /> New Flower Details
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Name + Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600">
                    Flower Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 outline-none"
                    placeholder="Midnight Rose"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 outline-none"
                    placeholder="499"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Stock */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 outline-none"
                  placeholder="20"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600">
                  Description
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 outline-none"
                  placeholder="Beautiful fragrant flower perfect for gifts..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600">
                  Flower Photo
                </label>

                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-pink-200 rounded-2xl cursor-pointer bg-pink-50 hover:bg-pink-100 transition">

                  {preview ? (
                    <img
                      src={preview}
                      className="h-full w-full object-cover rounded-2xl"
                    />
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="text-pink-500 mb-2" />
                      <p className="text-sm text-pink-500">
                        Click to upload flower image
                      </p>
                    </div>
                  )}

                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-pink-600 text-white font-bold py-4 rounded-xl hover:bg-pink-700 transition"
              >
                {loading ? "Planting Flower..." : "Add to Shop"}
              </button>

            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}