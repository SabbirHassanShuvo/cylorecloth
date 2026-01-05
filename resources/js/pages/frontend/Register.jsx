import Header from '../../common/Header';
import Footer from "../../common/Footer";
import { FaFacebookF, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link, router, usePage } from "@inertiajs/react";
import { motion } from 'framer-motion';
import { route } from "ziggy-js";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const schema = Yup.object().shape({
    name: Yup.string().required("Full Name is required"),
    email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),
    phone: Yup.string()
        .matches(/^01[3-9]\d{8}$/, "Invalid phone number")
        .required("Phone number is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
});

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { error } = usePage().props;

    useEffect(() => {
        if (error) {
            toast.error(error); // Toast error 
        }
    }, [error]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange", // Realtime validation
    });

    const onSubmit = (data) => {
        setIsSubmitting(true);

        router.post(route("register"), data, {
            onSuccess: (page) => {
                toast.success(page.props.flash?.success || "Register successfully!");
                reset();
            },
            onError: (error) => {
                if (error) {
                    Object.values(error).forEach((err) => {
                        toast.error(err);
                    });
                }
                setIsSubmitting(false);
            },
        });
    }

    return (
        <>
            <ToastContainer />
            <Header />

            <div className="flex justify-center items-center min-h-screen p-4 bg-gradient-to-br from-pink-50 to-purple-50">
                <div className="bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-4xl flex">
                    {/* Left Side Fashion Image */}
                    <div className="hidden md:flex w-1/2 bg-gradient-to-br from-pink-500 to-purple-600 items-center justify-center p-12 relative">
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="relative z-10 text-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="mb-6"
                            >
                                <div className="bg-white/30 backdrop-blur-sm rounded-full w-48 h-48 flex items-center justify-center mx-auto border-4 border-white/40">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h6M3 21.022V6a3 3 0 013-3h12a3 3 0 013 3v15.022A3 3 0 0118 21h-3a3 3 0 01-3 0H9a3 3 0 01-3 0H3z" />
                                    </svg>
                                </div>
                            </motion.div>
                            <motion.h3
                                className="text-3xl font-bold text-white mb-3"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                Join FashionHub
                            </motion.h3>
                            <motion.p
                                className="text-pink-100 text-lg max-w-md mx-auto leading-relaxed"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                Discover the latest trends, exclusive collections, and premium fashion at your fingertips
                            </motion.p>
                            <motion.div
                                className="mt-6 flex justify-center space-x-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                <div className="bg-white/20 rounded-full px-4 py-2 text-white text-sm font-medium">
                                    10K+ Happy Customers
                                </div>
                                <div className="bg-white/20 rounded-full px-4 py-2 text-white text-sm font-medium">
                                    Premium Quality
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Side Form */}
                    <div className="w-full md:w-1/2 p-8">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">
                                Create Account
                            </h2>
                            <p className="text-gray-600 text-center mb-8">Join our fashion community today</p>

                            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                {/* Full Name */}
                                <div className="mb-5">
                                    <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="name"
                                            type="text"
                                            {...register("name")}
                                            className={`w-full py-3 px-4 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 pl-10`}
                                            placeholder="Enter your full name"
                                        />
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                                </div>

                                {/* Email */}
                                <div className="mb-5">
                                    <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="email"
                                            type="email"
                                            {...register("email")}
                                            className={`w-full py-3 px-4 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 pl-10`}
                                            placeholder="Enter your email"
                                        />
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    </div>
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                                </div>

                                {/* Phone Number */}
                                <div className="mb-5">
                                    <label htmlFor="phone" className="block text-gray-700 text-sm font-semibold mb-2">
                                        Phone Number
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="phone"
                                            type="tel"
                                            {...register("phone")}
                                            pattern="^01[3-9]\d{8}$"
                                            maxLength="11"
                                            className={`w-full py-3 px-4 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 pl-10`}
                                            placeholder="017XXXXXXXX"
                                        />
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                    </div>
                                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                                </div>

                                {/* Password */}
                                <div className="mb-5">
                                    <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            {...register("password")}
                                            className={`w-full py-3 px-4 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 pl-10 pr-12`}
                                            placeholder="Enter your password"
                                        />
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                                        >
                                            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                        </button>
                                    </div>
                                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                                </div>

                                {/* Confirm Password */}
                                <div className="mb-6">
                                    <label htmlFor="confirm-password" className="block text-gray-700 text-sm font-semibold mb-2">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="confirm-password"
                                            type={showConfirmPassword ? "text" : "password"}
                                            {...register("confirmPassword")}
                                            className={`w-full py-3 px-4 rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 pl-10 pr-12`}
                                            placeholder="Confirm your password"
                                        />
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                                        >
                                            {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                                </div>

                                {/* Submit Button */}
                                <div className="mb-6">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center justify-center">
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Creating Account...
                                            </span>
                                        ) : "Create Account"}
                                    </button>
                                </div>

                                {/* Social Login */}
                                <div className="mb-6">
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-300"></div>
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                                        </div>
                                    </div>

                                    <div className="mt-6 grid grid-cols-2 gap-3">
                                        <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                            <FaGoogle className="text-red-500 mr-2" />
                                            Google
                                        </button>
                                        <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                            <FaFacebookF className="text-blue-600 mr-2" />
                                            Facebook
                                        </button>
                                    </div>
                                </div>

                                {/* Login Link */}
                                <p className="text-center text-gray-600">
                                    Already have an account?{" "}
                                    <a href="#" className="font-medium text-pink-600 hover:text-pink-500 transition-colors duration-300">
                                        Sign in
                                    </a>
                                </p>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Register;
