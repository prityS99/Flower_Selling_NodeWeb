
"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { getCurrentSession, logInThunk, logoutThunk } from "@/Hooks/Redux/Slices/authSlice";
import { AppDispatch, RootState } from "@/Hooks/Redux/store";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner"; // 1. Import Toast

export default function Login() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const { loading, isAuthenticated, user } = useSelector(
        (state: RootState) => state.auth
    );

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        dispatch(getCurrentSession());
    }, [dispatch]);

    useEffect(() => {
        if (isAuthenticated && user) {
            if (user.role === "admin") {
                router.push("/admin/dashboard");
            } else {
                router.push("/dashboard");
            }
        }
    }, [isAuthenticated, user, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const result = await dispatch(
                logInThunk({ email, password })
            ).unwrap();

            const role = result?.user?.role;
            const name = result?.user?.name || "Admin";

            if (role === "admin") {
                // 2. Trigger Admin Success Toast
                toast.success(`Welcome back, ${name}!`, {
                    icon: '🛡️',
                    duration: 4000,
                });
                router.push("/admin/dashboard");
            } else {
                toast.success(`Welcome, ${name}!`);
                router.push("/dashboard");
            }
        } catch (error: any) {
            // 3. Handle Error Toast
            toast.error(error?.message || "Login failed. Please check your credentials.");
            console.error("Login failed:", error);
        }
    };

    const handleLogout = () => {
        dispatch(logoutThunk());
        toast.success("Logged out successfully");
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center p-6">
            {/* 4. Add the Toaster component to render the popups */}
            <Toaster position="top-center" />

            {/* 🌸 Background Image */}
            <Image
                src="https://images.unsplash.com/photo-1490750967868-88aa4486c946"
                alt="flower background"
                fill
                priority
                className="object-cover blur-sm"
            />

            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative grid md:grid-cols-2 max-w-5xl w-full backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-3xl overflow-hidden">
                {/* LEFT SIDE */}
                <div className="hidden md:flex flex-col items-center justify-center p-10 bg-white/10">
                    <h2 className="text-white text-3xl font-bold text-center">Welcome Back</h2>
                    <p className="text-white/80 text-center mt-4">A garden of flowers awaits you 🌸</p>
                </div>

                {/* RIGHT SIDE */}
                <div className="p-10">
                    <h2 className="text-3xl font-bold text-white mb-6">Login</h2>

                    {isAuthenticated && user ? (
                        <div className="space-y-4 text-white">
                            <p className="text-lg">
                                Welcome <span className="font-bold">{user.name}</span>
                            </p>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-4 py-2 rounded-lg bg-white/30 border border-white/40 placeholder-white text-white focus:outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full px-4 py-2 rounded-lg bg-white/30 border border-white/40 placeholder-white text-white focus:outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-white text-purple-600 font-semibold py-2 rounded-lg hover:bg-purple-100 transition"
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>
                        </form>
                    )}

                    <p className="text-white mt-6 text-sm">
                        Don't have an account?{" "}
                        <Link href="/signup" className="underline">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );

}

