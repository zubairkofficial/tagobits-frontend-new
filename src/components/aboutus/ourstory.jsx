import { motion } from "framer-motion"
import ourstory from "../../assets/about/ourstory/ourstory.jpg"

const OurStory = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-8 sm:gap-12 md:gap-15 lg:gap-20 px-4 sm:px-6 md:px-8 lg:px-10 bg-[#FBFDFF] min-h-[500px] sm:min-h-[600px] md:min-h-[700px] py-12 sm:py-16 md:py-20">
            <div className="flex xl:flex-row flex-col items-center justify-center gap-8 sm:gap-10 md:gap-12 xl:gap-20 w-full max-w-7xl mx-auto">
                <motion.div
                    className="flex flex-col gap-6 sm:gap-8 md:gap-10 w-full xl:w-1/2"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
                        <div className="flex flex-col justify-center xl:items-start gap-4 sm:gap-5">
                            <span className="urbanist-regular border border-gray-200 p-2 rounded-4xl w-fit text-xs sm:text-sm">Story</span>
                            <span className="urbanist-bold text-[24px] xs:text-[28px] sm:text-[32px] md:text-[40px] lg:text-[48px] xl:text-[56px] 2xl:text-[64px] text-center xl:text-left text-[#111827] leading-[1.1]">
                                Our Story
                            </span>
                        </div>
                        <div className="flex flex-col justify-center xl:items-start">
                            <span className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] w-full urbanist-regular text-center xl:text-left max-w-[780px] text-gray-600">
                                TagoCash was born from a vision: to make global money movement instant, secure, and inclusive. With TagoCash as the digital representation of the US Dollar, and TagoCore as the engine connecting blockchain, FX, compliance, and identity partners, we're building the most reliable payment platform in the world.
                            </span>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[540px] mt-6 sm:mt-8 md:mt-10 xl:mt-0"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="rounded-2xl sm:rounded-3xl md:rounded-4xl w-full h-[250px] sm:h-[300px] md:h-[320px] lg:h-[340px] xl:h-[355px] flex justify-center items-center overflow-hidden">
                        <div className="w-full h-full">
                            <img
                                src={ourstory}
                                className="object-cover rounded-2xl sm:rounded-3xl md:rounded-4xl w-full h-full object-top"
                                alt="Our Story"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default OurStory;