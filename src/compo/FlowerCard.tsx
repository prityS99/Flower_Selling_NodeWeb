"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getFlowers } from '@/services/userServices'; // Fix path if needed
import OrderModal from "./OrderModal";

interface Flower {
    _id: string;
    name: string;
    price: number;
    flowerImage: {
        url: string
    }
}

const handleOrder = (id: string) => {
    console.log("Order flower:", id);

    // Later you can call your order API
    // createOrder({ flowerId: id })
};

export default function FlowerCards() {
    const [selectedFlower, setSelectedFlower] = useState<string | null>(null);
    const [flowers, setFlowers] = useState<Flower[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getFlowers()
            .then((res) => {
                console.log("Flowers:", res.data);
                setFlowers(res.data.data); // <-- correct
                setLoading(false);
            })
            .catch((err) => {
                console.error("❌ Error fetching flowers:", err);
                setLoading(false);
                setFlowers([]);
            });
    }, []);
    if (loading) {
        return <p className="text-center mt-10">Loading flowers...</p>;
    }
return (
    <div className="max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-pink-600">
            🌸 Our Fresh Flowers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {flowers.map((flower) => (
                <motion.div
                    key={flower._id}
                    whileHover={{ scale: 1.07 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer"
                >
                    <div className="overflow-hidden">
                        <img
                            src={flower.flowerImage?.url}
                            alt={flower.name}
                            className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
                        />
                    </div>

                    <div className="p-5 text-center">
                        <h3 className="text-xl font-semibold text-gray-800">
                            {flower.name}
                        </h3>

                        <p className="text-pink-500 font-bold mt-2">
                            ₹{flower.price}
                        </p>

                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            className="mt-4 bg-emerald-600 text-white text-sm font-semibold px-6 py-2.5 rounded-xl shadow-md hover:bg-emerald-700 transition-all"
                            onClick={() => setSelectedFlower(flower._id)}
                        >
                            🌸 Place Order
                        </motion.button>
                    </div>
                </motion.div>
            ))}
        </div>

        {/* Modal outside map */}
        {selectedFlower && (
            <OrderModal
                flowerId={selectedFlower}
                closeModal={() => setSelectedFlower(null)}
            />
        )}
    </div>
);
}