import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";

const Footer = () => {
    return (
        <div className="flex flex-col px-10 md:px-30 my-10">
            <div className="flex md:flex-row flex-col justify-between  md:gap-0 gap-10">
                <div className="flex items-center gap-4">
                    <div><img src="tagobitslogo.png" alt="" /></div>
                    <div className="w-px h-6 bg-gray-300" />
                    <div className="p-3 rounded-full border border-gray-200"><FaSquareXTwitter /></div>
                    <div className="p-3 rounded-full border border-gray-200"><FaSquareInstagram /></div>
                    <div className="p-3 rounded-full border border-gray-200"><FaLinkedin /></div>
                </div>
                <div className="urbanist-regular flex items-end text-gray-500 gap-4">
                    &copy; 2025 Tagobits. All rights reserved.
                </div>
            </div>
            <div className="h-px w-full bg-gray-300 my-10" />
            <div className="flex md:flex-row flex-col justify-between md:gap-0 gap-10">
                <div className="flex gap-20">
                    <div className="flex flex-col gap-4">
                        <span className="urbanist-semibold text-[18px] text-black">Quick Links</span>
                        <span className="urbanist-regular text-gray-500 text-[18px]">Home</span>
                        <span className="urbanist-regular text-gray-500 text-[18px]">About Us</span>
                        <span className="urbanist-regular text-gray-500 text-[18px]">Contact Us</span>
                    </div>
                    <div className="flex flex-col gap-4">
                        <span className="urbanist-semibold text-[18px] text-black">Contact Info</span>
                        <span className="urbanist-regular text-gray-500 text-[18px]">+91 8932-1151-22</span>
                        <span className="urbanist-regular text-gray-500 text-[18px]">123 Maplestreet, SpringField</span>
                    </div>
                </div>
                <div className="flex flex-col w-full md:w-[400px] gap-3">
                    <span className="urbanist-semibold text-primary text-[18px]">Subscribe to Tagobits</span>
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Enter your email"
                            className="urbanist-regular text-gray-500 text-[18px] border border-gray-300 rounded-4xl p-3 pr-28 w-full"
                        />
                        <button
                            className="absolute top-1/2 right-2 -translate-y-1/2 urbanist-regular text-white text-[16px] bg-primary hover:bg-white hover:text-primary transition-all duration-100 hover:border-primary hover:border-2 rounded-3xl px-5 py-2"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;