import Sidebar from "../../../common/backend/Sidebar";
import Header from "../../../common/backend/Header";
import MobileFooter from "../../../common/backend/MobileFooter";
import { Link, usePage } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImageIcon } from "lucide-react";
import { IoSettingsOutline } from "react-icons/io5";
import { Eye, EyeOff } from 'lucide-react';
import { IoKeyOutline } from 'react-icons/io5';


const districtCityMap = {
    Bagerhat: 'Bagerhat Sadar',
    Bandarban: 'Bandarban Sadar',
    Barguna: 'Barguna Sadar',
    Barisal: 'Barisal Sadar',
    Bhola: 'Bhola Sadar',
    Bogra: 'Bogra Sadar',
    Brahmanbaria: 'Brahmanbaria Sadar',
    Chandpur: 'Chandpur Sadar',
    ChapaiNawabganj: 'Chapai Nawabganj Sadar',
    Chattogram: 'Chattogram City',
    Chuadanga: 'Chuadanga Sadar',
    Comilla: 'Comilla Sadar',
    "Cox's Bazar": "Cox's Bazar Sadar",
    Dhaka: 'Gulshan',
    Dinajpur: 'Dinajpur Sadar',
    Faridpur: 'Faridpur Sadar',
    Feni: 'Feni Sadar',
    Gaibandha: 'Gaibandha Sadar',
    Gazipur: 'Gazipur Sadar',
    Gopalganj: 'Gopalganj Sadar',
    Habiganj: 'Habiganj Sadar',
    Jamalpur: 'Jamalpur Sadar',
    Jashore: 'Jashore Sadar',
    Jhalokathi: 'Jhalokathi Sadar',
    Jhenaidah: 'Jhenaidah Sadar',
    Joypurhat: 'Joypurhat Sadar',
    Khagrachari: 'Khagrachari Sadar',
    Khulna: 'Khulna Sadar',
    Kishoreganj: 'Kishoreganj Sadar',
    Kurigram: 'Kurigram Sadar',
    Kushtia: 'Kushtia Sadar',
    Lakshmipur: 'Lakshmipur Sadar',
    Lalmonirhat: 'Lalmonirhat Sadar',
    Madaripur: 'Madaripur Sadar',
    Magura: 'Magura Sadar',
    Manikganj: 'Manikganj Sadar',
    Meherpur: 'Meherpur Sadar',
    Moulvibazar: 'Moulvibazar Sadar',
    Munshiganj: 'Munshiganj Sadar',
    Mymensingh: 'Mymensingh Sadar',
    Naogaon: 'Naogaon Sadar',
    Narail: 'Narail Sadar',
    Narayanganj: 'Narayanganj Sadar',
    Narsingdi: 'Narsingdi Sadar',
    Natore: 'Natore Sadar',
    Netrokona: 'Netrokona Sadar',
    Nilphamari: 'Nilphamari Sadar',
    Noakhali: 'Noakhali Sadar',
    Pabna: 'Pabna Sadar',
    Panchagarh: 'Panchagarh Sadar',
    Patukhali: 'Patuakhali Sadar',
    Pirojpur: 'Pirojpur Sadar',
    Rajbari: 'Rajbari Sadar',
    Rajshahi: 'Rajshahi Sadar',
    Rangamati: 'Rangamati Sadar',
    Rangpur: 'Rangpur Sadar',
    Satkhira: 'Satkhira Sadar',
    Shariatpur: 'Shariatpur Sadar',
    Sherpur: 'Sherpur Sadar',
    Sirajganj: 'Sirajganj Sadar',
    Sunamganj: 'Sunamganj Sadar',
    Sylhet: 'Sylhet Sadar',
    Tangail: 'Tangail Sadar',
    Thakurgaon: 'Thakurgaon Sadar',
};

const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    district: yup.string().required("District is required"),
    city: yup.string().required("City is required"),
    phone: yup.string().required("Phone is required"),
    address: yup.string().required("Address is required"),
});

export const changePasswordSchema = yup.object().shape({
    new_password: yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('New password is required'),
    confirm_password: yup.string()
        .oneOf([yup.ref('new_password'), null], 'Passwords must match')
        .required('Confirm password is required'),
});

const Account = () => {
    const { user } = usePage().props.auth;

    // account data
    const account = user.account || {};
    const [selectedDistrict, setSelectedDistrict] = useState(account.district || '');
    const [city, setCity] = useState(account.city || '');

    const [image, setImage] = useState(user.account?.image || 'https://via.placeholder.com/150');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register: passwordRegister,
        handleSubmit: handlePasswordSubmit,
        formState: { errors: passwordErrors },
    } = useForm({
        resolver: yupResolver(changePasswordSchema),
    });

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: user.name,
            district: user.district || '',
            city: user.city || '',
            phone: user.phone || '',
            address: user?.account?.address || ''
        },
    });

    useEffect(() => {
        if (user?.account?.address) {
            setValue('address', user.account.address);
        }
    }, [user, setValue]);


    useEffect(() => {
        if (selectedDistrict) {
            setValue('district', selectedDistrict);
            if (!city) {
                const defaultCity = districtCityMap[selectedDistrict] || '';
                setCity(defaultCity);
                setValue('city', defaultCity);
            }
        }
    }, [selectedDistrict, city, setValue]);

    const handleDistrictChange = (e) => {
        const district = e.target.value;
        setSelectedDistrict(district);
        setValue('district', district);

        const defaultCity = districtCityMap[district] || '';
        setCity(defaultCity);
        setValue('city', defaultCity);
    };

    const handleCityChange = (e) => {
        const newCity = e.target.value;
        setCity(newCity);
        setValue('city', newCity);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Check file size (2MB = 2 * 1024 * 1024 bytes)
        if (file.size > 2 * 1024 * 1024) {
            setTimeout(() => {
                toast.error("Image size should not exceed 2MB!");
            }, 2000);
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        const previewUrl = URL.createObjectURL(file);
        setImage(previewUrl);

        router.post('/profile/uploadphoto', formData, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setTimeout(() => {
                    toast.success('Profile updated!');
                }, 2000);
            },
            onError: (errors) => {
                toast.error("Image upload failed!");
            },
        });
    };


    const onSubmit = (data) => {
        setIsSubmitting(true);

        router.post(`/account/update/${user.id}`, data, {
            onSuccess: () => {
                setIsSubmitting(false);
                setTimeout(() => {
                    toast.success('Profile updated!');
                }, 2000);  // 2 second delay before showing toast
            },
            onError: (err) => {
                setIsSubmitting(false);
                setTimeout(() => {
                    toast.error('Update failed!');
                }, 2000);  // 2 second delay before showing toast
            },
        });

    };

    const onChangePassword = (data) => {
        const formData = {
            new_password: data.new_password,
            confirm_password: data.confirm_password
        };

        router.post('/account/changepassword', formData, {
            onSuccess: () => {
                toast.success("Password changed successfully!");
            },
            onError: (errors) => {
                if (errors.new_password) {
                    toast.error(errors.new_password[0]);
                } else {
                    toast.error("Password update failed!");
                }
            }
        });
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                closeButton={true}
                hideProgressBar={false}
                newestOnTop={true}
                rtl={false}
            />
            <Header />
            <section className="pt-3 pb-3">
                <div className="flex flex-col md:flex-row">
                    <Sidebar />
                    <div className="w-full p-4 pt-0">
                        <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-6">
                            <div className="w-full max-w-6xl bg-white shadow-2xl rounded-3xl p-6 sm:p-10">
                                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-gray-800">
                                    Account Settings
                                </h2>

                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
                                        {/* Profile Image */}
                                        <div className="flex flex-col items-center space-y-4 w-full lg:w-1/3">
                                            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-100">
                                                <img
                                                    src={image}
                                                    alt=""
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full bg-white text-gray-700 text-sm shadow-sm hover:bg-gray-100 cursor-pointer transition">
                                                <ImageIcon className="w-4 h-4" />
                                                Change
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>

                                        {/* Form Fields */}
                                        <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label className="text-gray-700 font-medium">Name</label>
                                                <input
                                                    type="text"
                                                    placeholder="Your Name"
                                                    className={`w-full mt-2 p-3 text-base sm:text-lg rounded-xl bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                                                    {...register('name')}
                                                />
                                                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                                            </div>

                                            <div>
                                                <label className="text-gray-700 font-medium">Email</label>
                                                <input
                                                    type="text"
                                                    value={user.email}
                                                    disabled
                                                    className="w-full mt-2 p-3 text-base sm:text-lg rounded-xl bg-gray-100 border border-gray-300 cursor-not-allowed"
                                                />
                                            </div>

                                            <div>
                                                <label className="text-gray-700 font-medium">District</label>
                                                <select
                                                    value={selectedDistrict}
                                                    onChange={handleDistrictChange}
                                                    className={`w-full mt-2 p-3 text-base sm:text-lg rounded-xl bg-gray-50 border ${errors.district ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                                                >
                                                    <option value="" disabled>Select District</option>
                                                    {Object.keys(districtCityMap).map((district) => (
                                                        <option key={district} value={district}>
                                                            {district}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.district && <p className="mt-1 text-sm text-red-500">{errors.district.message}</p>}
                                            </div>

                                            <div>
                                                <label className="text-gray-700 font-medium">City</label>
                                                <input
                                                    type="text"
                                                    value={city}
                                                    onChange={handleCityChange}
                                                    placeholder="Enter City"
                                                    className={`w-full mt-2 p-3 text-base sm:text-lg rounded-xl bg-gray-50 border ${errors.city ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                                                    {...register('city')}
                                                />
                                                {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>}
                                            </div>

                                            <div>
                                                <label className="text-gray-700 font-medium">Phone Number</label>
                                                <input
                                                    type="text"
                                                    placeholder="Phone contact number"
                                                    className={`w-full mt-2 p-3 text-base sm:text-lg rounded-xl bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                                                    {...register('phone')}
                                                />
                                                {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
                                            </div>

                                            <div className="col-span-1 sm:col-span-2">
                                                <label className="text-gray-700 font-medium">Address</label>
                                                <textarea
                                                    rows="4"
                                                    placeholder="Enter your full address"
                                                    className={`w-full mt-2 p-3 text-base sm:text-lg rounded-xl bg-gray-50 border ${errors.address ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none`}
                                                    {...register('address')}
                                                ></textarea>
                                                {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="mt-10 flex justify-end">
                                        <button
                                            type="submit"
                                            className="bg-indigo-500 text-white text-base sm:text-lg px-4 py-2 rounded-lg hover:bg-indigo-600 transition shadow-lg disabled:opacity-50 flex items-center gap-2"
                                            disabled={isSubmitting}
                                        >
                                            <IoSettingsOutline className={`w-5 h-5 ${isSubmitting ? 'animate-spin' : ''}`} />
                                            <span>{isSubmitting ? 'Saving...' : 'Save Changes'}</span>
                                        </button>
                                    </div>
                                </form>
                                {/* Change Password Section */}
                                <div className="mt-14 border-t pt-10">
                                    <div className="flex flex-col lg:flex-row gap-10">

                                        {/* Left Side - Empty */}
                                        <div className="lg:w-1/3"></div>

                                        {/* Right Side - Change Password Form */}
                                        <div className="lg:w-2/3 w-full">
                                            <form onSubmit={handlePasswordSubmit(onChangePassword)}>
                                                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Change Password</h3>

                                                {/* New Password */}
                                                <div className="mb-6">
                                                    <label className="text-gray-700 font-medium mb-2 block">New Password</label>
                                                    <div className="relative">
                                                        <input
                                                            type={showPassword ? "text" : "password"} {...passwordRegister("new_password")}
                                                            placeholder="Enter new password"
                                                            className="w-full p-4 text-lg rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                                        />
                                                        <button
                                                            type="button"
                                                            className="absolute inset-y-0 right-4 flex items-center text-gray-500"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                        >
                                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                        </button>
                                                    </div>
                                                    {passwordErrors.new_password && (
                                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                                            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 6.75a.75.75 0 110 1.5.75.75 0 010-1.5zm0 12a9 9 0 100-18 9 9 0 000 18z" />
                                                            </svg>
                                                            {passwordErrors.new_password.message}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Confirm Password */}
                                                <div className="mb-6">
                                                    <label className="text-gray-700 font-medium mb-2 block">Confirm Password</label>
                                                    <div className="relative">
                                                        <input
                                                            type={showConfirmPassword ? "text" : "password"} {...passwordRegister("confirm_password")}
                                                            placeholder="Confirm new password"
                                                            className="w-full p-4 text-lg rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                                        />
                                                        <button
                                                            type="button"
                                                            className="absolute inset-y-0 right-4 flex items-center text-gray-500"
                                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        >
                                                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                        </button>
                                                    </div>
                                                    {passwordErrors.confirm_password && (
                                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                                            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 6.75a.75.75 0 110 1.5.75.75 0 010-1.5zm0 12a9 9 0 100-18 9 9 0 000 18z" />
                                                            </svg>
                                                            {passwordErrors.confirm_password.message}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Submit Button */}
                                                <div className="flex justify-end mt-8">
                                                    <button
                                                        type="submit"
                                                        className="bg-rose-600 text-white text-base px-6 py-2 rounded-lg hover:bg-rose-700 transition shadow-lg flex items-center gap-2 cursor-pointer"
                                                    >
                                                        <IoKeyOutline className="w-5 h-5" />
                                                        Change Password
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <MobileFooter />
        </>
    )
}

export default Account;