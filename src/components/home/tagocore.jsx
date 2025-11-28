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

    return (
        <div className="max-w-[1980px] mx-auto flex flex-col justify-center w-full px-10 lg:px-10 xl:px-30 my-20 lg:my-60 bg-white dark:bg-gray-900 transition-colors duration-300">
            <motion.div 
                className="flex flex-col mb-30"
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.6 }}
            >
                <span className="urbanist-regular border border-gray-200 dark:border-gray-700 p-2 rounded-4xl w-fit dark:text-gray-300">TagoCore</span>
                <h2 className="text-primary dark:text-blue-400 text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] leading-[1.1]">
                    TagoCore: The Heart of TagoBits
                </h2>
                <span className="urbanist-regular text-gray-400 dark:text-gray-400 text-[20px]">At the core of the Tago Platform is TagoCore, a powerful orchestration engine connecting 27+ global partners.</span>
            </motion.div>
            <div className="flex">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full">
                    <motion.div 
                        className="flex p-3 sm:p-5 w-full h-[271px] rounded-4xl text-white hover:text-primary transition-all duration-500 ease-in-out relative overflow-hidden group" 
                        style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)' }}
                        custom={0}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, margin: "-50px" }}
                        variants={cardVariants}
                    >
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>
                        <div className="flex flex-col max-w-[556px] relative z-10">
                            {/* <img src={box1icon} className="w-[40px] h-[40px] text-white" alt="" /> */}
                            <FaCubes className="w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] flex-shrink-0" />
                            <span className=" urbanist-bold text-[24px] sm:text-[32px] pt-15">
                                Integrated Ecosystem
                            </span>
                            <span className=" urbanist-regular text-[16px] sm:text-[20px]">
                                Connects blockchain networks, compliance bodies, stablecoin issuers, and on/off-ramp providers.                            </span>
                        </div>
                    </motion.div>
                    <motion.div 
                        className="flex p-3 sm:p-5 w-full h-[271px] rounded-4xl border border-gray-100 bg-white text-primary hover:text-white transition-all duration-500 ease-in-out relative overflow-hidden group"
                        custom={1}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, margin: "-50px" }}
                        variants={cardVariants}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>
                        <div className="flex flex-col max-w-[556px] relative z-10">
                            {/* <img src={box2icon} className="w-[40px] h-[40px] text-white" alt="" /> */}
                            <SiConvertio className="w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] flex-shrink-0" />

                            <span className=" urbanist-bold text-[24px] sm:text-[32px] pt-15">
                                Smart Routing
                            </span>
                            <span className=" urbanist-regular text-[16px] sm:text-[20px]">
                                Routes seamlessly through crypto exchanges, FX markets, and cryptographic identity solutions.                           </span>
                        </div>
                    </motion.div>
                    <motion.div 
                        className="flex p-3 sm:p-5 w-full h-[271px] rounded-4xl border border-gray-100 bg-white text-primary hover:text-white transition-all duration-500 ease-in-out relative overflow-hidden group"
                        custom={2}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, margin: "-50px" }}
                        variants={cardVariants}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>
                        <div className="flex flex-col max-w-[556px] relative z-10">
                            {/* <img src={box3icon} className="w-[40px] h-[40px]" alt="" /> */}
                            <RiExchangeDollarFill className="w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] flex-shrink-0" />
                            <span className=" urbanist-bold text-[24px] sm:text-[32px] pt-15">
                                Fiat ↔ Digital ↔ Fiat
                            </span>
                            <span className=" urbanist-regular text-[16px] sm:text-[20px]">
                                Enables smooth movement from fiat to digital (F2D) and back from digital to fiat (D2F).              </span>
                        </div>
                    </motion.div>
                    <motion.div 
                        className="flex p-3 sm:p-5 w-full h-[271px] rounded-4xl border border-gray-100 bg-white text-primary hover:text-white transition-all duration-500 ease-in-out relative overflow-hidden group"
                        custom={3}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, margin: "-50px" }}
                        variants={cardVariants}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>
                        <div className="flex flex-col max-w-[556px] relative z-10">
                            {/* <img src={box4icon} className="w-[40px] h-[40px]" alt="" /> */}
                            <IoShieldCheckmarkSharp className="w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] flex-shrink-0" />
                            <span className=" urbanist-bold text-[24px] sm:text-[32px] pt-15">
                                Secure by Design
                            </span>
                            <span className=" urbanist-regular text-[16px] sm:text-[20px]">
                                Built for privacy, layered encryption, and lightning-fast transactions.                  </span>
                        </div>
                    </motion.div>
                </div>
            </div>
            <motion.div 
                className="flex justify-center pt-20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <Button
                    background="linear-gradient(to right, #2A3E9C, #1478C7)"
                    color="#ffffff"
                    buttontext="Explore TagoCore"
                    hoverBackground="#ffffff"
                    hoverColor="#235BB2"
                    hoverBorder="2px solid #235BB2"
                />
            </motion.div>
        </div>
    )
}

export default TagoCore;