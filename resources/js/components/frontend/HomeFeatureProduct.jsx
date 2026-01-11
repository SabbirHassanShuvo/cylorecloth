import React, { useState } from 'react';
import { Heart, ShoppingCart, Eye, X, Star, Minus, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

const HomeFeatureProduct = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const products = [
        {
            id: 1,
            name: "WOMENS WOVEN LONG KURTI",
            price: "৳ 2350",
            rating: 4.5,
            reviews: 128,
            description: "Premium quality woven kurti with intricate embroidery. Perfect for casual and semi-formal occasions. Made from 100% pure cotton fabric with excellent breathability and comfort.",
            sizes: ["S", "M", "L", "XL", "XXL"],
            colors: ["#000000", "#FFFFFF", "#6B7280"],
            images: [
                "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=600&h=800&fit=crop",
                "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&h=800&fit=crop",
                "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=800&fit=crop"
            ]
        },
        {
            id: 2,
            name: "ELEGANT SILK SAREE",
            price: "৳ 3450",
            rating: 4.8,
            reviews: 256,
            description: "Luxurious silk saree with traditional borders. Perfect for weddings and special occasions. Comes with matching blouse piece.",
            sizes: ["One Size"],
            colors: ["#1F2937", "#9CA3AF", "#F3F4F6"],
            images: [
                "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop",
                "https://images.unsplash.com/photo-1583391733981-9c206b0e7b23?w=600&h=800&fit=crop",
                "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&h=800&fit=crop"
            ]
        },
        {
            id: 3,
            name: "DESIGNER ETHNIC DRESS",
            price: "৳ 2890",
            rating: 4.6,
            reviews: 189,
            description: "Contemporary ethnic dress with modern cuts. Features unique prints and comfortable fit. Ideal for festive occasions.",
            sizes: ["S", "M", "L", "XL", "XXL"],
            colors: ["#111827", "#D1D5DB", "#374151"],
            images: [
                "https://images.unsplash.com/photo-1583391733981-9c206b0e7b23?w=600&h=800&fit=crop",
                "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=600&h=800&fit=crop",
                "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop"
            ]
        },
        {
            id: 4,
            name: "TRADITIONAL ANARKALI",
            price: "৳ 4200",
            rating: 4.9,
            reviews: 342,
            description: "Stunning anarkali suit with heavy embellishment. Premium fabric with detailed craftsmanship. Perfect for grand celebrations.",
            sizes: ["S", "M", "L", "XL"],
            colors: ["#000000", "#E5E7EB", "#4B5563"],
            images: [
                "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&h=800&fit=crop",
                "https://images.unsplash.com/photo-1583391733981-9c206b0e7b23?w=600&h=800&fit=crop",
                "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=600&h=800&fit=crop"
            ]
        }
    ];

    const openModal = (product) => {
        setSelectedProduct(product);
        setQuantity(1);
        setSelectedSize('');
        setSelectedColor(0);
        setCurrentImageIndex(0);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedProduct(null);
        document.body.style.overflow = 'unset';
    };

    const nextImage = () => {
        if (selectedProduct) {
            setCurrentImageIndex((prev) =>
                prev === selectedProduct.images.length - 1 ? 0 : prev + 1
            );
        }
    };

    const prevImage = () => {
        if (selectedProduct) {
            setCurrentImageIndex((prev) =>
                prev === 0 ? selectedProduct.images.length - 1 : prev - 1
            );
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-16 bg-white">
            {/* Section Header */}
            <div className="text-center mb-16 relative">
                <div className="inline-block">
                    <h2 className="text-5xl font-bold mb-4 capitalize text-gray-900">
                        Feature Products
                    </h2>
                    <div className="h-1 w-32 bg-black mx-auto mb-6 rounded-full"></div>
                </div>
                <span className="inline-block bg-black text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg transform hover:scale-105 transition-transform duration-300">
                    SPRING 2025
                </span>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {products.map((product, index) => (
                    <div
                        key={product.id}
                        className="group relative"
                        style={{
                            animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                        }}
                    >
                        <div className="relative overflow-hidden rounded-2xl bg-white border-2 border-gray-100 hover:border-black transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl">
                            {/* Image Container - Larger */}
                            <div className="relative h-[450px] overflow-hidden bg-gray-50">
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                {/* Wishlist Button */}
                                <button className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 hover:bg-black hover:text-white z-10">
                                    <Heart className="w-5 h-5" />
                                </button>

                                {/* Action Buttons */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                    <button className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-xl hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-110">
                                        <ShoppingCart className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => openModal(product)}
                                        className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-xl hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-110"
                                    >
                                        <Eye className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* New Badge */}
                                <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                    NEW
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="p-6 bg-white">
                                <h3 className="font-semibold text-gray-800 text-center mb-2 group-hover:text-black transition-colors duration-300 line-clamp-2">
                                    {product.name}
                                </h3>
                                <div className="flex justify-center items-center gap-2 mb-2">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-black text-black' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs text-gray-500">({product.reviews})</span>
                                </div>
                                <p className="text-center text-xl font-bold text-black">
                                    {product.price}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* See More Button */}
            <div className="text-center">
                <button className="group relative inline-flex items-center gap-3 bg-black text-white px-10 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
                    <span className="absolute inset-0 bg-gray-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                    <span className="relative z-10">See More Products</span>
                </button>
            </div>

            {/* Modal - Larger Size */}
            {selectedProduct && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    style={{ animation: 'fadeIn 0.3s ease-out' }}
                    onClick={closeModal}
                >
                    <div
                        className="bg-white rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-y-auto shadow-2xl relative"
                        style={{ animation: 'modalSlideUp 0.4s ease-out' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button - Inside Modal */}
                        <button
                            onClick={closeModal}
                            className="absolute top-6 right-6 bg-gray-100 rounded-full p-3 shadow-lg hover:bg-black hover:text-white transition-all z-20"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="grid md:grid-cols-2 gap-10 p-10">
                            {/* Product Images - Left Side */}
                            <div className="relative">
                                <div className="sticky top-0">
                                    {/* Main Image */}
                                    <div className="relative mb-4">
                                        <img
                                            src={selectedProduct.images[currentImageIndex]}
                                            alt={selectedProduct.name}
                                            className="w-full h-[600px] object-cover rounded-2xl shadow-lg"
                                        />

                                        {/* Image Navigation Arrows */}
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-black hover:text-white transition-all"
                                        >
                                            <ChevronLeft className="w-6 h-6" />
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-black hover:text-white transition-all"
                                        >
                                            <ChevronRight className="w-6 h-6" />
                                        </button>

                                        {/* Image Counter */}
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-full text-sm">
                                            {currentImageIndex + 1} / {selectedProduct.images.length}
                                        </div>
                                    </div>

                                    {/* Thumbnail Images */}
                                    <div className="flex gap-3 justify-center">
                                        {selectedProduct.images.map((img, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setCurrentImageIndex(idx)}
                                                className={`w-20 h-24 rounded-lg overflow-hidden border-2 transition-all ${currentImageIndex === idx ? 'border-black scale-110' : 'border-gray-300 hover:border-gray-500'
                                                    }`}
                                            >
                                                <img
                                                    src={img}
                                                    alt={`Thumbnail ${idx + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Product Details - Right Side */}
                            <div className="flex flex-col">
                                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                    {selectedProduct.name}
                                </h2>

                                {/* Rating */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-5 h-5 ${i < Math.floor(selectedProduct.rating) ? 'fill-black text-black' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-600">
                                        {selectedProduct.rating} ({selectedProduct.reviews} reviews)
                                    </span>
                                </div>

                                {/* Price */}
                                <div className="text-5xl font-bold text-black mb-6">
                                    {selectedProduct.price}
                                </div>

                                {/* Description */}
                                <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                                    {selectedProduct.description}
                                </p>

                                {/* Size Selection */}
                                <div className="mb-6">
                                    <h3 className="font-bold text-gray-900 mb-3 text-lg">Select Size:</h3>
                                    <div className="flex gap-3">
                                        {selectedProduct.sizes.map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`border-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${selectedSize === size
                                                    ? 'border-black bg-black text-white'
                                                    : 'border-gray-300 hover:border-black'
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Color Selection */}
                                <div className="mb-6">
                                    <h3 className="font-bold text-gray-900 mb-3 text-lg">Select Color:</h3>
                                    <div className="flex gap-3">
                                        {selectedProduct.colors.map((color, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedColor(index)}
                                                className={`w-12 h-12 rounded-full border-2 transition-all duration-300 hover:scale-110 ${selectedColor === index ? 'border-black ring-2 ring-black ring-offset-2' : 'border-gray-300'
                                                    }`}
                                                style={{ backgroundColor: color }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Quantity */}
                                <div className="mb-8">
                                    <h3 className="font-bold text-gray-900 mb-3 text-lg">Quantity:</h3>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="bg-gray-100 p-3 rounded-lg hover:bg-black hover:text-white transition-all"
                                        >
                                            <Minus className="w-5 h-5" />
                                        </button>
                                        <span className="text-2xl font-bold w-16 text-center">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="bg-gray-100 p-3 rounded-lg hover:bg-black hover:text-white transition-all"
                                        >
                                            <Plus className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-4 mt-auto">
                                    <button className="flex-1 bg-black text-white py-5 rounded-full font-bold text-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl">
                                        <ShoppingCart className="w-6 h-6" />
                                        Add to Cart
                                    </button>
                                    <button className="bg-gray-100 text-black p-5 rounded-full hover:bg-black hover:text-white transition-all duration-300 shadow-lg">
                                        <Heart className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes modalSlideUp {
                    from {
                        opacity: 0;
                        transform: translateY(50px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
            `}</style>
        </div>
    );
};

export default HomeFeatureProduct;