import ourstory from "../../assets/about/ourstory/ourstory.jpg"

const OurStory = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-15 lg:gap-20 px-10 bg-white min-h-[700px] py-20">
            <div className="flex xl:flex-row flex-col items-center justify-center gap-10 xl:gap-15">
                <div className="flex flex-col gap-10 w-2/3">
                    <div className="flex flex-col gap-10 ">
                        <div className="flex flex-col justify-center xl:items-start">
                            <span className="urbanist-bold text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] text-center xl:text-left text-primary leading-[1.1]">
                                Great partnerships create better products
                            </span>
                        </div>
                        <div className="flex flex-col justify-center xl:items-start">
                            <span className="text-[16px] w-full sm:text-[18px] md:text-[20px] urbanist-regular text-center xl:text-left max-w-[780px] text-black">Great partnerships make great products for customers. We welcome your interest in partnering with us.</span>
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