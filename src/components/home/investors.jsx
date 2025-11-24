import hero from "../../assets/home/investors/hero.png";
import adidas from "../../assets/home/investors/adidas.png";
import myntra from "../../assets/home/investors/myntra.png";
import hm from "../../assets/home/investors/hm.png";
import tata from "../../assets/home/investors/tata.png";
import Button from "../../components/button";
import ScrollFadeIn from "../common/ScrollFadeIn";
const Investors = () => {
    return <div className="flex flex-col items-center w-full px-5 lg:px-30 xl:px-30 bg-gradient-to-b from-[#2A3E9C] to-[#1478C7] py-10">
        <ScrollFadeIn className="relative flex justify-center items-end w-full max-w-4xl h-48 md:h-64 mx-auto" amount={0.4}>
            {/* Semi-circle background behind logos */}
            <div
                className="absolute bg-gradient-to-b from-white/30 via-white/20 to-white/0 backdrop-blur-sm"
                 style={{
                     overflow: 'hidden',
                     width: '100%',
                     height: window.innerWidth >= 768 ? '200px' : '120px', // 768px is the md breakpoint in Tailwind
                     clipPath: window.innerWidth >= 768
                         ? 'ellipse(50% 70% at 50% 120%)'
                         : 'ellipse(40% 60% at 50% 110%)',
                     top: window.innerWidth >= 768 ? '0%' : '10%',
                     left: '0%',
                     transform: 'none',
                     zIndex: 1
                 }}
            >
            </div>

            {/* <div className="absolute bg-gradient-to-b from-white/30 via-white/20 to-white/0 backdrop-blur-sm" 
                 style={{
                    overflow: 'hidden',
                     width: '100%',
                     height: '200px',
                     clipPath: 'ellipse(50% 50% at 50% 100%)',
                     top: '0%',
                     left: '0%',
                     transform: 'none',
                     zIndex: 1
                 }}>
            </div> */}

            {/* Leftmost logo (smallest, lowest) */}
            <div className="absolute flex justify-center scale-50 md:scale-100 items-center border-white border-2 bg-white/30 top-[40%] hover:top-[35%] left-[0%] w-[100px] h-[100px] rounded-full hover:scale-105 transition-all duration-300" style={{ zIndex: 10 }}>
                <img
                    src={adidas}
                    alt="Adidas"
                    className="w-[58px] h-[58px] "
                    style={{
                        zIndex: 10,
                    }}
                />
            </div>
            {/* Left-mid logo (smaller, a bit higher) */}
            <div className="absolute flex justify-center scale-50 md:scale-100 items-center border-white border-2 bg-white/30 top-[20%] hover:top-[15%] left-[20%] w-[100px] h-[100px] rounded-full hover:scale-105 transition-all duration-300" style={{ zIndex: 20 }}>
                <img
                    src={hero}
                    alt="Hero"
                    className="w-[35px] h-[50px]"
                    style={{
                        zIndex: 20,
                    }}
                />
            </div>
            {/* Center logo (largest, highest) */}
            <div className="absolute flex justify-center scale-50 md:scale-100 items-center border-white border-2 bg-white/30 top-[0%] hover:top-[-5%] w-[120px] h-[120px] rounded-full hover:scale-105 transition-all duration-300" style={{ zIndex: 30 }}>
                <img
                    src={myntra}
                    alt="Myntra"
                    className="w-[48px] h-[40px]"
                    style={{
                        zIndex: 30,
                    }}
                />
            </div>
            {/* Right-mid logo (smaller, a bit higher) */}
            <div className="absolute flex justify-center scale-50 md:scale-100 items-center border-white border-2 bg-white/30 right-[20%] top-[20%] hover:top-[15%] w-[100px] h-[100px] rounded-full hover:scale-105 transition-all duration-300" style={{ zIndex: 20 }}>
                <img
                    src={hm}
                    alt="H&M"
                    className="w-[62px] h-[62px]"
                    style={{
                        zIndex: 20,
                    }}
                />
            </div>
            {/* Rightmost logo (smallest, lowest) */}
            <div className="absolute flex justify-center scale-50 md:scale-100 items-center border-white border-2 bg-white/30 right-[0%] top-[40%] hover:top-[35%] w-[100px] h-[100px] rounded-full hover:scale-105 transition-all duration-300" style={{ zIndex: 10 }}>
                <img
                    src={tata}
                    alt="Tata"
                    className="w-[43px] h-[43px]"
                    style={{
                        zIndex: 10,
                    }}
                />
            </div>
        </ScrollFadeIn>
        <ScrollFadeIn className="flex flex-col items-center max-w-[858px] gap-5" delay={0.2}>
            <span className="urbanist-regular text-center border text-white border-gray-100/20 py-2 px-4 rounded-4xl w-fit my-4 lg:my-0">Investors</span>
            <span className="urbanist-bold text-center text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] xl:text-[56px] text-white">Tagobits And Its Affiliated Entities Are Still Raising Funds To Expand.</span>
            <span className="urbanist-medium text-center text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] text-white">Interested entities should Contact us here.</span>
            <Button 
                background="#ffffff" 
                color="#235BB2" 
                buttontext="Contact Us" 
                to="/contactus"
                border="2px solid #ffffff"
                hoverBackground="linear-gradient(to right, #2A3E9C, #1478C7)"
                hoverColor="#ffffff"
                hoverBorder="2px solid #ffffff"
            />
        </ScrollFadeIn>
    </div>;
};

export default Investors;