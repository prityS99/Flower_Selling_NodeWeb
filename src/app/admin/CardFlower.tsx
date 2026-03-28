"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation"; // Added for navigation
import { getFlowers, deleteFlower } from '@/services/userServices'; // Assuming deleteFlower exists
import { RootState } from "@/Hooks/Redux/store";
import { toast } from 'sonner';

interface Flower {
    _id: string;
    name: string;
    price: number;
    flowerImage: {
        url: string
    }
}

export default function CardFlower() {
    const [flowers, setFlowers] = useState<Flower[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedFlower, setSelectedFlower] = useState<string | null>(null);
    
    const router = useRouter();

    // 1. Get user role from Redux
    const { user } = useSelector((state: RootState) => state.auth);
  const storedUser =
  typeof window !== "undefined"
    ? JSON.parse(sessionStorage.getItem("user") || "null")
    : null;

const isAdmin = user?.role === "admin" || storedUser?.role === "admin";

    useEffect(() => {
        fetchFlowers();
    }, []);

    const fetchFlowers = async () => {
        try {
            const res = await getFlowers();
            setFlowers(res.data.data);
        } catch (err) {
            console.error("❌ Error fetching flowers:", err);
            toast.error("Failed to load flowers");
        } finally {
            setLoading(false);
        }
    };

    // 2. Admin Handlers
    const handleEdit = (id: string) => {
        // Navigates to your admin edit page (e.g., /admin/edit-flower/[id])
        router.push(`/admin/flowers/edit/${id}`);
    };

    const handleDelete = async (id: string) => {
        // Using a toast promise for a better UX than a simple window.confirm
        const confirmDelete = window.confirm("Are you sure you want to delete this flower?");
        
        if (confirmDelete) {
            try {
                // Perform the actual API call
                await deleteFlower(id); 
                
                // Update local state so the UI reflects the deletion immediately
                setFlowers((prev) => prev.filter(f => f._id !== id));
                toast.success("Flower removed from inventory");
            } catch (error) {
                console.error("Delete error:", error);
                toast.error("Failed to delete the flower. Please try again.");
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-12 px-6">
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-bold text-pink-600">
                    {isAdmin ? "🛠️ Manage Flower Inventory" : "🌸 Our Fresh Flowers"}
                </h2>
                {/* {isAdmin && (
                    <button 
                        onClick={() => router.push('/admin/flowers/add')}
                        className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition"
                    >
                        + Add New Flower
                    </button>
                )} */}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {flowers.map((flower) => (
                    <motion.div
                        key={flower._id}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden group border border-gray-100 flex flex-col"
                    >
                        {/* Image Section */}
                        <div className="overflow-hidden relative h-56">
                            <img
                                src={flower.flowerImage?.url}
                                alt={flower.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                            />
                            {isAdmin && (
                                <span className="absolute top-2 left-2 bg-white/90 text-gray-700 text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                                    ID: {flower._id.slice(-6)}
                                </span>
                            )}
                        </div>

                        {/* Content Section */}
                        <div className="p-5 flex flex-col flex-grow">
                            <h3 className="text-xl font-semibold text-gray-800 truncate">
                                {flower.name}
                            </h3>
                            <p className="text-pink-500 font-bold mt-1 text-lg">
                                ₹{flower.price}
                            </p>

                            <div className="mt-auto pt-4">
                                {isAdmin ? (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(flower._id)}
                                            className="flex-1 bg-indigo-50 text-indigo-600 border border-indigo-200 text-sm font-bold py-2 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors flex items-center justify-center gap-1"
                                        >
                                            <span>📝</span> Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(flower._id)}
                                            className="flex-1 bg-red-50 text-red-600 border border-red-200 text-sm font-bold py-2 rounded-lg hover:bg-red-600 hover:text-white transition-colors flex items-center justify-center gap-1"
                                        >
                                            <span>🗑️</span> Delete
                                        </button>
                                    </div>
                                ) : (
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full bg-emerald-600 text-white text-sm font-semibold py-2.5 rounded-xl shadow-md hover:bg-emerald-700 transition-all"
                                        onClick={() => setSelectedFlower(flower._id)}
                                    >
                                        🌸 Place Order
                                    </motion.button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}