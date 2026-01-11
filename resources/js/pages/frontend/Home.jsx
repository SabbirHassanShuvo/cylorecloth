import Header from '../../common/Header';
import HomeSlider from "../../components/frontend/HomeSlider";
import HomeCategory from "../../components/frontend/HomeCategory";
import HomeArrivals from "../../components/frontend/HomeArrivals";
import HomeHotProduct from "../../components/frontend/HomeHotProduct";
import HomeFeatureProduct from "../../components/frontend/HomeFeatureProduct";
import Footer from "../../common/Footer";
import { motion } from 'framer-motion';

// ✅ FeatureCard 
const FeatureCard = ({ emoji, title, description, delay = 0 }) => {
    return (
        <motion.div
            className="text-center px-6 py-4 bg-white rounded-xl shadow-lg w-full sm:w-auto mb-4 sm:mb-0"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            whileHover={{
                y: -8,
                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.06)',
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
            {/* Header Part */}
            <Header />

            {/* Slider part */}
            <HomeSlider />

            {/* Category Part */}
            <HomeCategory />

            {/* New Arrivals */}
            <HomeArrivals />

            {/* Hot Product */}
            <HomeHotProduct />

            {/* Feature Product */}
            <HomeFeatureProduct />

            {/* ✅ Animated Features Section (Replaces old static div) */}
            <div className="py-12 bg-gradient-to-b from-gray-50 to-white">
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