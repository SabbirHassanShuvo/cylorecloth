import Category1 from "../../assets/image/banner-01.jpg"
import Category2 from "../../assets/image/banner-02.jpg"
import Category3 from "../../assets/image/banner-03.jpg"
const HomeCategory = () => {
    return (
        <>
            <div className="container mx-auto px-4 py-14">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {/* Women Category */}
                    <a href="#">
                        <div className="relative border border-gray-300 flex flex-col items-center justify-center shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl">
                            <img
                                src={Category1}
                                alt="Women"
                                className="w-full h-full object-cover transform transition-all duration-500 group-hover:scale-105"
                            />
                            {/* Transparent Overlay */}
                            <div className="absolute inset-0 bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-500"></div>

                            {/* Text Section */}
                            <div className="absolute top-4 left-4 transition-all duration-500">
                                <h2 className="text-lg font-bold group-hover:text-amber-600">Women</h2>
                                <p className="text-sm group-hover:text-amber-600">Spring 2018</p>
                            </div>
                            {/* Animated Button */}
                            <button className="absolute bottom-4 left-4 px-4 py-2 bg-white text-black font-semibold rounded-lg opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-4 transition-all duration-500 cursor-pointer">
                                Shop Now
                            </button>
                        </div>
                    </a>
                    {/* Men Category */}
                    <a href="#">
                        <div className="relative border border-gray-300 flex flex-col items-center justify-center shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl">
                            <img
                                src={Category2}
                                alt="Man"
                                className="w-full h-full object-cover transform transition-all duration-500 group-hover:scale-105"
                            />
                            {/* Transparent Overlay */}
                            <div className="absolute inset-0 bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-500"></div>

                            {/* Text Section */}
                            <div className="absolute top-4 left-4 transition-all duration-500">
                                <h2 className="text-lg font-bold group-hover:text-amber-600">Man</h2>
                                <p className="text-sm group-hover:text-amber-600">Spring 2018</p>
                            </div>
                            {/* Animated Button */}
                            <button className="absolute bottom-4 left-4 px-4 py-2 text-black font-semibold opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-4 transition-all duration-500 cursor-pointer">
                                Shop Now
                            </button>
                        </div>
                    </a>
                    {/* Accessories Category */}
                    <a href="#">
                        <div className="relative border border-gray-300 flex flex-col items-center justify-center shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl">
                            <img
                                src={Category3}
                                alt="Kids"
                                className="w-full h-full object-cover transform transition-all duration-500 group-hover:scale-105"
                            />
                            {/* Transparent Overlay */}
                            <div className="absolute inset-0 bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-500"></div>

                            {/* Text Section */}
                            <div className="absolute top-4 left-4 transition-all duration-500">
                                <h2 className="text-lg font-bold group-hover:text-amber-600">Accessories</h2>
                                <p className="text-sm group-hover:text-amber-600">Spring 2018</p>
                            </div>
                            {/* Animated Button */}
                            <button className="absolute bottom-4 left-4 px-4 py-2 text-black font-semibold opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-4 transition-all duration-500 cursor-pointer">
                                Shop Now
                            </button>
                        </div>
                    </a>
                </div>
            </div>
        </>
    )
}

export default HomeCategory