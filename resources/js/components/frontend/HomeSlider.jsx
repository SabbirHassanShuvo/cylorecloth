import React from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag, Sparkles } from 'lucide-react';

const HomeSlider = () => {
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const [isAnimating, setIsAnimating] = React.useState(false);

    const slides = [
        {
            season: "Spring Collection 2026",
            title: "URBAN ELEGANCE",
            subtitle: "Redefine Your Style",
            image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1200&h=800&fit=crop"
        },
        {
            season: "Premium Line",
            title: "JACKETS & COATS",
            subtitle: "Crafted for Perfection",
            image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=1200&h=800&fit=crop"
        },
        {
            season: "Exclusive Range",
            title: "MODERN CLASSICS",
            subtitle: "Timeless Fashion",
            image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&h=800&fit=crop"
        }
    ];

    React.useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 4000);
        return () => clearInterval(timer);
    }, [currentSlide]);

    const nextSlide = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setCurrentSlide((prev) => (prev + 1) % slides.length);
            setTimeout(() => setIsAnimating(false), 600);
        }
    };

    const prevSlide = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
            setTimeout(() => setIsAnimating(false), 600);
        }
    };

    const goToSlide = (index) => {
        if (!isAnimating && index !== currentSlide) {
            setIsAnimating(true);
            setCurrentSlide(index);
            setTimeout(() => setIsAnimating(false), 600);
        }
    };

    return (
        <div className="relative w-full h-[600px] overflow-hidden bg-white">
            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className="absolute inset-0 w-full h-full transition-all duration-700 ease-in-out"
                    style={{
                        opacity: currentSlide === index ? 1 : 0,
                        transform: currentSlide === index
                            ? 'scale(1) translateX(0)'
                            : currentSlide > index
                                ? 'scale(0.95) translateX(-100px)'
                                : 'scale(0.95) translateX(100px)',
                        pointerEvents: currentSlide === index ? 'auto' : 'none'
                    }}
                >
                    {/* Content Container */}
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full px-8 md:px-16 gap-8">
                        {/* Left Content */}
                        <div
                            className="md:w-2/5 text-left space-y-6 transition-all duration-700 delay-200"
                            style={{
                                opacity: currentSlide === index ? 1 : 0,
                                transform: currentSlide === index ? 'translateX(0)' : 'translateX(-50px)'
                            }}
                        >
                            {/* Season Tag */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full border border-gray-300">
                                <Sparkles className="w-4 h-4 text-gray-600" />
                                <span className="text-sm font-medium text-gray-600">
                                    {slide.season}
                                </span>
                            </div>

                            {/* Main Title */}
                            <h1
                                className="text-5xl md:text-6xl font-bold leading-tight tracking-tight text-black"
                            >
                                {slide.title}
                            </h1>

                            {/* Subtitle */}
                            <p className="text-xl md:text-2xl font-light tracking-wide text-gray-600">
                                {slide.subtitle}
                            </p>

                            {/* CTA Button */}
                            <button className="group mt-8 px-8 py-4 bg-black text-white rounded-full font-semibold text-sm tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gray-800 flex items-center gap-3">
                                <span>SHOP NOW</span>
                                <ShoppingBag className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                        </div>

                        {/* Right Large Image */}
                        <div
                            className="md:w-3/5 h-full transition-all duration-700 delay-300"
                            style={{
                                opacity: currentSlide === index ? 1 : 0,
                                transform: currentSlide === index ? 'translateX(0) scale(1)' : 'translateX(50px) scale(0.9)'
                            }}
                        >
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/80 backdrop-blur-md hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 border border-gray-300 hover:scale-110 shadow-lg"
            >
                <ChevronLeft className="w-6 h-6 text-black" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/80 backdrop-blur-md hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 border border-gray-300 hover:scale-110 shadow-lg"
            >
                <ChevronRight className="w-6 h-6 text-black" />
            </button>

            {/* Dots Navigation */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`transition-all duration-300 rounded-full ${currentSlide === index
                            ? 'w-12 h-3 bg-black'
                            : 'w-3 h-3 bg-gray-400 hover:bg-gray-600'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HomeSlider;