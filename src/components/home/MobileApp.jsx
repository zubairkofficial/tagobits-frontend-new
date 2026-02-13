import React from 'react';
import { motion } from 'framer-motion';
import { FaGooglePlay, FaApple } from "react-icons/fa";
import { useHomeContent } from '../../hooks/useHomeContent';
import mobileAppImage from '../../assets/phone-img-new.png';

const MobileApp = () => {
    const { getFieldValue } = useHomeContent('mobileapp');

    const smallTitle = getFieldValue('smallTitle') || 'Free TagoCash Wallet';
    const mainHeading = getFieldValue('mainHeading') || "Don't carry cash, TagoCash!";
    const playStoreUrl = getFieldValue('playStoreUrl') || 'https://play.google.com/store/apps/details?id=com.tago.cash';
    const appStoreUrl = getFieldValue('appStoreUrl') || 'https://apps.apple.com/us/app/tagocash/id6752428469?l=fr-FR';

    return (
        <div className='flex w-full justify-center px-4 sm:px-0' style={{ backgroundColor: '#FBFDFF' }}>
            <div className="w-full max-w-[1900px] mx-auto flex flex-col sm:flex-row items-center justify-between lg:mx-20 bg-gradient-to-r from-[#1952A8] to-primary-dark my-8 lg:my-15 rounded-3xl overflow-hidden min-h-[350px] lg:min-h-[420px] py-5 lg:py-0">
                <div className="flex flex-col w-full lg:w-1/2 gap-2 lg:gap-4 p-6 sm:pl-15 md:justify-start items-center sm:items-start text-center sm:text-left">
                    <motion.p
                        className="text-lg text-gray-100 font-extralight font-poppins"
                        initial={{ y: 100 }}
                        whileInView={{ y: 0 }}
                        viewport={{ amount: 0.2 }}
                        transition={{ duration: 0.3 }}
                    >
                        {smallTitle}
                    </motion.p>

                    <motion.h3
                        className="font-poppins font-bold text-2xl sm:text-3xl lg:text-[48px] text-white leading-[1.2] tracking-[0px]"
                        style={{ letterSpacing: '0px' }}
                        initial={{ y: 100 }}
                        whileInView={{ y: 0 }}
                        viewport={{ amount: 0.2 }}
                        transition={{ duration: 0.3 }}
                    >
                        {mainHeading.split(',').map((part, i) => (
                            <React.Fragment key={i}>
                                {part}{i < mainHeading.split(',').length - 1 ? ',' : ''}
                                <br />
                            </React.Fragment>
                        ))}
                    </motion.h3>

                    <motion.div
                        className="flex flex-wrap gap-2 sm:gap-4 mt-2 w-full sm:w-full mb-3 sm:mb-0 sm:justify-start justify-center"
                        initial={{ y: 100 }}
                        whileInView={{ y: 0 }}
                        viewport={{ amount: 0.2 }}
                        transition={{ duration: 0.3 }}
                    >
                        <a
                            href={playStoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex bg-black p-2 text-left rounded-lg items-center w-40 sm:w-40 cursor-pointer hover:bg-gray-900 transition-colors"
                        >
                            <FaGooglePlay className="w-8 h-8 text-white mr-2" />
                            <div className="flex flex-col">
                                <h4 className="text-[10px] text-white font-light uppercase">Free Download</h4>
                                <p className="text-sm font-bold text-white">Google Play</p>
                            </div>
                        </a>

                        <a
                            href={appStoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex bg-black p-2 text-left rounded-lg items-center w-40 sm:w-40 cursor-pointer hover:bg-gray-900 transition-colors"
                        >
                            <FaApple className="w-8 h-8 text-white mr-2" />
                            <div className="flex flex-col">
                                <h4 className="text-[10px] text-white font-light uppercase">Free Download</h4>
                                <p className="text-sm font-bold text-white">App Store</p>
                            </div>
                        </a>
                    </motion.div>
                </div>

                <div className="w-full lg:w-1/2 flex justify-center lg:justify-end items-center relative h-80 sm:h-96 lg:h-full overflow-hidden lg:self-stretch px-4">
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full flex items-center justify-center lg:justify-end"
                    >
                        <img
                            src={mobileAppImage}
                            alt="Mobile App"
                            className="max-w-[500px] lg:max-w-[750px] w-full object-contain -mt-5 lg:-mt-10 z-10"
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default MobileApp;
