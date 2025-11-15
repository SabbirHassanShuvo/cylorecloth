import Header from '../../common/Header';
import Footer from "../../common/Footer";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiHeart, FiTrash2 } from "react-icons/fi";
import CartImage from "../../assets/image/new.jpg";
const Cart = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [promoCode, setPromoCode] = useState("");

    const item = {
        id: 1,
        title: "দ্য লীন স্টার্টআপ",
        author: "মোহাম্মদ আব্দুল লতিফ",
        image: CartImage,
        originalPrice: 500,
        discountPrice: 390,
        stock: 1,
    };

    const toggleSelect = () => {
        setSelectedItems((prev) => (prev.includes(item.id) ? [] : [item.id]));
    };
    return (
        <>
            <Header />
            <div className=" bg-gray-100 min-h-screen flex justify-center w-full">
                <div className="w-full max-w-6xl my-4 bg-white rounded-2xl shadow-xl p-6 flex flex-col md:flex-row md:gap-6 min-h-[500px]">
                    <div className="flex-2">
                        <div className="flex justify-between items-center border-b pb-4 mb-4">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-blue-500"
                                    checked={selectedItems.length > 0}
                                    onChange={toggleSelect}
                                />
                                <span className="text-lg font-medium">Select All Item</span>
                            </label>
                        </div>
                        <motion.div
                            className="flex items-center p-4 bg-white rounded-2xl shadow-lg mb-4 border border-gray-200"
                            whileHover={{ scale: 1.02 }}
                        >
                            <input
                                type="checkbox"
                                className="mr-3 w-4 h-4 accent-blue-500"
                                checked={selectedItems.includes(item.id)}
                                onChange={toggleSelect}
                            />
                            <img src={item.image} alt={item.title} className="w-16 h-24 object-cover rounded-lg" />
                            <div className="flex-1 ml-4">
                                <h3 className="text-lg font-semibold">{item.title}</h3>
                                <p className="text-sm text-gray-500">{item.author}</p>
                                <div className="flex items-center text-sm mt-1">
                                    <span className="text-red-500">Only {item.stock} copy available</span>
                                </div>
                            </div>
                            <div className="ml-4 text-right">
                                <p className="text-lg font-bold text-gray-800">{item.discountPrice} Tk.</p>
                                <p className="text-sm text-red-500 line-through">{item.originalPrice} Tk.</p>
                            </div>
                            <div className="ml-4 flex space-x-3">
                                <a href="/wishlist" className="text-gray-500 hover:text-red-500">
                                    <FiHeart size={18} />
                                </a>
                                <button className="text-gray-500 hover:text-red-500">
                                    <FiTrash2 size={18} />
                                </button>
                            </div>
                        </motion.div>
                        <motion.div
                            className="flex items-center p-4 bg-white rounded-2xl shadow-lg mb-4 border border-gray-200"
                            whileHover={{ scale: 1.02 }}
                        >
                            <input
                                type="checkbox"
                                className="mr-3 w-4 h-4 accent-blue-500"
                                checked={selectedItems.includes(item.id)}
                                onChange={toggleSelect}
                            />
                            <img src={item.image} alt={item.title} className="w-16 h-24 object-cover rounded-lg" />
                            <div className="flex-1 ml-4">
                                <h3 className="text-lg font-semibold">{item.title}</h3>
                                <p className="text-sm text-gray-500">{item.author}</p>
                                <div className="flex items-center text-sm mt-1">
                                    <span className="text-red-500">Only {item.stock} copy available</span>
                                </div>
                            </div>
                            <div className="ml-4 text-right">
                                <p className="text-lg font-bold text-gray-800">{item.discountPrice} Tk.</p>
                                <p className="text-sm text-red-500 line-through">{item.originalPrice} Tk.</p>
                            </div>
                            <div className="ml-4 flex space-x-3">
                                <a href="/wishlist" className="text-gray-500 hover:text-red-500">
                                    <FiHeart size={18} />
                                </a>
                                <button className="text-gray-500 hover:text-red-500">
                                    <FiTrash2 size={18} />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                    <div className="flex-1 mt-4 md:mt-0 p-3 bg-gray-50 rounded-lg shadow-inner h-auto max-h-[500px] overflow-y-auto">
                        <h3 className="text-lg font-semibold">Checkout Summary</h3>
                        <div className="border-t my-1"></div>
                        <p className="flex justify-between text-sm leading-relaxed border-b border-dashed py-3 border-gray-400">
                            <span>Subtotal</span> <span>390 TK.</span>
                        </p>
                        <p className="flex justify-between text-sm leading-relaxed border-b border-dashed py-3 border-gray-400">
                            <span>Online Fee</span> <span>53 TK.</span>
                        </p>
                        <p className="flex justify-between text-sm font-semibold leading-relaxed border-b border-dashed py-3 border-gray-400">
                            <span>Total</span> <span>443 TK.</span>
                        </p>
                        <p className="flex justify-between text-sm font-bold leading-relaxed border-b border-dashed py-3 border-gray-400">
                            <span>Payable Total</span> <span>443 TK.</span>
                        </p>
                        <input
                            type="text"
                            placeholder="Enter Promo Code"
                            className="w-full mt-10 p-2 border rounded-lg text-sm"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                        />
                        <button className="w-full mt-2 bg-purple-600 text-white py-3 rounded-lg shadow hover:bg-purple-700 transition text-sm">
                            Apply Promo Code
                        </button>
                        <button className="w-full mt-5 bg-blue-600 text-white rounded-lg text-xl py-3">
                            Proceed to Checkout
                        </button>
                    </div>


                </div>
            </div >
            <Footer />
        </>
    )
}

export default Cart