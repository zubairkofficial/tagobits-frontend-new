import { motion } from "framer-motion"
import backimage from '../../assets/home/worldwide/backimage.png';
import lightbluepin from '../../assets/home/worldwide/lightbluepin.png';
import darkbluepin from '../../assets/home/worldwide/darkbluepin.png';
import redpin from '../../assets/home/worldwide/redpin.png';
import orangepin from '../../assets/home/worldwide/orangepin.png';
import purplepin from '../../assets/home/worldwide/purplepin.png';


const TagoCore = () => {
    return (
        <div className="flex flex-col xl:flex-row max-w-[1900px] mx-auto items-center justify-center px-10 lg:px-10 xl:px-30 lg:gap-0 bg-white dark:bg-gray-900 transition-colors duration-300">
            <motion.div 
                className="flex flex-col mb-30 lg:w-1/2"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.6 }}
            >
                <span className="urbanist-regular border border-gray-200 dark:border-gray-700 p-2 rounded-4xl w-fit dark:text-gray-300">Worldwide Users</span>
                <h2 className="text-primary dark:text-blue-400 text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] leading-[1.1]">
                    Powering Confidence Worldwide
                </h2>
                <span className="urbanist-regular text-gray-400 dark:text-gray-400 text-[16px] sm:text-[18px] md:text-[20px]">The rigor of TagoBits has earned the confidence of users, businesses, and governments worldwide.</span>
                <div className="flex pt-20 gap-20">
                    <div className="flex flex-col">
                        <span className="urbanist-bold text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] text-primary dark:text-blue-400">17M+</span>
                        <span className="text-gray-500 dark:text-gray-400 text-[12px] sm:text-[14px] md:text-[16px]">Active TagoCash users worldwide</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="urbanist-bold text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] text-primary dark:text-blue-400">196+</span>
                        <span className="text-gray-500 dark:text-gray-400 text-[12px] sm:text-[14px] md:text-[16px]">Borderless reach across the globe</span>
                    </div>
                </div>
            </motion.div>
            <motion.div 
                className="relative md:w-180 lg:w-1/2 lg:h-full bg-cover bg-center rounded-lg"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <div className='absolute xss:top-3 xss:left-2 xs:top-10 xs:left-7 sm:top-10 sm:left-5 md:top-0 md:left-0 w-full h-full'>
                    <img src={lightbluepin} alt="Background" className="absolute left-[20%] top-[-57%] sm:left-[30%] sm:top-[-35%] md:left-[32%] md:top-[-15%] lg:left-[30%] lg:top-[-20%] xl:left-[34%] xl:top-[-12%] scale-60 hover:scale-67 xs:scale-75 xs:hover:scale-85 sm:scale-105 sm:hover:scale-112 transition-all duration-300" />
                    <img src={darkbluepin} alt="Background" className="absolute left-[30%] top-[-25%] sm:left-[38%] sm:top-[0%] md:left-[45%] md:top-[19%] lg:left-[42%] lg:top-[4%] xl:left-[44%] xl:top-[22%] scale-50 hover:scale-57 xs:scale-65 xs:hover:scale-72 sm:scale-100 sm:hover:scale-107 transition-all duration-300" />
                    <img src={redpin} alt="Background" className="absolute left-[37%] top-[10%] sm:left-[47%] sm:top-[30%] md:left-[52%] md:top-[50%] lg:left-[50%] lg:top-[36%] xl:left-[52%] xl:top-[52%] scale-50 hover:scale-57 xs:scale-65 xs:hover:scale-72 sm:scale-100 sm:hover:scale-107 transition-all duration-300" />
                    <img src={orangepin} alt="Background" className="absolute left-[48%] top-[-35%] sm:left-[60%] sm:top-[-10%] md:left-[63%] md:top-[10%] lg:left-[60%] lg:top-[-5%] xl:left-[64%] xl:top-[13%] scale-40 hover:scale-47 xs:scale-55 xs:hover:scale-62 sm:scale-92 sm:hover:scale-100 transition-all duration-300" />
                    <img src={purplepin} alt="Background" className="absolute left-[60%] top-[-45%] sm:left-[70%] sm:top-[-25%] md:left-[71%] md:top-[-3%] lg:left-[67%] lg:top-[-18%] xl:left-[71%] xl:top-[0%] scale-60 hover:scale-67 xs:scale-75 xs:hover:scale-85 sm:scale-105 sm:hover:scale-112 transition-all duration-300" />
                    <img src={lightbluepin} alt="Background" className="absolute left-[73%] top-[20%] sm:left-[85%] sm:top-[40%] md:left-[87%] md:top-[55%] lg:left-[83%] lg:top-[52%] xl:left-[87%] xl:top-[60%] scale-50 hover:scale-57 xs:scale-65 xs:hover:scale-72 sm:scale-100 sm:hover:scale-107 transition-all duration-300" />
                    <img src={redpin} alt="Background" className="absolute left-[-8%] top-[-35%] sm:left-[0%] sm:top-[-10%] md:left-[5%] md:top-[6%] lg:left-[4%] lg:top-[-2%] xl:left-[4%] xl:top-[11%] scale-60 hover:scale-67 xs:scale-75 xs:hover:scale-85 sm:scale-105 sm:hover:scale-112 transition-all duration-300" />
                    <img src={orangepin} alt="Background" className="absolute left-[12%] top-[10%] sm:left-[20%] sm:top-[30%] md:left-[25%] md:top-[50%] lg:left-[25%] lg:top-[40%] xl:left-[27%] xl:top-[55%] scale-50 hover:scale-57 xs:scale-65 xs:hover:scale-72 sm:scale-100 sm:hover:scale-107 transition-all duration-300" />
                    <img src={purplepin} alt="Background" className="absolute left-[-3%] top-[-20%] sm:left-[8%] sm:top-[2%] md:left-[12%] md:top-[20%] lg:left-[10%] lg:top-[10%] xl:left-[13%] xl:top-[23%] scale-40 hover:scale-47 xs:scale-55 xs:hover:scale-62 sm:scale-92 sm:hover:scale-100 transition-all duration-300" />
                </div>
                <img src={backimage} className='w-full h-full object-cover' />
            </motion.div>
        </div>
    )
}

export default TagoCore;