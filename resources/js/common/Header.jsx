import { Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FaBars, FaRegHeart, FaShoppingCart, FaMoon, FaSun } from 'react-icons/fa';
import { IoIosSearch, IoMdPerson, IoMdClose } from 'react-icons/io';
import { MdHomeFilled, MdKeyboardArrowDown } from 'react-icons/md';
import Logo from '../assets/image/logo.jpg';

const Header = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [openFilters, setOpenFilters] = useState({});
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState('');
    const [isDark, setIsDark] = useState(false);
    const timeoutRef = useRef(null);
    const [isScrolled, setIsScrolled] = useState(false);

    const categories = [
        'MEN', 'WOMEN', 'KIDS', 'NEWBORN', 'FOOTWEAR', 'ACCESSORIES', 'SPRING 2025'
    ];

    const subcategories = {
        TOP: ['Crop Top', 'Short Top', 'Long Top', 'Casual Tees', 'Formal Shirts'],
        BOTTOM: ['Fashion Pant', 'Pajama', 'Palazzo', 'Denim Jeans', 'Leggings'],
        BAGS: ['Tote Bag', 'Shoulder Bag', 'Backpack', 'Clutch', 'Travel Bags'],
        FEATURED: ['New Arrivals', 'Best Sellers', 'Trending', 'Limited Edition']
    };

    const mobileMenuItems = [
        {
            title: 'ABOUT US',
            items: ['Sailor Club', 'Brand Social Responsibilities (BSR)', 'Join Us']
        },
        {
            title: 'SHOPPING INFORMATION',
            items: ['Privacy Policy Page', 'Size Guide', 'How To Shop']
        },
        {
            title: 'SERVICE INFORMATION',
            items: ['Return And Exchange', 'Shipping & Charges', 'Customer Service', 'Terms And Conditions', 'Store Locator']
        },
        {
            title: 'Category',
            items: ['MEN', 'WOMEN', 'KIDS', 'NEWBORN', 'FOOTWEAR', 'ACCESSORIES', 'SPRING 2025']
        },
        {
            title: 'Size',
            items: ['S', 'M', 'L', 'XL', 'XXL']
        },
        {
            title: 'Color',
            items: ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White']
        }
    ];

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
            setActiveCategory('');
        }, 300);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    // Theme classes
    const bgPrimary = isDark ? 'bg-slate-900' : 'bg-white';
    const bgSecondary = isDark ? 'bg-slate-800' : 'bg-gray-50';
    const textPrimary = isDark ? 'text-white' : 'text-gray-900';
    const textSecondary = isDark ? 'text-gray-300' : 'text-gray-600';
    const border = isDark ? 'border-slate-700' : 'border-gray-200';
    const hoverBg = isDark ? 'hover:bg-slate-700' : 'hover:bg-gray-100';

    return (
        <>
            {/* Top Banner */}
            <AnimatePresence>
                {!isScrolled && (
                    <motion.div
                        initial={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className={`py-2.5 text-center ${isDark ? 'bg-slate-800' : 'bg-slate-900'}`}>
                            <motion.p
                                animate={{ opacity: [1, 0.8, 1] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="text-xs font-medium tracking-widest text-white sm:text-sm"
                            >
                                ✨ FREE SHIPPING ON ORDERS OVER $99 | NEW ARRIVALS EVERY WEEK ✨
                            </motion.p>
                        </div>

                        <div className={`${border} ${bgPrimary} border-b`}>
                            <div className="container mx-auto flex flex-wrap items-center justify-between px-4 py-2.5">
                                <motion.h5
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`text-xs font-medium sm:text-sm ${textSecondary}`}
                                >
                                    Welcome to Cylore Luxury House
                                </motion.h5>

                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="mt-2 flex flex-wrap items-center justify-center gap-4 text-xs sm:mt-0 sm:justify-end sm:text-sm"
                                >
                                    <motion.div whileHover={{ y: -1 }}>
                                        <Link href="login" className={`font-medium transition-colors ${textSecondary} ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`}>
                                            Log In
                                        </Link>
                                    </motion.div>
                                    {['About Us', 'My Wishlist', 'Cart', 'Compare (0)'].map((item) => (
                                        <motion.a
                                            key={item}
                                            href="#"
                                            whileHover={{ y: -1 }}
                                            className={`font-medium transition-colors ${textSecondary} ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`}
                                        >
                                            {item}
                                        </motion.a>
                                    ))}
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Header */}
            <motion.div
                animate={{
                    backgroundColor: isDark ?
                        (isScrolled ? 'rgba(15, 23, 42, 0.98)' : 'rgba(15, 23, 42, 1)') :
                        (isScrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 1)'),
                    boxShadow: isScrolled
                        ? '0 4px 20px rgba(0, 0, 0, 0.15)'
                        : '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}
                className={`w-full ${border} border-b transition-all duration-300 ${isScrolled ? 'fixed left-0 top-0 z-50 backdrop-blur-md' : 'relative'
                    }`}
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between py-4">
                        {/* Mobile Menu */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsMenuOpen(true)}
                            className={`rounded-lg p-2 transition-colors md:hidden ${textPrimary} ${hoverBg}`}
                        >
                            <FaBars className="text-xl" />
                        </motion.button>

                        {/* Logo */}
                        <motion.div whileHover={{ scale: 1.02 }} className="flex items-center">
                            <Link href="/">
                                <img src={Logo} alt="Cylore Logo" className="h-10 w-24 object-contain sm:h-12 sm:w-28" />
                            </Link>
                        </motion.div>

                        {/* Mobile Search */}
                        <div className="flex items-center space-x-2 md:hidden">
                            {/* Dark Mode Toggle */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsDark(!isDark)}
                                className={`rounded-lg p-2 transition-colors ${textPrimary} ${hoverBg}`}
                            >
                                {isDark ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className={`rounded-lg p-2 transition-colors ${textPrimary} ${hoverBg}`}
                            >
                                {isSearchOpen ? <IoMdClose className="text-xl" /> : <IoIosSearch className="text-xl" />}
                            </motion.button>
                        </div>

                        {/* Desktop Search */}
                        <div className="hidden w-full max-w-xl md:block">
                            <motion.div whileFocus={{ scale: 1.01 }} className="relative">
                                <input
                                    type="text"
                                    placeholder="Search for products, brands and more..."
                                    className={`w-full rounded-lg ${border} border py-2.5 pl-4 pr-12 text-sm outline-none transition-all ${isDark ? 'bg-slate-800 text-white placeholder-gray-400 focus:bg-slate-700' : 'bg-gray-50 text-gray-900 focus:bg-white'
                                        } focus:border-gray-400 focus:shadow-md`}
                                />
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className={`absolute right-3 top-1/2 -translate-y-1/2 ${textSecondary}`}
                                >
                                    <IoIosSearch className="text-xl" />
                                </motion.button>
                            </motion.div>
                        </div>

                        {/* Desktop Actions */}
                        <div className="hidden items-center space-x-6 md:flex">
                            {/* Dark Mode Toggle */}
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 360 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsDark(!isDark)}
                                className={`rounded-full p-2 transition-colors ${isDark ? 'bg-slate-700 text-yellow-400' : 'bg-gray-100 text-gray-700'}`}
                            >
                                {isDark ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
                            </motion.button>

                            {/* Profile */}
                            <motion.div whileHover={{ y: -2 }}>
                                <a href="#" className={`group flex items-center space-x-2 rounded-lg ${border} border ${bgPrimary} px-3 py-2 shadow-sm transition-all hover:shadow-md`}>
                                    <div className={`relative h-9 w-9 overflow-hidden rounded-full ${isDark ? 'bg-slate-700' : 'bg-gray-200'}`}>
                                        <img src={Logo} alt="Profile" className="h-full w-full object-cover" />
                                    </div>
                                    <div className="text-left">
                                        <p className={`text-xs ${textSecondary}`}>Hello,</p>
                                        <p className={`text-sm font-semibold ${textPrimary}`}>Md Sabbir</p>
                                    </div>
                                </a>
                            </motion.div>

                            {/* Wishlist */}
                            <motion.div whileHover={{ y: -2 }} className="relative">
                                <motion.a href="#" whileHover={{ scale: 1.05 }} className="flex flex-col items-center">
                                    <div className="relative">
                                        <FaRegHeart className={`text-2xl ${textPrimary}`} />
                                        <motion.span
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ repeat: Infinity, duration: 2 }}
                                            className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white shadow-lg"
                                        >
                                            0
                                        </motion.span>
                                    </div>
                                    <span className={`mt-0.5 text-xs font-medium ${textSecondary}`}>Wishlist</span>
                                </motion.a>
                            </motion.div>

                            {/* Cart */}
                            <motion.div whileHover={{ y: -2 }} className="relative">
                                <motion.a href="#" whileHover={{ scale: 1.05 }} className="flex flex-col items-center">
                                    <div className="relative">
                                        <FaShoppingCart className={`text-2xl ${textPrimary}`} />
                                        <motion.span
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                                            className={`absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-medium text-white shadow-lg ${isDark ? 'bg-slate-600' : 'bg-slate-800'}`}
                                        >
                                            0
                                        </motion.span>
                                    </div>
                                    <span className={`mt-0.5 text-xs font-medium ${textSecondary}`}>Cart</span>
                                </motion.a>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Mobile Search Dropdown */}
                <AnimatePresence>
                    {isSearchOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className={`${border} ${bgPrimary} border-t md:hidden`}
                        >
                            <div className="container mx-auto px-4 py-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        className={`w-full rounded-lg ${border} border py-3 pl-4 pr-12 text-sm outline-none ${isDark ? 'bg-slate-800 text-white placeholder-gray-400' : 'bg-gray-50 text-gray-900'
                                            }`}
                                        autoFocus
                                    />
                                    <IoIosSearch className={`absolute right-4 top-1/2 -translate-y-1/2 text-xl ${textSecondary}`} />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Desktop Navigation */}
                <nav className={`hidden ${border} ${bgPrimary} border-t md:block`}>
                    <div className="container mx-auto" onMouseLeave={handleMouseLeave}>
                        <div className="flex items-center justify-center space-x-8 py-3">
                            {categories.map((cat, idx) => (
                                <motion.a
                                    key={cat}
                                    href="#"
                                    onMouseEnter={() => {
                                        handleMouseEnter();
                                        setActiveCategory(cat);
                                    }}
                                    whileHover={{ y: -2 }}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className={`group relative px-2 py-2 text-sm font-semibold transition-colors ${textPrimary}`}
                                >
                                    {cat}
                                    {activeCategory === cat && isOpen && (
                                        <motion.div
                                            layoutId="activeNav"
                                            className={`absolute -bottom-3 left-0 right-0 h-0.5 ${isDark ? 'bg-white' : 'bg-slate-900'}`}
                                        />
                                    )}
                                </motion.a>
                            ))}
                        </div>

                        {/* Mega Menu */}
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className={`absolute left-0 top-full z-50 w-full ${border} ${bgPrimary} border-t shadow-xl`}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <div className="container mx-auto px-4 py-8">
                                        <div className="grid grid-cols-4 gap-8">
                                            {Object.entries(subcategories).map(([title, items], idx) => (
                                                <motion.div
                                                    key={title}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: idx * 0.05 }}
                                                >
                                                    <h3 className={`mb-3 text-sm font-bold uppercase tracking-wide ${textPrimary}`}>
                                                        {title}
                                                    </h3>
                                                    <ul className="space-y-2">
                                                        {items.map((item) => (
                                                            <li key={item}>
                                                                <motion.a
                                                                    href="#"
                                                                    whileHover={{ x: 4 }}
                                                                    className={`text-sm transition-colors ${textSecondary} ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`}
                                                                >
                                                                    {item}
                                                                </motion.a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </nav>
            </motion.div>

            {/* Spacer */}
            {isScrolled && <div className="h-16 md:h-24" />}

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className={`fixed left-0 top-0 z-50 h-full w-[85%] max-w-sm overflow-y-auto shadow-2xl md:hidden ${bgPrimary}`}
                        >
                            {/* Header */}
                            <div className={`sticky top-0 z-10 ${border} ${bgPrimary} border-b p-4 shadow-sm`}>
                                <div className="flex items-center justify-between">
                                    <img src={Logo} alt="Cylore" className="h-10 w-20 object-contain" />
                                    <div className="flex items-center space-x-2">
                                        <motion.button
                                            whileHover={{ scale: 1.1, rotate: 360 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setIsDark(!isDark)}
                                            className={`rounded-lg p-2 ${isDark ? 'bg-slate-700 text-yellow-400' : 'bg-gray-100 text-gray-700'}`}
                                        >
                                            {isDark ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setIsMenuOpen(false)}
                                            className={`rounded-lg p-2 ${hoverBg} ${textPrimary}`}
                                        >
                                            <IoMdClose className="text-xl" />
                                        </motion.button>
                                    </div>
                                </div>
                            </div>

                            {/* Profile */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className={`mx-4 mt-4 rounded-lg ${border} ${bgSecondary} border p-4 shadow-sm`}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className={`h-12 w-12 overflow-hidden rounded-full ${border} border-2`}>
                                        <img src={Logo} alt="Profile" className="h-full w-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <p className={`text-sm font-semibold ${textPrimary}`}>Md Sabbir</p>
                                        <p className={`text-xs ${textSecondary}`}>sabbir@example.com</p>
                                        <Link href="/login" className={`mt-1 inline-block text-xs font-medium ${textPrimary}`}>
                                            View Profile →
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Search */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 }}
                                className="mx-4 mt-4"
                            >
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        className={`w-full rounded-lg ${border} ${bgSecondary} border py-2.5 pl-4 pr-12 text-sm outline-none transition-all ${textPrimary} ${isDark ? 'focus:bg-slate-700' : 'focus:bg-white'}`}
                                    />
                                    <IoIosSearch className={`absolute right-4 top-1/2 -translate-y-1/2 text-xl ${textSecondary}`} />
                                </div>
                            </motion.div>

                            {/* Stats */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="mx-4 mt-4 grid grid-cols-3 gap-3"
                            >
                                {[
                                    { label: 'Wishlist', count: 2 },
                                    { label: 'Cart', count: 2 },
                                    { label: 'Orders', count: 5 }
                                ].map((stat) => (
                                    <div key={stat.label} className={`rounded-lg ${border} ${bgSecondary} border p-3 text-center shadow-sm`}>
                                        <p className={`text-lg font-bold ${textPrimary}`}>{stat.count}</p>
                                        <p className={`text-[10px] font-medium ${textSecondary}`}>{stat.label}</p>
                                    </div>
                                ))}
                            </motion.div>

                            {/* Menu */}
                            <div className="mt-4 px-4 pb-6">
                                {mobileMenuItems.map((section, idx) => (
                                    <motion.div
                                        key={section.title}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.25 + idx * 0.05 }}
                                        className="mb-2"
                                    >
                                        <motion.button
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                            className={`flex w-full items-center justify-between rounded-lg ${border} ${bgSecondary} border p-3.5 font-semibold shadow-sm transition-all ${textPrimary}`}
                                            onClick={() => toggleFilter(section.title)}
                                        >
                                            <span className="text-sm uppercase tracking-wide">{section.title}</span>
                                            <motion.div
                                                animate={{ rotate: openFilters[section.title] ? 180 : 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <MdKeyboardArrowDown className={`text-xl ${textSecondary}`} />
                                            </motion.div>
                                        </motion.button>
                                        <AnimatePresence>
                                            {openFilters[section.title] && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className={`mt-2 space-y-1 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-white'} p-3 shadow-inner`}>
                                                        {section.items.map((item, itemIdx) => (
                                                            <motion.a
                                                                key={item}
                                                                href="#"
                                                                initial={{ opacity: 0, x: -10 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: itemIdx * 0.03 }}
                                                                whileHover={{ x: 4 }}
                                                                className={`flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-all ${textSecondary} ${hoverBg}`}
                                                            >
                                                                <div className={`h-1.5 w-1.5 rounded-full ${isDark ? 'bg-slate-500' : 'bg-gray-400'}`} />
                                                                <span>{item}</span>
                                                            </motion.a>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className={`sticky bottom-0 ${border} ${bgPrimary} border-t p-4`}>
                                <div className="mb-3 flex justify-center space-x-3">
                                    {['F', 'T', 'I', 'Y'].map((social) => (
                                        <motion.a
                                            key={social}
                                            href="#"
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`flex h-9 w-9 items-center justify-center rounded-full ${border} ${bgSecondary} border text-xs font-semibold transition-all ${textPrimary}`}
                                        >
                                            {social}
                                        </motion.a>
                                    ))}
                                </div>
                                <p className={`text-center text-xs font-medium ${textPrimary}`}>Copyright ©2025 Cylore</p>
                                <p className={`text-center text-xs ${textSecondary}`}>All Rights Reserved</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Bottom Nav */}
            <div className={`fixed bottom-0 left-0 right-0 z-30 ${border} ${bgPrimary} border-t pb-safe shadow-lg md:hidden`}>
                <div className="grid grid-cols-4">
                    {[
                        { icon: MdHomeFilled, label: 'Home' },
                        { icon: FaRegHeart, label: 'Wishlist', badge: 2 },
                        { icon: FaShoppingCart, label: 'Cart', badge: 2 },
                        { icon: IoMdPerson, label: 'Profile' }
                    ].map((item) => (
                        <motion.a
                            key={item.label}
                            href="#"
                            whileTap={{ scale: 0.95 }}
                            className="relative flex flex-col items-center justify-center py-2"
                        >
                            <div className="relative">
                                <item.icon className={`text-2xl ${textPrimary}`} />
                                {item.badge && (
                                    <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
                                        {item.badge}
                                    </span>
                                )}
                            </div>
                            <span className={`mt-1 text-[11px] font-medium ${textSecondary}`}>{item.label}</span>
                        </motion.a>
                    ))}
                </div>
            </div>

            <div className="h-16 md:hidden" />
        </>
    );
};

export default Header;