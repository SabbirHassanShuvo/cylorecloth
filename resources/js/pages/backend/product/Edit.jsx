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

const Edit = () => {
    const { product, categories } = usePage().props;

    // Update initial subcategory lookup to use lowercase
    const initialCategory = categories.find((cat) => cat.id === product.category_id) || null;
    const initialSubcategory = initialCategory?.subcategories?.find((sub) => sub.id === product.subcategory_id) || null;

    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [existingImages, setExistingImages] = useState(product.images || []);
    const [newImages, setNewImages] = useState([]);
    const [imageErrors, setImageErrors] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const initialSizes = product.sizes || [];

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        trigger,
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: product.title,
            regular_price: product.regular_price,
            discount_price: product.discount_price,
            discount_percent: product.discount_percent,
            color: product.color,
            size: initialSizes,
            fabric: product.fabric,
            description: product.description,
            category_id: initialCategory?.id || '',
            subcategory_id: initialSubcategory?.id || '',
            is_hot_deal: product.is_hot_deal,
            status: product.status,
            brand: product.brand,
            stock: product.stock,
            is_featured: product.is_featured,
        },
    });

    const form = watch();

    // Set initial values when component mounts
    useEffect(() => {
        if (initialCategory) {
            setValue('category_id', initialCategory.id);
            setSelectedCategory(initialCategory);
        }
        if (initialSubcategory) {
            setValue('subcategory_id', initialSubcategory.id);
        }
        if (initialSizes.length > 0) {
            setValue('size', initialSizes);
        }
    }, []);

    // Real-time validation effect
    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (name) {
                trigger(name);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, trigger]);

    // Clean up object URLs when component unmounts
    useEffect(() => {
        return () => {
            newImages.forEach((image) => {
                URL.revokeObjectURL(image.url);
            });
        };
    }, [newImages]);

    const onSubmit = (data) => {
        if (existingImages.length + newImages.length === 0) {
            toast.error('Please upload at least one image');
            return;
        }

        if (imageErrors.length > 0) {
            toast.error('Please fix image errors before submitting');
            return;
        }

        const formData = new FormData();
        formData.append('_method', 'POST');

        const fields = {
            title: data.title,
            regular_price: data.regular_price,
            discount_price: data.discount_price || null,
            discount_percent: data.discount_percent || null,
            color: data.color,
            fabric: data.fabric,
            description: data.description,
            category_id: data.category_id,
            subcategory_id: data.subcategory_id || null,
            brand: data.brand || null,
            stock: data.stock,
            is_featured: data.is_featured ? 1 : 0,
            is_hot_deal: data.is_hot_deal ? 1 : 0,
            status: data.status,
        };

        Object.entries(fields).forEach(([key, value]) => {
            formData.append(key, value);
        });

        // Sizes (array field)
        if (data.size && data.size.length > 0) {
            data.size.forEach((size, index) => {
                formData.append(`sizes[${index}]`, size);
            });
        }

        existingImages.forEach((image, index) => {
            formData.append(`existing_images[${index}]`, image); // Make sure 'image' is the full path
        });

        // New images (array)
        newImages.forEach((image, index) => {
            formData.append(`images[${index}]`, image.file);
        });

        setIsSubmitting(true);
        router.post(`/product/update/${product.id}`, formData, {
            forceFormData: true,
            onSuccess: () => {
                toast.success('Product Updated Successfully!');
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
        const newImagesToAdd = [];
        const newErrors = [];

        files.forEach((file) => {
            if (file.size > MAX_IMAGE_SIZE) {
                newErrors.push(`Image ${file.name} exceeds 2MB limit`);
                return;
            }

            newImagesToAdd.push({
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

        setNewImages((prev) => [...(prev || []), ...newImagesToAdd]);
    };

    const handleRemoveExistingImage = (index) => {
        setExistingImages((prev) => {
            const newImages = [...prev];
            newImages.splice(index, 1);
            return newImages;
        });
    };

    const handleRemoveNewImage = (index) => {
        setNewImages((prev) => {
            const newImages = [...prev];
            URL.revokeObjectURL(newImages[index].url);
            newImages.splice(index, 1);
            return newImages;
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

    // Update your category change handler:
    const handleCategoryChange = (e) => {
        const selectedCategoryId = parseInt(e.target.value);
        const category = categories.find((cat) => cat.id === selectedCategoryId);
        setSelectedCategory(category || null);
        setValue('category_id', selectedCategoryId);
        setValue('subcategory_id', ''); // Reset subcategory
    };

    // Helper function to show error styles
    const hasError = (fieldName) => {
        return errors[fieldName] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-400';
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={2000} closeButton={true} hideProgressBar={false} newestOnTop={true} rtl={false} />
            <Header />
            <section className="pt-3 pb-3">
                <div className="flex flex-col md:flex-row">
                    <Sidebar />
                    <div className="w-full p-4 pt-0">
                        <header className="flex items-center justify-between rounded-lg bg-white px-3 py-2 shadow-lg">
                            <h1 className="text-xl font-semibold text-gray-700">Edit product</h1>
                            <div className="flex items-center gap-4">
                                <Link href="/product" className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white shadow-md hover:bg-blue-700">
                                    Back
                                </Link>
                            </div>
                        </header>
                        <div className="flex min-h-screen items-center justify-center px-4 py-6">
                            <div className="w-full max-w-6xl rounded-3xl bg-white p-6 shadow-2xl md:p-10">
                                <h2 className="mb-8 text-center text-3xl font-bold text-indigo-700 drop-shadow-md md:mb-10 md:text-4xl">
                                    Edit Product
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
                                                value={form.category_id}
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
                                        {selectedCategory?.subcategories?.length > 0 && (
                                            <div>
                                                <label className="mb-2 block font-semibold">Sub Category</label>
                                                <select
                                                    {...register('subcategory_id')}
                                                    className="w-full rounded-xl border border-gray-300 p-4 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                                                    value={form.subcategory_id}
                                                    onChange={(e) => setValue('subcategory_id', e.target.value)}
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
                                                        className={`rounded-xl border px-4 py-2 ${
                                                            form.size?.includes(size) ? 'bg-black text-white' : 'bg-gray-100 text-black'
                                                        }`}
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

                                        {/* Existing Images Preview */}
                                        {existingImages.length > 0 && (
                                            <div>
                                                <h3 className="mb-2 font-semibold">Existing Images</h3>
                                                <div className="mx-auto grid w-full max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
                                                    {existingImages.map((image, index) => (
                                                        <div key={`existing-${index}`} className="group relative">
                                                            <img
                                                                src={image}
                                                                alt={`Existing Image ${index}`}
                                                                className="h-40 w-full rounded-lg object-cover shadow-md"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveExistingImage(index)}
                                                                className="absolute top-2 right-2 rounded-full bg-red-600 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
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
                                            </div>
                                        )}

                                        {/* New Images Preview */}
                                        {newImages.length > 0 && (
                                            <div>
                                                <h3 className="mb-2 font-semibold">New Images</h3>
                                                <div className="mx-auto grid w-full max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
                                                    {newImages.map((image, index) => (
                                                        <div key={`new-${index}`} className="group relative">
                                                            <img
                                                                src={image.url}
                                                                alt={`New Image ${index}`}
                                                                className="h-40 w-full rounded-lg object-cover shadow-md"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveNewImage(index)}
                                                                className="absolute top-2 right-2 rounded-full bg-red-600 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
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
                                            </div>
                                        )}

                                        {/* Status & Hot Deal */}
                                        <div className="flex flex-col space-y-4">
                                            <div>
                                                <label className="mb-1 block text-sm font-semibold text-gray-700">Status</label>
                                                <select
                                                    {...register('status')}
                                                    className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                                                    defaultValue={product.status}
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
                                                        defaultChecked={product.is_hot_deal}
                                                        className="h-5 w-5 cursor-pointer rounded-md border-gray-300 text-indigo-600 shadow-sm transition-transform hover:scale-105 focus:ring-2 focus:ring-indigo-500"
                                                    />
                                                    <span>Hot Deal</span>
                                                </label>

                                                {/* Featured Product */}
                                                <label className="flex cursor-pointer items-center gap-2 font-semibold text-gray-700 transition hover:text-indigo-600">
                                                    <input
                                                        type="checkbox"
                                                        {...register('is_featured')}
                                                        defaultChecked={product.is_featured}
                                                        className="h-5 w-5 cursor-pointer rounded-md border-gray-300 text-indigo-600 shadow-sm transition-transform hover:scale-105 focus:ring-2 focus:ring-indigo-500"
                                                    />
                                                    <span>Featured</span>
                                                </label>
                                            </div>
                                        </div>

                                        {/* Update Button */}
                                        <div className="flex items-center justify-center pt-6">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-green-600 px-8 py-3 text-lg font-bold text-white shadow-lg hover:bg-green-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <HiPaperAirplane className={`h-5 w-5 ${isSubmitting ? 'animate-spin' : ''}`} />
                                                {isSubmitting ? 'Updating...' : 'Update Product'}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <MobileFooter />
        </>
    );
};

export default Edit;
