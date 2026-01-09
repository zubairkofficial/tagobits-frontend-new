import { motion } from "framer-motion"
import abouthero from "../../assets/about/hero/abouthero.png"

const AboutUsHero = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-8 sm:gap-12 md:gap-15 lg:gap-20 px-4 sm:px-6 md:px-8 lg:px-10 bg-gradient-to-br from-[#2A3E9C] to-[#1478C7] min-h-[500px] sm:min-h-[600px] md:min-h-[700px] pt-16 sm:pt-20 md:pt-24 lg:pt-16 pb-8 sm:pb-12 md:pb-16 lg:pb-20">
            <div className="flex xl:flex-row flex-col items-center justify-center gap-8 sm:gap-12 md:gap-15 xl:gap-20 w-full max-w-7xl mx-auto">
                <motion.div
                    className="flex flex-col gap-6 sm:gap-8 md:gap-10 w-full xl:w-1/2"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex flex-col justify-center xl:items-start">
                        <span className="urbanist-bold text-[28px] xs:text-[32px] sm:text-[42px] md:text-[50px] lg:text-[60px] xl:text-[70px] 2xl:text-[82px] text-center xl:text-left text-white leading-[1.2] sm:leading-[1.1]">
                            Redefining Borderless Digital Payments.
                        </span>
                    </div>
                    <div className="flex flex-col justify-center xl:items-start">
                        <span className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[24px] w-full urbanist-regular text-center xl:text-left max-w-[780px] text-white">
                            The TagoCash platform enables payment settlement in seconds and at one tenth of the cost of traditional fiat payments.
                        </span>
                    </div>
                </motion.div>
                <motion.div
                    className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[550px] h-[250px] sm:h-[300px] md:h-[350px] lg:h-[385px] rounded-2xl sm:rounded-3xl md:rounded-4xl flex justify-center items-center bg-white/10 overflow-hidden mt-4 sm:mt-6 md:mt-8 xl:mt-0"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="w-full h-full">
                        <img
                            src={abouthero}
                            className="object-cover rounded-2xl sm:rounded-3xl md:rounded-4xl w-full h-full sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[650px] object-top"
                            alt="About TagoCash"
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default AboutUsHero;