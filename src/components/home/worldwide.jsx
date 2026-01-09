import { motion } from "framer-motion"
import { useTheme } from "../../context/ThemeContext"

const Worldwide = () => {
    const { theme } = useTheme();
    return (
        <div className="max-w-[1980px] mx-auto w-full mt-6 md:mt-10 lg:mt-16 mb-0 lg:mb-2 px-4 md:px-10 lg:px-30 bg-white dark:bg-gray-900 transition-colors duration-300">
            <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-150px" }}
                transition={{
                    duration: 0.7,
                    ease: "easeOut"
                }}
            >
                {/* Map Image with Overlays */}
                <motion.div
                    className="relative w-full max-w-5xl min-h-[400px] sm:min-h-[400px] md:min-h-[600px]"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                >
                    <img
                        src={theme === 'dark' ? "/map view black.png" : "/map view.png"}
                        alt="Worldwide map"
                        className="w-full h-auto object-contain rounded-2xl"
                    />

                    {/* Title - positioned over map */}
                    <motion.h2
                        className="absolute top-8 md:top-3 lg:top-5 left-0 right-0 text-center urbanist-bold text-[20px] sm:text-[28px] md:text-[32px] lg:text-[36px] text-[#111827] dark:text-white leading-[1.3] px-2"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <div>Powering Confidence</div>
                        <div>Worldwide</div>
                    </motion.h2>

                    {/* Description - positioned over map below title */}
                    <motion.p
                        className="absolute top-32 sm:top-28 md:top-24 lg:top-26 left-0 right-0 text-center urbanist-regular text-[12px] sm:text-[15px] md:text-[18px] lg:text-[19px] text-[#576275] dark:text-white px-4 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        The rigor of TagoCash has earned the confidence <br /> of users, businesses, and governments worldwide.
                    </motion.p>

                    {/* Stats - positioned over map (left and right, closer together) */}
                    <motion.div
                        className="absolute md:top-75 lg:top-80 top-[50%] sm:top-[70%] md:top-[75%] left-1/2 -translate-x-1/2 flex flex-col sm:flex-row gap-3 sm:gap-6 md:gap-8 lg:gap-10 items-center px-2"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <motion.div
                            className="flex flex-col items-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <span className="urbanist-bold text-[24px] sm:text-[32px] md:text-[36px] lg:text-[40px] xl:text-[44px] text-primary dark:text-[#60A5FA] leading-[1.1]">
                                17M+
                            </span>
                            <span className="text-[#576275] dark:text-white text-[11px] sm:text-[13px] md:text-[16px] lg:text-[18px] text-center">
                                Active TagoCash users <br /> worldwide
                            </span>
                        </motion.div>
                        <motion.div
                            className="flex flex-col items-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <span className="urbanist-bold text-[24px] sm:text-[32px] md:text-[36px] lg:text-[40px] xl:text-[44px] text-primary dark:text-[#60A5FA] leading-[1.1]">
                                196+
                            </span>
                            <span className="text-[#576275] dark:text-white text-[11px] sm:text-[13px] md:text-[16px] lg:text-[18px] text-center">
                                Borderless reach <br /> across the globe
                            </span>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default Worldwide;