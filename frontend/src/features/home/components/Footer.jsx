import { Link } from "react-router-dom";
import {
    Home,
    MapPin,
    Building2,
    Phone,
    Mail,
    Facebook,
    Instagram,
    Linkedin,
} from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-stone-900 text-stone-300 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="bg-stone-700 p-2 rounded-xl">
                                <Home className="w-5 h-5 text-white" />
                            </div>

                            <h2 className="text-2xl font-bold text-white">
                                Property Point
                            </h2>
                        </div>

                        <p className="mt-5 text-sm leading-7 text-stone-400">
                            Property Point helps buyers, sellers, and investors
                            discover verified residential and commercial
                            properties across India with complete transparency.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-5">
                            Quick Links
                        </h3>

                        <ul className="space-y-3">
                            <li>
                                <Link to="/" className="hover:text-white">
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link to="/properties" className="hover:text-white">
                                    Browse Properties
                                </Link>
                            </li>

                            <li>
                                <Link to="/locations" className="hover:text-white">
                                    Locations
                                </Link>
                            </li>

                            <li>
                                <Link to="/sell-property" className="hover:text-white">
                                    Sell Property
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Property Types */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-5">
                            Property Types
                        </h3>

                        <ul className="space-y-3">
                            <li>Apartment</li>
                            <li>Villa</li>
                            <li>House</li>
                            <li>Commercial</li>
                            <li>Office</li>
                            <li>Plot</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-5">
                            Contact
                        </h3>

                        <div className="space-y-4">

                            <div className="flex gap-3">
                                <MapPin className="w-5 h-5 mt-1" />
                                <span>Bhopal, Madhya Pradesh, India</span>
                            </div>

                            <div className="flex gap-3">
                                <Phone className="w-5 h-5" />
                                <span>+91 9876543210</span>
                            </div>

                            <div className="flex gap-3">
                                <Mail className="w-5 h-5" />
                                <span>support@propertypoint.com</span>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Facebook className="w-5 h-5 hover:text-white cursor-pointer" />
                                <Instagram className="w-5 h-5 hover:text-white cursor-pointer" />
                                <Linkedin className="w-5 h-5 hover:text-white cursor-pointer" />
                            </div>

                        </div>
                    </div>

                </div>

                <div className="border-t border-stone-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">

                    <p className="text-sm text-stone-500">
                        © {new Date().getFullYear()} Property Point. All Rights Reserved.
                    </p>

                    <div className="flex gap-6 text-sm mt-4 md:mt-0">
                        <Link to="/privacy" className="hover:text-white">
                            Privacy Policy
                        </Link>

                        <Link to="/terms" className="hover:text-white">
                            Terms & Conditions
                        </Link>

                        <Link to="/contact" className="hover:text-white">
                            Contact
                        </Link>
                    </div>

                </div>

            </div>
        </footer>
    );
};

export default Footer;