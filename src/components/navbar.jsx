import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from './button';
import LiquidEther from './LiquidEther';
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { useTheme } from '../context/ThemeContext';
import { HiSun, HiMoon } from 'react-icons/hi';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleGetStarted = () => {
        // You can navigate to a specific page or show a modal
        navigate('/contactus');
    };

    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-transparent">
            <div className="absolute inset-0 hidden dark:block pointer-events-none opacity-80 -z-10">
                <LiquidEther
                    className="w-full h-full"
                    colors={['#218DCD', '#2A63AA', '#2E388E']}
                    autoDemo
                    autoSpeed={0.25}
                    autoIntensity={1.5}
                />
            </div>
            <div className="relative w-full">
                <div className="relative flex items-center justify-between bg-white dark:bg-[#020617] border border-gray-100 dark:border-white/10 rounded-b-3xl shadow-md shadow-black/10 h-16 md:h-20 px-4 md:px-8 transition-colors duration-300 pointer-events-auto">
                <Link to="/" className='cursor-pointer flex items-center transition-all duration-300'>
                    <img 
                        src={theme === 'dark' ? '/tago bit-01.png' : 'tagobitslogo.png'} 
                        className='h-8 transition-all duration-300' 
                        alt="TagoBits Logo" 
                    />
                </Link>
                <div className='hidden md:flex md:gap-15 lg:gap-20 xl:gap-30'>
                    <Link
                        to="/"
                        className={`urbanist-regular text-[16px] transition-colors ${
                            location.pathname === '/' 
                                ? 'text-[#1a3a7a] dark:text-blue-300 font-bold' 
                                : 'text-primary dark:text-blue-400 hover:text-buttonsecondary dark:hover:text-blue-300'
                        }`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/about"
                        className={`urbanist-regular text-[16px] transition-colors ${
                            location.pathname === '/about' 
                                ? 'text-[#1a3a7a] dark:text-blue-300 font-bold' 
                                : 'text-primary dark:text-blue-400 hover:text-buttonsecondary dark:hover:text-blue-300'
                        }`}
                    >
                        About Us
                    </Link>
                    <Link
                        to="/contactus"
                        className={`urbanist-regular text-[16px] transition-colors ${
                            location.pathname === '/contactus' 
                                ? 'text-[#1a3a7a] dark:text-blue-300 font-bold' 
                                : 'text-primary dark:text-blue-400 hover:text-buttonsecondary dark:hover:text-blue-300'
                        }`}
                    >
                        Contact Us
                    </Link>
                </div>
                <div className='hidden md:flex md:items-center md:gap-4'>
                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full bg-primary/10 dark:bg-blue-500/10 hover:bg-primary/20 dark:hover:bg-blue-500/20 transition-all duration-300"
                        aria-label="Toggle theme"
                    >
                        <div className="relative w-5 h-5">
                            <HiSun
                                className={`absolute inset-0 w-5 h-5 text-primary dark:text-yellow-300 transition-all duration-500 ${
                                    theme === 'dark'
                                        ? 'opacity-100 rotate-0 scale-100'
                                        : 'opacity-0 rotate-180 scale-0'
                                }`}
                            />
                            <HiMoon
                                className={`absolute inset-0 w-5 h-5 text-primary dark:text-blue-400 transition-all duration-500 ${
                                    theme === 'light'
                                        ? 'opacity-100 rotate-0 scale-100'
                                        : 'opacity-0 -rotate-180 scale-0'
                                }`}
                            />
                        </div>
                    </button>
                    
                    <Button 
                        background="linear-gradient(to right, #2A3E9C, #1478C7)" 
                        color="#ffffff" 
                        buttontext="Get Started" 
                        hoverBackground="white" 
                        hoverColor="#235BB2" 
                        hoverBorder="2px solid #235BB2"
                        onClick={handleGetStarted}
                    />
                </div>
                <div className='md:hidden flex items-center gap-3'>
                    {/* Mobile theme toggle next to menu icon */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full bg-primary/10 dark:bg-blue-500/10 hover:bg-primary/20 dark:hover:bg-blue-500/20 transition-all duration-300"
                        aria-label="Toggle theme"
                    >
                        <div className="relative w-5 h-5">
                            <HiSun
                                className={`absolute inset-0 w-5 h-5 text-primary dark:text-yellow-300 transition-all duration-500 ${
                                    theme === 'dark'
                                        ? 'opacity-100 rotate-0 scale-100'
                                        : 'opacity-0 rotate-180 scale-0'
                                }`}
                            />
                            <HiMoon
                                className={`absolute inset-0 w-5 h-5 text-primary dark:text-blue-400 transition-all duration-500 ${
                                    theme === 'light'
                                        ? 'opacity-100 rotate-0 scale-100'
                                        : 'opacity-0 -rotate-180 scale-0'
                                }`}
                            />
                        </div>
                    </button>

                    <button
                        onClick={toggleMenu}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <RxCross2 className="text-2xl text-primary dark:text-blue-400" />
                        ) : (
                            <RxHamburgerMenu className="text-2xl text-primary dark:text-blue-400" />
                        )}
                    </button>
                </div>
                </div>
                {isMenuOpen && (
                <div className='md:hidden absolute top-[calc(100%-12px)] left-3 right-3 z-40 bg-gradient-to-r from-[#CBD6FF33] via-[#CBD6FF66] to-[#CBD6FF33] dark:from-[#14213d]/95 dark:via-[#1b2a52]/95 dark:to-[#14213d]/95 backdrop-blur-2xl rounded-[16px] mt-2 p-4 flex flex-col items-center gap-4 shadow-lg transition-colors duration-300'>
                    <Link
                        to="/"
                        className={`urbanist-regular text-[16px] transition-colors ${
                            location.pathname === '/' 
                                ? 'text-[#1a3a7a] dark:text-blue-300 font-medium' 
                                : 'text-primary dark:text-blue-400 hover:text-buttonsecondary dark:hover:text-blue-300'
                        }`}
                        onClick={toggleMenu}
                    >
                        Home
                    </Link>
                    <Link
                        to="/about"
                        className={`urbanist-regular text-[16px] transition-colors ${
                            location.pathname === '/about' 
                                ? 'text-[#1a3a7a] dark:text-blue-300 font-medium' 
                                : 'text-primary dark:text-blue-400 hover:text-buttonsecondary dark:hover:text-blue-300'
                        }`}
                        onClick={toggleMenu}
                    >
                        About Us
                    </Link>
                    <Link
                        to="/contactus"
                        className={`urbanist-regular text-[16px] transition-colors ${
                            location.pathname === '/contactus' 
                                ? 'text-[#1a3a7a] dark:text-blue-300 font-medium' 
                                : 'text-primary dark:text-blue-400 hover:text-buttonsecondary dark:hover:text-blue-300'
                        }`}
                        onClick={toggleMenu}
                    >
                        Contact Us
                    </Link>
                    <Button
                        background="linear-gradient(to right, #2A3E9C, #1478C7)"
                        color="#ffffff"
                        buttontext="Get Started"
                        onClick={() => {
                            toggleMenu();
                            handleGetStarted();
                        }}
                    />
                </div>
            )}
            </div>
        </div>
    )
}

export default Navbar;