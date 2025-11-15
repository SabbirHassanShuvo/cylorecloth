import Header from '../../common/Header';
import Footer from "../../common/Footer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, router, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Yup validation schema
const validationSchema = yup.object({
    email: yup.string()
        .required("Email or phone number is required")
        .test("valid-email", "Invalid email or phone number", value => {
            const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
            return emailPattern.test(value);
        }),
    password: yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
});

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { success, error } = usePage().props; // Success and Error

    useEffect(() => {
        if (error) {
            toast.error(error); // Toast error
        }

        if (success) {
            toast.success(success); // Toast success
        }
    }, [error, success]);

    // React Hook Form setup with Yup validation
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });
    const { csrf_token } = usePage().props;

    // Handle form submission
    const onSubmit = (data) => {
        // Send form data to the backend using Inertia.js
        router.post("/login", { ...data, _token: csrf_token }, {
            onSuccess: (page) => {
                toast.success(page.props.flash?.success || "Login successfully!");
                window.location.href = route("dashboard");
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
            <Header />
            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
                    <h2 className="text-3xl font-bold mb-6 text-center text-white">
                        <span className="bg-gradient-to-r text-transparent from-blue-500 to-purple-500 bg-clip-text">
                            LogIn
                        </span>
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} method='post'>
                        {/* Email Field */}
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                                <i className="fas fa-envelope mr-2"></i>Email
                            </label>
                            <div>
                                <input
                                    id="email"
                                    type="text"
                                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 hover:border-blue-500 focus:border-blue-500"
                                    placeholder="Enter your email or phone number"
                                    {...register('email')}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="mb-6 relative">
                            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                                <i className="fas fa-lock mr-2"></i>Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 hover:border-blue-500 focus:border-blue-500 pr-10"
                                    placeholder="Enter your password"
                                    {...register('password')}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-800 transition-all"
                                >
                                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                        </div>

                        {/* Submit Button */}
                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-4 rounded w-full cursor-pointer"
                            >
                                LogIn
                            </button>
                        </div>

                        {/* Forgot Password Link */}
                        <div className="text-center mt-4">
                            <Link href="/forgetpassword" className="text-gray-600 hover:underline transition-all duration-300 hover:text-blue-500">
                                Forget your password?
                            </Link>
                        </div>
                    </form>

                    {/* Sign Up Link */}
                    <p className="text-center text-gray-600 mt-6">
                        Don't have an account?{' '}
                        <Link href="/register" className="text-blue-500 hover:underline transition-all duration-300 hover:text-blue-700">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Login;
