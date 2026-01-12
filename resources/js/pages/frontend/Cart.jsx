import Header from '../../common/Header';
import Footer from "../../common/Footer";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiHeart, FiTrash2, FiShoppingBag, FiTag } from "react-icons/fi";
import CartImage from "../../assets/image/new.jpg";

const Cart = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [promoCode, setPromoCode] = useState("");

    // Add smooth scroll to entire document
    useEffect(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
        return () => {
            document.documentElement.style.scrollBehavior = 'auto';
        };
    }, []);

    const items = [
        {
            id: 1,
            title: "দ্য লীন স্টার্টআপ",
            author: "মোহাম্মদ আব্দুল লতিফ",
            image: CartImage,
            originalPrice: 500,
            discountPrice: 390,
            stock: 1,
        },
        {
            id: 2,
            title: "দ্য লীন স্টার্টআপ",
            author: "মোহাম্মদ আব্দুল লতিফ",
            image: CartImage,
            originalPrice: 500,
            discountPrice: 390,
            stock: 1,
        },
    ];

    const toggleSelectAll = () => {
        if (selectedItems.length === items.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(items.map(item => item.id));
        }
    };

    const toggleSelectItem = (itemId) => {
        setSelectedItems((prev) =>
            prev.includes(itemId)
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        );
    };

    const selectedItemsData = items.filter(item => selectedItems.includes(item.id));
    const subtotal = selectedItemsData.reduce((sum, item) => sum + item.discountPrice, 0);
    const onlineFee = selectedItems.length > 0 ? 53 : 0;
    const discount = 0; // You can add discount logic here if needed
    const total = subtotal + onlineFee - discount;

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.4 }
        }
    };

    const summaryVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <>
            <Header />
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex justify-center w-full py-8 px-4 scroll-smooth">
                <motion.div
                    className="w-full max-w-7xl"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.div
                        className="flex items-center gap-2 mb-4 sm:mb-6"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <FiShoppingBag className="text-2xl sm:text-3xl text-gray-800" />
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Shopping Cart</h1>
                    </motion.div>

                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Cart Items Section */}
                        <motion.div
                            className="flex-[2]"
                            variants={itemVariants}
                        >
                            <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-6 border border-gray-200 overflow-hidden">
                                <div className="flex justify-between items-center pb-4 sm:pb-5 mb-4 sm:mb-6 border-b-2 border-gray-100">
                                    <label className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 sm:w-5 sm:h-5 accent-gray-800 cursor-pointer"
                                            checked={selectedItems.length === items.length && items.length > 0}
                                            onChange={toggleSelectAll}
                                        />
                                        <span className="text-sm sm:text-lg font-semibold text-gray-800 group-hover:text-black transition">
                                            Select All Items
                                        </span>
                                    </label>
                                    <span className="text-xs sm:text-sm text-gray-500 font-medium">{items.length} Items</span>
                                </div>

                                <div className="space-y-3 sm:space-y-4 max-h-[65vh] overflow-y-auto pr-1 sm:pr-2"
                                    style={{
                                        scrollBehavior: 'smooth',
                                        scrollbarWidth: 'thin',
                                        scrollbarColor: '#1f2937 #f3f4f6'
                                    }}>
                                    <style jsx>{`
                                        div::-webkit-scrollbar {
                                            width: 6px;
                                        }
                                        div::-webkit-scrollbar-track {
                                            background: #f3f4f6;
                                            border-radius: 10px;
                                        }
                                        div::-webkit-scrollbar-thumb {
                                            background: #1f2937;
                                            border-radius: 10px;
                                        }
                                        div::-webkit-scrollbar-thumb:hover {
                                            background: #111827;
                                        }
                                    `}</style>
                                    {items.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            className="relative group"
                                            whileHover={{ scale: 1.01 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <motion.div
                                                className="flex items-center p-3 sm:p-5 bg-gradient-to-r from-gray-50 to-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300"
                                                whileHover={{ y: -2 }}
                                            >
                                                <motion.input
                                                    type="checkbox"
                                                    className="mr-2 sm:mr-4 w-4 h-4 sm:w-5 sm:h-5 accent-gray-800 cursor-pointer flex-shrink-0"
                                                    checked={selectedItems.includes(item.id)}
                                                    onChange={() => toggleSelectItem(item.id)}
                                                    whileTap={{ scale: 0.9 }}
                                                />
                                                <motion.div
                                                    className="relative overflow-hidden rounded-xl flex-shrink-0"
                                                    whileHover={{ scale: 1.05 }}
                                                >
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-14 h-20 sm:w-20 sm:h-28 object-cover shadow-md"
                                                    />
                                                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                                                </motion.div>
                                                <div className="flex-1 ml-2 sm:ml-5 min-w-0">
                                                    <h3 className="text-sm sm:text-lg font-bold text-gray-900 mb-1 truncate">{item.title}</h3>
                                                    <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2 truncate">{item.author}</p>
                                                    <div className="flex items-center">
                                                        <motion.span
                                                            className="text-xs bg-gray-900 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-medium"
                                                            animate={{ scale: [1, 1.05, 1] }}
                                                            transition={{ duration: 2, repeat: Infinity }}
                                                        >
                                                            Only {item.stock} left
                                                        </motion.span>
                                                    </div>
                                                </div>
                                                <div className="ml-2 sm:ml-4 text-right flex-shrink-0">
                                                    <motion.p
                                                        className="text-base sm:text-xl font-bold text-gray-900"
                                                        initial={{ scale: 1 }}
                                                        whileHover={{ scale: 1.1 }}
                                                    >
                                                        {item.discountPrice} Tk.
                                                    </motion.p>
                                                    <p className="text-xs sm:text-sm text-gray-400 line-through">{item.originalPrice} Tk.</p>
                                                    <motion.span
                                                        className="text-xs text-white bg-black px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md mt-1 inline-block"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                    >
                                                        {Math.round(((item.originalPrice - item.discountPrice) / item.originalPrice) * 100)}% OFF
                                                    </motion.span>
                                                </div>
                                                <div className="ml-2 sm:ml-6 flex flex-col space-y-2 sm:space-y-3 flex-shrink-0">
                                                    <motion.a
                                                        href="/wishlist"
                                                        className="text-gray-600 hover:text-black transition p-1.5 sm:p-2 rounded-lg hover:bg-gray-100"
                                                        whileHover={{ scale: 1.2, rotate: 5 }}
                                                        whileTap={{ scale: 0.9 }}
                                                    >
                                                        <FiHeart size={16} className="sm:w-5 sm:h-5" />
                                                    </motion.a>
                                                    <motion.button
                                                        className="text-gray-600 hover:text-black transition p-1.5 sm:p-2 rounded-lg hover:bg-gray-100"
                                                        whileHover={{ scale: 1.2, rotate: -5 }}
                                                        whileTap={{ scale: 0.9 }}
                                                    >
                                                        <FiTrash2 size={16} className="sm:w-5 sm:h-5" />
                                                    </motion.button>
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Checkout Summary Section */}
                        <motion.div
                            className="flex-1"
                            variants={summaryVariants}
                        >
                            <motion.div
                                className="bg-white rounded-3xl shadow-2xl p-4 sm:p-6 border border-gray-200 lg:sticky lg:top-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                                    <div className="w-1 h-5 sm:h-6 bg-gray-900 rounded-full"></div>
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">Order Summary</h3>
                                </div>
                                <div className="border-t-2 border-gray-100 my-3 sm:my-4"></div>

                                <motion.div
                                    className="space-y-3 sm:space-y-4"
                                    initial="hidden"
                                    animate="visible"
                                    variants={{
                                        visible: { transition: { staggerChildren: 0.1 } }
                                    }}
                                >
                                    <motion.p
                                        className="flex justify-between text-xs sm:text-sm leading-relaxed py-2 sm:py-3 border-b border-gray-200 text-gray-700"
                                        variants={{
                                            hidden: { opacity: 0, x: -10 },
                                            visible: { opacity: 1, x: 0 }
                                        }}
                                        whileHover={{ x: 5 }}
                                    >
                                        <span>Subtotal ({selectedItems.length} {selectedItems.length === 1 ? 'item' : 'items'})</span>
                                        <span className="font-semibold">{subtotal} TK.</span>
                                    </motion.p>

                                    <motion.p
                                        className="flex justify-between text-xs sm:text-sm leading-relaxed py-2 sm:py-3 border-b border-gray-200 text-gray-700"
                                        variants={{
                                            hidden: { opacity: 0, x: -10 },
                                            visible: { opacity: 1, x: 0 }
                                        }}
                                        whileHover={{ x: 5 }}
                                    >
                                        <span>Delivery Fee</span>
                                        <span className="font-semibold">{onlineFee} TK.</span>
                                    </motion.p>

                                    {discount > 0 && (
                                        <motion.p
                                            className="flex justify-between text-xs sm:text-sm leading-relaxed py-2 sm:py-3 border-b border-gray-200 text-green-600"
                                            variants={{
                                                hidden: { opacity: 0, x: -10 },
                                                visible: { opacity: 1, x: 0 }
                                            }}
                                            whileHover={{ x: 5 }}
                                        >
                                            <span>Discount</span>
                                            <span className="font-semibold">- {discount} TK.</span>
                                        </motion.p>
                                    )}

                                    <motion.div
                                        className="pt-2"
                                        variants={{
                                            hidden: { opacity: 0, x: -10 },
                                            visible: { opacity: 1, x: 0 }
                                        }}
                                    >
                                        <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-xl p-3 sm:p-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-white font-bold text-sm sm:text-base">Total Payable</span>
                                                <motion.span
                                                    className="text-white font-bold text-lg sm:text-2xl"
                                                    key={total}
                                                    initial={{ scale: 1.2 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    {total} TK.
                                                </motion.span>
                                            </div>
                                            {selectedItems.length === 0 && (
                                                <p className="text-gray-300 text-xs mt-1">Select items to see total</p>
                                            )}
                                        </div>
                                    </motion.div>
                                </motion.div>

                                <motion.div
                                    className="mt-4 sm:mt-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <div className="relative">
                                        <FiTag className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
                                        <input
                                            type="text"
                                            placeholder="Enter Promo Code"
                                            className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl text-xs sm:text-sm focus:border-gray-800 focus:outline-none transition bg-gray-50 hover:bg-white"
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value)}
                                        />
                                    </div>
                                    <motion.button
                                        className="w-full mt-2 sm:mt-3 bg-gray-800 text-white py-2 sm:py-3 rounded-xl shadow-lg hover:bg-black transition font-semibold relative overflow-hidden group text-sm sm:text-base"
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <span className="relative z-10">Apply Promo Code</span>
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-gray-700 to-black"
                                            initial={{ x: '-100%' }}
                                            whileHover={{ x: 0 }}
                                            transition={{ duration: 0.3 }}
                                        ></motion.div>
                                    </motion.button>
                                </motion.div>

                                <motion.button
                                    className={`w-full mt-4 sm:mt-6 rounded-xl text-base sm:text-lg py-3 sm:py-4 font-bold shadow-2xl relative overflow-hidden group transition-all ${selectedItems.length === 0
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-black hover:scale-[1.03] hover:-translate-y-1'
                                        }`}
                                    whileTap={selectedItems.length > 0 ? { scale: 0.97 } : {}}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    disabled={selectedItems.length === 0}
                                >
                                    <motion.span
                                        className="relative z-10 flex items-center justify-center gap-2 text-white"
                                        animate={selectedItems.length > 0 ? { x: [0, 5, 0] } : {}}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        {selectedItems.length === 0 ? 'Select Items First' : 'Proceed to Checkout'}
                                        <FiShoppingBag className="text-base sm:text-lg" />
                                    </motion.span>
                                    {selectedItems.length > 0 && (
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-700"
                                            initial={{ x: '-100%' }}
                                            whileHover={{ x: 0 }}
                                            transition={{ duration: 0.4 }}
                                        ></motion.div>
                                    )}
                                </motion.button>

                                <motion.div
                                    className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-200"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    <p className="text-xs text-gray-600 text-center">
                                        🔒 Secure Checkout • Free Returns • Fast Delivery
                                    </p>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </>
    );
};

export default Cart;