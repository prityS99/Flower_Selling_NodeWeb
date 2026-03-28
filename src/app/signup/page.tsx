"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";   // ✅ import router
import { AppDispatch, RootState } from "@/Hooks/Redux/store";
import { signUpThunk } from "@/Hooks/Redux/Slices/authSlice";

export default function Signup() {

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const { loading } = useSelector(
        (state: RootState) => state.auth
    );

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await dispatch(
                signUpThunk({
                    name,
                    email,
                    password,
                })
            ).unwrap();

            router.push("/login");

        } catch (error) {
            console.error("Signup failed", error);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center p-6">

            {/* 🌸 Background Image */}
            <Image
                src="https://images.unsplash.com/photo-1457089328109-e5d9bd499191?fm=jpg&q=60&w=3000"
                alt="flower background"
                fill
                priority
                className="object-cover blur-sm"
            />

            {/* 🌙 Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* 🌿 Glass Card */}
            <div className="relative grid md:grid-cols-2 max-w-5xl w-full backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-3xl overflow-hidden">

                {/* LEFT SIDE */}
                <div className="hidden md:flex flex-col items-center justify-center p-10 bg-white/10">
                    <h2 className="text-white text-3xl font-bold text-center">
                        Join Our Garden
                    </h2>

                    <p className="text-white/80 text-center mt-4">
                        Create your flower account and explore the beauty of nature 🌷
                    </p>
                </div>

                {/* RIGHT SIDE */}
                <div className="p-10">

                    <h2 className="text-3xl font-bold text-white mb-6">
                        Sign Up
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full px-4 py-2 rounded-lg bg-white/30 border border-white/40 placeholder-white text-white focus:outline-none"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

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
                            {loading ? "Creating..." : "Create Account"}
                        </button>

                    </form>

                    <p className="text-white mt-6 text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="underline">
                            Login
                        </Link>
                    </p>

                </div>

            </div>

        </div>
    );
}