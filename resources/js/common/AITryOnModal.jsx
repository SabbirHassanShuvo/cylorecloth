import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import { HiSparkles, HiUpload, HiDownload } from 'react-icons/hi';
import { RiRobot2Fill } from 'react-icons/ri';
import { FaCheck, FaMagic } from 'react-icons/fa';
import { BsImageFill, BsLightningChargeFill } from 'react-icons/bs';

const AITryOnModal = ({ isOpen, onClose }) => {
    const [userImage, setUserImage] = useState(null);
    const [productImage, setProductImage] = useState(null);
    const [generatedImage, setGeneratedImage] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const userFileRef = useRef(null);
    const productFileRef = useRef(null);

    const handleUserImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProductImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProductImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleTryOn = async () => {
        if (!userImage || !productImage) return;

        setIsGenerating(true);
        setProgress(0);

        // Simulate progress
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 95) {
                    clearInterval(progressInterval);
                    return 95;
                }
                return prev + 5;
            });
        }, 200);

        // Simulated API call - Replace with actual API endpoint
        try {
            // TODO: Replace with actual AI API call
            // const response = await fetch('YOUR_AI_API_ENDPOINT', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ userImage, productImage })
            // });
            // const data = await response.json();
            // setGeneratedImage(data.resultImage);

            // Simulated delay
            await new Promise(resolve => setTimeout(resolve, 3000));

            // For demo purposes, using product image as result
            setGeneratedImage(productImage);
            setProgress(100);
        } catch (error) {
            console.error('Error generating try-on:', error);
        } finally {
            clearInterval(progressInterval);
            setIsGenerating(false);
        }
    };

    const handleDownload = () => {
        if (!generatedImage) return;

        const link = document.createElement('a');
        link.href = generatedImage;
        link.download = `cylore-tryon-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleReset = () => {
        setUserImage(null);
        setProductImage(null);
        setGeneratedImage(null);
        setProgress(0);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed left-1/2 top-1/2 z-[101] w-[95%] max-w-6xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-white shadow-2xl"
                    >
                        {/* Content */}
                        <div className="relative">
                            {/* Header */}
                            <div className="border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="rounded-xl bg-white/20 p-2.5 backdrop-blur-xl">
                                            <RiRobot2Fill className="text-2xl text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-white">AI Virtual Try-On</h2>
                                            <p className="text-sm text-blue-100">See how it looks on you</p>
                                        </div>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={onClose}
                                        className="rounded-full bg-white/20 p-2 text-white backdrop-blur-xl transition-colors hover:bg-white/30"
                                    >
                                        <IoMdClose className="text-xl" />
                                    </motion.button>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="max-h-[75vh] overflow-y-auto p-6">
                                {!generatedImage ? (
                                    <div className="grid gap-6 lg:grid-cols-2">
                                        {/* User Image Upload */}
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 }}
                                        >
                                            <div className="mb-3 flex items-center space-x-2">
                                                <BsImageFill className="text-lg text-blue-600" />
                                                <h3 className="font-semibold text-gray-900">Your Photo</h3>
                                            </div>

                                            <motion.div
                                                whileHover={{ scale: 1.01 }}
                                                onClick={() => userFileRef.current?.click()}
                                                className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition-all hover:border-blue-500 hover:bg-blue-50"
                                            >
                                                {userImage ? (
                                                    <>
                                                        <img
                                                            src={userImage}
                                                            alt="User"
                                                            className="h-full w-full object-cover"
                                                        />
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                                                            <div className="rounded-full bg-white/90 p-3">
                                                                <HiUpload className="text-2xl text-gray-700" />
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="flex h-full flex-col items-center justify-center space-y-3 p-4">
                                                        <div className="rounded-full bg-blue-100 p-4">
                                                            <HiUpload className="text-3xl text-blue-600" />
                                                        </div>
                                                        <div className="text-center">
                                                            <p className="font-semibold text-gray-900">Upload Your Photo</p>
                                                            <p className="mt-1 text-sm text-gray-500">Click to browse</p>
                                                        </div>
                                                    </div>
                                                )}
                                                <input
                                                    ref={userFileRef}
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleUserImageUpload}
                                                    className="hidden"
                                                />
                                            </motion.div>
                                        </motion.div>

                                        {/* Product Image Upload */}
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <div className="mb-3 flex items-center space-x-2">
                                                <HiSparkles className="text-lg text-purple-600" />
                                                <h3 className="font-semibold text-gray-900">Product to Try</h3>
                                            </div>

                                            <motion.div
                                                whileHover={{ scale: 1.01 }}
                                                onClick={() => productFileRef.current?.click()}
                                                className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition-all hover:border-purple-500 hover:bg-purple-50"
                                            >
                                                {productImage ? (
                                                    <>
                                                        <img
                                                            src={productImage}
                                                            alt="Product"
                                                            className="h-full w-full object-cover"
                                                        />
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                                                            <div className="rounded-full bg-white/90 p-3">
                                                                <HiUpload className="text-2xl text-gray-700" />
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="flex h-full flex-col items-center justify-center space-y-3 p-4">
                                                        <div className="rounded-full bg-purple-100 p-4">
                                                            <HiSparkles className="text-3xl text-purple-600" />
                                                        </div>
                                                        <div className="text-center">
                                                            <p className="font-semibold text-gray-900">Select Product</p>
                                                            <p className="mt-1 text-sm text-gray-500">Upload clothing item</p>
                                                        </div>
                                                    </div>
                                                )}
                                                <input
                                                    ref={productFileRef}
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleProductImageUpload}
                                                    className="hidden"
                                                />
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                ) : (
                                    /* Generated Result */
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="mx-auto max-w-xl"
                                    >
                                        <div className="mb-5 text-center">
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: 'spring', delay: 0.2 }}
                                                className="mx-auto mb-3 inline-flex items-center space-x-2 rounded-full bg-green-500 px-5 py-2 shadow-lg"
                                            >
                                                <FaCheck className="text-white" />
                                                <span className="font-semibold text-white">Try-On Complete!</span>
                                            </motion.div>
                                            <h3 className="text-xl font-bold text-gray-900">Here's How You Look</h3>
                                            <p className="mt-1 text-sm text-gray-600">AI-generated result</p>
                                        </div>

                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                            className="overflow-hidden rounded-xl border-2 border-gray-200 shadow-lg"
                                        >
                                            <img
                                                src={generatedImage}
                                                alt="Try-on Result"
                                                className="w-full"
                                            />
                                        </motion.div>

                                        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={handleDownload}
                                                className="flex flex-1 items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-5 py-3 font-semibold text-white shadow-md transition-shadow hover:shadow-lg"
                                            >
                                                <HiDownload className="text-lg" />
                                                <span>Download</span>
                                            </motion.button>

                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={handleReset}
                                                className="flex flex-1 items-center justify-center space-x-2 rounded-lg border-2 border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50"
                                            >
                                                <FaMagic className="text-lg" />
                                                <span>Try Another</span>
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Action Button */}
                                {!generatedImage && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="mt-6"
                                    >
                                        <motion.button
                                            whileHover={{ scale: userImage && productImage ? 1.01 : 1 }}
                                            whileTap={{ scale: userImage && productImage ? 0.99 : 1 }}
                                            onClick={handleTryOn}
                                            disabled={!userImage || !productImage || isGenerating}
                                            className={`relative w-full overflow-hidden rounded-lg py-4 font-bold text-white shadow-lg transition-all disabled:cursor-not-allowed disabled:opacity-50 ${userImage && productImage
                                                ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-xl'
                                                : 'bg-gray-400'
                                                }`}
                                        >
                                            {!isGenerating ? (
                                                <div className="flex items-center justify-center space-x-2">
                                                    <BsLightningChargeFill className="text-xl" />
                                                    <span className="text-lg">Generate AI Try-On</span>
                                                    <HiSparkles className="text-xl" />
                                                </div>
                                            ) : (
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-center space-x-2">
                                                        <motion.div
                                                            animate={{ rotate: 360 }}
                                                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                        >
                                                            <RiRobot2Fill className="text-2xl" />
                                                        </motion.div>
                                                        <span className="text-lg">Processing...</span>
                                                    </div>

                                                    {/* Progress Bar */}
                                                    <div className="mx-auto w-2/3 overflow-hidden rounded-full bg-white/30">
                                                        <motion.div
                                                            className="h-2 rounded-full bg-white"
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${progress}%` }}
                                                            transition={{ duration: 0.3 }}
                                                        />
                                                    </div>
                                                    <p className="text-sm text-blue-100">{progress}% Complete</p>
                                                </div>
                                            )}
                                        </motion.button>

                                        {!userImage || !productImage ? (
                                            <p className="mt-2 text-center text-sm text-gray-500">
                                                Please upload both images to continue
                                            </p>
                                        ) : null}
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AITryOnModal;