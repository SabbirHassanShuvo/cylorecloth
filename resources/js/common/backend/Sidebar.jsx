import React, { useState } from 'react'
import { FiLogOut } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import { Link, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { TbCategoryPlus } from "react-icons/tb";
import { FaBagShopping } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";

const Sidebar = () => {
    const [openFilters, setOpenFilters] = useState({});
    const toggleFilter = (filterName) => {
        setOpenFilters((prev) => ({
            ...prev,
            [filterName]: !prev[filterName],
        }));
    };
    const handleLogout = () => {
        router.post(route("logout"), {}, {
            onSuccess: (page) => {
                window.location.href = route("login");
            },
            onError: (error) => {
                if (error) {
                    Object.values(error).forEach((err) => {
                        toast.error(err);
                    });
                }
            },
        });
    };
    return (
        <>
            <ToastContainer />
            {/* Sidebar - Hidden on Small Screens */}
            <div
                className="w-90 bg-white shadow-md p-4 
        fixed top-0 right-0 h-[70vh] max-h-screen 
        overflow-y-auto hidden md:block md:relative 
        md:h-auto md:top-auto md:right-auto 
        transition-all duration-300"
            >
                {/* User */}
                <div className="mb-2 border-b border-gray-500">
                    <Link href='/user'
                        className="w-full flex items-center py-1 text-lg font-semibold gap-2"
                    >
                        <FaUsers /> <span>Customer Manage</span>
                    </Link>
                </div>
                {/* Category */}
                <div className="mb-2 border-b border-gray-500">
                    <Link href='/category'
                        className="w-full flex items-center py-1 text-lg font-semibold gap-2"
                    >
                        <TbCategoryPlus /> <span>Category Manage</span>
                    </Link>
                </div>
                {/* Product */}
                <div className="mb-2 border-b border-gray-500">
                    <Link href='/product'
                        className="w-full flex items-center py-1 text-lg font-semibold gap-2"
                    >
                        <FaBagShopping /> <span>Product Manage</span>
                    </Link>
                </div>
                {/* Post */}
                <div className="mb-2 border-b border-gray-500">
                    <Link href='/product'
                        className="w-full flex items-center py-1 text-lg font-semibold gap-2"
                    >
                        <IoSettingsOutline /> <span>Account setting</span>
                    </Link>
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
                {/* Logout */}
                <div className="mb-2 border-b border-gray-500">
                    <Link onClick={handleLogout} className="flex items-center gap-2 text-stone-950 text-lg font-semibold pb-2 cursor-pointer">
                        <FiLogOut /> Logout
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Sidebar