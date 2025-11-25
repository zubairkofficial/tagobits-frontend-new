import { useRef } from 'react';
import partnershipphoto from "../../assets/home/partnerships/partnership2.png"
import linegraphline from "../../assets/home/whytago/linegraphline.png"
import Button from "../../components/button"
import ScrollFadeIn from "../common/ScrollFadeIn"
import VariableProximity from "../VariableProximity"

const Partnership = () => {
    const containerRef = useRef(null);
    
    return (
        <div ref={containerRef} className="flex flex-col items-center my-30 lg:px-30 xl:px-40 bg-white dark:bg-[#040b1f] transition-colors duration-300">
            <div className="flex xl:flex-row flex-col items-center justify-center gap-15 xl:gap-0">
                <ScrollFadeIn className="flex flex-col items-center gap-10 xl:w-1/2">
                    <div className="flex flex-col items-center xl:items-start">
                        <span className="w-fit border rounded-4xl my-5 xl:my-0 px-4 py-2 border-gray-300 bg-white text-gray-800 dark:border-blue-500/40 dark:bg-white/5 dark:text-blue-100 transition-colors duration-300">
                            Partnerships
                        </span>
                        <VariableProximity
                            label="Great partnerships create better products"
                            fromFontVariationSettings="'wght' 700"
                            toFontVariationSettings="'wght' 900"
                            containerRef={containerRef}
                            radius={200}
                            falloff="gaussian"
                            className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] text-center xl:text-left text-primary dark:text-blue-400 leading-[1.1] block"
                        />
                    </div>
                    <span className="text-[16px] sm:text-[18px] md:text-[20px] urbanist-regular text-center xl:text-left max-w-[780px] text-[#576275] dark:text-blue-100/80">Great partnerships make great products for customers. We welcome your interest in partnering
                        with us.</span>
                    <div className='flex flex-row gap-2 xl:gap-8 justify-center xl:justify-start'>
                        {/* <div 
                            className="text-white px-10 py-3 text-center rounded-[12.27px] cursor-pointer border border-primary hover:text-primary transition-all duration-300"
                            style={{
                                background: 'linear-gradient(to right, #2A3E9C, #1478C7)',
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = 'white';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'linear-gradient(to right, #2A3E9C, #1478C7)';
                            }}
                        >
                            Test
                        </div> */}
                        <Button 
                            background="linear-gradient(to right, #2A3E9C, #1478C7)" 
                            color="#ffffff" 
                            buttontext="Become a Partner" 
                            to="/contactus"
                            hoverBackground="#ffffff"
                            hoverColor="#235BB2"
                            hoverBorder="2px solid #235BB2"
                        />
                        <Button 
                            background="#ffffff" 
                            color="#235BB2" 
                            buttontext="Contact Team" 
                            border="2px solid #235BB2" 
                            to="/contactus"
                            hoverBackground="linear-gradient(to right, #2A3E9C, #1478C7)"
                            hoverColor="#ffffff"
                            hoverBorder="2px solid #ffffff"
                        />
                    </div>
                </ScrollFadeIn>
                <ScrollFadeIn className="w-8/9 xl:w-2/5 flex justify-end" delay={0.15}>
                    <div className="relative xl:w-[540px] xl:h-[685px] rounded-xl overflow-hidden flex items-center justify-center hover:scale-105 transition-all duration-300">
                        <img
                            src={partnershipphoto}
                            className="w-full h-full object-cover rounded-4xl"
                            alt=""
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none ">
                            <div
                                className="border border-white/80 hover:bg-white/10 hover:scale-110 rounded-4xl flex flex-col justify-end transition-all duration-300 group pointer-events-auto"
                                style={{
                                    width: "85%",
                                    height: "85%",
                                    boxSizing: "border-box",
                                }}
                            >
                                <div className="h-1/4 backdrop-blur-xl rounded-b-4xl flex flex-col gap-2 p-5 pt-10 justify-center">
                                    <div className="flex items-center gap-2">
                                        <div className="h-3 w-3 bg-white rounded-full"></div>
                                        <span className="text-white urbanist-regular text-[12px] sm:text-[14px] md:text-[16px]">Growth Rate</span>
                                    </div>
                                    <div className="flex items-center gap-5 justify-between">
                                        <div className="flex items-center gap-5">
                                        <span className="text-white urbanist-bold text-[20px] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[40px]">Increases</span>
                                        <span className="text-white urbanist-regular bg-white/20 px-2 py-1 rounded-4xl text-[12px] sm:text-[14px] md:text-[16px]">+50%</span>
                                        </div>
                                        <div className="h-[106px] w-[206px]">
                                            <img src={linegraphline} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollFadeIn>
            </div>
        </div>
    )
}

export default Partnership;