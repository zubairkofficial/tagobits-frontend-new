import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './button'
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="p-3 lg:p-7 lg:px-30 bg-transparent relative">
            <div className="relative flex justify-center md:justify-between bg-gradient-to-r from-[#CBD6FF33] via-[#CBD6FF66] to-[#CBD6FF33] items-center p-4 backdrop-blur-2xl rounded-[16px]">
                <div className='cursor-pointer'>
                    <img src='tagobitslogo.png' />
                </div>
                <div className='hidden md:flex md:gap-15 lg:gap-20 xl:gap-30'>
                    <Link
                        to="/"
                        className='urbanist-regular text-[16px] text-primary'
                    >
                        Home
                    </Link>
                    <Link
                        to="/about"
                        className='urbanist-regular text-[16px] text-primary'
                    >
                        About Us
                    </Link>
                    <Link
                        to="/contactus"
                        className='urbanist-regular text-[16px] text-primary'
                    >
                        Contact Us
                    </Link>
                </div>
                <div className='hidden md:block'>
                    <Button 
                        background="linear-gradient(to right, #2A3E9C, #1478C7)" 
                        color="#ffffff" 
                        buttontext="Get Started" 
                        hoverBackground="white" 
                        hoverColor="#235BB2" 
                        hoverBorder="2px solid #235BB2"
                    />
                </div>
                <div className='md:hidden absolute left-5'>
                    <button onClick={toggleMenu}>
                        <RxHamburgerMenu className="text-2xl" />
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className='md:hidden absolute top-[calc(100%-12px)] left-3 right-3 z-50 bg-gradient-to-r from-[#CBD6FF33] via-[#CBD6FF66] to-[#CBD6FF33] backdrop-blur-2xl rounded-[16px] mt-2 p-4 flex flex-col items-center gap-4 shadow-lg'>
                    <Link
                        to="/"
                        className='urbanist-regular text-[16px] text-primary'
                        onClick={toggleMenu}
                    >
                        Home
                    </Link>
                    <Link
                        to="/about"
                        className='urbanist-regular text-[16px] text-primary'
                        onClick={toggleMenu}
                    >
                        About Us
                    </Link>
                    <Link
                        to="/contact"
                        className='urbanist-regular text-[16px] text-primary'
                        onClick={toggleMenu}
                    >
                        Contact Us
                    </Link>
                    <div onClick={toggleMenu}>
                        <Button
                            background="linear-gradient(to right, #2A3E9C, #1478C7)"
                            color="#ffffff"
                            buttontext="Get Started"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar;