import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import linegraphline from "../../assets/home/whytago/linegraphline.png"
import Button from "../../components/button"
import { IoCubeOutline } from "react-icons/io5";

// Same images-set and behavior as hero section (QR, secure payment, card)
const OVERLAY_CARDS = [
    {
        id: "qr",
        src: "/qr code.png",
        alt: "QR code payment",
    },
    {
        id: "secure",
        src: "/secure payment.png",
        alt: "Secure payment confirmation",
    },
    {
        id: "card",
        src: "/card.png",
        alt: "Tagobits virtual card",
    },
];

const Whytago = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % OVERLAY_CARDS.length);
        }, 2000); // Change every 2s (slower for smoother feel)

        return () => clearInterval(interval);
    }, []);

    const currentCard = OVERLAY_CARDS[currentImageIndex];

    // Match hero section: keep phone-center images visually straight
    const getCenterRotationClass = (id) => {
        if (id === "card") return "rotate-[9deg]";
        if (id === "secure") return "rotate-[-9deg]";
        return "";
    };

    return (
        <div className="flex flex-col items-center my-40 lg:px-30 xl:px-40 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="flex xl:flex-row flex-col gap-10 md:gap-30 xl:gap-50 items-stretch">
                <motion.div 
                    className="relative flex justify-center items-start xl:w-1/2 h-fit pt-16 md:pt-20 lg:pt-24 xl:pt-[80px]"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    {/* Top stats card - sits just above phone, not too high */}
                    <div className="absolute flex bg-white dark:bg-gray-800 shadow-2xl dark:shadow-blue-500/10 h-[120px] sm:h-[135px] md:h-[140px] w-[250px] sm:w-[280px] md:w-[320px] z-20 rounded-4xl -top-2 sm:-top-6 md:top-9 left-10 sm:-left-10 md:-left-6 xl:-left-14 p-4 sm:p-5 overflow-hidden">
                        <div className="flex flex-col justify-between">
                            <div className="relative flex">
                                <div className="bg-blue-800 dark:bg-blue-600 p-3 rounded-full flex justify-center items-center h-fit text-white z-10">
                                    <IoCubeOutline className="" />
                                </div>
                                <div className="bg-blue-300 dark:bg-blue-400 p-3 rounded-full flex justify-center items-center h-fit text-white -ml-4 z-20">
                                    <IoCubeOutline className="" />
                                </div>
                                <div className="bg-[#B5E4CA] dark:bg-green-400 p-3 rounded-full flex justify-center items-center h-fit text-white -ml-4 z-30">
                                    <IoCubeOutline className="" />
                                </div>
                            </div>
                            <span className="urbanist-bold text-[20px] sm:text-[24px] md:text-[32px] lg:text-4xl dark:text-white">$9,562</span>
                        </div>
                        <div className="flex justify-end items-end w-full h-full gap-1 sm:gap-2">
                            <div className="min-h-[35%] w-[20px] sm:w-[24px] md:w-[30px] bg-gradient-to-b from-[#235BB2] to-white dark:from-blue-500 dark:to-gray-700 rounded-md"></div>
                            <div className="min-h-[70%] w-[20px] sm:w-[24px] md:w-[30px] bg-[#323232] dark:bg-gray-600 rounded-md"></div>
                            <div className="min-h-[60%] w-[20px] sm:w-[24px] md:w-[30px] bg-gradient-to-b from-[#235BB2] to-white dark:from-blue-500 dark:to-gray-700 rounded-md"></div>
                            <div className="min-h-[100%] w-[20px] sm:w-[24px] md:w-[30px] bg-[#323232] dark:bg-gray-600 rounded-md"></div>
                            <div className="min-h-[70%] w-[20px] sm:w-[24px] md:w-[30px] bg-gradient-to-b from-[#235BB2] to-white dark:from-blue-500 dark:to-gray-700 rounded-md"></div>
                        </div>
                    </div>
                    {/* Bottom money-movement card - below phone, arrow not too low */}
                    <div className="p-3 sm:p-4 absolute bg-white dark:bg-gray-800 shadow-2xl dark:shadow-blue-500/10 h-[165px] sm:h-[185px] md:h-[205px] w-[230px] sm:w-[250px] md:w-[260px] z-20 rounded-4xl -bottom-10 sm:-bottom-16 md:-bottom-23 left-10 sm:-left-10 md:-left-6 xl:left-0 overflow-hidden">
                        <div className="flex flex-row items-end">
                            <span className="urbanist-bold text-[20px] sm:text-[24px] lg:text-[32px] dark:text-white">Money Movement</span>
                            <div className="h-fit bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-4xl text-primary dark:text-blue-400">$USD</div>
                        </div>
                        <div className="h-[70px] sm:h-[85px] md:h-[106px] w-[180px] sm:w-[190px] md:w-[206px] pt-2 sm:pt-3">
                            <img src={linegraphline} alt="" className="w-full h-full object-contain" />
                        </div>
                    </div>
                    <div className="relative left-27 w-[90%] sm:w-[85%] max-w-[380px] sm:max-w-[420px] h-auto flex justify-center">
                        {/* Phone frame */}
                        <div className="relative w-[220px] sm:w-[260px] md:w-[280px] lg:w-[300px] xl:w-[320px]">
                            <img
                                src="/Iphone 14 - 2.png"
                                alt="Tagobits mobile app"
                                className="w-full drop-shadow-2xl"
                            />
                            {/* Screen content (cycling QR / Secure / Card) */}
                            <div className="absolute right-[31.5%] top-[26%] flex items-center justify-center pointer-events-none overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={currentCard.id}
                                        src={currentCard.src}
                                        alt={currentCard.alt}
                                        className={`max-w-[90px] sm:max-w-[130px] ${getCenterRotationClass(currentCard.id)}`}
                                        initial={{ opacity: 0, x: 40, scale: 0.98 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        exit={{ opacity: 0, x: -40, scale: 0.98 }}
                                        transition={{ duration: 0.6, ease: "easeInOut" }}
                                    />
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </motion.div>
                <motion.div 
                    className="flex flex-col justify-center xl:justify-between max-[574px] gap-10 px-5 xl:w-1/2"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div className="flex flex-col items-center xl:items-start">
                        <motion.span 
                            className="w-fit border boder-1 rounded-4xl my-5 xl:my-0 p-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 transition-colors duration-300"
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            Why Tago
                        </motion.span>
                        <motion.h2 
                            className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] text-center xl:text-left text-primary dark:text-blue-400 leading-[1.1]"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            The Tago Platform Advantage
                        </motion.h2>
                    </div>
                    <motion.span 
                        className="text-[16px] sm:text-[18px] md:text-[20px] urbanist-regular text-center xl:text-left max-w-[780px] text-[#576275] dark:text-gray-400"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        The Tago Platform is the infrastructure powering safe, secure and compliant borderless digital payments. Within the platform, TagoCash, the digital representation of the US Dollar is the standard for money movement.
                    </motion.span>
                    <motion.div 
                        className='flex flex-row gap-8 justify-center xl:justify-start'
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <Button 
                            background="linear-gradient(to right, #2A3E9C, #1478C7)" 
                            color="#ffffff" 
                            buttontext="Contact Us" 
                            to="/contactus"
                            hoverBackground="#ffffff"
                            hoverColor="#235BB2"
                            hoverBorder="2px solid #235BB2"
                            padding="px-6 py-2"
                        />
                        <Button 
                            background="#ffffff" 
                            color="#235BB2" 
                            buttontext="Learn More" 
                            border="2px solid #235BB2" 
                            hoverBackground="linear-gradient(to right, #2A3E9C, #1478C7)"
                            hoverColor="#ffffff"
                            hoverBorder="2px solid #ffffff"
                            padding="px-6 py-2"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default Whytago;