import { useState } from "react";
import { usePage } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../../common/backend/Header";
import Sidebar from "../../../common/backend/Sidebar";
import MobileFooter from "../../../common/backend/MobileFooter";
import { Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";

// Validation Schema
const schema = yup.object().shape({
    name: yup.string().required("Category name is required"),
});

const CreateCategory = () => {
    const [isCreating, setIsCreating] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        setIsCreating(true);
        router.post("/category/store", data, {
            onSuccess: () => {
                toast.success("Category Created Successfully!", { autoClose: 2000 });

                setTimeout(() => {
                    router.visit("/category"); // ✅ Inertia Redirect
                }, 2000);

                setIsCreating(false);
            },
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
                            <h1 className="text-xl font-semibold text-gray-700">Create New Category</h1>
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/category"
                                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700"
                                >
                                    Back
                                </Link>
                            </div>
                        </header>
                        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
                            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-md">
                                <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">Create New Category</h2>
                                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-gray-600">Name</label>
                                        <input
                                            {...register("name")}
                                            type="text"
                                            className="w-full p-3 border border-gray-300 rounded-lg shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:shadow-lg"
                                        />
                                        <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>
                                    </div>
                                    <div>
                                        <label className="block text-gray-600">Status</label>
                                        <select
                                            {...register("status")}
                                            className="w-full p-3 border border-gray-300 rounded-lg shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:shadow-lg"
                                        >
                                            <option value="1">Active</option>
                                            <option value="0">Blocked</option>
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
    );
};

export default CreateCategory;
