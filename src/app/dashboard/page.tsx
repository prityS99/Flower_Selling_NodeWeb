"use client";

import { Swiper, SwiperSlide } from "swiper/react";
// 1. Added Navigation to modules import
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
// 2. Added Navigation CSS
import "swiper/css/navigation";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/Hooks/Redux/store";
import FlowerCards from "@/compo/FlowerCard";
import Reviews from "@/compo/Review";

import banner1 from "../../../assests/banner-1.jpg"
import banner2 from "../../../assests/banner-2.jpg"
import banner3 from "../../../assests/banner-3.jpg"


export default function Dashboard() {

    const router = useRouter();

    const { isAuthenticated } = useSelector(
        (state: RootState) => state.auth
    );

    const banners = [
        {
            id: 1,
            image: banner1,
            title: "Fresh Flowers Delivered",
            subtitle: "Brighten someone's day with beautiful flowers",
        },
        {
            id: 2,
            image: banner2,
            title: "Elegant Bouquets",
            subtitle: "Perfect flowers for every occasion",
        },
        {
            id: 3,
            image: banner3,
            title: "Luxury Flower Collection",
            subtitle: "Handpicked flowers from the best gardens",
        },
    ];

    return (
        <div className="w-full min-h-screen">

            <Swiper
                // 3. Include Navigation in modules array
                modules={[Autoplay, Pagination, Navigation]}
                // 4. Decreased time from 4000 to 3000
                autoplay={{ delay: 3000 }} 
                pagination={{ clickable: true }}
                // 5. Added navigation prop for arrows
                navigation={true}
                loop
                className="h-screen"
            >
                {banners.map((banner) => (
                    <SwiperSlide key={banner.id}>

                        <div
                            className="relative w-full h-screen bg-cover bg-center"
                            style={{ backgroundImage: `url(${banner.image.src})` }}
                        >

                            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-6">

                                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                                    {banner.title}
                                </h1>

                                <p className="text-lg md:text-xl mb-8">
                                    {banner.subtitle}
                                </p>

                                <button
                                    onClick={() => {
                                        if (isAuthenticated) {
                                            router.push("/dashboard");
                                        } else {
                                            router.push("/signup");
                                        }
                                    }}
                                    className="px-8 py-3 bg-pink-500 hover:bg-pink-600 rounded-full text-white font-semibold transition"
                                >
                                    Explore Flowers
                                </button>

                            </div>

                        </div>

                    </SwiperSlide>
                ))}
            </Swiper>

            <FlowerCards />
            <Reviews />

        </div>
    );
}