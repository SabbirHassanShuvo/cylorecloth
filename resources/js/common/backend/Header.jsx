import { useState } from "react";
import { FaRegHeart, FaShoppingCart, FaBars } from "react-icons/fa";
import Logo from "../../assets/image/logo.jpg";
import { Link } from "@inertiajs/react";
import { RiBarChart2Fill } from "react-icons/ri";
import { usePage } from '@inertiajs/react';
const Header = () => {
    const { auth } = usePage().props;
    const userImage = auth?.user?.account?.image || '/default-profile.png';
    const userName = auth?.user?.name || 'Guest';
    console.log('Account Data:', auth.user?.account);
    const [openFilters, setOpenFilters] = useState({});
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleFilter = (filterName) => {
        setOpenFilters((prev) => ({
            ...prev,
            [filterName]: !prev[filterName],
        }));
    };
    return (
        <>
            <div className="w-full bg-white shadow-md transition-all duration-300">
                <div className="container mx-auto flex justify-between items-center py-4 px-4">
                    {/* Sidebar Toggle (Mobile) */}
                    <button onClick={() => setIsMenuOpen(true)} className="md:hidden text-xl">
                        <FaBars />
                    </button>

                    {/* Logo */}
                    <div className="text-2xl font-bold text-gray-700">
                        <img src={Logo} alt="logo" className="w-24 h-10" />
                    </div>
                    {/* Search Icon (Mobile) */}
                    <Link href="/search"
                        className="md:hidden text-xl"
                    >
                        <RiBarChart2Fill />
                    </Link>
                    {/* Search Bar (Desktop) */}
                    <div className="hidden md:flex  items-center justify-center">
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Welcome to <span className="text-blue-600 font-bold">Cylore</span> Dashboard!
                        </h1>
                    </div>

                    <div className="hidden md:flex items-center space-x-4 sm:space-x-6 mt-2 sm:mt-0">
                        {/* Profile Section */}
                        <div className="flex items-center space-x-2 ml-6">
                            <a href="/account" className="flex items-center space-x-2 border border-gray-300 rounded-md p-1">
                                <img
                                    src={userImage}
                                    alt="Profile"
                                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300"
                                />
                                <span className="text-xs sm:text-sm">
                                    Hello,
                                    <p className="font-bold">{userName}</p>
                                </span>
                            </a>
                        </div>

                        {/* Wishlist Icon with Badge */}
                        <div className="relative">
                            <a href="#">
                                <FaRegHeart className="text-gray-600 text-lg sm:text-xl" />
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">0</span>
                            </a>
                        </div>

                        {/* Shopping Cart Icon with Badge */}
                        <div className="relative">
                            <a href="#">
                                <FaShoppingCart className="text-gray-600 text-lg sm:text-xl" />
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">0</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Sidebar (Only open when isMenuOpen is true) */}
                {isMenuOpen && (
                    <div className="fixed left-0 top-0 w-80 h-full bg-white z-50 p-3 shadow-lg">
                        <button onClick={() => setIsMenuOpen(false)} className="text-lg mb-2 absolute right-4">✖</button>

                        <nav className="mt-9 space-y-2 text-black rounded-lg">
                            {/* User */}
                            <div className="mb-2 border-b border-gray-500">
                                <button
                                    className="w-full flex justify-between items-center py-1 text-lg font-semibold"
                                    onClick={() => toggleFilter("User")}
                                >
                                    User Manage
                                    <span>{openFilters["User"] ? "-" : "+"}</span>
                                </button>
                                <div
                                    className={`transition-all duration-300 overflow-hidden ${openFilters["User"] ? "max-h-40 p-2" : "max-h-0 p-0"}`}
                                >
                                    <div className="style={{ fontSize: '15px' }} text-gray-600">
                                        <Link>Create User</Link>
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
                        </nav >
                    </div>
                )}
            </div>
        </>
    )
}

export default Header