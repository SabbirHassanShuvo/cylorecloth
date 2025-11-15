import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { usePage } from "@inertiajs/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../../common/backend/Header";
import Sidebar from "../../../common/backend/Sidebar";
import MobileFooter from "../../../common/backend/MobileFooter";
import { Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { FiPlus } from "react-icons/fi";

// Validation Schema
const schema = yup.object().shape({
    category_id: yup.string().required("Category name is required"),
    status: yup.string().required("Status name is required"),
});
const Create = () => {
    const [isCreating, setIsCreating] = useState(false);
    const { categories } = usePage().props;

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [subCategories, setSubCategories] = useState([]);
    const [subCategory, setSubCategory] = useState("");
    // Add sub category
    const handleAddSubCategory = () => {
        if (subCategory.trim() !== "") {
            setSubCategories([...subCategories, { name: subCategory, status: 1 }]); // default status = 1 (Active)
            setSubCategory("");
        }
    };;

    // sub category remove
    const handleRemoveSubCategory = (index) => {
        setSubCategories(subCategories.filter((_, i) => i !== index));
    };

    const onSubmit = (data) => {
        setIsCreating(true);

        const payload = {
            ...data,
            sub_categories: subCategories, // Already in [{ name, status }]
        };

        router.post("/subcategory/store", payload, {
            onSuccess: () => {
                toast.success("Subcategory Created Successfully!", { autoClose: 2000 });
                setTimeout(() => router.visit("/subcategory"), 2000);
                setIsCreating(false);
            },
            onError: () => setIsCreating(false),
        });
    };
    return (
        <>
            <ToastContainer position="top-right" autoClose={2000} />
            <Header />
            <section className="pt-3 pb-3">
                <div className="flex flex-col md:flex-row">
                    <Sidebar />
                    <div className="w-full p-4 pt-0">
                        <header className="flex items-center justify-between px-3 py-2 bg-white shadow-lg rounded-lg">
                            <h1 className="text-xl font-semibold text-gray-700">Create Sub New Category</h1>
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/subcategory"
                                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700"
                                >
                                    Back
                                </Link>
                            </div>
                        </header>
                        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
                            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-md">
                                <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">Create New Sub Category</h2>
                                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-1">
                                    {/* Name */}
                                    <div className="mt-1">
                                        <label className="block text-gray-600">Sub Category</label>
                                        <div className="flex">
                                            <input
                                                type="text"
                                                value={subCategory}
                                                onChange={(e) => setSubCategory(e.target.value)}
                                                className="w-full p-3 border rounded-l-lg focus:ring-2 focus:ring-blue-400 outline-none"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleAddSubCategory}
                                                className="bg-blue-500 cursor-pointer text-white px-4 rounded-r-lg hover:bg-blue-600"
                                            >
                                                <FiPlus />
                                            </button>
                                        </div>
                                    </div>

                                    {/* 🟢 সাব ক্যাটেগরি লিস্ট */}
                                    <div className="mt-0.5">
                                        {subCategories.map((sub, index) => (
                                            <div key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded-md mt-2">
                                                <span>{sub.name}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveSubCategory(index)}
                                                    className="text-red-500 hover:text-red-700 cursor-pointer"
                                                >
                                                    ❌
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    <div>
                                        <label className="block text-gray-600">Category</label>
                                        <select
                                            {...register("category_id", { required: "Category is required" })}
                                            className="w-full p-3 border border-gray-300 rounded-lg shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:shadow-lg"
                                        >
                                            <option value="">Select a category</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                        <p className="text-red-500 text-sm mt-1">{errors.category_id?.message}</p>
                                    </div>
                                    <div>
                                        <label className="block text-gray-600">Status</label>
                                        <select
                                            {...register("status")}
                                            className="w-full p-3 border border-gray-300 rounded-lg shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:shadow-lg"
                                            disabled
                                        >
                                            <option value="1">Active</option>
                                        </select>
                                        <p className="text-red-500 text-sm mt-1">{errors.status?.message}</p>
                                    </div>
                                    {/* Submit Button */}
                                    <div className="flex justify-center mt-4">
                                        <button
                                            type="submit"
                                            className="bg-blue-600 text-white cursor-pointer px-6 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105"
                                        >
                                            {isCreating ? "Creating..." : "Create"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div >
            </section >
            <MobileFooter />
        </>
    )
}

export default Create