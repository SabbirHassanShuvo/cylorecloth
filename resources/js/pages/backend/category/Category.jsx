import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../../../common/backend/Sidebar";
import Header from "../../../common/backend/Header";
import MobileFooter from "../../../common/backend/MobileFooter";
import { IoIosSearch } from "react-icons/io";
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { Link, usePage } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { Search } from "lucide-react";
import { createPortal } from "react-dom";
import { useForm } from '@inertiajs/react';
const Category = ({ filters }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpendas, setIsSearchOpendas] = useState(false);

    const { categories } = usePage().props;

    const handlePagination = (url) => {
        if (url) router.visit(url);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const openModal = (userId) => {
        setSelectedUserId(userId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUserId(null);
    };

    const handleDelete = () => {
        if (!selectedUserId) return;
        router.get(`/category/delete/${selectedUserId}`, {
            onSuccess: (page) => {
                closeModal();
            },
        });
    };

    const { data, setData, get } = useForm({
        search: filters.search || ''
    });

    const handleSearch = (e) => {
        e.preventDefault();
        get('/category', { preserveState: true, replace: true });
    };

    return (
        <>
            {/* Header Part */}
            <Header />
            <section className="pt-3 pb-3">
                <div className="flex flex-col md:flex-row">
                    {/* Side bar */}
                    <Sidebar />
                    {/* Right Section */}
                    <div className="w-full p-4 pt-0">
                        <header className="flex items-center justify-between px-3 py-2 bg-white shadow-lg rounded-lg">
                            {/* Left side  */}
                            <div className="flex-1">
                                <h1 className="text-xl font-semibold text-gray-700">Category</h1>
                            </div>

                            {/* Right side */}
                            <div className="flex-3 flex items-center gap-4 justify-end w-full">
                                {/* Desktop Search Bar */}
                                <form
                                    onSubmit={handleSearch}
                                    className="hidden md:flex w-1/2 bg-white rounded-full overflow-hidden items-center border border-gray-300"
                                >
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        className="px-4 py-2 w-full bg-white outline-none text-sm"
                                        value={data.search}
                                        onChange={(e) => setData('search', e.target.value)}
                                    />
                                    <button className="px-4 py-2 text-gray-500">
                                        <IoIosSearch className="w-5 h-5 cursor-pointer" />
                                    </button>
                                </form>

                                {/* Mobile Search Icon */}
                                <button
                                    onClick={() => setIsSearchOpendas(true)}
                                    className="md:hidden text-xl"
                                >
                                    <IoIosSearch />
                                </button>

                                {/* Mobile Search Bar */}
                                {isSearchOpendas && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="z-10 absolute left-0 top-26 w-full bg-white shadow-md p-2"
                                    >
                                        <form onSubmit={handleSearch} className="w-4/5 mx-auto bg-gray-100 rounded-full flex items-center border border-gray-300">
                                            <input
                                                type="text"
                                                placeholder="Search..."
                                                className="px-4 py-2 w-full bg-gray-100 outline-none text-lg"
                                                value={data.search}
                                                onChange={(e) => setData('search', e.target.value)}
                                            />
                                            <button className="px-4 py-2 text-gray-500">
                                                <Search size={20} />
                                            </button>
                                            <button
                                                className="px-4 py-2 text-gray-500"
                                                onClick={() => setIsSearchOpendas(false)}
                                            >
                                                ✖
                                            </button>
                                        </form>
                                    </motion.div>
                                )}

                                {/* Buttons */}
                                <div className="flex gap-4">
                                    <Link href="/category/create" className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700">
                                        Create Category
                                    </Link>
                                    <Link href="/subcategory" className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700">
                                        Manage Sub Category
                                    </Link>
                                </div>
                            </div>
                        </header>
                        <div className="flex flex-col mt-3">
                            <div className="-m-1.5 overflow-x-auto">
                                <div className="p-1.5 min-w-full inline-block align-middle">
                                    <div className="overflow-hidden shadow-lg rounded-lg bg-white">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-white shadow-sm">
                                                <tr>
                                                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-600 uppercase">Name</th>
                                                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-600 uppercase">Sub category</th>
                                                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-600 uppercase">Status</th>
                                                    <th className="px-6 py-3 text-end text-xs font-medium text-gray-600 uppercase">Action</th>
                                                </tr>
                                            </thead>

                                            <tbody className="divide-y divide-gray-200">
                                                {categories.data.length > 0 ? (
                                                    categories.data.map((categories) => (
                                                        <tr key={categories.id} className="hover:bg-gray-100 transition">
                                                            <td className="px-6 py-2.5 text-sm text-gray-800">{categories.name}</td>
                                                            <td className="px-6 py-2.5 text-sm text-gray-800">
                                                                {categories.subcategories.length > 0
                                                                    ? categories.subcategories
                                                                        .slice(0, 10)
                                                                        .map(sub => sub.name)
                                                                        .join(', ') + (categories.subcategories.length > 10 ? '...' : '')
                                                                    : 'None'}
                                                            </td>
                                                            <td className="px-6 py-2.5 text-sm">
                                                                {categories.status === 1 ? (
                                                                    <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-200 rounded-full">
                                                                        Active
                                                                    </span>
                                                                ) : (
                                                                    <span className="px-3 py-1 text-xs font-semibold text-red-700 bg-red-200 rounded-full">
                                                                        Deactivate
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td className="px-6 py-2.5 text-sm text-gray-800">
                                                                <div className="flex justify-end space-x-3">
                                                                    <Link href={`/category/edit/${categories.id}`} className="text-yellow-500 hover:text-yellow-700">
                                                                        <FaEdit className="w-4 h-4" />
                                                                    </Link>
                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            openModal(categories.id);
                                                                        }}
                                                                        className="cursor-pointer text-red-500 hover:text-red-700"
                                                                    >
                                                                        <FaTrash className="w-4 h-4" />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="4" className="px-6 py-6 text-center text-gray-500 bg-gray-100 rounded-lg">
                                                            <div className="flex flex-col items-center justify-center space-y-3">
                                                                <svg
                                                                    className="w-12 h-12 text-red-500"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                    viewBox="0 0 24 24"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                                                                </svg>
                                                                <p className="text-lg font-medium text-gray-700">No Category found</p>
                                                                <p className="text-sm text-gray-500">Try adjusting your search or adding new categories.</p>
                                                            </div>
                                                        </td>
                                                    </tr>

                                                )}
                                            </tbody>

                                        </table>

                                        {/* ✅ মডালটি `document.body` এর মধ্যে রেন্ডার হবে */}
                                        {isModalOpen &&
                                            createPortal(
                                                <div className="fixed inset-0 flex items-center justify-center bg-[rgba(221,221,221,0.5)]">
                                                    <div className="bg-white p-5 rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
                                                        <h2 className="text-lg font-semibold">Are you sure?</h2>
                                                        <p className="text-gray-600">Do you really want to delete this user?</p>
                                                        <div className="flex justify-end mt-4">
                                                            <button onClick={closeModal} className="cursor-pointer mr-2 px-4 py-2 bg-gray-300 rounded">
                                                                Cancel
                                                            </button>
                                                            <button onClick={handleDelete} className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded">
                                                                Confirm
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>,
                                                document.body //
                                            )
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pagination */}
                        <nav className="flex flex-wrap justify-center sm:justify-end items-center gap-x-1 mt-4 overflow-x-auto" aria-label="Pagination">
                            <button
                                type="button"
                                onClick={() => handlePagination(categories.prev_page_url)}
                                disabled={!categories.prev_page_url}
                                className="min-h-9.5 min-w-9.5 py-2 px-2.5 border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50"
                                aria-label="Previous"
                            >
                                ◀️
                            </button>

                            {categories.links
                                .filter(link => !link.label.toLowerCase().includes("next") && !link.label.toLowerCase().includes("previous"))
                                .map((link, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handlePagination(link.url)}
                                        disabled={!link.url}
                                        className={`min-h-9.5 min-w-9.5 py-2 cursor-pointer px-3 border ${link.active ? "border-gray-200 bg-gray-50" : "border-transparent hover:bg-gray-100"} text-gray-800 rounded-lg`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}

                            <button
                                type="button"
                                onClick={() => handlePagination(categories.next_page_url)}
                                disabled={!categories.next_page_url}
                                className="min-h-9.5 min-w-9.5 py-2 px-2.5 border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50"
                                aria-label="Next"
                            >
                                ▶️
                            </button>
                        </nav>

                        {/* End Pagination */}
                    </div>
                </div >
            </section >

            {/* Fixed Footer Menu */}
            < MobileFooter />
        </>
    )
}

export default Category