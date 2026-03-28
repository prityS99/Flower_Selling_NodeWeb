"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getFlowerById, updateFlower } from "@/services/userServices"; 
import { toast } from "sonner";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";

export default function EditFlowerPage() {
    const params = useParams();
const id = params?.id as string;
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        stock: 0,
    });
    const [imagePreview, setImagePreview] = useState("");
    const [newImage, setNewImage] = useState<File | null>(null);


 

    // Fetch existing flower data
    useEffect(() => {
        if (id) {
            getFlowerById(id as string)
                .then((res) => {
                    const flower = res.data.data;
                    setFormData({
                        name: flower.name,
                        price: flower.price,
                        description: flower.description || "",
                        stock: flower.stock || 0,
                    });
                    setImagePreview(flower.flowerImage?.url || "");
                    setLoading(false);
                })
                .catch(() => {
                    toast.error("Failed to load flower data");
                    router.push("/admin/dashboard");
                });
        }
    }, [id, router]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setNewImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdating(true);

        const data = new FormData();
        data.append("name", formData.name);
        data.append("price", formData.price);
        data.append("description", formData.description);
        data.append("stock", formData.stock.toString());
        if (newImage) data.append("flowerImage", newImage);

        try {
            await updateFlower(id as string, data);
            toast.success("Flower updated successfully!");
            router.push("/admin/dashboard");
        } catch (error) {
            toast.error("Update failed. Please try again.");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return (
        <div className="flex h-screen items-center justify-center">
            <Loader2 className="animate-spin text-pink-500" size={40} />
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto p-6">
            <button 
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-500 hover:text-pink-600 mb-6 transition"
            >
                <ArrowLeft size={20} /> Back to Dashboard
            </button>

            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">Edit Flower Details</h2>
                
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Side: Image Upload */}
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700">Flower Image</label>
                        <div className="relative group h-64 w-full bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 overflow-hidden flex items-center justify-center">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <Upload className="text-gray-300" size={40} />
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                <label className="cursor-pointer bg-white px-4 py-2 rounded-lg text-sm font-bold text-gray-700">
                                    Change Image
                                    <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form Fields */}
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-semibold text-gray-600">Flower Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none"
                                required
                            />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-semibold text-gray-600">Price (₹)</label>
                                <input
                                    type="text"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-600">Stock</label>
                                <input
                                    type="number"
                                    value={formData.stock}
                                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                                    className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-600">Description</label>
                            <textarea
                                rows={4}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={updating}
                            className="w-full bg-pink-600 text-white font-bold py-4 rounded-xl hover:bg-pink-700 transition-all flex items-center justify-center gap-2"
                        >
                            {updating ? <Loader2 className="animate-spin" size={20} /> : "Update Flower"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}