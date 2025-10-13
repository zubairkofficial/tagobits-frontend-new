//components
import Button from '../button'

// icons
import { RiBankLine } from "react-icons/ri";
import { GiCheckedShield } from "react-icons/gi";
import { MdOutlineRealEstateAgent } from "react-icons/md";

const Hero = () => {
    return (
        <div className='relative'>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <div className="w-[800px] h-[800px] bg-[radial-gradient(circle,_rgba(59,130,246,0.2)_0%,_transparent_70%)] rounded-full"></div>
            </div>
            <div className="flex flex-col items-center gap-15 lg:gap-20 px-10">
                <span className=" text-[40px] sm:text-[52px] md:text-[60px] lg:text-[68px] xl:text-[72px] roboto-medium text-center max-w-[872px] leading-[1.1] text-primary">The Digital Money for Borderless Payments</span>
                <span className="text-[16px] sm:text-[18px] md:text-[20px] urbanist-regular text-center max-w-[780px] text-[#576275]">The TagoBits platform enables payment settlement in seconds and at one tenth of the cost of traditional fiat payments.</span>
                <div>
                    <div className="flex flex-col md:flex-row gap-15 md:gap-20">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-2 justify-center">
                                <span className="bg-primary text-white w-[25px] h-[25px] rounded-full flex justify-center items-center"> <RiBankLine size={18} /> </span>
                                <span className="urbanist-bold text-[14px] sm:text-[16px]">434,343,000</span>
                            </div>
                            <span className="urbanist-regular text-center text-[12px] sm:text-[14px] text-[#576275]">TagoCash Circulation</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-2 justify-center">
                                <span className="text-primary"> <GiCheckedShield size={25} /> </span>
                                <span className="urbanist-bold text-[14px] sm:text-[16px]">102%</span>
                            </div>
                            <span className="urbanist-regular text-center text-[12px] sm:text-[14px] text-[#576275]">TagoCash Circulation</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-2 justify-center">
                                <span className="text-primary"> <MdOutlineRealEstateAgent size={25} /> </span>
                                <span className="urbanist-bold text-[14px] sm:text-[16px]">$450,000,000</span>
                            </div>
                            <span className="urbanist-regular text-center text-[12px] sm:text-[14px] text-[#576275]">TagoCash Circulation</span>
                        </div>
                    </div>
                </div>
                <div className='flex flex-row gap-8'>
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
                        hoverBorder=""
                    />
                </div>
            </div>
        </div>
    )
}

export default Hero;