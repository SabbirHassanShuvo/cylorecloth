import Header from '../../common/Header';
import Footer from "../../common/Footer";
import { useState } from 'react';
import { FaHeart } from "react-icons/fa";
import ProductImage from '../../assets/image/slider.jpg'
import ProductImage2 from '../../assets/image/new.jpg'
import ProductImage3 from '../../assets/image/hotproduct.webp'

import "swiper/css";
import "swiper/css/free-mode";

import "animate.css";
import DiscountProduct from '../../components/frontend/DiscountProduct';
const ProductDetails = () => {
    const product = {
        name: "Boy's Fusion Panjabi",
        price: 1965,
        color: "Wine Red",
        sizes: ["S", "M", "L", "XL", "XXL"],
        images: [
            ProductImage, ProductImage3, ProductImage2
        ],
    };

    const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
    const [selectedImage, setSelectedImage] = useState(product.images[0]);
    const [zoom, setZoom] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({ x: "50%", y: "50%" });

    // Mouse move
    const handleMouseMove = (e) => {
        if (!zoom) return;
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        setZoomPosition({ x: `${x}%`, y: `${y}%` });
    };

    const [openFilters, setOpenFilters] = useState({});
    const toggleFilter = (filterName) => {
        setOpenFilters((prev) => ({
            ...prev,
            [filterName]: !prev[filterName],
        }));
    };
    return (
        <>
            {/* Header Part */}
            <Header />
            <div className="container mx-auto py-20">
                <div className="flex flex-col md:flex-row max-w-6xl mx-auto gap-20">

                    {/* Image Section */}
                    <div className="relative w-full md:w-2/4 flex flex-col gap-2">
                        <div
                            className="relative w-full h-auto md:h-[500px] overflow-hidden rounded-lg cursor-pointer"
                            onMouseEnter={() => setZoom(true)}
                            onMouseLeave={() => setZoom(false)}
                            onMouseMove={handleMouseMove}
                        >
                            <img
                                src={selectedImage}
                                alt="Product"
                                className={`w-full h-full object-cover transition-transform duration-300 ${zoom ? "scale-150" : "scale-100"
                                    }`}
                                style={{
                                    transformOrigin: `${zoomPosition.x} ${zoomPosition.y}`,
                                }}
                            />
                        </div>

                        <div className="flex gap-2">
                            {product.images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt="thumb"
                                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${selectedImage === img ? "border-black" : "border-gray-200"
                                        }`}
                                    onClick={() => setSelectedImage(img)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="w-full md:w-3/5 space-y-4 mt-3 py-6 px-3">
                        <h2 className="text-3xl font-semibold">{product.name}</h2>

                        {/* Price Section */}
                        <div className="flex flex-col gap-1">
                            <p className="text-lg text-gray-500">
                                Regular Price: <span className="line-through">৳ {product.price}</span>
                            </p>
                            <p className="text-xl font-bold text-red-600 py-2">
                                Discount Price: <span className="text-black">৳ {product.discountPrice}</span>
                            </p>
                            <span className="bg-green-600 text-white px-2 py-1 rounded-md text-sm w-fit">
                                Save {Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
                            </span>
                        </div>

                        <p className="text-gray-700 text-lg">Color: {product.color}</p>

                        {/* Size Selection */}
                        <div>
                            <p className="text-md font-medium text-gray-700 mb-2">Select Size:</p>
                            <div className="flex gap-2 flex-wrap">
                                {product.sizes.map((size, index) => (
                                    <button
                                        key={index}
                                        className={`px-4 py-2 border rounded-lg cursor-pointer text-lg ${selectedSize === size ? "bg-black text-white" : "bg-gray-100"
                                            }`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Add to Cart and Wishlist Buttons */}
                        <div className="flex gap-4 mt-4 py-5">
                            <a href="#" className="w-[150px] bg-black text-white py-3 rounded-full text-sm font-medium uppercase text-center transition-transform duration-300 hover:scale-105 hover:bg-gray-800">
                                ADD TO CART
                            </a>
                            <a
                                href="#"
                                className="flex items-center justify-center space-x-2 bg-gray-300 text-black py-3 px-4 rounded-lg text-sm font-medium transition duration-300 hover:bg-gray-400"
                            >
                                <FaHeart className="h-5 w-5 text-red-500" />
                                <span>WISHLIST</span>
                            </a>
                        </div>

                        <div
                            className="transition-all duration-300 overflow-hidden bg-white shadow-md mt-3 rounded-lg p-5"
                        >
                            <div className="mb-2 border-b border-gray-500">
                                <button
                                    className="w-full flex justify-between items-center py-1 text-lg font-semibold"
                                    onClick={() => toggleFilter("Description")}
                                >
                                    Description
                                    <span>{openFilters["Description"] ? "-" : "+"}</span>
                                </button>
                                <div
                                    className={`transition-all duration-300 overflow-hidden ${openFilters["Description"] ? "max-h-40 p-2" : "max-h-0 p-0"}`}
                                >
                                    <div className="style={{ fontSize: '15px' }} text-gray-600">
                                        <p>Bring a touch of tradition to your wardrobe with this Premium Panjabi. Made from 100% soft and breathable cotton, it is perfect for any occasion. The Panjabi features gorgeous designs, adding a touch of elegance to the simple yet sophisticated design. The Golden Color is neutral and versatile, making it easy to style. With a comfortable Slim fit, it is both practical and stylish. Available in sizes 38 to 46, you’re sure to find the perfect size for you.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-2 border-b border-gray-500">
                                <button
                                    className="w-full flex justify-between items-center py-1 text-lg font-semibold"
                                    onClick={() => toggleFilter("Retrun Police")}
                                >
                                    Retrun Police
                                    <span>{openFilters["Retrun Police"] ? "-" : "+"}</span>
                                </button>
                                <div
                                    className={`transition-all duration-300 overflow-hidden ${openFilters["Retrun Police"] ? "max-h-40 p-2" : "max-h-0 p-0"}`}
                                >
                                    <div className="style={{ fontSize: '15px' }} text-gray-600">
                                        <p>Bring a touch of tradition to your wardrobe with this Premium Panjabi. Made from 100% soft and breathable cotton, it is perfect for any occasion. The Panjabi features gorgeous designs, adding a touch of elegance to the simple yet sophisticated design. The Golden Color is neutral and versatile, making it easy to style. With a comfortable Slim fit, it is both practical and stylish. Available in sizes 38 to 46, you’re sure to find the perfect size for you.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {/* DisCount Project */}
                <DiscountProduct />
            </div>
            {/* Footer Part */}
            <Footer />
        </>
    )
}

export default ProductDetails