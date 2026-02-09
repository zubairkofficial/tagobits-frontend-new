import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useHomeContent } from '../../hooks/useHomeContent';
import { MdSpeed, MdSecurity } from "react-icons/md";
import { FaTools } from "react-icons/fa";
import { BiSolidBank } from "react-icons/bi";

const NewFeatures = () => {
    const { getFieldValue } = useHomeContent('newFeatures');

    // Dynamic content from Admin Panel
    const sectionTitle = getFieldValue('sectionTitle') || 'TagoCash';
    const sectionSubtitle = getFieldValue('sectionSubtitle') || 'The end of obscurity and complexity in financial transactions';

    const features = [
        {
            icon: <FaTools className="w-8 h-8" />,
            title: getFieldValue('feature1Title') || "Financial toolbox for individuals & businesses",
            description: getFieldValue('feature1Description') || "Manage treasury, move money with predictability, traceability, and total control.",
            gradient: "from-[#1A69BC] to-[#29419F]"
        },
        {
            icon: <MdSpeed className="w-9 h-9" />,
            title: getFieldValue('feature2Title') || "TagoCash = Compliance + Speed + Security",
            description: getFieldValue('feature2Description') || "Move money with confidence, compliance, speed, and security.",
            gradient: "from-primary-dark to-primary"
        },
        {
            icon: <MdSecurity className="w-9 h-9" />,
            title: getFieldValue('feature3Title') || "TagoCore in Action: Trusted Infrastructure",
            description: getFieldValue('feature3Description') || "Built on blockchain. Built for businesses. Backed by a consortium of trusted partners.",
            gradient: "from-[#29419F] to-[#1A69BC]"
        },
        {
            icon: <BiSolidBank className="w-9 h-9" />,
            title: getFieldValue('feature4Title') || "Proven Technology, Reliable Infrastructure & Legal Digital Currency",
            description: getFieldValue('feature4Description') || "TagoCash is USDC Stablecoin in MPC wallet on a fast blockchain rail.",
            gradient: "from-primary to-primary-dark"
        }
    ];

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

    // Get content from sendmony section for bottom part
    const { getFieldValue: getSendMonyValue } = useHomeContent('sendmony');
    const instantPayoutsTitle = getSendMonyValue('sectionTitle') || 'Instant Global Payouts';
    const instantPayoutsDesc = getSendMonyValue('sectionDescription') || '...everyday payments made seamlessly';

    return (
        <div className="w-full" style={{ backgroundColor: '#FBFDFF' }}>
            {/* Features Grid Section */}
            <div className="max-w-[1900px] mx-auto px-4 lg:px-20 lg:mb-16 py-[60px]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-[30px] md:text-[50px] font-bold mb-4 text-[#14316A]">
                        {sectionTitle}
                    </h2>
                    <p className="text-gray-600 text-xl md:text-2xl max-w-4xl mx-auto">
                        {sectionSubtitle}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: index * 0.15, type: "spring", stiffness: 50 }}
                            className={`bg-gradient-to-r ${feature.gradient} p-8 rounded-3xl shadow-xl hover:shadow-2xl text-white h-full flex flex-col`}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white backdrop-blur-sm">
                                {feature.icon}
                            </div>
                            <h3 className="text-white text-xl font-bold mb-4 leading-tight">
                                {feature.title}
                            </h3>
                            <p className="text-white/90 font-medium text-lg leading-relaxed mt-auto">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Video Background Section */}
            <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden flex items-center justify-center -mt-24 z-0" style={{ backgroundColor: '#FFFFFF' }} ref={containerRef}>
                {/* Background Video */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-20 blur-[2px]"
                >
                    <source src="/Globe_without_text.mp4" type="video/mp4" />
                </video>

                {/* Content */}
                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="mb-8 flex justify-center"
                    >
                        <img
                            src="/tagocash-animation.gif"
                            alt="TagoCash Animation"
                            className="h-16 md:h-20 lg:h-24 object-contain"
                        />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#14316A] mb-4 tracking-tight"
                    >
                        {instantPayoutsTitle}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-base md:text-lg lg:text-xl text-gray-600 font-light"
                    >
                        {instantPayoutsDesc}
                    </motion.p>
                </div>
            </div>
        </div>
    );
}

export default NewFeatures;
