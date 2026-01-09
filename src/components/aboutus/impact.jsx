import { motion } from "framer-motion"
import vector from "../../assets/about/impact/Vector.png";
import { IoWalletOutline, IoEarthOutline } from "react-icons/io5";
import { GiRapidshareArrow } from "react-icons/gi";

const Impact = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-8 sm:gap-12 md:gap-15 lg:gap-20 px-4 sm:px-6 md:px-8 lg:px-10 bg-[#FBFDFF] pb-12 sm:pb-16">
            <motion.div 
                className="flex flex-col items-center justify-center gap-3 sm:gap-4"
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.6 }}
            >
                <span className="urbanist-regular border border-gray-200 p-2 rounded-4xl w-fit text-xs sm:text-sm">Global Impact</span>
                <span className="urbanist-bold text-[#111827] text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] text-center">Global Impact</span>
            </motion.div>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20 w-full max-w-7xl mx-auto">
                <motion.div 
                    className="flex flex-col justify-between bg-gray-100/60 p-5 sm:p-6 md:p-7 rounded-2xl sm:rounded-3xl md:rounded-4xl w-full sm:w-[280px] md:w-[300px] lg:w-[310px] h-[250px] sm:h-[270px] md:h-[285px] lg:h-[293px] text-[#111827] hover:text-white transition-all duration-500 ease-in-out relative overflow-hidden group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>
                    <div className="p-4 sm:p-5 md:p-6 rounded-full w-fit mb-3 sm:mb-4 bg-white relative z-10">
                        <IoWalletOutline className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <div className="flex flex-col relative z-10">
                        <span className="urbanist-regular text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] mb-2 sm:mb-3 leading-[1.1]">TagoCash Wallets</span>
                        <span className="urbanist-bold text-[36px] sm:text-[40px] md:text-[44px] lg:text-[48px] leading-[1.1]">17M+</span>
                    </div>
                </motion.div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 w-full lg:max-w-[749px]">
                    <motion.div 
                        className="relative flex flex-col justify-between bg-primary p-5 sm:p-6 md:p-7 rounded-2xl sm:rounded-3xl md:rounded-4xl w-full sm:w-[280px] md:w-[300px] lg:w-[310px] h-[250px] sm:h-[270px] md:h-[285px] lg:h-[293px] text-white hover:text-primary transition-all duration-500 ease-in-out group" 
                        style={{ transform: "rotate(-8deg)" }}
                        initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out rounded-2xl sm:rounded-3xl md:rounded-4xl"></div>
                        <div className="absolute top-[50%] -right-[25%] sm:-right-[30%] md:-right-[34.5%] z-50 hidden sm:block" style={{ transform: "rotate(8deg)" }}>
                            <img src={vector} alt="Vector" className="w-full h-full max-w-[100px] sm:max-w-[120px] md:max-w-none" />
                        </div>
                        <div className="p-4 sm:p-5 md:p-6 rounded-full w-fit mb-3 sm:mb-4 bg-white relative z-10">
                            <IoEarthOutline className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                        </div>
                        <div className="flex flex-col relative z-10">
                            <span className="urbanist-regular text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] mb-2 sm:mb-3 leading-[1.1]">Countries Reached</span>
                            <span className="urbanist-bold text-[36px] sm:text-[40px] md:text-[44px] lg:text-[48px] leading-[1.1]">196+</span>
                        </div>
                    </motion.div>
                    <motion.div 
                        className="flex flex-col justify-between bg-gray-100/55 p-5 sm:p-6 md:p-7 rounded-2xl sm:rounded-3xl md:rounded-4xl w-full sm:w-[280px] md:w-[300px] lg:w-[310px] h-[250px] sm:h-[270px] md:h-[285px] lg:h-[293px] text-[#111827] hover:text-white transition-all duration-500 ease-in-out relative overflow-hidden group" 
                        style={{ transform: "rotate(6deg)" }}
                        initial={{ opacity: 0, scale: 0.8, rotate: 6 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 6 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>
                        <div className="p-4 sm:p-5 md:p-6 rounded-full w-fit mb-3 sm:mb-4 bg-white relative z-10">
                            <GiRapidshareArrow className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                        </div>
                        <div className="flex flex-col relative z-10">
                            <span className="urbanist-regular text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] mb-2 sm:mb-3 leading-[1.1]">Global Partners</span>
                            <span className="urbanist-bold text-[36px] sm:text-[40px] md:text-[44px] lg:text-[48px] leading-[1.1]">27+</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Impact;