import { motion } from "framer-motion"
import Button from "../../components/button"

import { FaCubes } from "react-icons/fa";
import { SiConvertio } from "react-icons/si";
import { RiExchangeDollarFill } from "react-icons/ri";
import { IoShieldCheckmarkSharp } from "react-icons/io5";


const TagoCore = () => {
    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5
            }
        })
    };

    const features = [
        {
            icon: FaCubes,
            title: "Integrated Ecosystem",
            description: "Connects blockchain networks, compliance bodies, stablecoin issuers, and on/off-ramp providers."
        },
        {
            icon: SiConvertio,
            title: "Smart Routing",
            description: "Routes seamlessly through crypto exchanges, FX markets, and cryptographic identity solutions."
        },
        {
            icon: RiExchangeDollarFill,
            title: "Fiat ↔ Digital ↔ Fiat",
            description: "Enables smooth movement from fiat to digital (F2D) and back from digital to fiat (D2F)."
        },
        {
            icon: IoShieldCheckmarkSharp,
            title: "Secure by Design",
            description: "Built for privacy, layered encryption, and lightning-fast transactions."
        }
    ];

    return (
        <div className="max-w-[1980px] mx-auto flex flex-col justify-center w-full px-4 md:px-10 lg:px-30 my-10 lg:my-20 bg-white dark:bg-gray-900 transition-colors duration-300">
            {/* Header Section */}
            <motion.div
                className="flex flex-col items-center text-center mb-12 md:mb-16 lg:mb-20"
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="urbanist-bold text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] xl:text-[52px] leading-[1.1] mb-4">
                    <span className="text-primary">TagoCore</span>
                    <span className="text-[#111827] dark:text-white">: The Heart of TagoCash</span>
                </h2>
                <p className="urbanist-regular text-[16px] sm:text-[18px] md:text-[20px] text-[#1F2933] dark:text-gray-300 max-w-3xl">
                    At the core of the Tago Platform is TagoCore, a powerful orchestration engine connecting 27+ global partners.
                </p>
            </motion.div>

            {/* 2x2 Grid of Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
                {features.map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                        <motion.div
                            key={index}
                            className="flex flex-col p-6 md:p-8"
                            custom={index}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, margin: "-50px" }}
                            variants={cardVariants}
                        >
                            {/* Blue Square Icon */}
                            <div className="w-12 h-12 md:w-14 md:h-14 bg-primary rounded-xl flex items-center justify-center mb-4 md:mb-6">
                                <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-white" />
                            </div>

                            {/* Title */}
                            <h3 className="urbanist-bold text-[20px] sm:text-[24px] md:text-[28px] text-[#111827] dark:text-white mb-3 md:mb-4">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="urbanist-regular text-[15px] sm:text-[16px] md:text-[17px] text-[#1F2933] dark:text-gray-300 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    );
                })}
            </div>


        </div>
    )
}

export default TagoCore;