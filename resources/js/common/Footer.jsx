import React from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Linkedin, ArrowRight, Heart } from 'lucide-react';

const Footer = () => {
    const socialLinks = [
        { icon: Facebook, href: "https://www.facebook.com", label: "Facebook" },
        { icon: Instagram, href: "#", label: "Instagram" },
        { icon: Youtube, href: "#", label: "YouTube" },
        { icon: Linkedin, href: "#", label: "LinkedIn" }
    ];

    const knowUsLinks = [
        "Who We Are",
        "Sailor Club",
        "Brand Social Responsibilities (BSR)",
        "Join Us"
    ];

    const shoppingLinks = [
        "Privacy Policy Page",
        "Size Guide",
        "How To Shop"
    ];

    const serviceLinks = [
        "Return And Exchange",
        "Shipping & Charges",
        "Customer Service",
        "Terms And Conditions",
        "Store Locator"
    ];

    return (
        <footer className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Contact Info */}
                    <div
                        className="group"
                        style={{ animation: 'fadeInUp 0.6s ease-out' }}
                    >
                        <h3 className="text-2xl font-bold mb-6 relative inline-block">
                            CONTACT INFO
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-500"></span>
                        </h3>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3 group/item hover:translate-x-2 transition-transform duration-300">
                                <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-gray-400 group-hover/item:text-white transition-colors" />
                                <div>
                                    <p className="text-gray-300 leading-relaxed">NINAKABBO 227/A Tejgaon-Gulshan Link Road</p>
                                    <p className="text-gray-400 text-sm">Postal Code: 1208 Dhaka, Bangladesh</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 group/item hover:translate-x-2 transition-transform duration-300">
                                <Phone className="w-5 h-5 text-gray-400 group-hover/item:text-white transition-colors" />
                                <a href="tel:+8801777020000" className="text-gray-300 hover:text-white transition-colors">
                                    +8801777020000
                                </a>
                            </div>

                            <div className="flex items-center gap-3 group/item hover:translate-x-2 transition-transform duration-300">
                                <Mail className="w-5 h-5 text-gray-400 group-hover/item:text-white transition-colors" />
                                <a href="mailto:hello@sailor.com.bd" className="text-gray-300 hover:text-white transition-colors">
                                    hello@sailor.com.bd
                                </a>
                            </div>
                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-3 mt-6">
                            {socialLinks.map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group/social w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                                        aria-label={social.label}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Know Us */}
                    <div
                        className="group"
                        style={{ animation: 'fadeInUp 0.6s ease-out 0.1s both' }}
                    >
                        <h3 className="text-2xl font-bold mb-6 relative inline-block">
                            KNOW US
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-500"></span>
                        </h3>
                        <ul className="space-y-3">
                            {knowUsLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href="#"
                                        className="group/link flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2"
                                    >
                                        <ArrowRight className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transform -translate-x-2 group-hover/link:translate-x-0 transition-all duration-300" />
                                        <span>{link}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Shopping Information */}
                    <div
                        className="group"
                        style={{ animation: 'fadeInUp 0.6s ease-out 0.2s both' }}
                    >
                        <h3 className="text-2xl font-bold mb-6 relative inline-block">
                            SHOPPING INFORMATION
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-500"></span>
                        </h3>
                        <ul className="space-y-3">
                            {shoppingLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href="#"
                                        className="group/link flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2"
                                    >
                                        <ArrowRight className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transform -translate-x-2 group-hover/link:translate-x-0 transition-all duration-300" />
                                        <span>{link}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Service Information */}
                    <div
                        className="group"
                        style={{ animation: 'fadeInUp 0.6s ease-out 0.3s both' }}
                    >
                        <h3 className="text-2xl font-bold mb-6 relative inline-block">
                            SERVICE INFORMATION
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-500"></span>
                        </h3>
                        <ul className="space-y-3">
                            {serviceLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href="#"
                                        className="group/link flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2"
                                    >
                                        <ArrowRight className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transform -translate-x-2 group-hover/link:translate-x-0 transition-all duration-300" />
                                        <span>{link}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 mt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                        <p className="text-gray-400 flex items-center gap-2">
                            Copyright © 2025 Cylore. All Rights Reserved
                            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                        </p>
                        <p className="text-gray-400">
                            System Design & Developed By :
                            <a
                                href="https://www.facebook.com/cyloresoftware"
                                className="ml-2 text-white font-semibold hover:text-gray-300 transition-colors duration-300 relative group/dev"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Cylore Software
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover/dev:w-full transition-all duration-300"></span>
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </footer>
    );
};

export default Footer;