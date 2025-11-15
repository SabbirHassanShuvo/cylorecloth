import { Link, router, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { IoIosSearch } from 'react-icons/io';
import { route } from 'ziggy-js';
import Header from '../../../common/backend/Header';
import MobileFooter from '../../../common/backend/MobileFooter';
import Sidebar from '../../../common/backend/Sidebar';
const Product = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpendas, setIsSearchOpendas] = useState(false);

    const { products, filters, previewProduct } = usePage().props;
    const [isPreviewOpen, setIsPreviewOpen] = useState(!!previewProduct);
    const [selectedProduct, setSelectedProduct] = useState(previewProduct || null);

    const [searchText, setSearchText] = useState(filters.search || '');
    const [selectedImage, setSelectedImage] = useState(null);

    const { auth } = usePage().props;

    const handlePagination = (url) => {
        if (url) router.visit(url);
    };

    console.log(products);

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

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

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
        router.get(`/product/delete/${selectedUserId}`, {
            onSuccess: (page) => {
                closeModal();
            },
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const searchQuery = selectedImage ? selectedImage.name : searchText;
        router.get('/product', { search: searchQuery }, { preserveState: true, replace: true });
    };

    const truncateTitle = (title) => {
        const words = title.split(' ');
        if (words.length > 2) {
            return `${words.slice(0, 2).join(' ')}...`;
        }
        return title;
    };
    function formatViewCount(count) {
        if (count >= 1000000) return (count / 1000000).toFixed(1).replace('.0', '') + 'M';
        if (count >= 1000) return (count / 1000).toFixed(1).replace('.0', '') + 'k';
        return count.toString();
    }

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
                        <header className="flex items-center justify-between rounded-lg bg-white px-3 py-2 shadow-lg">
                            {/* Left side  */}
                            <div className="flex-1">
                                <h1 className="text-xl font-semibold text-gray-700">Products</h1>
                            </div>

                            {/* Right side */}
                            <div className="flex w-full flex-3 items-center justify-end gap-4">
                                {/* Desktop Search Form */}
                                <form
                                    onSubmit={handleSearch}
                                    className="hidden w-full items-center overflow-hidden rounded-full border border-gray-300 bg-white md:flex md:w-1/2"
                                >
                                    <input
                                        type="text"
                                        placeholder="Search data....."
                                        className="w-full bg-white px-4 py-2 text-sm outline-none"
                                        value={searchText}
                                        onChange={(e) => setSearchText(e.target.value)}
                                    />

                                    <button type="submit" className="cursor-pointer rounded-r-full px-4 py-2">
                                        <IoIosSearch className="h-5 w-5" />
                                    </button>
                                </form>

                                {/* Mobile Only Search Icon */}
                                <button onClick={() => setIsSearchOpendas(true)} className="text-xl md:hidden">
                                    <IoIosSearch />
                                </button>

                                {/* Mobile Search Bar */}
                                {isSearchOpendas && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="absolute top-26 left-0 z-10 w-full bg-white p-2 shadow-md"
                                    >
                                        <form
                                            onSubmit={handleSearch}
                                            className="flex w-full items-center overflow-hidden rounded-full border border-gray-300 bg-white md:w-1/2"
                                        >
                                            <input
                                                type="text"
                                                placeholder="Search data....."
                                                className="w-full bg-white px-4 py-2 text-sm outline-none"
                                                value={searchText}
                                                onChange={(e) => setSearchText(e.target.value)}
                                            />

                                            <button type="submit" className="cursor-pointer rounded-r-full px-4 py-2">
                                                <IoIosSearch className="h-5 w-5" />
                                            </button>
                                            <button className="px-4 py-2 text-gray-500" onClick={() => setIsSearchOpendas(false)}>
                                                ✖
                                            </button>
                                        </form>
                                    </motion.div>
                                )}

                                {/* Buttons */}
                                <div className="flex gap-4">
                                    <Link
                                        href="product/create"
                                        className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white shadow-md hover:bg-blue-700"
                                    >
                                        Create Product
                                    </Link>
                                </div>
                            </div>
                        </header>
                        <div className="mt-3 flex flex-col">
                            <div className="-m-1.5 overflow-x-auto">
                                <div className="inline-block min-w-full p-1.5 align-middle">
                                    <div className="overflow-hidden rounded-lg bg-white shadow-lg">
                                        <table className="min-w-full table-auto divide-y divide-gray-200 sm:table-auto">
                                            <thead className="bg-white shadow-sm">
                                                <tr>
                                                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-600 uppercase">Creator</th>
                                                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-600 uppercase">Product</th>
                                                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-600 uppercase">Category</th>
                                                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-600 uppercase">Hot offer</th>
                                                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-600 uppercase">Featured</th>
                                                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-600 uppercase">Views</th>
                                                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-600 uppercase">Stock QUNT.</th>
                                                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-600 uppercase">Status</th>
                                                    <th className="px-6 py-3 text-end text-xs font-medium text-gray-600 uppercase">Action</th>
                                                </tr>
                                            </thead>

                                            <tbody className="divide-y divide-gray-200">
                                                {products && products.data && products.data.length > 0 ? (
                                                    products.data.map((product) => (
                                                        <tr key={product.id} className="transition hover:bg-gray-100">
                                                            <td className="px-6 py-2.5 text-sm text-gray-800">{product.user}</td>
                                                            <td className="px-6 py-2.5 text-sm text-gray-800">
                                                                <div className="flex items-center space-x-3">
                                                                    {/* Image */}
                                                                    {product.thumbnail ? (
                                                                        <img
                                                                            src={product.thumbnail}
                                                                            alt={product.title}
                                                                            className="h-12 w-12 rounded-md object-cover"
                                                                        />
                                                                    ) : (
                                                                        <span className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-200 text-gray-400">
                                                                            No Image
                                                                        </span>
                                                                    )}

                                                                    {/* Title */}
                                                                    <span className="font-medium">{truncateTitle(product.title)}</span>
                                                                </div>
                                                            </td>

                                                            <td className="px-6 py-2.5 text-sm text-gray-800">{product.category}</td>
                                                            <td className="px-6 py-2.5 text-sm">
                                                                {product.is_hot_deal === 'Yes' ? (
                                                                    <span className="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-700">
                                                                        Running
                                                                    </span>
                                                                ) : (
                                                                    <span className="rounded-full bg-red-200 px-3 py-1 text-xs font-semibold text-red-700">
                                                                        off
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td className="px-6 py-2.5 text-sm">
                                                                {product.is_featured === 'Yes' ? (
                                                                    <span className="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-700">
                                                                        Active
                                                                    </span>
                                                                ) : (
                                                                    <span className="rounded-full bg-red-200 px-3 py-1 text-xs font-semibold text-red-700">
                                                                        off
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td className="px-6 py-2.5 text-center text-sm">
                                                                <span className="font-medium text-gray-700">
                                                                    {formatViewCount(product.view_count)}
                                                                </span>
                                                            </td>

                                                            <td className="px-6 py-2.5 text-center text-sm text-gray-800">
                                                                {parseInt(product.stock) === 0 ? (
                                                                    <span className="rounded-full bg-red-200 px-3 py-1 text-xs font-semibold text-red-700">
                                                                        0
                                                                    </span>
                                                                ) : (
                                                                    product.stock
                                                                )}
                                                            </td>

                                                            <td className="px-6 py-2.5 text-sm">
                                                                {product.status === 'Active' ? (
                                                                    <span className="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-700">
                                                                        Active
                                                                    </span>
                                                                ) : (
                                                                    <span className="rounded-full bg-red-200 px-3 py-1 text-xs font-semibold text-red-700">
                                                                        Deactivate
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td className="px-6 py-2.5 text-sm text-gray-800">
                                                                <div className="flex justify-end space-x-3">
                                                                    <button
                                                                        onClick={() => {
                                                                            router.get(
                                                                                route('product.index'),
                                                                                { preview_id: product.id },
                                                                                { preserveScroll: true },
                                                                            );
                                                                        }}
                                                                        className="cursor-pointer text-blue-500 hover:text-blue-700"
                                                                    >
                                                                        <FaEye className="h-4 w-4" />
                                                                    </button>
                                                                    <Link
                                                                        href={`/product/edit/${product.id}`}
                                                                        className="text-yellow-500 hover:text-yellow-700"
                                                                    >
                                                                        <FaEdit className="h-4 w-4" />
                                                                    </Link>
                                                                    {auth.user.role === 'admin' && (
                                                                        <button
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                openModal(product.id);
                                                                            }}
                                                                            className="cursor-pointer text-red-500 hover:text-red-700"
                                                                        >
                                                                            <FaTrash className="h-4 w-4" />
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="4" className="rounded-lg bg-gray-100 px-6 py-6 text-center text-gray-500">
                                                            <div className="flex flex-col items-center justify-center space-y-3">
                                                                <svg
                                                                    className="h-12 w-12 text-red-500"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                    viewBox="0 0 24 24"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        d="M6 18L18 6M6 6l12 12"
                                                                    ></path>
                                                                </svg>
                                                                <p className="text-lg font-medium text-gray-700">No Product found</p>
                                                                <p className="text-sm text-gray-500">
                                                                    Try adjusting your search or adding new products.
                                                                </p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>

                                        {isPreviewOpen &&
                                            selectedProduct &&
                                            createPortal(
                                                <div
                                                    className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.4)] backdrop-blur-sm"
                                                    onClick={() => setIsPreviewOpen(false)}
                                                >
                                                    <div
                                                        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-white/20 bg-white/80 p-6 shadow-2xl backdrop-blur-xl transition-all duration-500"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        {/* Close Button */}
                                                        <button
                                                            onClick={() => {
                                                                setIsPreviewOpen(false);
                                                            }}
                                                            className="absolute top-4 right-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white text-gray-500 transition hover:bg-red-100 hover:text-red-600"
                                                        >
                                                            ✖
                                                        </button>

                                                        {/* Title */}
                                                        <h2 className="mb-6 text-center font-serif text-4xl tracking-wide text-indigo-600">
                                                            {selectedProduct.title}
                                                        </h2>

                                                        {/* Grid Info */}
                                                        <div className="grid grid-cols-1 gap-4 text-sm text-gray-700 md:grid-cols-2">
                                                            {/* Left Column */}
                                                            <div className="space-y-2 rounded-xl border border-gray-200 bg-white p-4 shadow-md">
                                                                <p>
                                                                    <strong>Slug:</strong>{' '}
                                                                    <span className="text-gray-600">{selectedProduct.slug}</span>
                                                                </p>
                                                                <p>
                                                                    <strong>Regular Price:</strong>{' '}
                                                                    <span className="text-green-600">${selectedProduct.regular_price}</span>
                                                                </p>
                                                                <p>
                                                                    <strong>Discount Price:</strong>{' '}
                                                                    <span className="text-red-600">${selectedProduct.discount_price}</span>
                                                                </p>
                                                                <p>
                                                                    <strong>Discount Percent:</strong>{' '}
                                                                    <span className="text-orange-500">{selectedProduct.discount_percent}%</span>
                                                                </p>
                                                                <p>
                                                                    <strong>Color:</strong> <span>{selectedProduct.color}</span>
                                                                </p>
                                                                <p>
                                                                    <strong>Fabric:</strong> <span>{selectedProduct.fabric}</span>
                                                                </p>
                                                                <p>
                                                                    <strong>Stock:</strong>{' '}
                                                                    <span className="text-blue-600">{selectedProduct.stock}</span>
                                                                </p>
                                                            </div>

                                                            {/* Right Column */}
                                                            <div className="space-y-2 rounded-xl border border-gray-200 bg-white p-4 shadow-md">
                                                                <p>
                                                                    <strong>Hot Deal:</strong> {selectedProduct.is_hot_deal ? '🔥 Yes' : 'No'}
                                                                </p>
                                                                <p>
                                                                    <strong>Featured:</strong> {selectedProduct.is_featured ? '🌟 Yes' : 'No'}
                                                                </p>
                                                                <p>
                                                                    <strong>Status:</strong>{' '}
                                                                    <span className="tracking-wider uppercase">{selectedProduct.status}</span>
                                                                </p>
                                                                <p>
                                                                    <strong>Brand:</strong> {selectedProduct.brand}
                                                                </p>
                                                                <p>
                                                                    <strong>Category:</strong>{' '}
                                                                    {selectedProduct.category?.name || selectedProduct.category}
                                                                </p>
                                                                <p>
                                                                    <strong>Sub Category:</strong>{' '}
                                                                    {selectedProduct.sub_category?.name || selectedProduct.sub_category}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        {/* Select Size */}
                                                        <div className="mt-6">
                                                            <h3 className="mb-2 text-sm font-semibold text-gray-700">Available Size:</h3>
                                                            <div className="flex flex-wrap gap-3">
                                                                {selectedProduct.sizes.map((sizeObj, index) => (
                                                                    <button
                                                                        key={index}
                                                                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-black font-semibold text-white transition-all duration-300 hover:bg-gray-800"
                                                                    >
                                                                        {sizeObj.size}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Description */}
                                                        <div className="mt-6 text-sm text-gray-800">
                                                            <h3 className="mb-2 font-semibold">Description:</h3>
                                                            <p className="rounded-lg bg-gray-100 p-4 text-justify">{selectedProduct.description}</p>
                                                        </div>

                                                        {/* Product Images */}
                                                        <div className="mt-8">
                                                            <h3 className="mb-4 text-lg font-semibold text-gray-800">Images</h3>
                                                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                                                                {selectedProduct.images?.length > 0 ? (
                                                                    selectedProduct.images.map((img, index) => (
                                                                        <img
                                                                            key={index}
                                                                            src={img.image_path || '/uploads/products/placeholder.png'}
                                                                            alt={`Product Image ${index}`}
                                                                            className="h-36 w-full rounded-lg border border-gray-200 object-cover shadow-sm transition duration-300 hover:scale-105"
                                                                        />
                                                                    ))
                                                                ) : (
                                                                    <p className="text-gray-500">No images available</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>,
                                                document.body,
                                            )}

                                        {/* ✅ মডালটি `document.body` এর মধ্যে রেন্ডার হবে */}
                                        {isModalOpen &&
                                            createPortal(
                                                <div className="fixed inset-0 flex items-center justify-center bg-[rgba(221,221,221,0.5)]">
                                                    <div className="rounded-lg bg-white p-5 shadow-lg" onClick={(e) => e.stopPropagation()}>
                                                        <h2 className="text-lg font-semibold">Are you sure?</h2>
                                                        <p className="text-gray-600">Do you really want to delete this Product?</p>
                                                        <div className="mt-4 flex justify-end">
                                                            <button
                                                                onClick={closeModal}
                                                                className="mr-2 cursor-pointer rounded bg-gray-300 px-4 py-2"
                                                            >
                                                                Cancel
                                                            </button>
                                                            <button
                                                                onClick={handleDelete}
                                                                className="cursor-pointer rounded bg-red-600 px-4 py-2 text-white"
                                                            >
                                                                Confirm
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>,
                                                document.body, //
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pagination */}
                        <nav
                            className="mt-4 flex flex-wrap items-center justify-center gap-x-1 overflow-x-auto sm:justify-end"
                            aria-label="Pagination"
                        >
                            <button
                                type="button"
                                onClick={() => handlePagination(products.prev_page_url)}
                                disabled={!products.prev_page_url}
                                className="min-h-9.5 min-w-9.5 border border-transparent px-2.5 py-2 text-gray-800 hover:bg-gray-100 disabled:opacity-50"
                                aria-label="Previous"
                            >
                                ◀️
                            </button>

                            {products.links
                                .filter((link) => !link.label.toLowerCase().includes('next') && !link.label.toLowerCase().includes('previous'))
                                .map((link, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handlePagination(link.url)}
                                        disabled={!link.url}
                                        className={`min-h-9.5 min-w-9.5 cursor-pointer border px-3 py-2 ${link.active ? 'border-gray-200 bg-gray-50' : 'border-transparent hover:bg-gray-100'} rounded-lg text-gray-800`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}

                            <button
                                type="button"
                                onClick={() => handlePagination(products.next_page_url)}
                                disabled={!products.next_page_url}
                                className="min-h-9.5 min-w-9.5 border border-transparent px-2.5 py-2 text-gray-800 hover:bg-gray-100 disabled:opacity-50"
                                aria-label="Next"
                            >
                                ▶️
                            </button>
                        </nav>

                        {/* End Pagination */}
                    </div>
                </div>
            </section>

            {/* Fixed Footer Menu */}
            <MobileFooter />
        </>
    );
};

export default Product;
