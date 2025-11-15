import { yupResolver } from '@hookform/resolvers/yup';
import { Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiPaperAirplane } from 'react-icons/hi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import Header from '../../../common/backend/Header';
import MobileFooter from '../../../common/backend/MobileFooter';
import Sidebar from '../../../common/backend/Sidebar';

// Validation Schema
const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    regular_price: yup.string().required('Regular price is required'),
    discount_price: yup.string().required('Discount price is required').nullable(),
    discount_percent: yup.string().required('Discount percent is required').nullable(),
    color: yup.string().required('Color is required'),
    fabric: yup.string().required('Fabric is required'),
    description: yup.string().required('Description is required'),
    category_id: yup.string().required('Category is required'),
    subcategory_id: yup.string().nullable(),
    brand: yup.string().nullable(),
    stock: yup.string().required('Stock quantity is required').min(0, 'Stock must be at least 0'),
    is_featured: yup.boolean(),
});

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB in bytes

const Create = () => {
    const { categories = [] } = usePage().props || {};

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [images, setImages] = useState([]);
    const [imageErrors, setImageErrors] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const [thumbnailIndex, setThumbnailIndex] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        trigger,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: '',
            regular_price: '',
            discount_price: '',
            discount_percent: '',
            color: '',
            size: [],
            fabric: '',
            description: '',
            category_id: '',
            subcategory_id: '',
            is_hot_deal: false,
            status: 'active',
            brand: '',
            stock: 1,
            is_featured: false,
        },
    });

    const form = watch();

    // Real-time validation effect
    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (name) {
                trigger(name);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, trigger]);
    // Clean up object URLs when component unmounts or images change
    useEffect(() => {
        return () => {
            images.forEach((image) => {
                URL.revokeObjectURL(image.url);
            });
        };
    }, [images]);

    // const onSubmit = (data) => {
    //     if (images.length === 0) {
    //         toast.error('Please upload at least one image');
    //         return;
    //     }

    //     if (imageErrors.length > 0) {
    //         toast.error('Please fix image errors before submitting');
    //         return;
    //     }

    //     const formData = new FormData();

    //     // Append normal fields
    //     formData.append('title', data.title);
    //     formData.append('regular_price', data.regular_price);
    //     formData.append('discount_price', data.discount_price || '');
    //     formData.append('discount_percent', data.discount_percent || '');
    //     formData.append('color', data.color || '');
    //     formData.append('fabric', data.fabric || '');
    //     formData.append('description', data.description);
    //     formData.append('category_id', data.category_id);
    //     formData.append('subcategory_id', data.subcategory_id || '');
    //     formData.append('is_hot_deal', data.is_hot_deal ? 1 : 0);
    //     formData.append('status', data.status);
    //     formData.append('brand', data.brand || '');
    //     formData.append('stock', data.stock);
    //     formData.append('is_in_stock', data.is_in_stock ? 1 : 0);
    //     formData.append('is_featured', data.is_featured ? 1 : 0);

    //     // Append sizes (array)
    //     if (data.size && data.size.length > 0) {
    //         data.size.forEach((size, index) => {
    //             formData.append(`sizes[${index}]`, size);
    //         });
    //     }

    //     // Append images (array)
    //     images.forEach((image, index) => {
    //         formData.append(`images[${index}]`, image.file);
    //     });

    //     if (thumbnailIndex === null || !images[thumbnailIndex]) {
    //         toast.error('Please select a valid thumbnail image');
    //         return;
    //     }

    //     const thumbnailToUse = thumbnailIndex !== null ? thumbnailIndex : 0;
    //     formData.append('thumbnail', images[thumbnailToUse].file);

    //     setIsSubmitting(true);
    //     // Submit using Inertia
    //     router.post('/product/store', formData, {
    //         forceFormData: true,
    //         onSuccess: () => {
    //             toast.success('Product Created Successfully!');
    //             setIsSubmitting(false);

    //             setTimeout(() => {
    //                 router.visit('/product');
    //             }, 700);
    //         },
    //         onError: (errors) => {
    //             console.error(errors);
    //             toast.error('Something went wrong!');
    //             setIsSubmitting(false);
    //         },
    //     });
    // };

    const onSubmit = (data) => {
        // ✅ Image validation
        if (images.length === 0) {
            toast.error('Please upload at least one image');
            return;
        }

        // ✅ Thumbnail validation
        if (thumbnailIndex === null || !images[thumbnailIndex]) {
            toast.error('Please select a valid thumbnail image');
            return;
        }

        // ✅ Image error validation
        if (imageErrors.length > 0) {
            toast.error('Please fix image errors before submitting');
            return;
        }

        const formData = new FormData();

        // ✅ Append basic fields
        const fields = {
            title: data.title,
            regular_price: data.regular_price,
            discount_price: data.discount_price || '',
            discount_percent: data.discount_percent || '',
            color: data.color || '',
            fabric: data.fabric || '',
            description: data.description,
            category_id: data.category_id,
            subcategory_id: data.subcategory_id || '',
            is_hot_deal: data.is_hot_deal ? 1 : 0,
            status: data.status,
            brand: data.brand || '',
            stock: data.stock,
            is_in_stock: data.is_in_stock ? 1 : 0,
            is_featured: data.is_featured ? 1 : 0,
        };

        Object.entries(fields).forEach(([key, value]) => {
            formData.append(key, value);
        });

        // ✅ Append sizes
        if (Array.isArray(data.size) && data.size.length > 0) {
            data.size.forEach((size, index) => {
                formData.append(`sizes[${index}]`, size);
            });
        }

        // ✅ Append images
        images.forEach((image, index) => {
            formData.append(`images[${index}]`, image.file);
        });

        // ✅ Append thumbnail
        formData.append('thumbnail', images[thumbnailIndex].file);

        setIsSubmitting(true);

        // ✅ Submit with Inertia
        router.post('/product/store', formData, {
            forceFormData: true,
            onSuccess: () => {
                toast.success('Product Created Successfully!');
                setIsSubmitting(false);
                setTimeout(() => {
                    router.visit('/product');
                }, 700);
            },
            onError: (errors) => {
                console.error(errors);
                toast.error('Something went wrong!');
                setIsSubmitting(false);
            },
        });
    };

    const handleImageChange = (e) => {
        if (!e.target.files) return;

        const files = Array.from(e.target.files);
        const newImages = [];
        const newErrors = [];

        files.forEach((file) => {
            if (file.size > MAX_IMAGE_SIZE) {
                newErrors.push(`Image ${file.name} exceeds 2MB limit`);
                return;
            }

            newImages.push({
                file,
                url: URL.createObjectURL(file),
                name: file.name,
            });
        });

        if (newErrors.length > 0) {
            setImageErrors((prev) => [...(prev || []), ...newErrors]);
            toast.error(newErrors.join(', '));
        } else {
            setImageErrors([]);
        }

        setImages((prev) => [...(prev || []), ...newImages]);
    };

    const handleRemoveImage = (index) => {
        setImages((prevImages) => {
            if (!prevImages || prevImages.length <= index) return prevImages || [];

            const newImages = [...prevImages];
            if (newImages[index]?.url) {
                URL.revokeObjectURL(newImages[index].url);
            }
            newImages.splice(index, 1);
            return newImages;
        });

        setImageErrors((prev) => {
            if (!prev || prev.length <= index) return prev || [];
            const newErrors = [...prev];
            newErrors.splice(index, 1);
            return newErrors;
        });
    };

    const handleSizeChange = (selectedSize) => {
        const currentSizes = form.size || [];
        if (currentSizes.includes(selectedSize)) {
            setValue(
                'size',
                currentSizes.filter((size) => size !== selectedSize),
            );
        } else {
            setValue('size', [...currentSizes, selectedSize]);
        }
    };

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setValue('category_id', categoryId);
        const category = categories.find((cat) => cat.id == categoryId);
        setSelectedCategory(category);
        setValue('subcategory_id', '');
        trigger('category_id');
    };

    // Helper function to show error styles
    const hasError = (fieldName) => {
        return errors[fieldName] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-400';
    };

    return (
        <>
            {/* Header Part */}
            <ToastContainer position="top-right" autoClose={2000} closeButton={true} hideProgressBar={false} newestOnTop={true} rtl={false} />
            <Header />
            <section className="pt-3 pb-3">
                <div className="flex flex-col md:flex-row">
                    {/* Side bar */}
                    <Sidebar />
                    {/* Right Section */}
                    <div className="w-full p-4 pt-0">
                        <header className="flex items-center justify-between rounded-lg bg-white px-3 py-2 shadow-lg">
                            <h1 className="text-xl font-semibold text-gray-700">Create new product</h1>
                            <div className="flex items-center gap-4">
                                <Link href="/product" className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white shadow-md hover:bg-blue-700">
                                    Back
                                </Link>
                            </div>
                        </header>
                        <div className="flex min-h-screen items-center justify-center px-4 py-6">
                            <div className="w-full max-w-6xl rounded-3xl bg-white p-6 shadow-2xl md:p-10">
                                <h2 className="mb-8 text-center text-3xl font-bold text-indigo-700 drop-shadow-md md:mb-10 md:text-4xl">
                                    Create Product
                                </h2>

                                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                    {/* Left Column */}
                                    <div className="space-y-6">
                                        {/* Title */}
                                        <div>
                                            <label className="mb-2 block font-semibold">Title</label>
                                            <input
                                                type="text"
                                                {...register('title')}
                                                className={`w-full rounded-xl border p-4 focus:ring-2 focus:outline-none ${hasError('title')}`}
                                            />
                                            {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
                                        </div>

                                        {/* Category */}
                                        <div>
                                            <label className="mb-2 block font-semibold">Category</label>
                                            <select
                                                {...register('category_id')}
                                                onChange={handleCategoryChange}
                                                className={`w-full rounded-xl border p-4 focus:ring-2 focus:outline-none ${hasError('category_id')}`}
                                            >
                                                <option value="">Select Category</option>
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.category_id && <p className="mt-1 text-sm text-red-500">{errors.category_id.message}</p>}
                                        </div>

                                        {/* Subcategory */}
                                        {selectedCategory && selectedCategory.subcategories.length > 0 && (
                                            <div>
                                                <label className="mb-2 block font-semibold">Sub Category</label>
                                                <select
                                                    {...register('subcategory_id')}
                                                    className="w-full rounded-xl border border-gray-300 p-4 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                                                >
                                                    <option value="">Select Sub Category</option>
                                                    {selectedCategory.subcategories.map((sub) => (
                                                        <option key={sub.id} value={sub.id}>
                                                            {sub.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}

                                        {/* Regular Price */}
                                        <div>
                                            <label className="mb-2 block font-semibold">Regular Price</label>
                                            <input
                                                type="number"
                                                {...register('regular_price')}
                                                className={`w-full rounded-xl border p-4 focus:ring-2 focus:outline-none ${hasError('regular_price')}`}
                                            />
                                            {errors.regular_price && <p className="mt-1 text-sm text-red-500">{errors.regular_price.message}</p>}
                                        </div>

                                        {/* Discount Price */}
                                        <div>
                                            <label className="mb-2 block font-semibold">Discount Price</label>
                                            <input
                                                type="number"
                                                {...register('discount_price')}
                                                className={`w-full rounded-xl border p-4 focus:ring-2 focus:outline-none ${hasError('discount_price')}`}
                                            />
                                            {errors.discount_price && <p className="mt-1 text-sm text-red-500">{errors.discount_price.message}</p>}
                                        </div>

                                        {/* Discount Percent */}
                                        <div>
                                            <label className="mb-2 block font-semibold">Discount Percent</label>
                                            <input
                                                type="number"
                                                {...register('discount_percent')}
                                                className={`w-full rounded-xl border p-4 focus:ring-2 focus:outline-none ${hasError('discount_percent')}`}
                                            />
                                            {errors.discount_percent && (
                                                <p className="mt-1 text-sm text-red-500">{errors.discount_percent.message}</p>
                                            )}
                                        </div>

                                        {/* Color */}
                                        <div>
                                            <label className="mb-2 block font-semibold">Color</label>
                                            <input
                                                type="text"
                                                {...register('color')}
                                                className={`w-full rounded-xl border p-4 focus:ring-2 focus:outline-none ${hasError('color')}`}
                                            />
                                            {errors.color && <p className="mt-1 text-sm text-red-500">{errors.color.message}</p>}
                                        </div>
                                        {/* Brand */}
                                        <div>
                                            <label className="mb-2 block font-semibold">Brand</label>
                                            <input
                                                type="text"
                                                {...register('brand')}
                                                className={`w-full rounded-xl border p-4 focus:ring-2 focus:outline-none ${hasError('brand')}`}
                                            />
                                            {errors.brand && <p className="mt-1 text-sm text-red-500">{errors.brand.message}</p>}
                                        </div>

                                        {/* Stock */}
                                        <div>
                                            <label className="mb-2 block font-semibold">Stock Quantity</label>
                                            <input
                                                type="number"
                                                {...register('stock')}
                                                className={`w-full rounded-xl border p-4 focus:ring-2 focus:outline-none ${hasError('stock')}`}
                                            />
                                            {errors.stock && <p className="mt-1 text-sm text-red-500">{errors.stock.message}</p>}
                                        </div>
                                    </div>
                                    {/* Right Column */}
                                    <div className="space-y-6">
                                        {/* Size */}
                                        <div>
                                            <label className="mb-2 block font-semibold">Select Size:</label>
                                            <div className="flex flex-wrap gap-2">
                                                {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                                    <button
                                                        type="button"
                                                        key={size}
                                                        onClick={() => handleSizeChange(size)}
                                                        className={`rounded-xl border px-4 py-2 ${form.size.includes(size) ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}
                                                    >
                                                        {size}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        {/* Fabric */}
                                        <div>
                                            <label className="mb-2 block font-semibold">Fabric</label>
                                            <input
                                                type="text"
                                                {...register('fabric')}
                                                className={`w-full rounded-xl border p-4 focus:ring-2 focus:outline-none ${hasError('fabric')}`}
                                            />
                                            {errors.fabric && <p className="mt-1 text-sm text-red-500">{errors.fabric.message}</p>}
                                        </div>

                                        {/* Description */}
                                        <div>
                                            <label className="mb-2 block font-semibold">Description</label>
                                            <textarea
                                                {...register('description')}
                                                className={`w-full rounded-xl border p-4 focus:ring-2 focus:outline-none ${hasError('description')}`}
                                                rows="4"
                                            />
                                            {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>}
                                        </div>

                                        {/* Upload Box */}
                                        <div
                                            className={`mx-auto flex w-full max-w-2xl cursor-pointer items-center justify-center rounded-xl p-10 transition-all duration-300 ease-in-out ${isDragging ? 'scale-[1.01] border-blue-500 bg-blue-100 shadow-xl' : 'border-gray-300 bg-white'} border-2 border-dashed`}
                                            onDrop={(e) => {
                                                e.preventDefault();
                                                setIsDragging(false);
                                                handleImageChange({ target: { files: e.dataTransfer.files } });
                                            }}
                                            onDragOver={(e) => {
                                                e.preventDefault();
                                                setIsDragging(true);
                                            }}
                                            onDragLeave={() => setIsDragging(false)}
                                        >
                                            <label htmlFor="multi-image-upload" className="flex cursor-pointer flex-col items-center">
                                                <span className="inline-flex size-20 items-center justify-center rounded-full bg-gray-200 text-gray-800 transition-transform duration-300 group-hover:scale-110">
                                                    <svg
                                                        className="size-8 shrink-0"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                        <polyline points="17 8 12 3 7 8"></polyline>
                                                        <line x1="12" x2="12" y1="3" y2="15"></line>
                                                    </svg>
                                                </span>
                                                <div className="mt-4 text-center text-sm text-gray-600">
                                                    <span className="font-medium text-gray-800">Drag & drop images here or</span>
                                                    <span className="ml-1 font-semibold text-blue-600 underline hover:text-blue-700">browse</span>
                                                </div>
                                                <p className="mt-1 text-xs text-gray-400">
                                                    Max size: <span className="font-semibold text-blue-500">2MB</span> per image
                                                </p>
                                                <input
                                                    id="multi-image-upload"
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    onChange={handleImageChange}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>

                                        {/* Image Errors */}
                                        {imageErrors.length > 0 && (
                                            <div className="text-sm text-red-500">
                                                {imageErrors.map((error, index) => (
                                                    <p key={index}>{error}</p>
                                                ))}
                                            </div>
                                        )}

                                        {/* Image Preview */}
                                        {images.length > 0 && (
                                            <div className="mx-auto mt-6 grid w-full max-w-6xl grid-cols-2 gap-6 md:grid-cols-4">
                                                {images.map((image, index) => (
                                                    <div
                                                        key={index}
                                                        className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                                                    >
                                                        <img src={image.url} alt={`Preview ${index}`} className="h-[200px] w-full object-cover" />
                                                        <div className="absolute bottom-0 w-full bg-black/60 py-1 text-center text-xs font-semibold tracking-wide text-white">
                                                            {(image.file.size / 1024 / 1024).toFixed(2)} MB
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveImage(index)}
                                                            className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                                            title="Remove Image"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-5 w-5"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M6 18L18 6M6 6l12 12"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Thumbnail Selection Section */}
                                        {images.length > 0 && (
                                            <div className="mt-10">
                                                <h3 className="mb-4 text-lg font-bold text-gray-800">Select Thumbnail Image</h3>
                                                <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                                                    {images.map((image, index) => (
                                                        <div
                                                            key={index}
                                                            className={`relative cursor-pointer overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                                                                thumbnailIndex === index
                                                                    ? 'scale-[1.02] border-blue-500 ring-2 ring-blue-400'
                                                                    : 'border-gray-200 hover:border-blue-300'
                                                            }`}
                                                            onClick={() => setThumbnailIndex(index)}
                                                        >
                                                            <img
                                                                src={image.url}
                                                                alt={`Thumbnail ${index}`}
                                                                className="h-[160px] w-full rounded-t-xl object-cover"
                                                            />
                                                            {/* Selected Label */}
                                                            {thumbnailIndex === index && (
                                                                <div className="absolute top-0 left-0 rounded-br-lg bg-blue-600 px-2 py-1 text-xs font-bold text-white">
                                                                    Selected Thumbnail
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Status & Hot Deal */}
                                        <div className="flex flex-col space-y-4">
                                            <div>
                                                <label className="mb-1 block text-sm font-semibold text-gray-700">Status</label>
                                                <select
                                                    {...register('status')}
                                                    className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                                                >
                                                    <option value="active">Active</option>
                                                    <option value="inactive">Inactive</option>
                                                </select>
                                            </div>

                                            <div className="mb-6 flex flex-wrap items-center gap-8">
                                                {/* Hot Deal */}
                                                <label className="flex cursor-pointer items-center gap-2 font-semibold text-gray-700 transition hover:text-indigo-600">
                                                    <input
                                                        type="checkbox"
                                                        {...register('is_hot_deal')}
                                                        className="h-5 w-5 cursor-pointer rounded-md border-gray-300 text-indigo-600 shadow-sm transition-transform hover:scale-105 focus:ring-2 focus:ring-indigo-500"
                                                    />
                                                    <span>Hot Deal</span>
                                                </label>

                                                {/* Featured Product */}
                                                <label className="flex cursor-pointer items-center gap-2 font-semibold text-gray-700 transition hover:text-indigo-600">
                                                    <input
                                                        type="checkbox"
                                                        {...register('is_featured')}
                                                        className="h-5 w-5 cursor-pointer rounded-md border-gray-300 text-indigo-600 shadow-sm transition-transform hover:scale-105 focus:ring-2 focus:ring-indigo-500"
                                                    />
                                                    <span>Featured</span>
                                                </label>
                                            </div>
                                        </div>

                                        {/* Save Button */}
                                        <div className="flex items-center justify-center pt-6">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-green-600 px-8 py-3 text-lg font-bold text-white shadow-lg hover:bg-green-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <HiPaperAirplane className={`h-5 w-5 ${isSubmitting ? 'animate-spin' : ''}`} />
                                                {isSubmitting ? 'Publishing...' : 'Published'}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Fixed Footer Menu */}
            <MobileFooter />
        </>
    );
};

export default Create;
