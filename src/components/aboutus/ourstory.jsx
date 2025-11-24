import ourstory from "../../assets/about/ourstory/ourstory.jpg"

const OurStory = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-15 lg:gap-20 px-10 bg-white dark:bg-gray-900 min-h-[700px] py-20 transition-colors duration-300">
            <div className="flex xl:flex-row flex-col items-center justify-center gap-10 xl:gap-25">
                <div className="flex flex-col gap-10 w-1/2">
                    <div className="flex flex-col gap-10 ">
                        <div className="flex flex-col justify-center xl:items-start gap-5">
                        <span className="urbanist-regular border border-gray-200 dark:border-gray-700 p-2 rounded-4xl w-fit dark:text-gray-300">Story</span>
                            <span className="urbanist-bold text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] text-center xl:text-left text-primary dark:text-blue-400 leading-[1.1]">
                                Our Story
                            </span>
                        </div>
                        <div className="flex flex-col justify-center xl:items-start">
                            <span className="text-[16px] w-full sm:text-[18px] md:text-[20px] urbanist-regular text-center xl:text-left max-w-[780px] text-black dark:text-gray-300">
                                TagoBits was born from a vision: to make global money movement instant, secure, and inclusive. With TagoCash as the digital representation of the US Dollar, and TagoCore as the engine connecting blockchain, FX, compliance, and identity partners, we're building the most reliable payment platform in the world.
                            </span>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="rounded-4xl xl:w-[540px] xl:h-[355px] flex justify-end items-center overflow-hidden">
                        <div className="">
                            <img
                                src={ourstory}
                                className="object-cover rounded-4xl object-top"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OurStory;