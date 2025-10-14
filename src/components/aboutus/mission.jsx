import mission from "../../assets/about/mission/mission.jpg"

const Mission = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-15 lg:gap-20 px-10 bg-white min-h-[700px] py-20">
            <div className="flex xl:flex-row flex-col items-center justify-center gap-10 xl:gap-20 mx-50">
                <div className="flex flex-col gap-10 xl:w-2/3 ">
                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col justify-center xl:items-start gap-5">
                        <span className="urbanist-regular border border-gray-200 p-2 rounded-4xl w-fit">Mission</span>

                            <span className="urbanist-bold text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] text-center xl:text-left text-primary leading-[1.1]">
                                Our Mission
                            </span>
                        </div>
                        <div className="flex flex-col justify-center xl:items-start">
                            <span className="text-[16px]  w-full sm:text-[18px] md:text-[20px] urbanist-regular text-center xl:text-left max-w-[780px] text-black">
                            To simplify global payments by combining security, compliance, and innovation—empowering individuals, businesses, and governments to transact without limits.                                </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-10 xl:w-1/2">
                        <div className="flex flex-col justify-center xl:items-start">
                            <span className="urbanist-bold text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] text-center xl:text-left text-[#2A3E59] leading-[1.1]">
                                Our Vision
                            </span>
                        </div>
                        <div className="flex flex-col justify-center xl:items-start">
                            <span className="text-[16px]  w-full sm:text-[18px] md:text-[20px] urbanist-regular text-center xl:text-left max-w-[780px] text-black">
                            To create a future where digital money is trusted worldwide as the universal medium of exchange.                                </span>
                        </div>
                    </div>
                </div>
                <div className="rounded-4xl xl:w-[610px] flex justify-end items-center overflow-hidden">
                    <div className="">
                        <img
                            src={mission}
                            className="object-cover rounded-4xl object-top xl:h-[700px]"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mission;