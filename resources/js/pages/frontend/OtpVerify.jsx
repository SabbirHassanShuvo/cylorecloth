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

            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md"
                >
                    <h2 className="text-2xl font-bold text-center mb-2">
                        Verify Your Email
                    </h2>
                    <p className="text-gray-600 text-center mb-6">
                        Enter the 6-digit OTP sent to your email
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        {/* Email */}
                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                {...register("email")}
                                className={`w-full px-4 py-2 rounded border ${errors.email ? "border-red-500" : "border-gray-300"
                                    }`}
                                placeholder="your@email.com"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* OTP */}
                        <div className="mb-5">
                            <label className="block text-sm font-semibold mb-1">
                                OTP Code
                            </label>
                            <input
                                type="text"
                                {...register("otp")}
                                maxLength={6}
                                className={`w-full px-4 py-2 text-center tracking-widest text-lg rounded border ${errors.otp ? "border-red-500" : "border-gray-300"
                                    }`}
                                placeholder="A9K3P2"
                            />
                            {errors.otp && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.otp.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-black text-white py-2 rounded font-semibold ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-900"
                                }`}
                        >
                            {loading ? "Verifying..." : "Verify OTP"}
                        </button>
                    </form>
                </motion.div>
            </div>

            <Footer />
        </>
    );
};

export default OtpVerify;
