import { Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../../common/backend/Header';
import MobileFooter from '../../../common/backend/MobileFooter';
import Sidebar from '../../../common/backend/Sidebar';
const Edit = () => {
    const { users, error, auth } = usePage().props; // Inertia.js
    const [isUpdating, setIsUpdating] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: {
            name: users?.name || '',
            email: users?.email || '',
            phone: users?.phone || '',
            status: users?.status ?? '1',
            role: users?.role || 'customer',
        },
    });

    useEffect(() => {
        if (error) {
            // Show backend error message using Toastify
            toast.error(error, { autoClose: 2000 });
        }
    }, [error]);

    const onSubmit = (data) => {
        setIsUpdating(true);
        router.post(`/user/update/${users.id}`, data, {
            onSuccess: () => {
                toast.success('User Updated Successfully!', { autoClose: 2000 });

                setTimeout(() => {
                    router.visit('/user'); // ✅ Inertia Redirect
                }, 2000);

                setIsUpdating(false);
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
                    <Sidebar />
                    <div className="w-full p-4 pt-0">
                        <header className="flex items-center justify-between rounded-lg bg-white px-3 py-2 shadow-lg">
                            <h1 className="text-xl font-semibold text-gray-700">Edit User</h1>
                            <div className="flex items-center gap-4">
                                <Link href="/user" className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white shadow-md hover:bg-blue-700">
                                    Back
                                </Link>
                            </div>
                        </header>
                        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
                            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl md:p-8">
                                <h2 className="mb-4 text-center text-xl font-semibold text-gray-700">Edit User</h2>
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
                                            disabled // ইমেইল পরিবর্তন করতে না দিতে চাইলে
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
                                    {auth.user.role === 'admin' && (
                                        <div>
                                            <label className="block text-gray-600">Role</label>
                                            <select
                                                {...register('role')}
                                                defaultValue={users?.role || 'customer'}
                                                className="w-full rounded-lg border border-gray-300 p-3 shadow-md transition-all focus:shadow-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                            >
                                                <option value="admin">Admin</option>
                                                <option value="manager">Manager</option>
                                                <option value="customer">Customer</option>
                                            </select>
                                            <p className="mt-1 text-sm text-red-500">{errors.role?.message}</p>
                                        </div>
                                    )}
                                    <div>
                                        <label className="block text-gray-600">Status</label>
                                        <select
                                            {...register('status')}
                                            defaultValue={String(users?.status ?? '1')} // ✅ Ensure string format for safety
                                            className="w-full rounded-lg border border-gray-300 p-3 shadow-md transition-all focus:shadow-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                        >
                                            <option value="1">Active</option>
                                            <option value="0">Blocked</option>
                                        </select>
                                        <p className="mt-1 text-sm text-red-500">{errors.status?.message}</p>
                                    </div>
                                    {/* Submit Button */}
                                    <div className="mt-4 flex justify-center">
                                        <button
                                            type="submit"
                                            className="transform cursor-pointer rounded-lg bg-blue-600 px-6 py-2 text-white shadow-lg transition-all hover:scale-105 hover:bg-blue-700"
                                        >
                                            {isUpdating ? 'Updating...' : 'Update'}
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

export default Edit;
