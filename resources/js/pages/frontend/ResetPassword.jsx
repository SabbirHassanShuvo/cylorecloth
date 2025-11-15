import Header from '../../common/Header';
import Footer from "../../common/Footer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { router, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const schema = Yup.object().shape({
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
});
const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { token } = usePage().props;

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

        // Ensure token is defined
        if (!token) {
            toast.error('Token is missing or invalid.');
            setIsSubmitting(false);
            return;
        }

        router.post(route("resetpassword", { token }), data, {
            onSuccess: (page) => {
                toast.success(page.props.flash?.success || "Your password has been reset successfully. Please login with your new password.!");
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
            <div className="flex justify-center items-center min-h-screen mt-3">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
                    <h2 className="text-3xl font-bold mb-6 text-center text-white">
                        <span className="bg-gradient-to-r text-transparent from-blue-500 to-purple-500 bg-clip-text">
                            Reset Password
                        </span>
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        {/* Password */}
                        <div className="mb-6 relative">
                            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                                <i className="fas fa-lock mr-2"></i>New Password
                            </label>
                            <div className="relative">
                                <input id="password" type={showPassword ? "text" : "password"} {...register("password")} className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 hover:border-blue-500 focus:border-blue-500 pr-10" placeholder="Enter your password" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-800 transition-all">
                                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div className="mb-6 relative">
                            <label htmlFor="confirm-password" className="block text-gray-700 text-sm font-bold mb-2">
                                <i className="fas fa-lock mr-2"></i>Confirm Password
                            </label>
                            <div className="relative">
                                <input id="confirm-password" type={showConfirmPassword ? "text" : "password"} {...register("confirmPassword")} className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 hover:border-blue-500 focus:border-blue-500 pr-10" placeholder="Confirm your password" />
                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-800 transition-all">
                                    {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                </button>
                            </div>
                            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                        </div>

                        {/* Submit Button */}
                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                className={`bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-4 rounded w-full cursor-pointer ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Saveing..." : "Save"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ResetPassword
