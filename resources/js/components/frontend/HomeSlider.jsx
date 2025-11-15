import { Autoplay } from 'swiper/modules';
import Slider from "../../assets/image/slider.jpg";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/free-mode';
import "animate.css";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
const HomeSlider = () => {
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                className="mySwiper w-full h-[600px]" // Height fixed to 800px
            >
                <SwiperSlide>
                    <div className="w-full h-[600px] flex flex-col md:flex-row justify-between items-center bg-gray-100">
                        {/* Content Section */}
                        <div className="md:w-1/2 text-left animate__animated animate__fadeInLeft pl-7 pt-8">
                            <h2 className="text-xl font-semibold text-gray-600">Men New-Season</h2>
                            <h1 className="text-5xl font-bold mt-7">JACKETS & COATS</h1>
                            <a href="#">
                                <button className="mt-7 mb-4 cursor-pointer px-6 py-2 text-sm bg-black text-gray-300 rounded-full shadow-lg transition duration-300 ease-in-out 
    hover:bg-transparent hover:border hover:border-gray-500 hover:text-black animate__animated animate__pulse">
                                    SHOP NOW
                                </button>
                            </a>
                        </div>

                        {/* Image Section */}
                        <div className="md:w-1/2 animate__animated animate__fadeInRight flex justify-center">
                            <img
                                src={Slider} // Replace with correct image path
                                alt="Men's Jacket"
                                className="w-full h-auto max-h-[800px] object-cover shadow-lg"
                            />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="w-full h-[600px] flex flex-col md:flex-row justify-between items-center bg-gray-100">
                        {/* Content Section */}
                        <div className="md:w-1/2 text-left animate__animated animate__fadeInLeft pl-7 pt-8">
                            <h2 className="text-xl font-semibold text-gray-600">Men New-Season</h2>
                            <h1 className="text-5xl font-bold mt-7">JACKETS & COATS</h1>
                            <a href="#">
                                <button className="mt-7 mb-4 cursor-pointer px-6 py-2 text-sm bg-black text-gray-300 rounded-full shadow-lg transition duration-300 ease-in-out 
    hover:bg-transparent hover:border hover:border-gray-500 hover:text-black animate__animated animate__pulse">
                                    SHOP NOW
                                </button>
                            </a>
                        </div>

                        {/* Image Section */}
                        <div className="md:w-1/2 animate__animated animate__fadeInRight flex justify-center">
                            <img
                                src={Slider} // Replace with correct image path
                                alt="Men's Jacket"
                                className="w-full h-auto max-h-[800px] object-cover shadow-lg"
                            />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="w-full h-[600px] flex flex-col md:flex-row justify-between items-center bg-gray-100">
                        {/* Content Section */}
                        <div className="md:w-1/2 text-left animate__animated animate__fadeInLeft pl-7 pt-8">
                            <h2 className="text-xl font-semibold text-gray-600">Men New-Season</h2>
                            <h1 className="text-5xl font-bold mt-7">JACKETS & COATS</h1>
                            <a href="#">
                                <button className="mt-7 mb-4 cursor-pointer px-6 py-2 text-sm bg-black text-gray-300 rounded-full shadow-lg transition duration-300 ease-in-out 
    hover:bg-transparent hover:border hover:border-gray-500 hover:text-black animate__animated animate__pulse">
                                    SHOP NOW
                                </button>
                            </a>
                        </div>

                        {/* Image Section */}
                        <div className="md:w-1/2 animate__animated animate__fadeInRight flex justify-center">
                            <img
                                src={Slider} // Replace with correct image path
                                alt="Men's Jacket"
                                className="w-full h-auto max-h-[800px] object-cover shadow-lg"
                            />
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    )
}

export default HomeSlider