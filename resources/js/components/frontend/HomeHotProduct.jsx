import React from 'react';
import { Clock, ShoppingCart, ArrowRight, Flame } from 'lucide-react';

const HomeHotProduct = () => {
    const [timeLeft, setTimeLeft] = React.useState({ days: 29, hours: 23, mins: 59, secs: 59 });
    const [currentSlide, setCurrentSlide] = React.useState(0);

    const products = [
        {
            id: 1,
            name: "PREMIUM LEATHER SNEAKERS",
            description: "High-performance sports shoes with ultimate comfort and grip.",
            price: 150,
            originalPrice: 210,
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop"
        },
        {
            id: 2,
            name: "LUXURY RUNNING SHOES",
            description: "Advanced cushioning technology for maximum performance.",
            price: 180,
            originalPrice: 250,
            image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop"
        },
        {
            id: 3,
            name: "CLASSIC SPORT TRAINERS",
            description: "Timeless design meets modern comfort and durability.",
            price: 140,
            originalPrice: 200,
            image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop"
        }
    ];

    // Countdown Timer
    React.useEffect(() => {
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

    // Auto Slider
    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % products.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full bg-white">
            <div className="w-full">
                <div className="flex flex-col lg:flex-row gap-0 items-stretch min-h-screen">
                    {/* Left: Countdown Timer Section - Full Width No Padding */}
                    <div className="lg:w-1/2 relative overflow-hidden">
                        {/* Animated Background Image */}
                        <div className="absolute inset-0">
                            <img
                                src="https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=1200&h=800&fit=crop"
                                alt="Hot Deal Background"
                                className="w-full h-full object-cover animate-ken-burns"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/60"></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 flex flex-col justify-center items-center h-full min-h-screen">
                            {/* Hot Deal Badge */}
                            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/30 mb-8 animate-pulse">
                                <Flame className="w-5 h-5 text-white" />
                                <span className="text-white font-semibold text-sm tracking-wider">HOT DEAL</span>
                            </div>

                            {/* Title */}
                            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
                                Exclusive Deal
                                <br />
                                Ends Soon!
                            </h2>
                            <p className="text-white/80 text-center mb-8 max-w-md">
                                Don't miss out on our biggest sale of the season. Limited time offer!
                            </p>

                            {/* Countdown Timer */}
                            <div className="flex justify-center gap-4 mb-10">
                                <div className="flex flex-col items-center">
                                    <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center shadow-xl transform hover:scale-110 transition-transform duration-300">
                                        <span className="text-3xl font-bold text-black">{timeLeft.days}</span>
                                    </div>
                                    <p className="text-white/80 text-xs uppercase mt-2 font-semibold">Days</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center shadow-xl transform hover:scale-110 transition-transform duration-300">
                                        <span className="text-3xl font-bold text-black">{timeLeft.hours}</span>
                                    </div>
                                    <p className="text-white/80 text-xs uppercase mt-2 font-semibold">Hours</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center shadow-xl transform hover:scale-110 transition-transform duration-300">
                                        <span className="text-3xl font-bold text-black">{timeLeft.mins}</span>
                                    </div>
                                    <p className="text-white/80 text-xs uppercase mt-2 font-semibold">Mins</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center shadow-xl transform hover:scale-110 transition-transform duration-300">
                                        <span className="text-3xl font-bold text-black">{timeLeft.secs}</span>
                                    </div>
                                    <p className="text-white/80 text-xs uppercase mt-2 font-semibold">Secs</p>
                                </div>
                            </div>

                            {/* Shop Now Button */}
                            <a href="#">
                                <button className="group px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-2xl flex items-center gap-3">
                                    <Clock className="w-5 h-5" />
                                    <span>SHOP NOW</span>
                                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                                </button>
                            </a>
                        </div>
                    </div>

                    {/* Right: Product Slider Section */}
                    <div className="lg:w-1/2 bg-gray-50 p-12 flex flex-col justify-center relative overflow-hidden min-h-screen">
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gray-200 rounded-full blur-3xl opacity-30"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-300 rounded-full blur-3xl opacity-30"></div>

                        {/* Product Slider */}
                        <div className="relative z-10">
                            {products.map((product, index) => (
                                <div
                                    key={product.id}
                                    className="transition-all duration-700 ease-in-out"
                                    style={{
                                        opacity: currentSlide === index ? 1 : 0,
                                        transform: currentSlide === index ? 'translateX(0) scale(1)' : 'translateX(20px) scale(0.95)',
                                        position: currentSlide === index ? 'relative' : 'absolute',
                                        inset: currentSlide === index ? 'auto' : 0,
                                        pointerEvents: currentSlide === index ? 'auto' : 'none'
                                    }}
                                >
                                    <div className="text-center">
                                        {/* Product Image - Full Width */}
                                        <div className="relative mb-8">
                                            <div className="absolute inset-0 bg-black/5 rounded-xl blur-2xl transform scale-95"></div>
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="relative w-full h-96 object-cover mx-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>

                                        {/* Product Title */}
                                        <h3 className="text-2xl font-bold text-black mb-3">
                                            {product.name}
                                        </h3>

                                        {/* Product Description */}
                                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                                            {product.description}
                                        </p>

                                        {/* Price */}
                                        <div className="flex items-center justify-center gap-4 mb-6">
                                            <span className="text-4xl font-bold text-black">
                                                ${product.price}
                                            </span>
                                            <span className="text-xl text-gray-400 line-through">
                                                ${product.originalPrice}
                                            </span>
                                            <span className="px-3 py-1 bg-black text-white text-sm font-semibold rounded-full">
                                                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                                            </span>
                                        </div>

                                        {/* Add to Cart Button */}
                                        <a href="#">
                                            <button className="group px-8 py-4 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-3 mx-auto">
                                                <ShoppingCart className="w-5 h-5" />
                                                <span>Add To Cart</span>
                                                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Slider Dots */}
                        <div className="flex justify-center gap-3 mt-8 relative z-10">
                            {products.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`transition-all duration-300 rounded-full ${currentSlide === index
                                        ? 'w-10 h-3 bg-black'
                                        : 'w-3 h-3 bg-gray-400 hover:bg-gray-600'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            <style>{`
                @keyframes ken-burns {
                    0% {
                        transform: scale(1) translateX(0) translateY(0);
                    }
                    50% {
                        transform: scale(1.1) translateX(-20px) translateY(-10px);
                    }
                    100% {
                        transform: scale(1) translateX(0) translateY(0);
                    }
                }
                .animate-ken-burns {
                    animation: ken-burns 20s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default HomeHotProduct;