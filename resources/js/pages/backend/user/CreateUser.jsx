import { yupResolver } from '@hookform/resolvers/yup';
import { Link, router, usePage } from '@inertiajs/react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import Header from '../../../common/backend/Header';
import MobileFooter from '../../../common/backend/MobileFooter';
import Sidebar from '../../../common/backend/Sidebar';

// Validation Schema
const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup
        .string()
        .matches(/^01[3-9]\d{8}$/, 'Invalid phone number')
        .required('Phone is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    role: yup.string().oneOf(['admin', 'manager', 'customer'], 'Invalid role').required('Role is required'),
});
const CreateUser = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const { auth } = usePage().props;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        setIsCreating(true);
        router.post('/user/store', data, {
            onSuccess: () => {
                toast.success('Customer Created Successfully!', { autoClose: 2000 });

                setTimeout(() => {
                    router.visit('/user'); // ✅ Inertia Redirect
                }, 2000);

                setIsCreating(false);
            },
        });
    };
    return (
        <>
            {/* Header Part */}
            <ToastContainer position="top-right" autoClose={2000} />
            <Header />
            <section className="pt-3 pb-3">
                <div className="flex flex-col md:flex-row">
                    {/* Side bar */}
                    <Sidebar />
                    {/* Right Section */}
                    <div className="w-full p-4 pt-0">
                        <header className="flex items-center justify-between rounded-lg bg-white px-3 py-2 shadow-lg">
                            <h1 className="text-xl font-semibold text-gray-700">Create new customer</h1>
                            <div className="flex items-center gap-4">
                                <Link href="/user" className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white shadow-md hover:bg-blue-700">
                                    Back
                                </Link>
                            </div>
                        </header>
                        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
                            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl md:p-8">
                                <h2 className="mb-4 text-center text-xl font-semibold text-gray-700">Create New customer</h2>
                                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-gray-600">Name</label>
                                        <input
                                            {...register('name')}
                                            type="text"
                                            className="w-full rounded-lg border border-gray-300 p-3 shadow-md transition-all focus:shadow-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                        />
                                        <p className="mt-1 text-sm text-red-500">{errors.name?.message}</p>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-gray-600">Email</label>
                                        <input
                                            {...register('email')}
                                            type="email"
                                            className="w-full rounded-lg border border-gray-300 p-3 shadow-md transition-all focus:shadow-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                        />
                                        <p className="mt-1 text-sm text-red-500">{errors.email?.message}</p>
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="block text-gray-600">Phone</label>
                                        <input
                                            {...register('phone')}
                                            type="text"
                                            className="w-full rounded-lg border border-gray-300 p-3 shadow-md transition-all focus:shadow-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                        />
                                        <p className="mt-1 text-sm text-red-500">{errors.phone?.message}</p>
                                    </div>

                                    {/* Role */}
                                    {/* Role */}
                                    <div>
                                        <label className="block text-gray-600">Role Permission</label>
                                        <select
                                            {...register('role')}
                                            className="w-full rounded-lg border border-gray-300 p-3 shadow-md transition-all focus:shadow-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                        >
                                            {auth.user.role === 'admin' && (
                                                <>
                                                    <option value="manager">Manager</option>
                                                    <option value="admin">Admin</option>
                                                </>
                                            )}
                                            <option value="customer">Customer</option>
                                        </select>
                                        <p className="mt-1 text-sm text-red-500">{errors.role?.message}</p>
                                    </div>

                                    {/* Password */}
                                    <div className="relative">
                                        <label className="block text-gray-600">Password</label>
                                        <input
                                            {...register('password')}
                                            type={showPassword ? 'text' : 'password'}
                                            className="w-full rounded-lg border border-gray-300 p-3 shadow-md transition-all focus:shadow-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                        />
                                        <button
                                            type="button"
                                            className="absolute top-10 right-3 text-gray-500"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                                        </button>
                                        <p className="mt-1 text-sm text-red-500">{errors.password?.message}</p>
                                    </div>

                                    {/* Confirm Password */}
                                    <div className="relative">
                                        <label className="block text-gray-600">Confirm Password</label>
                                        <input
                                            {...register('confirmPassword')}
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            className="w-full rounded-lg border border-gray-300 p-3 shadow-md transition-all focus:shadow-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                        />
                                        <button
                                            type="button"
                                            className="absolute top-10 right-3 text-gray-500"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                                        </button>
                                        <p className="mt-1 text-sm text-red-500">{errors.confirmPassword?.message}</p>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="mt-4 flex justify-center">
                                        <button
                                            type="submit"
                                            className="transform cursor-pointer rounded-lg bg-blue-600 px-6 py-2 text-white shadow-lg transition-all hover:scale-105 hover:bg-blue-700"
                                        >
                                            {isCreating ? 'Creating...' : 'Create'}
                                        </button>
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

export default CreateUser;
