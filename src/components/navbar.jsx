import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";

const Navbar = ({ isInHero = false }) => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact Us', path: '/contactus' },
        { name: 'Blogs', path: '/blogs' },
        { name: 'Tago Media', path: '/tagomedia' }
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navClasses = isInHero
        ? "relative py-3 sm:py-4 flex justify-between items-center w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-24 z-50 overflow-visible mobile-navbar-top"
        : "fixed top-0 left-0 right-0 py-3 sm:py-4 flex justify-between items-center w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-24 z-50 overflow-visible";

    const navStyle = isInHero
        ? { position: 'relative', backdropFilter: 'none', borderBottom: 'none' }
        : { position: 'fixed', background: '#EFF1F2', backdropFilter: 'none', borderBottom: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' };

    return (
        <nav className={navClasses} style={navStyle}>
            {/* Logo Section - Left */}
            <div className="lg:text-2xl font-bold flex items-center relative z-10 min-w-[120px] sm:min-w-[150px] lg:flex-1 -ml-2 lg:-ml-4 macbook-logo-adjust">
                <Link to="/">
                    <div className="flex items-center">
                        <img
                            src="/tagobitslogo.png"
                            alt="Tagobits Logo"
                            className="w-24 sm:w-32 md:w-36 lg:w-40 xl:w-44 mt-1 lg:mt-0 max-w-[180px] h-auto object-contain"
                        />
                    </div>
                </Link>
            </div>

            {/* Centered Desktop Navigation Pill with Glassmorphism */}
            <div className="hidden lg:flex items-center space-x-0 bg-white/60 backdrop-blur-md rounded-full border border-white/40 py-1 px-1 absolute left-1/2 xl:left-[43.5%] 2xl:left-1/2 -translate-x-1/2 z-30 shadow-sm transition-all duration-300">
                {navLinks.map((link, index) => {
                    const isHovered = hoveredIndex === index;
                    // Only show active state for non-Home pages
                    const isActive = location.pathname === link.path;
                    // Show active gradient only when not hovering on any other item
                    const showActiveGradient = isActive && hoveredIndex === null;

                    return (
                        <div key={link.path} className="relative flex items-center">
                            <Link
                                to={link.path}
                                className="relative"
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                {/* Gradient Background for Hover or Active State */}
                                {(isHovered || showActiveGradient) && (
                                    <motion.div
                                        layoutId={showActiveGradient ? "navbar-active" : "navbar-hover"}
                                        className="absolute inset-0 rounded-full"
                                        style={{
                                            background: 'linear-gradient(135deg, #1B67BA 0%, #2D3797 100%)'
                                        }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}

                                <div className={`relative z-10 px-4 lg:px-6 xl:px-8 py-2 rounded-full transition-all duration-500 font-medium text-sm lg:text-base ${(isHovered || showActiveGradient) ? 'text-white' : 'text-gray-800'
                                    }`}>
                                    {link.name}
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>

            {/* Right Side - Download Buttons */}
            <div className="flex-1 flex items-center justify-end space-x-2 lg:space-x-3 xl:space-x-4 relative z-10">
                {/* Download Buttons - Hidden on mobile, visible on xl screens */}
                <div className="hidden xl:flex items-center gap-2">
                    {/* Google Play Button */}
                    <a
                        href="https://play.google.com/store/apps/details?id=com.tago.cash"

                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex bg-black px-2.5 py-1.5 text-left rounded-lg items-center w-[140px] cursor-pointer hover:bg-black/90 transition-all shadow-sm flex-shrink-0"
                    >
                        <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-5">
                            <path d="M9.80482 11.4617L0.0895996 22.0059C0.0905121 22.0078 0.090512 22.0106 0.0914244 22.0125C0.389807 23.1574 1.41179 24 2.62539 24C3.11083 24 3.56616 23.8656 3.95671 23.6305L3.98773 23.6118L14.9229 17.1593L9.80482 11.4617Z" fill="#EA4335" />
                            <path d="M19.6331 9.66619L19.624 9.65966L14.9028 6.86123L9.58391 11.7013L14.9219 17.1582L19.6176 14.3878C20.4406 13.9324 21 13.045 21 12.0223C21 11.0052 20.4489 10.1225 19.6331 9.66619Z" fill="#FBBC04" />
                            <path d="M0.0894234 1.99325C0.0310244 2.21346 0 2.44488 0 2.68376V21.3163C0 21.5552 0.0310245 21.7866 0.0903359 22.0059L10.1386 11.7313L0.0894234 1.99325Z" fill="#4285F4" />
                            <path d="M9.87657 12L14.9044 6.85945L3.98192 0.383598C3.58499 0.140054 3.12145 8.67844e-05 2.62597 8.67844e-05C1.41237 8.67844e-05 0.388558 0.84456 0.0901759 1.99043C0.0901759 1.99136 0.0892639 1.9923 0.0892639 1.99323L9.87657 12Z" fill="#34A853" />
                        </svg>
                        <div className="flex flex-col ml-2">
                            <h4 className="text-[10px] text-white font-light leading-tight whitespace-nowrap">Download Now</h4>
                            <p className="text-[12px] text-gray-100 font-medium leading-tight whitespace-nowrap">Get the app</p>
                        </div>
                    </a>

                    {/* App Store Button */}
                    <a
                        href="https://apps.apple.com/us/app/tagocash/id6752428469?l=fr-FR"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex bg-black px-2.5 py-1.5 text-left rounded-lg items-center w-[140px] cursor-pointer hover:bg-black/90 transition-all shadow-sm flex-shrink-0"
                    >
                        <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-5">
                            <path d="M16.7045 12.763C16.7166 11.8431 16.9669 10.9411 17.4321 10.141C17.8972 9.34093 18.5621 8.66869 19.3648 8.18687C18.8548 7.47582 18.1821 6.89066 17.4 6.47785C16.6178 6.06505 15.7479 5.83597 14.8592 5.80883C12.9635 5.61456 11.1258 6.91628 10.1598 6.91628C9.17506 6.91628 7.68776 5.82812 6.08616 5.86028C5.05021 5.89296 4.04059 6.18707 3.15568 6.71395C2.27077 7.24083 1.54075 7.98252 1.03674 8.86675C-1.14648 12.5571 0.482005 17.9808 2.57338 20.9639C3.61975 22.4246 4.84264 24.0562 6.44279 23.9984C8.00863 23.9349 8.59344 23.0235 10.4835 23.0235C12.3561 23.0235 12.9048 23.9984 14.5374 23.9616C16.2176 23.9349 17.2762 22.4944 18.2859 21.0198C19.0377 19.979 19.6162 18.8287 20 17.6115C19.0238 17.2084 18.1908 16.5337 17.6048 15.6715C17.0187 14.8093 16.7056 13.7977 16.7045 12.763Z" fill="white" />
                            <path d="M13.6208 3.84713C14.5369 2.77343 14.9883 1.39335 14.879 0C13.4793 0.143519 12.1865 0.796596 11.258 1.82911C10.804 2.33351 10.4563 2.92033 10.2348 3.55601C10.0132 4.19168 9.92219 4.86375 9.96686 5.5338C10.6669 5.54084 11.3595 5.3927 11.9924 5.10054C12.6253 4.80838 13.1821 4.37982 13.6208 3.84713Z" fill="white" />
                        </svg>
                        <div className="flex flex-col ml-2">
                            <h4 className="text-[10px] text-white font-light leading-tight whitespace-nowrap">Download Now</h4>
                            <p className="text-[12px] text-gray-100 font-medium leading-tight whitespace-nowrap">Get the app</p>
                        </div>
                    </a>
                </div>
            </div>

            {/* Mobile Menu Icon */}
            <div className="lg:hidden flex items-center ml-2">
                <button onClick={toggleMenu} className="focus:outline-none" aria-label="Toggle menu">
                    {isMenuOpen ? (
                        <RxCross2 className="text-black text-xl sm:text-2xl cursor-pointer transition-transform" />
                    ) : (
                        <RxHamburgerMenu className="text-black text-xl sm:text-2xl cursor-pointer transition-transform" />
                    )}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden absolute top-full left-0 right-0 mt-2 mx-4 sm:mx-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/40 p-4 sm:p-6 z-40"
                    >
                        <div className="flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={toggleMenu}
                                    className={`text-base font-medium transition-colors ${location.pathname === link.path
                                        ? 'text-blue-600'
                                        : 'text-gray-800 hover:text-blue-600'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {/* Download Buttons in Mobile Menu */}
                            <div className="pt-4 border-t border-gray-200 flex flex-col gap-2">
                                {/* Google Play Button */}
                                <a
                                    href="https://play.google.com/store/apps/details?id=com.tago.cash"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex bg-black p-2 text-left rounded-lg items-center cursor-pointer hover:bg-black/90 transition-all shadow-sm"
                                >
                                    <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                                        <path d="M9.80482 11.4617L0.0895996 22.0059C0.0905121 22.0078 0.090512 22.0106 0.0914244 22.0125C0.389807 23.1574 1.41179 24 2.62539 24C3.11083 24 3.56616 23.8656 3.95671 23.6305L3.98773 23.6118L14.9229 17.1593L9.80482 11.4617Z" fill="#EA4335" />
                                        <path d="M19.6331 9.66619L19.624 9.65966L14.9028 6.86123L9.58391 11.7013L14.9219 17.1582L19.6176 14.3878C20.4406 13.9324 21 13.045 21 12.0223C21 11.0052 20.4489 10.1225 19.6331 9.66619Z" fill="#FBBC04" />
                                        <path d="M0.0894234 1.99325C0.0310244 2.21346 0 2.44488 0 2.68376V21.3163C0 21.5552 0.0310245 21.7866 0.0903359 22.0059L10.1386 11.7313L0.0894234 1.99325Z" fill="#4285F4" />
                                        <path d="M9.87657 12L14.9044 6.85945L3.98192 0.383598C3.58499 0.140054 3.12145 8.67844e-05 2.62597 8.67844e-05C1.41237 8.67844e-05 0.388558 0.84456 0.0901759 1.99043C0.0901759 1.99136 0.0892639 1.9923 0.0892639 1.99323L9.87657 12Z" fill="#34A853" />
                                    </svg>
                                    <div className="flex flex-col ml-2">
                                        <h4 className="text-[10px] text-white font-light leading-tight">Download Now</h4>
                                        <p className="text-[12px] text-gray-100 font-medium leading-tight">Google Play</p>
                                    </div>
                                </a>

                                {/* App Store Button */}
                                <a
                                    href="https://apps.apple.com/us/app/tagocash/id6752428469?l=fr-FR"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex bg-black p-2 text-left rounded-lg items-center cursor-pointer hover:bg-black/90 transition-all shadow-sm"
                                >
                                    <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                                        <path d="M16.7045 12.763C16.7166 11.8431 16.9669 10.9411 17.4321 10.141C17.8972 9.34093 18.5621 8.66869 19.3648 8.18687C18.8548 7.47582 18.1821 6.89066 17.4 6.47785C16.6178 6.06505 15.7479 5.83597 14.8592 5.80883C12.9635 5.61456 11.1258 6.91628 10.1598 6.91628C9.17506 6.91628 7.68776 5.82812 6.08616 5.86028C5.05021 5.89296 4.04059 6.18707 3.15568 6.71395C2.27077 7.24083 1.54075 7.98252 1.03674 8.86675C-1.14648 12.5571 0.482005 17.9808 2.57338 20.9639C3.61975 22.4246 4.84264 24.0562 6.44279 23.9984C8.00863 23.9349 8.59344 23.0235 10.4835 23.0235C12.3561 23.0235 12.9048 23.9984 14.5374 23.9616C16.2176 23.9349 17.2762 22.4944 18.2859 21.0198C19.0377 19.979 19.6162 18.8287 20 17.6115C19.0238 17.2084 18.1908 16.5337 17.6048 15.6715C17.0187 14.8093 16.7056 13.7977 16.7045 12.763Z" fill="white" />
                                        <path d="M13.6208 3.84713C14.5369 2.77343 14.9883 1.39335 14.879 0C13.4793 0.143519 12.1865 0.796596 11.258 1.82911C10.804 2.33351 10.4563 2.92033 10.2348 3.55601C10.0132 4.19168 9.92219 4.86375 9.96686 5.5338C10.6669 5.54084 11.3595 5.3927 11.9924 5.10054C12.6253 4.80838 13.1821 4.37982 13.6208 3.84713Z" fill="white" />
                                    </svg>
                                    <div className="flex flex-col ml-2">
                                        <h4 className="text-[10px] text-white font-light leading-tight">Download Now</h4>
                                        <p className="text-[12px] text-gray-100 font-medium leading-tight">App Store</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;