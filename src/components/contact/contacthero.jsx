import { FaSquareXTwitter, FaYoutube } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import Button from "../button";

const ContactHero = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-15 lg:gap-20 px-10 bg-gradient-to-br from-[#2A3E9C] to-[#1478C7] min-h-[700px] py-30">
            <div className="flex flex-col items-center justify-center gap-5">
                <div className="flex flex-col justify-center xl:items-start">
                    <span className="urbanist-semibold text-[42px] sm:text-[50px] md:text-[60px] lg:text-[70px] xl:text-[82px] text-center text-white leading-[1.1]">
                        Contact Us
                    </span>
                </div>
                <div className="flex flex-col justify-center xl:items-start">
                    <span className="text-[16px]  w-full sm:text-[18px] md:text-[24px] urbanist-regular text-center max-w-[780px] text-gray-50/60">
                        The TagoBits platform enables payment settlement in seconds and at one tenth of the cost of traditional fiat payments.
                    </span>
                </div>
                <div className="flex flex-row gap-10">
                    <div className="p-3 rounded-full border border-gray-50/60 text-gray-50/60"><FaSquareXTwitter /></div>
                    <div className="p-3 rounded-full border border-gray-50/60 text-gray-50/60"><FaSquareInstagram /></div>
                    <div className="p-3 rounded-full border border-gray-50/60 text-gray-50/60"><FaYoutube /></div>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-x-20 xl:gap-x-20 max-w-[1280px] mx-auto">
                {/* Security First */}
                <div className="flex flex-col justify-between border border-gray-50/10 p-7 rounded-4xl min-h-[270px]">
                    <div className="p-3 border border-gray-50/60 rounded-full w-fit mb-4">
                        <svg className="w-6 h-6 text-gray-50/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <div className="flex flex-col">
                    <span className="urbanist-regular text-[18px] text-white mb-3 leading-none">Email</span>
                    <span className="urbanist-regular text-[16px] text-white leading-none">s.t.sharkey@outlook.com</span>
                    </div>
                    <div className="flex flex-row items-center gap-4">
                        <Button
                            background=""
                            color="#ffffff"
                            border="2px solid #ffffff"
                            buttontext="Contact Us"
                            padding="px-2 py-2 sm:px-3 sm:py-3 md:px-4 md:py-3 lg:px-6 lg:py-3"
                            hoverBackground="#ffffff"
                            hoverColor="#235BB2"
                            hoverBorder="2px solid #ffffff"
                        />
                        <span className="urbanist-regular text-[16px] text-white leading-none">*available 24 hrs</span>
                    </div>
                </div>
                <div className="flex flex-col justify-between border border-gray-50/10 p-7 rounded-4xl">
                    <div className="p-3 border border-gray-50/60 rounded-full w-fit mb-4">
                        <svg className="w-6 h-6 text-gray-50/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <div className="flex flex-col">
                    <span className="urbanist-regular text-[18px] text-white mb-3 leading-none">Phone</span>
                    <span className="urbanist-regular text-[16px] text-white leading-none">+91 8932-1151-22</span>
                    </div>
                    <div className="flex flex-row items-center gap-4">
                        <Button
                            background=""
                            color="#ffffff"
                            border="2px solid #ffffff"
                            buttontext="Contact Us"
                            padding="px-2 py-2 sm:px-3 sm:py-3 md:px-4 md:py-3 lg:px-6 lg:py-3"
                            hoverBackground="#ffffff"
                            hoverColor="#235BB2"
                            hoverBorder="2px solid #ffffff"
                        />
                        <span className="urbanist-regular text-[16px] text-white leading-none">*available 24 hrs</span>
                    </div>
                </div>
                <div className="flex flex-col justify-between border border-gray-50/10 p-7 rounded-4xl">
                    <div className="p-3 border border-gray-50/60 rounded-full w-fit mb-4">
                        <svg className="w-6 h-6 text-gray-50/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <div className="flex flex-col">
                    <span className="urbanist-regular text-[18px] text-white mb-3 leading-none">Address</span>
                    <span className="urbanist-regular text-[16px] text-white leading-none">123 Maplestreet, SpringField</span>
                    </div>
                    <div className="flex flex-row items-center gap-4">
                        <Button
                            background=""
                            color="#ffffff"
                            border="2px solid #ffffff"
                            buttontext="Contact Us"
                            padding="px-2 py-2 sm:px-3 sm:py-3 md:px-4 md:py-3 lg:px-6 lg:py-3"
                            hoverBackground="#ffffff"
                            hoverColor="#235BB2"
                            hoverBorder="2px solid #ffffff"
                        />
                        <span className="urbanist-regular text-[16px] text-white leading-none">*available 24 hrs</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactHero;