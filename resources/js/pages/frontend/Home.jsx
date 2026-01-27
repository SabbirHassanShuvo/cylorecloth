import Header from '../../common/Header';
import HomeSlider from "../../components/frontend/HomeSlider";
import HomeCategory from "../../components/frontend/HomeCategory";
import HomeArrivals from "../../components/frontend/HomeArrivals";
import HomeHotProduct from "../../components/frontend/HomeHotProduct";
import HomeFeatureProduct from "../../components/frontend/HomeFeatureProduct";
import Footer from "../../common/Footer";
import { motion } from 'framer-motion';

// ✨ Fashion Background Animation Component
const FashionBackground = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Gradient Overlay */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-pink-50/30 via-purple-50/20 to-blue-50/30"
                animate={{
                    background: [
                        'linear-gradient(to bottom right, rgba(252, 231, 243, 0.3), rgba(250, 245, 255, 0.2), rgba(239, 246, 255, 0.3))',
                        'linear-gradient(to bottom right, rgba(239, 246, 255, 0.3), rgba(252, 231, 243, 0.2), rgba(250, 245, 255, 0.3))',
                        'linear-gradient(to bottom right, rgba(250, 245, 255, 0.3), rgba(239, 246, 255, 0.2), rgba(252, 231, 243, 0.3))',
                    ],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Floating Fashion Elements */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, Math.random() * 20 - 10, 0],
                        rotate: [0, 360],
                        opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                        duration: 15 + Math.random() * 10,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: 'easeInOut',
                    }}
                >
                    <div
                        className="text-4xl md:text-6xl opacity-20"
                        style={{
                            filter: 'blur(1px)',
                        }}
                    >
                        {['👗', '👠', '👜', '💄', '💅', '👒', '💍', '🕶️'][i]}
                    </div>
                </motion.div>
            ))}

            {/* Sparkle Effects */}
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={`sparkle-${i}`}
                    className="absolute w-1 h-1 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        scale: [0, 1.5, 0],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: 'easeInOut',
                    }}
                />
            ))}

            {/* Elegant Wave Pattern */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-64 opacity-10"
                style={{
                    background: 'linear-gradient(to top, rgba(219, 39, 119, 0.2), transparent)',
                }}
                animate={{
                    opacity: [0.05, 0.15, 0.05],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
        </div>
    );
};

// ✅ FeatureCard 
const FeatureCard = ({ emoji, title, description, delay = 0 }) => {
    return (
        <motion.div
            className="text-center px-6 py-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg w-full sm:w-auto mb-4 sm:mb-0 border border-pink-100/50"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            whileHover={{
                y: -8,
                boxShadow: '0 20px 25px -5px rgba(236, 72, 153, 0.2), 0 10px 10px -5px rgba(236, 72, 153, 0.1)',
                borderColor: 'rgba(236, 72, 153, 0.3)',
            }}
        >
            <motion.div
                className="text-4xl mb-2"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                {emoji}
            </motion.div>
            <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
            <p className="text-gray-500 text-sm mt-1">{description}</p>
        </motion.div>
    );
};

const Home = () => {
    const features = [
        { emoji: '🚚', title: 'Free Delivery', description: 'Free shipping on all orders over $50' },
        { emoji: '🔄', title: 'Easy Returns', description: '30-day hassle-free return policy' },
        { emoji: '🎧', title: '24/7 Support', description: 'Live chat & email support anytime' },
        { emoji: '💰', title: 'Secure Payment', description: 'SSL encrypted secure checkout' },
    ];

    return (
        <>
            {/* ✨ Fashion Background Animation */}
            <FashionBackground />

            {/* Header Part */}
            <Header />

            {/* Slider part with entrance animation */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <HomeSlider />
            </motion.div>

            {/* Category Part */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <HomeCategory />
            </motion.div>

            {/* New Arrivals */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <HomeArrivals />
            </motion.div>

            {/* Hot Product */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <HomeHotProduct />
            </motion.div>

            {/* Feature Product */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <HomeFeatureProduct />
            </motion.div>

            {/* ✅ Animated Features Section */}
            <div className="py-12 bg-gradient-to-b from-white/50 to-pink-50/30 backdrop-blur-sm relative">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
                        {features.map((feature, index) => (
                            <FeatureCard
                                key={index}
                                emoji={feature.emoji}
                                title={feature.title}
                                description={feature.description}
                                delay={index * 0.1}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Part */}
            <Footer />
        </>
    );
};

export default Home;