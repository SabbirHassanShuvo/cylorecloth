import Header from '../../common/Header';
import HomeSlider from "../../components/frontend/HomeSlider";
import HomeCategory from "../../components/frontend/HomeCategory";
import HomeArrivals from "../../components/frontend/HomeArrivals";
import HomeHotProduct from "../../components/frontend/HomeHotProduct";
import HomeFeatureProduct from "../../components/frontend/HomeFeatureProduct";
import Footer from "../../common/Footer";

const Home = () => {
    return (
        <>
            {/* Header Part */}
            <Header />
            {/* Slider part */}
            <HomeSlider />

            {/* Catergory Part */}
            <HomeCategory />

            {/* New Arrivals */}
            <HomeArrivals />

            {/* Hot Product */}
            <HomeHotProduct />

            {/* Feature Product */}
            <HomeFeatureProduct />

            <div className="bg-white shadow-xl rounded-lg p-6 flex flex-wrap justify-around items-center pb-14">
                <div className="text-center px-6 py-4 shadow-2xl mb-4 sm:mb-0 sm:w-auto w-full rounded-lg">
                    <div className="text-4xl mb-2">🚚</div>
                    <h3 className="font-semibold text-lg">Free Delivery</h3>
                    <p className="text-gray-500 text-sm">Free Shipping on all orders</p>
                </div>
                <div className="text-center px-6 py-4 shadow-2xl mb-4 sm:mb-0 sm:w-auto w-full rounded-lg">
                    <div className="text-4xl mb-2">🔄</div>
                    <h3 className="font-semibold text-lg">Return Policy</h3>
                    <p className="text-gray-500 text-sm">Free Shipping on all orders</p>
                </div>
                <div className="text-center px-6 py-4 shadow-2xl mb-4 sm:mb-0 sm:w-auto w-full rounded-lg">
                    <div className="text-4xl mb-2">🎧</div>
                    <h3 className="font-semibold text-lg">24/7 Support</h3>
                    <p className="text-gray-500 text-sm">Free Shipping on all orders</p>
                </div>
                <div className="text-center px-6 py-4 shadow-2xl sm:w-auto w-full rounded-lg">
                    <div className="text-4xl mb-2">💰</div>
                    <h3 className="font-semibold text-lg">Secure Payment</h3>
                    <p className="text-gray-500 text-sm">Free Shipping on all orders</p>
                </div>
            </div>

            {/* Footer Part */}
            <Footer />
        </>
    )
}

export default Home