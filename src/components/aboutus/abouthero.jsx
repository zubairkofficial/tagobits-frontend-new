import { motion } from "framer-motion"
import abouthero from "../../assets/about/hero/abouthero.png"

const AboutUsHero = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-15 lg:gap-20 px-10 bg-gradient-to-br from-[#2A3E9C] to-[#1478C7] min-h-[700px]">
            <div className="flex xl:flex-row flex-col items-center justify-center gap-15 xl:gap-20 mx-50">
                <motion.div 
                    className="flex flex-col gap-10 xl:w-1/2"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex flex-col justify-center xl:items-start">
                        <span className="urbanist-bold text-[42px] sm:text-[50px] md:text-[60px] lg:text-[70px] xl:text-[82px] text-center xl:text-left text-white leading-[1.1]">
                        Redefining Borderless Digital Payments.                        </span>
                    </div>
                    <div className="flex flex-col justify-center xl:items-start">
                        <span className="text-[16px]  w-full sm:text-[18px] md:text-[24px] urbanist-regular text-center xl:text-left max-w-[780px] text-white">
                        The TagoBits platform enables payment settlement in seconds and at one tenth of the cost of traditional fiat payments.</span>
                    </div>
                </motion.div>
                <motion.div 
                    className="xl:w-[550px] h-[385px] rounded-4xl flex justify-end items-start bg-white/10 overflow-hidden"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="">
                    <img
                        src={abouthero}
                        className="object-cover rounded-4xl h-[650px] object-top pt-30"
                        alt=""
                    />
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default AboutUsHero;