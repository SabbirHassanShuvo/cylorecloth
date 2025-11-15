import React from 'react'
import { FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { MdHomeFilled } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";

const MobileFooter = () => {
    return (
        <>
            <div className="z-10 block md:hidden fixed bottom-0 w-full bg-white shadow-md p-3 flex justify-around items-center text-gray-700">
                <a href="#" className="flex flex-col items-center">
                    <MdHomeFilled className="text-2xl" />
                    <span className="text-xs">Home</span>
                </a>
                <a href="#" className="flex flex-col items-center relative">
                    <FaRegHeart className="text-2xl" />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">0</span>
                    <span className="text-xs">Wishlist</span>
                </a>
                <a href="#" className="flex flex-col items-center relative">
                    <FaShoppingCart className="text-2xl" />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">0</span>
                    <span className="text-xs">Cart</span>
                </a>
                <a href="#" className="flex flex-col items-center">
                    <IoMdPerson className="text-2xl" />
                    <span className="text-xs">Profile</span>
                </a>
            </div>
        </>
    )
}

export default MobileFooter