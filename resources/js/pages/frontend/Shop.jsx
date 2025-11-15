import { useState } from 'react'
import Header from '../../common/Header';
import Footer from "../../common/Footer";
import { FaRegHeart, FaFilter } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import { FaRegEye } from "react-icons/fa";
import { Link } from "@inertiajs/react";
import NewCollection from "../../assets/image/new.jpg";
const Shop = () => {
    const [openFilters, setOpenFilters] = useState({});
    const [showFilter, setShowFilter] = useState(false);
    const [maxPrice, setMaxPrice] = useState(14900);

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
            <section className="pt-5 pb-5">
                <div className="flex flex-col md:flex-row">
                    {/* Filter Button for Mobile */}
                    <div className="md:hidden flex flex-col items-end pr-4 mb-4">
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2"
                            onClick={() => setShowFilter(!showFilter)}
                        >
                            Filter
                            <FaFilter />
                        </button>
                        <div
                            className={`transition-all duration-300 overflow-hidden bg-white shadow-md mt-3 rounded-lg ${showFilter ? "max-h-100 p-4 w-full md:w-96" : "max-h-0 p-0 w-full md:w-96"}`}
                        >
                            <div className="mb-2 border-b border-gray-500">
                                <button
                                    className="w-full flex justify-between items-center py-1 text-lg font-semibold"
                                    onClick={() => toggleFilter("Category")}
                                >
                                    Category
                                    <span>{openFilters["Category"] ? "-" : "+"}</span>
                                </button>
                                <div
                                    className={`transition-all duration-300 overflow-hidden ${openFilters["Category"] ? "max-h-40 p-2" : "max-h-0 p-0"}`}
                                >
                                    <div className="style={{ fontSize: '15px' }} text-gray-600">
                                        <label><input type="checkbox" /> MEN</label><br />
                                        <label><input type="checkbox" /> WOMEN</label><br />
                                        <label><input type="checkbox" /> KIDS</label><br />
                                        <label><input type="checkbox" /> NEWBORN</label><br />
                                        <label><input type="checkbox" /> FOOTWEAR</label><br />
                                        <label><input type="checkbox" /> ACCESSORIES</label><br />
                                        <label><input type="checkbox" /> SPRING 2025</label><br />
                                        <label><input type="checkbox" /> FESTIVE SPOT LIGHT</label><br />
                                        <label><input type="checkbox" /> KING COLLECTION</label>
                                    </div>
                                </div>
                            </div>
                            {/* Size */}
                            <div className="mb-2 border-b border-gray-500">
                                <button
                                    className="w-full flex justify-between items-center py-1 text-lg font-semibold"
                                    onClick={() => toggleFilter("Size")}
                                >
                                    Size
                                    <span>{openFilters["Size"] ? "-" : "+"}</span>
                                </button>
                                <div
                                    className={`transition-all duration-300 overflow-hidden ${openFilters["Size"] ? "max-h-40 p-2" : "max-h-0 p-0"}`}
                                >
                                    <div className="style={{ fontSize: '15px' }} text-gray-600">
                                        <label><input type="checkbox" /> S</label><br />
                                        <label><input type="checkbox" /> M</label><br />
                                        <label><input type="checkbox" /> L</label><br />
                                        <label><input type="checkbox" /> XL</label><br />
                                        <label><input type="checkbox" /> XXL</label>
                                    </div>
                                </div>
                            </div>

                            {/* Color */}
                            <div className="mb-2 border-b border-gray-500">
                                <button
                                    className="w-full flex justify-between items-center py-1 text-lg font-semibold"
                                    onClick={() => toggleFilter("Color")}
                                >
                                    Color
                                    <span>{openFilters["Color"] ? "-" : "+"}</span>
                                </button>
                                <div
                                    className={`transition-all duration-300 overflow-hidden ${openFilters["Color"] ? "max-h-40 p-2" : "max-h-0 p-0"}`}
                                >
                                    <div className="style={{ fontSize: '15px' }} text-gray-600">
                                        <label><input type="checkbox" /> Red</label><br />
                                        <label><input type="checkbox" /> Blue</label><br />
                                        <label><input type="checkbox" /> Green</label><br />
                                        <label><input type="checkbox" /> Yellow</label><br />
                                        <label><input type="checkbox" /> Black</label><br />
                                        <label><input type="checkbox" /> White</label>
                                    </div>
                                </div>
                            </div>

                            {/* Fabrication */}
                            <div className="mb-2 border-b border-gray-500">
                                <button
                                    className="w-full flex justify-between items-center py-1 text-lg font-semibold"
                                    onClick={() => toggleFilter("Fabrication")}
                                >
                                    Fabrication
                                    <span>{openFilters["Fabrication"] ? "-" : "+"}</span>
                                </button>
                                <div
                                    className={`transition-all duration-300 overflow-hidden ${openFilters["Fabrication"] ? "max-h-40 p-2" : "max-h-0 p-0"}`}
                                >
                                    <div className="style={{ fontSize: '15px' }} text-gray-600">
                                        <label><input type="checkbox" /> Cotton</label><br />
                                        <label><input type="checkbox" /> Polyester</label><br />
                                        <label><input type="checkbox" /> Silk</label><br />
                                        <label><input type="checkbox" /> Denim</label>
                                    </div>
                                </div>
                            </div>
                            {/* Price Range */}
                            <div className="text-sm text-gray-600 mt-5">
                                <div className="flex flex-col items-center">
                                    <input
                                        type="range"
                                        min="225"
                                        max="14900"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                                        className="w-full h-2 bg-purple-300 rounded-lg appearance-none cursor-pointer accent-purple-600"
                                    />
                                </div>
                                <div className="flex justify-end mt-3 text-sm font-medium text-gray-700">
                                    <span>৳{maxPrice}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Hidden on Small Screens */}
                    <div
                        className="w-90 bg-white shadow-md p-4 
        fixed top-0 right-0 h-[70vh] max-h-screen 
        overflow-y-auto hidden md:block md:relative 
        md:h-auto md:top-auto md:right-auto 
        transition-all duration-300"
                    >
                        {/* Category */}
                        <div className="mb-2 border-b border-gray-500">
                            <button
                                className="w-full flex justify-between items-center py-1 text-lg font-semibold"
                                onClick={() => toggleFilter("Category")}
                            >
                                Category
                                <span>{openFilters["Category"] ? "-" : "+"}</span>
                            </button>
                            <div
                                className={`transition-all duration-300 overflow-hidden ${openFilters["Category"] ? "max-h-40 p-2" : "max-h-0 p-0"}`}
                            >
                                <div className="style={{ fontSize: '15px' }} text-gray-600">
                                    <label><input type="checkbox" /> MEN</label><br />
                                    <label><input type="checkbox" /> WOMEN</label><br />
                                    <label><input type="checkbox" /> KIDS</label><br />
                                    <label><input type="checkbox" /> NEWBORN</label><br />
                                    <label><input type="checkbox" /> FOOTWEAR</label><br />
                                    <label><input type="checkbox" /> ACCESSORIES</label><br />
                                    <label><input type="checkbox" /> SPRING 2025</label><br />
                                    <label><input type="checkbox" /> FESTIVE SPOT LIGHT</label><br />
                                    <label><input type="checkbox" /> KING COLLECTION</label>
                                </div>
                            </div>
                        </div>
                        {/* Size */}
                        <div className="mb-2 border-b border-gray-500">
                            <button
                                className="w-full flex justify-between items-center py-1 text-lg font-semibold"
                                onClick={() => toggleFilter("Size")}
                            >
                                Size
                                <span>{openFilters["Size"] ? "-" : "+"}</span>
                            </button>
                            <div
                                className={`transition-all duration-300 overflow-hidden ${openFilters["Size"] ? "max-h-40 p-2" : "max-h-0 p-0"}`}
                            >
                                <div className="style={{ fontSize: '15px' }} text-gray-600">
                                    <label><input type="checkbox" /> S</label><br />
                                    <label><input type="checkbox" /> M</label><br />
                                    <label><input type="checkbox" /> L</label><br />
                                    <label><input type="checkbox" /> XL</label><br />
                                    <label><input type="checkbox" /> XXL</label>
                                </div>
                            </div>
                        </div>

                        {/* Color */}
                        <div className="mb-2 border-b border-gray-500">
                            <button
                                className="w-full flex justify-between items-center py-1 text-lg font-semibold"
                                onClick={() => toggleFilter("Color")}
                            >
                                Color
                                <span>{openFilters["Color"] ? "-" : "+"}</span>
                            </button>
                            <div
                                className={`transition-all duration-300 overflow-hidden ${openFilters["Color"] ? "max-h-40 p-2" : "max-h-0 p-0"}`}
                            >
                                <div className="style={{ fontSize: '15px' }} text-gray-600">
                                    <label><input type="checkbox" /> Red</label><br />
                                    <label><input type="checkbox" /> Blue</label><br />
                                    <label><input type="checkbox" /> Green</label><br />
                                    <label><input type="checkbox" /> Yellow</label><br />
                                    <label><input type="checkbox" /> Black</label><br />
                                    <label><input type="checkbox" /> White</label>
                                </div>
                            </div>
                        </div>

                        {/* Fabrication */}
                        <div className="mb-2 border-b border-gray-500">
                            <button
                                className="w-full flex justify-between items-center py-1 text-lg font-semibold"
                                onClick={() => toggleFilter("Fabrication")}
                            >
                                Fabrication
                                <span>{openFilters["Fabrication"] ? "-" : "+"}</span>
                            </button>
                            <div
                                className={`transition-all duration-300 overflow-hidden ${openFilters["Fabrication"] ? "max-h-40 p-2" : "max-h-0 p-0"}`}
                            >
                                <div className="style={{ fontSize: '15px' }} text-gray-600">
                                    <label><input type="checkbox" /> Cotton</label><br />
                                    <label><input type="checkbox" /> Polyester</label><br />
                                    <label><input type="checkbox" /> Silk</label><br />
                                    <label><input type="checkbox" /> Denim</label>
                                </div>
                            </div>
                        </div>
                        {/* Price Range */}
                        <div className="text-sm text-gray-600 mt-5">
                            <div className="flex flex-col items-center">
                                <input
                                    type="range"
                                    min="225"
                                    max="14900"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                                    className="w-full h-2 bg-purple-300 rounded-lg appearance-none cursor-pointer accent-purple-600"
                                />
                            </div>
                            <div className="flex justify-end mt-3 text-sm font-medium text-gray-700">
                                <span>৳{maxPrice}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="w-full p-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
                                <div key={index} className="hover_content relative group w-full">
                                    <img
                                        src={NewCollection}
                                        alt="Kurti"
                                        className="w-full h-auto transition-transform transform group-hover:scale-105"
                                    />
                                    <Link
                                        href="/wishlist"
                                        className="absolute top-2 right-2 text-gray-500 text-2xl cursor-pointer group-hover:opacity-100 opacity-0 transition-opacity duration-300 z-30"
                                    >
                                        <FaRegHeart />
                                    </Link>
                                    <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                                        <div className="flex gap-4 p-3 bg-white rounded-lg shadow-lg">
                                            <a href="#cart" className="text-black text-xl cursor-pointer hover:scale-110 transition-all">
                                                <GiShoppingCart />
                                            </a>
                                            <a href="#view" className="text-black text-xl cursor-pointer hover:scale-110 transition-all">
                                                <FaRegEye />
                                            </a>
                                        </div>
                                    </div>
                                    <a href="#" className="block text-center font-semibold hover:text-red-500 transition-all cursor-pointer mt-7">
                                        WOMENS WOVEN LONG KURTI
                                    </a>
                                    <p className="text-center text-gray-600 mt-2">৳ 2350</p>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center mt-15">
                            <nav aria-label="Page navigation">
                                <ul className="inline-flex items-center space-x-4">
                                    {[1, 2, 3].map((num) => (
                                        <li key={num}>
                                            <a
                                                href="#"
                                                className={`px-3 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-100 ${num === 2 ? "bg-blue-500 text-white" : "bg-white text-gray-700"
                                                    }`}
                                            >
                                                {num}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Part */}
            <Footer />
        </>
    )
}

export default Shop