import React from 'react';
import { ArrowRight } from 'lucide-react';

const HomeCategory = () => {
    const categories = [
        {
            title: "Women",
            subtitle: "Spring 2026",
            image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=800&fit=crop"
        },
        {
            title: "Men",
            subtitle: "Spring 2026",
            image: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=600&h=800&fit=crop"
        },
        {
            title: "Accessories",
            subtitle: "Spring 2026",
            image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=600&h=800&fit=crop"
        },
        {
            title: "Kids",
            subtitle: "Spring 2026",
            image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&h=800&fit=crop"
        }
    ];

    return (
        <div className="w-full bg-white py-16 px-4">
            <div className="container mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">Shop By Category</h2>
                    <p className="text-gray-600 text-lg">Discover your perfect style</p>
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category, index) => (
                        <a
                            href="#"
                            key={index}
                            className="group relative h-[400px] overflow-hidden bg-white border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-500"
                        >
                            {/* Image */}
                            <div className="absolute inset-0">
                                <img
                                    src={category.image}
                                    alt={category.title}
                                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-500"></div>
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-between p-6">
                                {/* Top Text */}
                                <div className="transform transition-all duration-500 group-hover:-translate-y-2">
                                    <h3 className="text-2xl font-bold text-white mb-1">{category.title}</h3>
                                    <p className="text-sm text-gray-300">{category.subtitle}</p>
                                </div>

                                {/* Bottom Button */}
                                <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    <button className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-colors duration-300">
                                        <span>Shop Now</span>
                                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                                    </button>
                                </div>
                            </div>

                            {/* Animated Border Effect */}
                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-black transition-all duration-500"></div>
                        </a>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-12">
                    <button className="group px-8 py-4 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-3 mx-auto">
                        <span>View All Categories</span>
                        <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomeCategory;