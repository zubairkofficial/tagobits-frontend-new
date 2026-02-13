import React from 'react';
import { motion } from 'framer-motion';
import { Clock, DollarSign, Fingerprint, Eye } from 'lucide-react';
import { useHomeContent } from '../../hooks/useHomeContent';

const TagoBridge = () => {
    const { getFieldValue } = useHomeContent('tagobanksection');

    const fastSectionTitle = getFieldValue('fastSectionTitle') || "TagoCash is";

    const cards = [
        {
            icon: Clock,
            heading: getFieldValue('fastHeading') || "Fast",
            description: getFieldValue('fastDescription') || "Real time transactions"
        },
        {
            icon: DollarSign,
            heading: getFieldValue('affordableHeading') || "Affordable",
            description: getFieldValue('affordableDescription') || "Free transfer to partners"
        },
        {
            icon: Fingerprint,
            heading: getFieldValue('secureHeading') || "Secure",
            description: getFieldValue('secureDescription') || "Encrypted blockchain transmitted and access by your biometric"
        },
        {
            icon: Eye,
            heading: getFieldValue('transparentHeading') || "Transparent",
            description: getFieldValue('transparentDescription') || "No Hidden fees, what you see is what you pay"
        }
    ];

    const videoUrl = getFieldValue('videoUrl') || "/TagoCash_fast_section_video.webm";

    return (
        <div className="min-h-screen bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 py-12 lg:py-20 relative z-10">
                {/* FAST Section */}
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 md:mb-10 lg:mb-12 tracking-tight"
                    >
                        {fastSectionTitle} <span className="text-blue-500">F.A.S.T</span>
                    </motion.h1>

                    {/* Cards Grid Container */}
                    <div className="w-full">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-6 xl:gap-8 justify-items-center items-stretch">
                            {cards.map((card, index) => (
                                <motion.div
                                    key={index}
                                    initial="hidden"
                                    whileInView="visible"
                                    whileHover="hover"
                                    viewport={{ once: true }}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: { duration: 0.6, delay: 0.7 + (index * 0.1) }
                                        },
                                        hover: {
                                            y: -15,
                                            backgroundColor: "rgba(224, 242, 254, 0.4)",
                                            boxShadow: "0 25px 30px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                                            transition: { type: "spring", stiffness: 300, damping: 20 }
                                        }
                                    }}
                                    className="group flex flex-col items-center justify-center p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8
                    border-2 border-blue-400 rounded-2xl
                    bg-gradient-to-br from-blue-50 to-cyan-50
                    w-full max-w-[280px] sm:max-w-none min-h-[180px] sm:min-h-[200px] md:min-h-[220px] lg:min-h-[240px] xl:min-h-[260px]
                    cursor-pointer"
                                >
                                    <motion.div
                                        className="mb-2 sm:mb-3 md:mb-4 p-2 sm:p-2.5 md:p-3 rounded-full bg-blue-100"
                                        variants={{
                                            hover: {
                                                scale: 1.15,
                                                rotate: 5,
                                                backgroundColor: "#DBEAFE",
                                                transition: { type: "spring", stiffness: 300, damping: 15 }
                                            }
                                        }}
                                    >
                                        <card.icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-blue-500 group-hover:text-blue-600 transition-colors duration-300" strokeWidth={1.5} />
                                    </motion.div>

                                    <h3 className="text-base sm:text-lg md:text-xl lg:text-xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-black transition-colors duration-300">
                                        {card.heading}
                                    </h3>

                                    <p className="text-center text-gray-700 text-xs sm:text-sm md:text-sm lg:text-base group-hover:text-black transition-colors duration-300 px-1">
                                        {card.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Logo Section - Middle */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="flex justify-center items-center mt-12 sm:mt-16 md:mt-20 lg:mt-24 xl:mt-28 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
                        <img
                            src="/tago_plus.png"
                            alt="TagoCash Plus Logo"
                            className="w-auto h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16 object-contain"
                            style={{
                                imageRendering: 'crisp-edges',
                                WebkitImageRendering: '-webkit-optimize-contrast',
                                WebkitBackfaceVisibility: 'hidden',
                                backfaceVisibility: 'hidden',
                                transform: 'translateZ(0)',
                                willChange: 'transform'
                            }}
                            loading="eager"
                            decoding="async"
                        />
                    </motion.div>

                    {/* Video Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                        className="flex flex-col items-center w-full px-2 sm:px-4"
                    >
                        <div
                            className="w-full rounded-2xl shadow-xl max-w-full sm:max-w-[850px] md:max-w-[1050px] lg:max-w-[800px] xl:max-w-[950px] overflow-hidden"
                            style={{
                                aspectRatio: '16/9',
                                border: '1px solid rgba(27, 103, 186, 0.2)',
                                backgroundColor: 'black'
                            }}
                        >
                            <video
                                src={videoUrl}
                                className="w-full h-full object-cover"
                                autoPlay
                                muted
                                loop
                                playsInline
                                controls
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default TagoBridge;
