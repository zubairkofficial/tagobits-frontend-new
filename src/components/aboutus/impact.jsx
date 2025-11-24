import vector from "../../assets/about/impact/Vector.png";
import { IoWalletOutline, IoEarthOutline } from "react-icons/io5";
import { GiRapidshareArrow } from "react-icons/gi";

const Impact = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-15 lg:gap-20 px-10 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="flex flex-col items-center justify-center">
                <span className="urbanist-regular border border-gray-200 dark:border-gray-700 p-2 rounded-4xl w-fit dark:text-gray-300">Global Impact</span>
                <span className="urbanist-bold text-primary dark:text-blue-400 text-[64px]">Global Impact</span>
            </div>
            <div className="flex flex-col lg:flex-row gap-20">
                <div className="flex flex-col justify-between bg-gray-100/60 dark:bg-gray-800/60 p-7 rounded-4xl w-[310px] h-[293px] text-[#242424] dark:text-gray-200 hover:text-white transition-all duration-500 ease-in-out relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>
                    <div className="p-6 rounded-full w-fit mb-4 bg-white dark:bg-gray-700 relative z-10">
                        <IoWalletOutline className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex flex-col relative z-10">
                        <span className="urbanist-regular text-[24px] mb-3 leading-[1.1]">TagoCash Wallets</span>
                        <span className="urbanist-bold text-[48px] leading-[1.1]">17M+</span>
                    </div>
                </div>
                <div className="flex flex-row gap-25 max-w-[749px]">
                    <div className="relative flex flex-col justify-between bg-primary dark:bg-blue-600 p-7 rounded-4xl w-[310px] h-[293px] text-white hover:text-primary dark:hover:text-blue-600 transition-all duration-500 ease-in-out group" style={{ transform: "rotate(-13deg)" }}>
                        <div className="absolute inset-0 bg-white dark:bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out rounded-4xl"></div>
                        <div className="absolute top-[50%] -right-[34.5%] z-50" style={{ transform: "rotate(13deg)" }}>
                            <img src={vector} alt="Vector" className="w-full h-full" />
                        </div>
                        <div className="p-6 rounded-full w-fit mb-4 bg-white dark:bg-gray-700 relative z-10">
                            <IoEarthOutline className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex flex-col relative z-10">
                            <span className="urbanist-regular text-[24px] mb-3 leading-[1.1]">Countries Reached</span>
                            <span className="urbanist-bold text-[48px] leading-[1.1]">196+</span>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between bg-gray-100/55 dark:bg-gray-800/60 p-7 rounded-4xl w-[310px] h-[293px] text-[#242424] dark:text-gray-200 hover:text-white transition-all duration-500 ease-in-out relative overflow-hidden group" style={{ transform: "rotate(10deg)" }}>
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>
                        <div className="p-6 rounded-full w-fit mb-4 bg-white dark:bg-gray-700 relative z-10">
                            <GiRapidshareArrow className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex flex-col relative z-10">
                            <span className="urbanist-regular text-[24px] mb-3 leading-[1.1]">Global Partners</span>
                            <span className="urbanist-bold text-[48px] leading-[1.1]">27+</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Impact;