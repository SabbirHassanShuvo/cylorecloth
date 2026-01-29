import Header from "../../common/Header";
import Footer from "../../common/Footer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import { useState } from "react";

const schema = Yup.object().shape({
    email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),
    otp: Yup.string()
        .length(6, "OTP must be 6 characters")
        .required("OTP is required"),
});

const OtpVerify = () => {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const onSubmit = (data) => {
        setLoading(true);

        router.post(route("otp.verify"), data, {
            preserveScroll: true,
            onSuccess: (page) => {
                toast.success(page.props.flash?.success || "Email verified successfully");
            },
            onError: (errors) => {
                Object.values(errors).forEach(err => toast.error(err));
            },
            onFinish: () => setLoading(false),
        });
    };

    return (
        <>
            <ToastContainer />
            <Header />

            <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 overflow-auto">
                <div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-8 w-full max-w-md my-auto">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                            Verify Your Account
                        </h2>
                        <p className="text-sm text-gray-500">
                            Enter the 6-digit code sent to your email
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        {/* OTP Input Boxes */}
                        <div className="flex gap-2 justify-center mb-5">
                            {[0, 1, 2, 3, 4, 5].map((index) => (
                                <input
                                    key={index}
                                    id={`otp-${index}`}
                                    type="text"
                                    maxLength={1}
                                    className="w-11 h-11 sm:w-12 sm:h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors duration-200"
                                    onInput={(e) => {
                                        const target = e.target;
                                        const value = target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
                                        target.value = value;

                                        // Auto-focus next input
                                        if (value && index < 5) {
                                            document.getElementById(`otp-${index + 1}`).focus();
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        // Handle backspace
                                        if (e.key === 'Backspace' && !e.target.value && index > 0) {
                                            document.getElementById(`otp-${index - 1}`).focus();
                                        }
                                    }}
                                    onPaste={(e) => {
                                        e.preventDefault();
                                        const pasteData = e.clipboardData.getData('text').replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

                                        // Distribute pasted data across inputs
                                        for (let i = 0; i < Math.min(pasteData.length, 6); i++) {
                                            const input = document.getElementById(`otp-${i}`);
                                            if (input) {
                                                input.value = pasteData[i];
                                            }
                                        }

                                        // Focus last filled or next empty input
                                        const nextIndex = Math.min(pasteData.length, 5);
                                        document.getElementById(`otp-${nextIndex}`).focus();
                                    }}
                                />
                            ))}
                        </div>

                        {/* Error Message - Fixed height to prevent jumping */}
                        <div className="h-6 mb-4">
                            {errors.otp && (
                                <p className="text-red-500 text-sm text-center">
                                    {errors.otp.message}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold text-lg shadow-lg transition-all duration-200 ${loading
                                ? "opacity-70 cursor-not-allowed"
                                : "hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]"
                                }`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Verifying...
                                </span>
                            ) : (
                                "Verify OTP"
                            )}
                        </button>

                        {/* Resend Link */}
                        <div className="text-center mt-5">
                            <p className="text-gray-600 text-sm">
                                Didn't receive the code?{" "}
                                <button
                                    type="button"
                                    onClick={() => {
                                        // Add resend logic here
                                        console.log("Resending OTP...");
                                    }}
                                    className="text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-colors duration-200"
                                >
                                    Resend OTP
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default OtpVerify;
