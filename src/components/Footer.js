import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-blue-900 to-blue-800 text-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 border-b-2 border-blue-400 pb-2 inline-block">
                            About BAESA
                        </h3>
                        <p className="text-blue-100 text-sm leading-relaxed">
                            Bangladesh Atomic Energy Scientist's Association (BAESA) is dedicated to advancing scientific research and fostering collaboration among atomic energy scientists in Bangladesh.
                        </p>
                        {/* <div className="mt-4">
                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                                <div className="text-blue-900 text-2xl font-bold">⚛</div>
                            </div>
                        </div> */}
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 border-b-2 border-blue-400 pb-2 inline-block">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#about" className="text-blue-100 hover:text-white hover:pl-2 transition-all duration-200 block text-sm">
                                    → About Us
                                </a>
                            </li>
                            <li>
                                <a href="#executives" className="text-blue-100 hover:text-white hover:pl-2 transition-all duration-200 block text-sm">
                                    → BAESA Executives
                                </a>
                            </li>
                            <li>
                                <a href="#members" className="text-blue-100 hover:text-white hover:pl-2 transition-all duration-200 block text-sm">
                                    → Members
                                </a>
                            </li>
                            <li>
                                <a href="#news" className="text-blue-100 hover:text-white hover:pl-2 transition-all duration-200 block text-sm">
                                    → News & Events
                                </a>
                            </li>
                            <li>
                                <a href="#gallery" className="text-blue-100 hover:text-white hover:pl-2 transition-all duration-200 block text-sm">
                                    → Photo Gallery
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className="text-blue-100 hover:text-white hover:pl-2 transition-all duration-200 block text-sm">
                                    → Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 border-b-2 border-blue-400 pb-2 inline-block">
                            Contact Us
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-blue-50 flex-shrink-0 mt-1" />
                                <span className="text-blue-100 text-sm">
                                    Bangladesh Atomic Energy Commission<br />
                                    Dhaka, Bangladesh
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-blue-50 flex-shrink-0" />
                                <a href="tel:+880123456789" className="text-blue-100 hover:text-white transition-colors text-sm">
                                    +880-123-456-789
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-blue-50 flex-shrink-0" />
                                <a href="mailto:info@baesa.org.bd" className="text-blue-100 hover:text-white transition-colors text-sm">
                                    info@baesa.org.bd
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media & Newsletter */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 border-b-2 border-blue-400 pb-2 inline-block">
                            Connect With Us
                        </h3>
                        <p className="text-blue-100 text-sm mb-4">
                            Follow us on social media for latest updates
                        </p>
                        <div className="flex gap-3 mb-6">
                            <a
                                href="#facebook"
                                className="w-10 h-10 bg-blue-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-200"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a
                                href="#twitter"
                                className="w-10 h-10 bg-blue-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-200"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a
                                href="#linkedin"
                                className="w-10 h-10 bg-blue-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-200"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                        <div>
                            <p className="text-blue-100 text-sm mb-2">Subscribe to our newsletter</p>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="flex-1 px-3 py-2 rounded bg-blue-100 border border-blue-600 text-black placeholder-gray-50000 focus:outline-none focus:border-blue-400 text-sm"
                                />
                                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded font-semibold transition-colors duration-200 text-sm">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-blue-700">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                        <p className="text-blue-200 text-center md:text-left">
                            © {new Date().getFullYear()} Bangladesh Atomic Energy Scientist's Association (BAESA). All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <a href="#privacy" className="text-blue-200 hover:text-white transition-colors">
                                Privacy Policy
                            </a>
                            <a href="#terms" className="text-blue-200 hover:text-white transition-colors">
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
