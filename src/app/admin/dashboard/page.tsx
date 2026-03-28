"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/Hooks/Redux/store";
import { Flower2, LayoutDashboard, ShoppingBag, Users, LogOut, TrendingUp, Package } from "lucide-react";
import { toast } from "sonner";
import AddFlowerForm from "../AddFlowerForm";
import CardFlower from "../CardFlower";

export default function Dashboard() {
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("flowers");

    // Check authorization and restore from sessionStorage
    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        const token = sessionStorage.getItem("token");

        if (!token || !storedUser || storedUser === "undefined") {
            toast.error("Unauthorized access");
            router.push("/login");
            return;
        }

        try {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser.role !== "admin") {
                toast.error("Unauthorized access");
                router.push("/login");
            }
        } catch (err) {
            console.error("Failed to parse session user", err);
            sessionStorage.clear();
            router.push("/login");
        }
    }, [router]);

    const stats = [
        { label: "Total Flowers", value: "48", icon: Flower2, color: "text-pink-500" },
        { label: "Total Orders", value: "152", icon: ShoppingBag, color: "text-emerald-500" },
        { label: "Customers", value: "89", icon: Users, color: "text-blue-500" },
        { label: "Revenue", value: "₹45,200", icon: TrendingUp, color: "text-purple-500" },
    ];

    return (
        <div className="min-h-screen flex bg-gray-50 mt-16">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-pink-600 flex items-center gap-2">
                        <Package /> FloraAdmin
                    </h1>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <button onClick={() => setActiveTab("dashboard")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === "dashboard" ? "bg-pink-50 text-pink-600" : "text-gray-500 hover:bg-gray-100"}`}>
                        <LayoutDashboard size={20} /> Dashboard
                    </button>
                    <button onClick={() => setActiveTab("flowers")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === "flowers" ? "bg-pink-50 text-pink-600" : "text-gray-500 hover:bg-gray-100"}`}>
                        <Flower2 size={20} /> Manage Flowers
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-100 transition">
                        <ShoppingBag size={20} /> Orders
                    </button>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition" onClick={() => { sessionStorage.clear(); router.push("/login"); }}>
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
                    <h2 className="text-xl font-semibold text-gray-800 capitalize">{activeTab.replace("-", " ")}</h2>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-sm font-bold text-gray-900">{user?.name}</p>
                            <p className="text-xs text-gray-500 uppercase">{user?.role}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold">
                            {user?.name?.charAt(0)}
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        {stats.map((item, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-3 rounded-xl bg-gray-50 ${item.color}`}>
                                        <item.icon size={24} />
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm">{item.label}</p>
                                <h3 className="text-2xl font-bold text-gray-900">{item.value}</h3>
                            </div>
                        ))}
                    </div>

                    {activeTab === "flowers" ? (
                        <div className="space-y-8 text-pink-600 font-medium text-center bg-pink-50 rounded-3xl ">
                            <AddFlowerForm />

                            <div className="bg-pink-50 rounded-3xl shadow-sm border border-pink-100 p-6">
                                <p className="text-pink-600 font-medium text-center">
                                    New Flower Entry Section
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white p-20 rounded-3xl text-center border border-dashed border-gray-300">
                            <p className="text-gray-400">Dashboard analytics coming soon...</p>
                        </div>
                    )}
                    <CardFlower />
                </div>
            </main>
        </div>
    );
}


