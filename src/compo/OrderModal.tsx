"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { createOrder } from "@/services/userServices";

interface Props {
  flowerId: string;
  flowerName: string;
  flowerPrice: number;
  closeModal: () => void;
}

export default function OrderModal({
  flowerId,
  flowerName,
  flowerPrice,
  closeModal,
}: Props) {

  const [quantity, setQuantity] = useState(1);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [phone, setPhone] = useState("");

  const totalPrice = quantity * flowerPrice;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderData = {
      flowerId,
      quantity,
      deliveryDate,
      deliveryAddress,
      phone,
    };

    try {
      await createOrder(orderData);
      alert("🌸 Order placed successfully!");
      closeModal();
    } catch (error) {
      console.error("Order error:", error);
      alert("Order failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-xl w-[750px] grid grid-cols-2 overflow-hidden"
      >

        {/* LEFT SIDE - ORDER SUMMARY */}

        <div className="bg-pink-50 p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-pink-600 mb-6">
            🌸 Order Summary
          </h2>

          <p className="text-gray-700 mb-3">
            <span className="font-semibold">Flower Name:</span> {flowerName}
          </p>

          <p className="text-gray-700 mb-3">
            <span className="font-semibold">Price per flower:</span> ₹{flowerPrice}
          </p>

          <p className="text-gray-700 mb-3">
            <span className="font-semibold">Quantity:</span> {quantity}
          </p>

          <p className="text-xl font-bold text-pink-600 mt-4">
            Total: ₹{totalPrice}
          </p>
        </div>

        {/* RIGHT SIDE - FORM */}

        <form
          onSubmit={handleSubmit}
          className="p-6 flex flex-col gap-4"
        >

          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Delivery Details
          </h3>

          {/* Quantity Counter */}

          <div>
            <label className="text-sm font-semibold text-gray-600">
              Quantity
            </label>

            <div className="flex items-center gap-3 mt-1">

              <button
                type="button"
                className="bg-gray-200 px-3 py-1 rounded"
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              >
                -
              </button>

              <span className="font-semibold">{quantity}</span>

              <button
                type="button"
                className="bg-gray-200 px-3 py-1 rounded"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>

            </div>
          </div>

          {/* Delivery Date */}

          <div>
            <label className="text-sm font-semibold text-gray-600">
              Delivery Date
            </label>

            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="w-full border rounded-lg p-2 mt-1"
              required
            />
          </div>

          {/* Address */}

          <div>
            <label className="text-sm font-semibold text-gray-600">
              Delivery Address
            </label>

            <textarea
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="w-full border rounded-lg p-2 mt-1"
              placeholder="Enter delivery address"
              required
            />
          </div>

          {/* Phone */}

          <div>
            <label className="text-sm font-semibold text-gray-600">
              Phone Number
            </label>

            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-lg p-2 mt-1"
              placeholder="Enter phone number"
              required
            />
          </div>

          {/* Buttons */}

          <div className="flex gap-3 mt-3">

            <button
              type="submit"
              className="flex-1 bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600"
            >
              Confirm Order 🌸
            </button>

            <button
              type="button"
              onClick={closeModal}
              className="flex-1 bg-gray-200 py-2 rounded-lg"
            >
              Cancel
            </button>

          </div>

        </form>

      </motion.div>
    </div>
  );
}