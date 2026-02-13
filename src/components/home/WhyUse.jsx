import React from 'react';
import { motion } from 'framer-motion';
import { IoFlash, IoCloud, IoShieldCheckmark } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { useHomeContent } from '../../hooks/useHomeContent';

const WhyUse = () => {
    const { getFieldValue } = useHomeContent('whyuse');

    const sectionTitle = getFieldValue('sectionTitle') || "Is TagoCash for you ? YES!";
    const sectionSubtitle = getFieldValue('sectionSubtitle') || "Here is why:";

    const features = [
        {
            icon: <IoFlash className="w-8 h-8 text-white" />,
            title: getFieldValue('feature1Title') || "Fast",
            description: getFieldValue('feature1Description') || "Pay or Send Money that settled with 100% of what you sent in seconds",
            gradient: "from-[#1A69BC] to-[#29419F]"
        },
        {
            icon: <IoCloud className="w-8 h-8 text-white" />,
            title: getFieldValue('feature2Title') || "Free",
            description: getFieldValue('feature2Description') || "Free Limited Money Transfer to partners",
            gradient: "from-primary-dark to-primary"
        },
        {
            icon: <FaEye className="w-8 h-8 text-white" />,
            title: getFieldValue('feature3Title') || "Affordable & Transparent",
            description: getFieldValue('feature3Description') || "Full disclosure on all cost, if any. No hidden fees.",
            gradient: "from-[#29419F] to-[#1A69BC]"
        },
        {
            icon: <IoShieldCheckmark className="w-8 h-8 text-white" />,
            title: getFieldValue('feature4Title') || "Secure, Safe, Compliant & Private",
            description: getFieldValue('feature4Description') || "Biometric Authentication & Cryptographic Security - KYC & AML compliant - No personal information disclosed with payments",
            gradient: "from-primary to-primary-dark"
        }
    ];

    return (
        <div className="flex justify-center" style={{ backgroundColor: '#FBFDFF' }}>
            <div className="max-w-[1900px] w-full px-4 lg:px-20 pb-16 py-[60px]">
                <motion.div
                    className="w-full"
                    initial={{ y: 100 }}
                    whileInView={{ y: 0 }}
                    viewport={{ amount: 0.2 }}
                    transition={{ duration: 0.3 }}
                >
                    <h3 className="text-[30px] md:text-[44px] text-transparent bg-clip-text bg-gradient-to-r from-primary-dark to-primary font-[700] leading-[1.2] mb-3 text-center md:text-start">
                        {sectionTitle}
                    </h3>
                    <p className="text-sm font-medium text-gray-500 mb-7 text-center md:text-start">{sectionSubtitle}</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6 w-full">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className={`flex flex-col items-center bg-gradient-to-r ${feature.gradient} hover:opacity-97 duration-300 p-8 rounded-2xl shadow-sm`}
                            initial={{ y: 100 }}
                            whileInView={{ y: 0 }}
                            viewport={{ amount: 0.2 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-xl text-white font-semibold mb-2">{feature.title}</h3>
                            <p className="text-white text-center font-light text-lg">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default WhyUse;
