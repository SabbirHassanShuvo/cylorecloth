import Header from '../../common/Header';
import Footer from "../../common/Footer";
import { useForm } from "react-hook-form";
import { router, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from 'react';

const Forgetpassword = () => {
    const [loading, setLoading] = useState(false);
    // React Hook Form setup for real-time validation
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const { error } = usePage().props; // Error

    useEffect(() => {
        if (error) {
            toast.error(error); // Toast error 
        }
    }, [error]);
    // Handle form submission without try-catch, as per your request
    const onSubmit = (data) => {
        setLoading(true);

        router.post(route("forgetpassword"), data, {
            onSuccess: () => {
                toast.success("Password reset link sent successfully! please check your inbox to reset your password");
                setLoading(false);
            },
            onError: (errors) => {
                Object.values(errors).forEach((error) => {
                    toast.error(error);
                });
                setLoading(false);
            },
        });
    };


    // Watching email and password to trigger re-validation in real time
    const email = watch('email');
    return (
        <>
            <ToastContainer />
            <Header />
            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
                    <h2 className="text-3xl font-bold mb-6 text-center text-white">
                        <span className="bg-gradient-to-r text-transparent from-blue-500 to-purple-500 bg-clip-text">
                            Forget Password !
                        </span>
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Email Field */}
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                                <i className="fas fa-envelope mr-2"></i>Email
                            </label>
                            <div>
                                <input
                                    id="email"
                                    type="email"
                                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 hover:border-blue-500 focus:border-blue-500"
                                    placeholder="Enter your email"
                                    {...register('email', {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                            message: "Invalid email address"
                                        }
                                    })}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                            </div>
                        </div>
                        {/* Submit Button */}
                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-4 rounded w-full cursor-pointer mt-3"
                                disabled={loading}
                            >
                                {loading ? "Sending..." : "Sent"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Forgetpassword