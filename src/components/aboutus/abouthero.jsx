import abouthero from "../../assets/about/hero/abouthero.png"

const AboutUsHero = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-15 lg:gap-20 px-10 bg-gradient-to-br from-[#2A3E9C] to-[#1478C7] min-h-[700px]">
            <div className="flex xl:flex-row flex-col items-center justify-center gap-15 xl:gap-20">
                <div className="flex flex-col gap-10 xl:w-1/2">
                    <div className="flex flex-col justify-center xl:items-start">
                        <span className="urbanist-bold text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] text-center xl:text-left text-white leading-[1.1]">
                            Great partnerships create better products
                        </span>
                    </div>
                    <div className="flex flex-col justify-center xl:items-start">
                        <span className="text-[16px]  w-full sm:text-[18px] md:text-[20px] urbanist-regular text-center xl:text-left max-w-[780px] text-white">Great partnerships make great products for customers. We welcome your interest in partnering with us.</span>
                    </div>
                </div>
                <div className="xl:w-[550px] h-[385px] rounded-4xl flex justify-end items-start bg-white/10 overflow-hidden">
                    <div className="">
                    <img
                        src={abouthero}
                        className="object-cover rounded-4xl h-[650px] object-top pt-30"
                        alt=""
                    />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUsHero;