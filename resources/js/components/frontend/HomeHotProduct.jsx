import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import HotProduct from "../../assets/image/hotproduct.webp";
const HomeHotProduct = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 29, hours: 23, mins: 59, secs: 59 });

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                let { days, hours, mins, secs } = prev;
                if (secs > 0) secs--;
                else {
                    secs = 59;
                    if (mins > 0) mins--;
                    else {
                        mins = 59;
                        if (hours > 0) hours--;
                        else {
                            hours = 23;
                            if (days > 0) days--;
                        }
                    }
                }
                return { days, hours, mins, secs };
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return (
        <>
            <div className="flex flex-col md:flex-row items-center justify-between min-h-screen py-7">
                {/* Countdown Timer Section */}
                <div
                    className="w-full md:w-1/2 text-white bg-cover bg-center flex flex-col justify-center items-center p-11 h-[90vh]"
                    style={{ backgroundImage: `url(${HotProduct})` }}
                >
                    <h2 className="text-3xl font-bold text-center">Exclusive Hot Deal Ends Soon!</h2>
                    <p className="text-sm mt-2 text-center">Who are in extremely love with eco-friendly system.</p>
                    <div className="flex justify-center mt-7 text-center gap-4">
                        <div className="p-4 bg-white text-black rounded-lg">
                            <span className="text-2xl font-bold">{timeLeft.days}</span>
                            <p className="text-sm uppercase">Days</p>
                        </div>
                        <div className="p-4 bg-white text-black rounded-lg">
                            <span className="text-2xl font-bold">{timeLeft.hours}</span>
                            <p className="text-sm uppercase">Hours</p>
                        </div>
                        <div className="p-4 bg-white text-black rounded-lg">
                            <span className="text-2xl font-bold">{timeLeft.mins}</span>
                            <p className="text-sm uppercase">Mins</p>
                        </div>
                        <div className="p-4 bg-white text-black rounded-lg">
                            <span className="text-2xl font-bold">{timeLeft.secs}</span>
                            <p className="text-sm uppercase">Secs</p>
                        </div>
                    </div>
                    <a href="#">
                        <button className="mt-30 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 cursor-pointer">
                            SHOP NOW
                        </button>
                    </a>
                </div>

                {/* Product Slider Section */}
                <div className="w-full md:w-1/2 flex flex-col items-center relative p-10 bg-white rounded-lg">
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        autoplay={{ delay: 3000 }}
                        className="w-full"
                    >
                        <SwiperSlide>
                            <div className="text-center">
                                <img src={HotProduct} alt="Adidas Shoe" className="w-64 h-64 object-cover mx-auto rounded-lg shadow-lg" />
                                <h3 className="text-xl font-bold mt-4">ADDIDAS NEW HAMMER SOLE FOR SPORTS PERSON</h3>
                                <p className="text-gray-600 mt-2">High-performance sports shoes with ultimate comfort and grip.</p>
                                <p className="text-2xl font-bold text-orange-500 mt-2">$150 <span className="text-gray-400 text-small line-through">$210</span>
                                </p>
                                <a href="#">
                                    <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 text-sm rounded-lg transition-all duration-300 cursor-pointer">Add To Cart</button>
                                </a>

                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="text-center">
                                <img src={HotProduct} alt="Adidas Shoe" className="w-64 h-64 object-cover mx-auto rounded-lg shadow-lg" />
                                <h3 className="text-xl font-bold mt-4">ADDIDAS NEW HAMMER SOLE FOR SPORTS PERSON</h3>
                                <p className="text-gray-600 mt-2">High-performance sports shoes with ultimate comfort and grip.</p>
                                <p className="text-2xl font-bold text-orange-500 mt-2">$150 <span className="text-gray-400 text-small line-through">$210</span>
                                </p>
                                <a href="#">
                                    <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 text-sm rounded-lg transition-all duration-300 cursor-pointer">Add To Cart</button>
                                </a>

                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="text-center">
                                <img src={HotProduct} alt="Adidas Shoe" className="w-64 h-64 object-cover mx-auto rounded-lg shadow-lg" />
                                <h3 className="text-xl font-bold mt-4">ADDIDAS NEW HAMMER SOLE FOR SPORTS PERSON</h3>
                                <p className="text-gray-600 mt-2">High-performance sports shoes with ultimate comfort and grip.</p>
                                <p className="text-2xl font-bold text-orange-500 mt-2">$150 <span className="text-gray-400 text-small line-through">$210</span>
                                </p>
                                <a href="#">
                                    <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 text-sm rounded-lg transition-all duration-300 cursor-pointer">Add To Cart</button>
                                </a>

                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="text-center">
                                <img src={HotProduct} alt="Adidas Shoe" className="w-64 h-64 object-cover mx-auto rounded-lg shadow-lg" />
                                <h3 className="text-xl font-bold mt-4">ADDIDAS NEW HAMMER SOLE FOR SPORTS PERSON</h3>
                                <p className="text-gray-600 mt-2">High-performance sports shoes with ultimate comfort and grip.</p>
                                <p className="text-2xl font-bold text-orange-500 mt-2">$150 <span className="text-gray-400 text-small line-through">$210</span>
                                </p>
                                <a href="#">
                                    <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 text-sm rounded-lg transition-all duration-300 cursor-pointer">Add To Cart</button>
                                </a>

                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </>
    )
}

export default HomeHotProduct