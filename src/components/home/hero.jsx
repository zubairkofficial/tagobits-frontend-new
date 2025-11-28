//components
import Button from '../button'
import LiquidEther from '../LiquidEther'
import TextType from '../TextType'
import { useTheme } from '../../context/ThemeContext'

// icons
import { RiBankLine } from "react-icons/ri";
import { GiCheckedShield } from "react-icons/gi";
import { MdOutlineRealEstateAgent } from "react-icons/md";

const Hero = () => {
    const { theme } = useTheme();
    return (
        <div className='relative overflow-x-hidden overflow-y-visible bg-white dark:bg-transparent transition-colors duration-300 -mt-3 w-full'>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 dark:hidden">
                <div className="w-[800px] h-[800px] bg-[radial-gradient(circle,_rgba(59,130,246,0.2)_0%,_transparent_70%)] rounded-full"></div>
            </div>
            <div className="absolute inset-0 hidden dark:block z-0">
                <LiquidEther
                    className="w-full h-full"
                    colors={['#218DCD', '#2A63AA', '#2E388E']}
                    autoDemo={true}
                    autoSpeed={0.35}
                    autoIntensity={2}
                />
            </div>
            <div className="relative z-10 flex flex-col items-center sm:gap-8 md:gap-5 lg:gap-15 px-4 sm:px-6 md:px-10 sm:pt-5 pt-5 w-full max-w-full">
                <div className="relative w-full max-w-[200px] h-[100px] sm:h-[150px] md:h-[150px] flex items-center justify-center mb-2 sm:mb-4">
                    <img 
                        src="/Comp1-ezgif.com-gif-to-webp-converter.webp" 
                        alt="Animation" 
                        className="w-full h-full object-contain"
                    />
                </div>
                <h1 className={`text-[40px] sm:text-[52px] md:text-[60px] lg:text-[68px] xl:text-[72px] roboto-medium text-center max-w-[872px] leading-[1.1] ${theme === 'dark' ? 'text-white' : 'text-primary'}`}>
                    The Digital Money for{' '}
                    <TextType
                        as="span"
                        text={[
                            'Borderless payments',
                            'Global Transactions',
                            'Payment Solutions'
                        ]}
                        typingSpeed={55}
                        deletingSpeed={35}
                        pauseDuration={1500}
                        showCursor={true}
                        cursorClassName={theme === 'dark' ? 'text-white' : 'text-primary'}
                        className="inline-block whitespace-nowrap align-bottom"
                        style={{ minWidth: '22ch', display: 'inline-block' }}
                        renderContent={(currentText, { fullText }) => {
                            const spaceIndex = fullText.indexOf(' ');
                            const firstWordColor = theme === 'dark' ? 'text-[#60A5FA]' : 'text-black';
                            const restColor = theme === 'dark' ? 'text-white' : 'text-primary';
                            
                            if (spaceIndex === -1) {
                                return <span className={firstWordColor}>{currentText}</span>;
                            }
                            const firstWordEnd = spaceIndex;
                            const firstWordLength = Math.min(currentText.length, firstWordEnd);
                            const firstPart = currentText.slice(0, firstWordLength);
                            const restPart = currentText.slice(firstWordLength);
                            return (
                                <>
                                    <span className={firstWordColor}>{firstPart}</span>
                                    <span className={restColor}>{restPart}</span>
                                </>
                            );
                        }}
                    />
                </h1>
                <p className="text-[16px] sm:text-[18px] md:text-[20px] urbanist-regular text-center max-w-[780px] text-[#576275] dark:text-gray-400">
                    The TagoBits platform enables payment settlement in seconds and at one tenth of the cost of traditional fiat payments.
                </p>
                <div>
                    <div className="flex flex-col md:flex-row gap-15 md:gap-20">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-2 justify-center">
                                <span className="bg-primary dark:bg-blue-500 text-white w-[25px] h-[25px] rounded-full flex justify-center items-center"> <RiBankLine size={18} /> </span>
                                <span className="urbanist-bold text-[14px] sm:text-[16px] text-gray-900 dark:text-white">434,343,000</span>
                            </div>
                            <span className="urbanist-regular text-center text-[12px] sm:text-[14px] text-[#576275] dark:text-gray-400">TagoCash Circulation</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-2 justify-center">
                                <span className="text-primary dark:text-blue-400"> <GiCheckedShield size={25} /> </span>
                                <span className="urbanist-bold text-[14px] sm:text-[16px] dark:text-white">100%</span>
                            </div>
                            <span className="urbanist-regular text-center text-[12px] sm:text-[14px] text-[#576275] dark:text-gray-400">TagoCash Circulation</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-2 justify-center">
                                <span className="text-primary dark:text-blue-400"> <MdOutlineRealEstateAgent size={25} /> </span>
                                <span className="urbanist-bold text-[14px] sm:text-[16px] dark:text-white">$450,000,000</span>
                            </div>
                            <span className="urbanist-regular text-center text-[12px] sm:text-[14px] text-[#576275] dark:text-gray-400">TagoCash Circulation</span>
                        </div>
                    </div>
                </div>
                <div className='flex flex-row gap-8'>
                    <Button 
                        background="linear-gradient(to right, #2A3E9C, #1478C7)" 
                        color="#ffffff" 
                        buttontext="Contact Us" 
                        to="/contactus"
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