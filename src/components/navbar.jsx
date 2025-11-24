import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './button'
import { RxHamburgerMenu } from "react-icons/rx";
import { useTheme } from '../context/ThemeContext';
import { HiSun, HiMoon } from 'react-icons/hi';

const Navbar = () => {
    const navigate = useNavigate();
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
        <div className="p-3 lg:p-7 lg:px-30 bg-transparent relative z-50">
            <div className="relative flex justify-center md:justify-between bg-gradient-to-r from-[#CBD6FF33] via-[#CBD6FF66] to-[#CBD6FF33] dark:from-gray-800/50 dark:via-gray-700/50 dark:to-gray-800/50 items-center p-4 backdrop-blur-2xl rounded-[16px] transition-colors duration-300 pointer-events-auto">
                <Link to="/" className='cursor-pointer flex items-center transition-all duration-300'>
                    <img 
                        src='tagobitslogo.png' 
                        className='h-8 transition-all duration-300' 
                        alt="TagoBits Logo" 
                    />
                </Link>
                <div className='hidden md:flex md:gap-15 lg:gap-20 xl:gap-30'>
                    <Link
                        to="/"
                        className='urbanist-regular text-[16px] text-primary dark:text-blue-400 hover:text-buttonsecondary dark:hover:text-blue-300 transition-colors'
                    >
                        Home
                    </Link>
                    <Link
                        to="/about"
                        className='urbanist-regular text-[16px] text-primary dark:text-blue-400 hover:text-buttonsecondary dark:hover:text-blue-300 transition-colors'
                    >
                        About Us
                    </Link>
                    <Link
                        to="/contactus"
                        className='urbanist-regular text-[16px] text-primary dark:text-blue-400 hover:text-buttonsecondary dark:hover:text-blue-300 transition-colors'
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
                <div className='md:hidden absolute left-5'>
                    <button onClick={toggleMenu} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <RxHamburgerMenu className="text-2xl text-primary dark:text-blue-400" />
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className='md:hidden absolute top-[calc(100%-12px)] left-3 right-3 z-50 bg-gradient-to-r from-[#CBD6FF33] via-[#CBD6FF66] to-[#CBD6FF33] dark:from-gray-800/90 dark:via-gray-700/90 dark:to-gray-800/90 backdrop-blur-2xl rounded-[16px] mt-2 p-4 flex flex-col items-center gap-4 shadow-lg transition-colors duration-300'>
                    <Link
                        to="/"
                        className='urbanist-regular text-[16px] text-primary dark:text-blue-400 hover:text-buttonsecondary dark:hover:text-blue-300 transition-colors'
                        onClick={toggleMenu}
                    >
                        Home
                    </Link>
                    <Link
                        to="/about"
                        className='urbanist-regular text-[16px] text-primary dark:text-blue-400 hover:text-buttonsecondary dark:hover:text-blue-300 transition-colors'
                        onClick={toggleMenu}
                    >
                        About Us
                    </Link>
                    <Link
                        to="/contactus"
                        className='urbanist-regular text-[16px] text-primary dark:text-blue-400 hover:text-buttonsecondary dark:hover:text-blue-300 transition-colors'
                        onClick={toggleMenu}
                    >
                        Contact Us
                    </Link>
                    
                    {/* Theme Toggle for Mobile */}
                    <button
                        onClick={toggleTheme}
                        className="p-3 rounded-full bg-primary/10 dark:bg-blue-500/10 hover:bg-primary/20 dark:hover:bg-blue-500/20 transition-all duration-300"
                        aria-label="Toggle theme"
                    >
                        <div className="relative w-6 h-6">
                            <HiSun
                                className={`absolute inset-0 w-6 h-6 text-primary dark:text-yellow-300 transition-all duration-500 ${
                                    theme === 'dark'
                                        ? 'opacity-100 rotate-0 scale-100'
                                        : 'opacity-0 rotate-180 scale-0'
                                }`}
                            />
                            <HiMoon
                                className={`absolute inset-0 w-6 h-6 text-primary dark:text-blue-400 transition-all duration-500 ${
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
                        onClick={() => {
                            toggleMenu();
                            handleGetStarted();
                        }}
                    />
                </div>
            )}
        </div>
    )
}

export default Navbar;