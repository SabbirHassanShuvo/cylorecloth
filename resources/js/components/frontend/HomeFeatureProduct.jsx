import { FaRegHeart } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import { FaRegEye } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css/free-mode';
import "animate.css";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import NewCollection from "../../assets/image/new.jpg";
import { Link } from "@inertiajs/react";
const HomeFeatureProduct = () => {
    return (
        <>
            <div className="max-w-7xl mx-auto p-6 my-8">
                {/* Section Header */}
                <div className="text-center mb-4">
                    <h2 className="text-4xl font-bold mb-4 capitalize">feature product</h2>
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">SPRING 2025</span>
                </div>

                {/* Swiper Carousel */}
                <Swiper
                    spaceBetween={30}
                    freeMode={true}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    modules={[FreeMode]}
                    className="mySwiper"
                >
                    {/* Slide 1 */}
                    <SwiperSlide>
                        <div className="py-9">
                            <div className="hover_content relative group w-[300px] mx-auto">
                                {/* Product Image */}
                                <img
                                    src={NewCollection}
                                    alt="Kurti"
                                    className="w-full h-auto transition-transform transform group-hover:scale-105"
                                />

                                {/* Wishlist Icon */}
                                <Link
                                    href="/wishlist"
                                    className="absolute top-2 right-2 text-gray-500 text-2xl cursor-pointer group-hover:opacity-100 opacity-0 transition-opacity duration-300 z-30"
                                >
                                    <FaRegHeart />
                                </Link>

                                {/* Hover Effect: Icons with Background & Padding */}
                                <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                                    <div className="flex gap-4 p-3 bg-white rounded-lg shadow-lg mr-3">
                                        <a href="#cart" className="text-black text-xl cursor-pointer hover:scale-110 transition-all">
                                            <GiShoppingCart />
                                        </a>
                                    </div>
                                    <div className="flex gap-4 p-3 bg-white rounded-lg shadow-lg">
                                        <a href="#view" className="text-black text-xl cursor-pointer hover:scale-110 transition-all">
                                            <FaRegEye />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Product Title - Clickable */}
                            <a
                                href="#"
                                className="block text-center font-semibold hover:text-red-500 transition-all cursor-pointer mt-7"
                            >
                                WOMENS WOVEN LONG KURTI
                            </a>

                            {/* Product Price - Clickable */}
                            <p className="text-center text-gray-600 mt-2">৳ 2350</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="py-9">
                            <div className="hover_content relative group w-[300px] mx-auto">
                                {/* Product Image */}
                                <img
                                    src={NewCollection}
                                    alt="Kurti"
                                    className="w-full h-auto transition-transform transform group-hover:scale-105"
                                />

                                {/* Wishlist Icon */}
                                <Link
                                    href="/wishlist"
                                    className="absolute top-2 right-2 text-gray-500 text-2xl cursor-pointer group-hover:opacity-100 opacity-0 transition-opacity duration-300 z-30"
                                >
                                    <FaRegHeart />
                                </Link>

                                {/* Hover Effect: Icons with Background & Padding */}
                                <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                                    <div className="flex gap-4 p-3 bg-white rounded-lg shadow-lg mr-3">
                                        <a href="#cart" className="text-black text-xl cursor-pointer hover:scale-110 transition-all">
                                            <GiShoppingCart />
                                        </a>
                                    </div>
                                    <div className="flex gap-4 p-3 bg-white rounded-lg shadow-lg">
                                        <a href="#view" className="text-black text-xl cursor-pointer hover:scale-110 transition-all">
                                            <FaRegEye />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Product Title - Clickable */}
                            <a
                                href="#"
                                className="block text-center font-semibold hover:text-red-500 transition-all cursor-pointer mt-7"
                            >
                                WOMENS WOVEN LONG KURTI
                            </a>

                            {/* Product Price - Clickable */}
                            <p className="text-center text-gray-600 mt-2">৳ 2350</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="py-9">
                            <div className="hover_content relative group w-[300px] mx-auto">
                                {/* Product Image */}
                                <img
                                    src={NewCollection}
                                    alt="Kurti"
                                    className="w-full h-auto transition-transform transform group-hover:scale-105"
                                />

                                {/* Wishlist Icon */}
                                <Link
                                    href="/wishlist"
                                    className="absolute top-2 right-2 text-gray-500 text-2xl cursor-pointer group-hover:opacity-100 opacity-0 transition-opacity duration-300 z-30"
                                >
                                    <FaRegHeart />
                                </Link>

                                {/* Hover Effect: Icons with Background & Padding */}
                                <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                                    <div className="flex gap-4 p-3 bg-white rounded-lg shadow-lg mr-3">
                                        <a href="#cart" className="text-black text-xl cursor-pointer hover:scale-110 transition-all">
                                            <GiShoppingCart />
                                        </a>
                                    </div>
                                    <div className="flex gap-4 p-3 bg-white rounded-lg shadow-lg">
                                        <a href="#view" className="text-black text-xl cursor-pointer hover:scale-110 transition-all">
                                            <FaRegEye />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Product Title - Clickable */}
                            <a
                                href="#"
                                className="block text-center font-semibold hover:text-red-500 transition-all cursor-pointer mt-7"
                            >
                                WOMENS WOVEN LONG KURTI
                            </a>

                            {/* Product Price - Clickable */}
                            <p className="text-center text-gray-600 mt-2">৳ 2350</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="py-9">
                            <div className="hover_content relative group w-[300px] mx-auto">
                                {/* Product Image */}
                                <img
                                    src={NewCollection}
                                    alt="Kurti"
                                    className="w-full h-auto transition-transform transform group-hover:scale-105"
                                />

                                {/* Wishlist Icon */}
                                <Link
                                    href="/wishlist"
                                    className="absolute top-2 right-2 text-gray-500 text-2xl cursor-pointer group-hover:opacity-100 opacity-0 transition-opacity duration-300 z-30"
                                >
                                    <FaRegHeart />
                                </Link>

                                {/* Hover Effect: Icons with Background & Padding */}
                                <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                                    <div className="flex gap-4 p-3 bg-white rounded-lg shadow-lg mr-3">
                                        <a href="#cart" className="text-black text-xl cursor-pointer hover:scale-110 transition-all">
                                            <GiShoppingCart />
                                        </a>
                                    </div>
                                    <div className="flex gap-4 p-3 bg-white rounded-lg shadow-lg">
                                        <a href="#view" className="text-black text-xl cursor-pointer hover:scale-110 transition-all">
                                            <FaRegEye />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Product Title - Clickable */}
                            <a
                                href="#"
                                className="block text-center font-semibold hover:text-red-500 transition-all cursor-pointer mt-7"
                            >
                                WOMENS WOVEN LONG KURTI
                            </a>

                            {/* Product Price - Clickable */}
                            <p className="text-center text-gray-600 mt-2">৳ 2350</p>
                        </div>
                    </SwiperSlide>
                </Swiper>

                {/* See More Button */}
                <div className="mt-6 text-center">
                    <a href="#" className="bg-black text-white px-9 py-3 rounded-full font-semibold hover:bg-red-500 transition-all">
                        See More
                    </a>
                </div>
            </div>
        </>
    )
}

export default HomeFeatureProduct