import leftframe from "../../assets/home/whytago/frameleft.png"
import linegraphline from "../../assets/home/whytago/linegraphline.png"
import Button from "../../components/button"
import { IoCubeOutline } from "react-icons/io5";

const Whytago = () => {
    return (
        <div className="flex flex-col items-center my-40 lg:px-30 xl:px-40">
            <div className="flex xl:flex-row flex-col gap-10 md:gap-30 xl:gap-50">
                <div className="relative scale-70 md:scale-100 flex justify-center xl:w-1/2">
                    <div className="absolute flex bg-white shadow-2xl h-[163px] w-[376px] z-20 rounded-4xl -top-20 -left-10 md:left-10 xl:-left-20 p-6 hover:shadow-sm hover:scale-105 transition-all duration-300">
                        <div className="flex flex-col justify-between">
                            <div className="relative flex">
                                <div className="bg-blue-800 p-3 rounded-full flex justify-center items-center h-fit text-white z-10">
                                    <IoCubeOutline className="" />
                                </div>
                                <div className="bg-blue-300 p-3 rounded-full flex justify-center items-center h-fit text-white -ml-4 z-20">
                                    <IoCubeOutline className="" />
                                </div>
                                <div className="bg-[#B5E4CA] p-3 rounded-full flex justify-center items-center h-fit text-white -ml-4 z-30">
                                    <IoCubeOutline className="" />
                                </div>
                            </div>
                            <span className="urbanist-bold text-[24px] sm:text-[32px] lg:text-4xl">$9,562</span>
                        </div>
                        <div className="flex justify-end items-end w-full h-full gap-2">
                            <div className="min-h-[35%] w-[30px] bg-gradient-to-b from-[#235BB2] to-white rounded-md"></div>
                            <div className="min-h-[70%] w-[30px] bg-[#323232] rounded-md"></div>
                            <div className="min-h-[60%] w-[30px] bg-gradient-to-b from-[#235BB2] to-white rounded-md"></div>
                            <div className="min-h-[100%] w-[30px] bg-[#323232] rounded-md"></div>
                            <div className="min-h-[70%] w-[30px] bg-gradient-to-b from-[#235BB2] to-white rounded-md"></div>
                        </div>
                    </div>
                    <div className="p-6 absolute bg-white shadow-2xl h-[254px] w-[284px] z-20 rounded-4xl -bottom-20 -right-10 md:right-10 xl:-right-10 hover:shadow-sm hover:scale-105 transition-all duration-300">
                        <div className="flex flex-row items-end">
                            <span className="urbanist-bold text-[20px] sm:text-[24px] lg:text-[32px]">Money Movement</span>
                            <div className="h-fit bg-gray-100 px-4 py-2 rounded-4xl text-primary">$USD</div>
                        </div>
                        <div className="h-[106px] w-[206px] pt-4">
                            <img src={linegraphline} alt="" />
                        </div>
                    </div>
                    <img src={leftframe} className="hover:scale-105 transition-all duration-300" alt="" />
                </div>
                <div className="flex flex-col justify-center max-[574px] gap-10 px-5">
                    <div className="flex flex-col items-center xl:items-start">
                        <span className="w-fit border boder-1 rounded-4xl my-5 xl:my-0 p-2 border-gray-300">
                            Why Tago
                        </span>
                        <span className="urbanist-bold text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] text-center xl:text-left text-primary leading-[1.1]">
                            The Tago Platform Advantage
                        </span>
                    </div>
                    <span className="text-[16px] sm:text-[18px] md:text-[20px] urbanist-regular text-center xl:text-left max-w-[780px] text-[#576275]">The Tago Platform is the infrastructure powering safe, secure and compliant borderless digital payments. Within the platform, TagoCash, the digital representation of the US Dollar is the standard for money movement.</span>
                    <div className='flex flex-row gap-8 justify-center xl:justify-start'>
                        <Button 
                            background="linear-gradient(to right, #2A3E9C, #1478C7)" 
                            color="#ffffff" 
                            buttontext="Contact Us" 
                            hoverBackground="#ffffff"
                            hoverColor="#235BB2"
                            hoverBorder="2px solid #235BB2"
                        />
                        <Button 
                            background="#ffffff" 
                            color="#235BB2" 
                            buttontext="Learn More" 
                            border="2px solid #235BB2" 
                            hoverBackground="linear-gradient(to right, #2A3E9C, #1478C7)"
                            hoverColor="#ffffff"
                            hoverBorder="2px solid #ffffff"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Whytago;