import React from 'react';
import { Heart, ShoppingCart, Eye, X, Plus, Minus } from 'lucide-react';

const HomeArrivals = () => {
    const [selectedProduct, setSelectedProduct] = React.useState(null);
    const [quantity, setQuantity] = React.useState(1);
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

    const products = [
        {
            id: 1,
            name: "WOMENS WOVEN LONG KURTI",
            price: 2350,
            image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop",
                "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=600&h=800&fit=crop",
                "https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=600&h=800&fit=crop"
            ],
            description: "Premium quality woven fabric with elegant design. Perfect for casual and semi-formal occasions.",
            sizes: ["S", "M", "L", "XL"],
            colors: ["Black", "White", "Grey"]
        },
        {
            id: 2,
            name: "PREMIUM COTTON DRESS",
            price: 3200,
            image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop",
                "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop"
            ],
            description: "Elegant cotton dress with modern cuts. Breathable and comfortable for all-day wear.",
            sizes: ["S", "M", "L", "XL"],
            colors: ["White", "Black"]
        },
        {
            id: 3,
            name: "STYLISH FORMAL BLAZER",
            price: 4500,
            image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=600&h=800&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=600&h=800&fit=crop",
                "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=800&fit=crop"
            ],
            description: "Professional blazer crafted with premium materials. Perfect for office and formal events.",
            sizes: ["S", "M", "L", "XL", "XXL"],
            colors: ["Black", "Grey"]
        },
        {
            id: 4,
            name: "CASUAL SUMMER TOP",
            price: 1850,
            image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=800&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=800&fit=crop"
            ],
            description: "Lightweight and breezy summer top. Ideal for hot weather and casual outings.",
            sizes: ["S", "M", "L"],
            colors: ["White", "Grey"]
        }
    ];

    const openQuickView = (product) => {
        setSelectedProduct(product);
        setQuantity(1);
        setCurrentImageIndex(0);
        document.body.style.overflow = 'hidden';
    };

    const closeQuickView = () => {
        setSelectedProduct(null);
        setCurrentImageIndex(0);
        document.body.style.overflow = 'auto';
    };

    const incrementQuantity = () => setQuantity(prev => prev + 1);
    const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    return (
        <>
            <div className="max-w-7xl mx-auto px-6 py-16 bg-white">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">New Arrivals</h2>
                    <span className="inline-block bg-black text-white px-6 py-2 rounded-full text-sm font-semibold tracking-wider">
                        SPRING 2026
                    </span>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {products.map((product) => (
                        <div key={product.id} className="group">
                            <div className="relative overflow-hidden bg-gray-50 rounded-lg">
                                {/* Product Image */}
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Wishlist Icon */}
                                <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black hover:text-white shadow-lg z-20">
                                    <Heart className="w-5 h-5" />
                                </button>

                                {/* Hover Icons */}
                                <div className="absolute inset-0 flex justify-center items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}
                                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-110 shadow-xl"
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            openQuickView(product);
                                        }}
                                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-110 shadow-xl"
                                    >
                                        <Eye className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>

                            {/* Product Info */}
                            <div className="mt-4 text-center">
                                <a href="#" className="block text-sm font-semibold text-black hover:text-gray-600 transition-colors duration-300">
                                    {product.name}
                                </a>
                                <p className="text-gray-600 mt-2 font-medium">৳ {product.price.toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* See More Button */}
                <div className="text-center">
                    <a
                        href="#"
                        className="inline-block bg-black text-white px-10 py-4 rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                        See More
                    </a>
                </div>
            </div>

            {/* Quick View Modal */}
            {selectedProduct && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
                    style={{ animation: 'fadeIn 0.3s ease-out' }}
                    onClick={closeQuickView}
                >
                    <div
                        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
                        style={{ animation: 'slideUp 0.4s ease-out' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeQuickView}
                            className="sticky top-4 left-[calc(100%-3rem)] w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-all duration-300 z-10 ml-auto mb-4 mr-4"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="grid md:grid-cols-2 gap-8 p-8">
                            {/* Left: Image Gallery */}
                            <div className="space-y-4">
                                {/* Main Image */}
                                <div className="relative overflow-hidden rounded-lg bg-gray-50">
                                    <img
                                        src={selectedProduct.images[currentImageIndex]}
                                        alt={selectedProduct.name}
                                        className="w-full h-[500px] object-cover"
                                    />
                                </div>

                                {/* Thumbnail Images */}
                                {selectedProduct.images.length > 1 && (
                                    <div className="flex gap-3">
                                        {selectedProduct.images.map((img, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentImageIndex(index)}
                                                className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${currentImageIndex === index
                                                    ? 'border-black scale-105'
                                                    : 'border-gray-300 hover:border-gray-500'
                                                    }`}
                                            >
                                                <img
                                                    src={img}
                                                    alt={`${selectedProduct.name} ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Right: Product Details */}
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-3xl font-bold text-black mb-2">{selectedProduct.name}</h2>
                                    <p className="text-2xl font-semibold text-gray-800">৳ {selectedProduct.price.toLocaleString()}</p>
                                </div>

                                <p className="text-gray-600 leading-relaxed">{selectedProduct.description}</p>

                                {/* Size Selection */}
                                <div>
                                    <h3 className="text-sm font-semibold text-black mb-3">SIZE</h3>
                                    <div className="flex gap-2">
                                        {selectedProduct.sizes.map((size) => (
                                            <button
                                                key={size}
                                                className="w-12 h-12 border-2 border-gray-300 rounded-lg hover:border-black hover:bg-black hover:text-white transition-all duration-300 font-medium"
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Color Selection */}
                                <div>
                                    <h3 className="text-sm font-semibold text-black mb-3">COLOR</h3>
                                    <div className="flex gap-2">
                                        {selectedProduct.colors.map((color) => (
                                            <button
                                                key={color}
                                                className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-black hover:bg-black hover:text-white transition-all duration-300 text-sm font-medium"
                                            >
                                                {color}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Quantity Selector */}
                                <div>
                                    <h3 className="text-sm font-semibold text-black mb-3">QUANTITY</h3>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={decrementQuantity}
                                            className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-all duration-300"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                                        <button
                                            onClick={incrementQuantity}
                                            className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-all duration-300"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-4 pt-4">
                                    <button className="flex-1 bg-white border-2 border-black text-black py-4 rounded-full font-semibold hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                                        <ShoppingCart className="w-5 h-5" />
                                        Add to Cart
                                    </button>
                                    <button className="flex-1 bg-black text-white py-4 rounded-full font-semibold hover:bg-gray-800 transition-all duration-300">
                                        Buy Now
                                    </button>
                                </div>

                                {/* Wishlist Button */}
                                <button className="w-full border-2 border-gray-300 text-black py-3 rounded-full font-semibold hover:border-black hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2">
                                    <Heart className="w-5 h-5" />
                                    Add to Wishlist
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { 
                        opacity: 0;
                        transform: translateY(50px);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
                .animate-slideUp {
                    animation: slideUp 0.4s ease-out;
                }
            `}</style>
        </>
    );
};

export default HomeArrivals;