import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FaBars, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import { IoIosSearch, IoMdPerson } from 'react-icons/io';
import { MdHomeFilled } from 'react-icons/md';
import Logo from '../assets/image/logo.jpg';
const Header = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [openFilters, setOpenFilters] = useState({});
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef(null);
    const [isScrolled, setIsScrolled] = useState(false);

    const toggleFilter = (filterName) => {
        setOpenFilters((prev) => ({
            ...prev,
            [filterName]: !prev[filterName],
        }));
    };

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 200); // 200ms delay before hiding
    };
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <>
            <div className={`${isScrolled ? 'hidden' : 'block'}`}>
                <div className="bg-[#1a1d35] py-1 text-center text-sm tracking-wide text-white uppercase">
                    Unveil Your True Style with Cylore Luxurious Collection
                </div>

                <div className="bg-[#e9e9e9]">
                    <div className="container mx-auto flex flex-wrap items-center justify-between px-4 py-2">
                        {/* Logo / Title */}
                        <h5 className="text-xs font-medium text-gray-600 sm:text-lg">Welcome to Cylore Luxury House!</h5>

                        {/* Navigation Links */}
                        <div className="mt-2 flex flex-wrap justify-center space-x-4 text-sm text-gray-500 sm:mt-0 sm:justify-end sm:space-x-6">
                            <Link href="login" className="hover:text-black">
                                Log In
                            </Link>
                            <a href="#" className="hover:text-black">
                                About Us
                            </a>
                            <a href="#" className="hover:text-black">
                                My Wishlist
                            </a>
                            <a href="#" className="hover:text-black">
                                Cart
                            </a>
                            <a href="#" className="hover:text-black">
                                Compare (0)
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Background Overlay */}

            <div className={`w-full bg-white shadow-md transition-all duration-300 ${isScrolled ? 'fixed top-0 left-0 z-50 md:fixed' : 'relative'}`}>
                <div className="container mx-auto flex items-center justify-between px-4 py-4">
                    {/* Sidebar Toggle (Mobile) */}
                    <button onClick={() => setIsMenuOpen(true)} className="text-xl md:hidden">
                        <FaBars />
                    </button>

                    {/* Logo */}
                    <div className="text-2xl font-bold text-gray-700">
                        <img src={Logo} alt="logo" className="h-10 w-24" />
                    </div>

                    {/* Search Icon (Mobile) */}
                    <button
                        onClick={() => {
                            setIsSearchOpen(true);
                        }}
                        className="text-xl md:hidden"
                    >
                        <IoIosSearch />
                    </button>

                    {/* Animated Search Box (Header-এর নিচে) */}
                    {isSearchOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute top-26 left-0 z-10 w-full bg-white p-2 shadow-md"
                        >
                            <div className="mx-auto flex w-4/5 items-center rounded-full border border-gray-300 bg-gray-100">
                                <input type="text" placeholder="Search..." className="w-full bg-gray-100 px-4 py-0 text-lg outline-none" />
                                <button className="px-4 py-2 text-gray-500" onClick={() => setIsSearchOpen(false)}>
                                    ✖
                                </button>
                            </div>
                        </motion.div>
                    )}
                    {/* Search Bar (Desktop) */}
                    <div className="hidden w-1/2 items-center overflow-hidden rounded-full border border-gray-300 bg-white md:flex">
                        <input type="text" placeholder="Search" className="w-full bg-white px-4 py-2 text-sm outline-none" />
                        <button className="px-4 py-2 text-gray-500">
                            <IoIosSearch className="h-5 w-5 cursor-pointer" />
                        </button>
                    </div>
                    <div className="mt-2 hidden items-center space-x-4 sm:mt-0 sm:space-x-6 md:flex">
                        {/* Profile Section */}
                        <div className="ml-6 flex items-center space-x-2">
                            <a href="#" className="flex items-center space-x-2 rounded-md border border-gray-300 p-1">
                                <img src={Logo} alt="logo" className="h-8 w-8 rounded-full border border-gray-300 sm:h-10 sm:w-10" />
                                <span className="text-xs sm:text-sm">
                                    Hello,
                                    <p className="font-bold">Md Sabbir</p>
                                </span>
                            </a>
                        </div>

                        {/* Wishlist Icon with Badge */}
                        <div className="relative">
                            <a href="#">
                                <FaRegHeart className="text-lg text-gray-600 sm:text-xl" />
                                <span className="absolute -top-2 -right-2 rounded-full bg-red-500 px-1 text-xs text-white">0</span>
                            </a>
                        </div>

                        {/* Shopping Cart Icon with Badge */}
                        <div className="relative">
                            <a href="#">
                                <FaShoppingCart className="text-lg text-gray-600 sm:text-xl" />
                                <span className="absolute -top-2 -right-2 rounded-full bg-red-500 px-1 text-xs text-white">0</span>
                            </a>
                        </div>
                    </div>
                </div>
                <nav className="relative hidden bg-white p-4 shadow-md md:block">
                    <div className="container mx-auto flex justify-center space-x-6" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <a href="#" className="font-medium text-gray-700 hover:text-gray-900">
                            MEN
                        </a>
                        <a href="#" className="font-medium text-gray-700 hover:text-red-500">
                            WOMEN
                        </a>
                        <a href="#" className="font-medium text-gray-700 hover:text-gray-900">
                            KIDS
                        </a>
                        <a href="#" className="font-medium text-gray-700 hover:text-gray-900">
                            NEWBORN
                        </a>
                        <a href="#" className="font-medium text-gray-700 hover:text-gray-900">
                            FOOTWEAR
                        </a>
                        <a href="#" className="font-medium text-gray-700 hover:text-gray-900">
                            ACCESSORIES
                        </a>
                        <a href="#" className="font-medium text-gray-700 hover:text-gray-900">
                            SPRING 2025
                        </a>
                    </div>

                    {/* Sub-category Dropdown */}
                    {isOpen && (
                        <div
                            className="absolute top-full left-0 z-10 grid w-full scale-95 transform grid-cols-4 gap-4 bg-white p-6 shadow-lg transition-all duration-300 hover:scale-100"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div>
                                <h3 className="font-bold text-gray-800">TOP</h3>
                                <ul>
                                    <li className="cursor-pointer hover:text-red-500">Crop Top</li>
                                    <li className="cursor-pointer hover:text-red-500">Short Top</li>
                                    <li className="cursor-pointer hover:text-red-500">Long Top</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800">BOTTOM</h3>
                                <ul>
                                    <li className="cursor-pointer hover:text-red-500">Fashion Pant</li>
                                    <li className="cursor-pointer hover:text-red-500">Pajama</li>
                                    <li className="cursor-pointer hover:text-red-500">Palazzo</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800">BAGS</h3>
                                <ul>
                                    <li className="cursor-pointer hover:text-red-500">Tote Bag</li>
                                    <li className="cursor-pointer hover:text-red-500">Shoulder Bag</li>
                                    <li className="cursor-pointer hover:text-red-500">Backpack</li>
                                </ul>
                            </div>
                            <div>
                                <img src={Logo} alt="Fashion" className="rounded-lg" />
                            </div>
                        </div>
                    )}
                </nav>
            </div>
            <div className={`${isScrolled ? 'mt-20 md:mt-28' : ''}`} />
            {/* Sidebar Menu */}
            {isMenuOpen && (
                <div className="fixed top-0 left-0 z-50 h-full w-64 bg-white p-3 shadow-lg">
                    <button onClick={() => setIsMenuOpen(false)} className="absolute right-4 mb-2 text-lg">
                        ✖
                    </button>

                    <nav className="mt-9 space-y-2 rounded-lg text-black">
                        {/* Category */}
                        <div className="mb-2 border-b border-gray-500">
                            <button
                                className="flex w-full items-center justify-between py-1 text-lg font-semibold"
                                onClick={() => toggleFilter('Category')}
                            >
                                Category
                                <span>{openFilters['Category'] ? '-' : '+'}</span>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ${openFilters['Category'] ? 'max-h-40 p-2' : 'max-h-0 p-0'}`}
                            >
                                <div className="style={{ fontSize: '15px' }} text-gray-600">
                                    <label>
                                        <input type="checkbox" /> MEN
                                    </label>
                                    <br />
                                    <label>
                                        <input type="checkbox" /> WOMEN
                                    </label>
                                    <br />
                                    <label>
                                        <input type="checkbox" /> KIDS
                                    </label>
                                    <br />
                                    <label>
                                        <input type="checkbox" /> NEWBORN
                                    </label>
                                    <br />
                                    <label>
                                        <input type="checkbox" /> FOOTWEAR
                                    </label>
                                    <br />
                                    <label>
                                        <input type="checkbox" /> ACCESSORIES
                                    </label>
                                    <br />
                                    <label>
                                        <input type="checkbox" /> SPRING 2025
                                    </label>
                                    <br />
                                    <label>
                                        <input type="checkbox" /> FESTIVE SPOT LIGHT
                                    </label>
                                    <br />
                                    <label>
                                        <input type="checkbox" /> KING COLLECTION
                                    </label>
                                </div>
                            </div>
                        </div>
                        {/* Size */}
                        <div className="mb-2 border-b border-gray-500">
                            <button
                                className="flex w-full items-center justify-between py-1 text-lg font-semibold"
                                onClick={() => toggleFilter('Size')}
                            >
                                Size
                                <span>{openFilters['Size'] ? '-' : '+'}</span>
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ${openFilters['Size'] ? 'max-h-40 p-2' : 'max-h-0 p-0'}`}>
                                <div className="style={{ fontSize: '15px' }} text-gray-600">
                                    <label>
                                        <input type="checkbox" /> S
                                    </label>
                                    <br />
                                    <label>
                                        <input type="checkbox" /> M
                                    </label>
                                    <br />
                                    <label>
                                        <input type="checkbox" /> L
                                    </label>
                                    <br />
                                    <label>
                                        <input type="checkbox" /> XL
                                    </label>
                                    <br />
                                    <label>
                                        <input type="checkbox" /> XXL
                                    </label>
                                </div>
                            </div>
                        </div>
                        {/* Color */}
                        <div className="mb-2 border-b border-gray-500">
                            <button
                                className="flex w-full items-center justify-between py-1 text-lg font-semibold"
                                onClick={() => toggleFilter('Color')}
                            >
                                Color
                                <span>{openFilters['Color'] ? '-' : '+'}</span>
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ${openFilters['Color'] ? 'max-h-40 p-2' : 'max-h-0 p-0'}`}>
                                <div className="style={{ fontSize: '15px' }} text-gray-600">
                                    <label>
                                        <input type="checkbox" /> Red
                                    </label>
                                    <br />
                                    <label>
                                        <input type="checkbox" /> Blue
                                    </label>
                                    <br />
                                    <label>
                                        <input type="checkbox" /> Green
                                    </label>
                                    <br />
                                    <label>
                                        <input type="checkbox" /> Yellow
                                    </label>
                                    <br />
                                    <label>
                                        <input type="checkbox" /> Black
                                    </label>
                                    <br />
                                    <label>
                                        <input type="checkbox" /> White
                                    </label>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            )}

            {/* Fixed Footer Menu */}
            <div className="fixed bottom-0 z-10 block flex w-full items-center justify-around bg-white p-3 text-gray-700 shadow-md md:hidden">
                <a href="#" className="flex flex-col items-center">
                    <MdHomeFilled className="text-2xl" />
                    <span className="text-xs">Home</span>
                </a>
                <a href="#" className="relative flex flex-col items-center">
                    <FaRegHeart className="text-2xl" />
                    <span className="absolute -top-2 -right-2 rounded-full bg-red-500 px-1 text-xs text-white">0</span>
                    <span className="text-xs">Wishlist</span>
                </a>
                <a href="#" className="relative flex flex-col items-center">
                    <FaShoppingCart className="text-2xl" />
                    <span className="absolute -top-2 -right-2 rounded-full bg-red-500 px-1 text-xs text-white">0</span>
                    <span className="text-xs">Cart</span>
                </a>
                <a href="#" className="flex flex-col items-center">
                    <IoMdPerson className="text-2xl" />
                    <span className="text-xs">Profile</span>
                </a>
            </div>
        </>
    );
};

export default Header;
