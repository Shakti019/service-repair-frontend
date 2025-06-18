import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="w-full bg-black text-white py-8 mt-auto">
            <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4 text-center sm:text-left">
                        <h2 className="text-2xl font-savate font-bold">ElectroCare</h2>
                        <p className="text-gray-300 text-sm font-savate sm:text-base">Your trusted partner in electronic service solutions.</p>
                        <div className="flex justify-center sm:justify-start space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 font-savate transition-colors">
                                <FaFacebook size={24} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400  font-savate transition-colors">
                                <FaTwitter size={24} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 font-savate transition-colors">
                                <FaInstagram size={24} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 font-savate transition-colors">
                                <FaLinkedin size={24} />
                            </a>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4 text-center sm:text-left">
                        <h3 className="text-xl font-semibold">Contact Us</h3>
                        <div className="space-y-2">
                            <p className="flex items-center justify-center sm:justify-start space-x-2">
                                <FaPhone className="text-blue-400" />
                                <span className="text-sm font-savate sm:text-base">+9161260213</span>
                            </p>
                            <p className="flex items-center justify-center sm:justify-start space-x-2">
                                <FaEnvelope className="text-blue-400" />
                                <span className="text-sm font-savate sm:text-base">contact@electrocare.com</span>
                            </p>
                            <p className="flex items-center justify-center sm:justify-start space-x-2">
                                <FaMapMarkerAlt className="text-blue-400" />
                                <span className="text-sm font-savate sm:text-base">Katraj Pune Maharastra India</span>
                            </p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4 text-center sm:text-left">
                        <h3 className="text-xl font-savate font-semibold">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/about" className="font-savate hover:text-gray-400 transition-colors text-sm sm:text-base">About Us</a></li>
                            <li><a href="/services" className="font-savate hover:text-gray-400 transition-colors text-sm sm:text-base">Services</a></li>
                            <li><a href="/contact" className="font-savate hover:text-gray-400 transition-colors text-sm sm:text-base">Contact</a></li>
                            <li><a href="/privacy-policy" className="font-savate hover:text-gray-400 transition-colors text-sm sm:text-base">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-700 mt-8 pt-6 text-center">
                    <p className="text-gray-400 text-sm sm:text-base">
                        © {new Date().getFullYear()} ElectroCare. All rights reserved.
                    </p>
                    <p className="text-gray-400 mt-2 text-sm sm:text-base">
                        Developed by <span className="text-blue-400">keevGo</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}