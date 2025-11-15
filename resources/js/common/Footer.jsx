const Footer = () => {
    return (
        <>
            <footer className="bg-gray-900 text-white py-8">
                <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 py-10">
                    <div>
                        <h3 className="font-semibold text-lg">CONTACT INFO</h3>
                        <p className="mt-2">NINAKABBO 227/A Tejgaon-Gulshan Link Road</p>
                        <p>Postal Code: 1208 Dhaka, Bangladesh</p>
                        <p className="mt-2">+8801777020000</p>
                        <p>hello@sailor.com.bd</p>
                        <div className="flex mt-3 space-x-3">
                            <i className="fab fa-facebook"></i>
                            <i className="fab fa-instagram"></i>
                            <i className="fab fa-youtube"></i>
                            <i className="fab fa-linkedin"></i>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg">KNOW US</h3>
                        <ul className="mt-2 space-y-2">
                            <li><a href="#" className="hover:underline">Who We Are</a></li>
                            <li><a href="#" className="hover:underline">Sailor Club</a></li>
                            <li><a href="#" className="hover:underline">Brand Social Responsibilities (BSR)</a></li>
                            <li><a href="#" className="hover:underline">Join Us</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg">SHOPPING INFORMATION</h3>
                        <ul className="mt-2 space-y-2">
                            <li><a href="#" className="hover:underline">Privacy Policy Page</a></li>
                            <li><a href="#" className="hover:underline">Size Guide</a></li>
                            <li><a href="#" className="hover:underline">How To Shop</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg">SERVICE INFORMATION</h3>
                        <ul className="mt-2 space-y-2">
                            <li><a href="#" className="hover:underline">Return And Exchange</a></li>
                            <li><a href="#" className="hover:underline">Shipping & Charges</a></li>
                            <li><a href="#" className="hover:underline">Customer Service</a></li>
                            <li><a href="#" className="hover:underline">Terms And Conditions</a></li>
                            <li><a href="#" className="hover:underline">Store Locator</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm flex flex-wrap justify-center gap-4">
                    <p>Copyright &copy;2025 Cylore. All Rights Reserved</p>
                    <p>
                        System Design & Developed By :
                        <a href="https://www.facebook.com/cyloresoftware" className="text-red-500" target="_blank" rel="noopener noreferrer">
                            Cylore Software
                        </a>
                    </p>
                </div>
            </footer>
        </>
    )
}

export default Footer