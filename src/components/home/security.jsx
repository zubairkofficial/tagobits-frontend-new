import thumbprint from "../../assets/home/security/thumbprint.png"
import face from "../../assets/home/security/facestructure.png"
import listingarrow from "../../assets/home/security/listingarrow.png"
import Button from "../../components/button"
import { IoCubeOutline } from "react-icons/io5";

const Security = () => {
    return (
        <div className="flex flex-col items-center my-40 w-full lg:px-30 xl:px-30 bg-primary py-30">
            <div className="flex justify-center w-full py-10">
                <div className="w-[847px] flex flex-col items-center text-center px-2 lg:px-10">
                    <span className="border border-[#FFFFFF33] p-2 rounded-4xl text-white">Tago Security</span>
                    <span className="urbanist-bold text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] text-white">Security Beyond Compliance</span>
                    <span className="urbanist-medium text-[16px] sm:text-[18px] md:text-[20px] text-white">TagoDenty Verification (TDV) ensures only the right person receives the funds — going beyond KYC and AML.</span>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-0 lg:justify-between pt-20 lg:pt-40 md:px-10 xl:px-20">
                <div className="flex flex-col px-10 lg:px-0 lg:w-1/2 text-white">
                    <span className="urbanist-bold text-center lg:text-left pb-10 lg:pb-0 text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] xl:text-[64px] leading-[1.1]">
                        Double-Layer Biometric Security
                    </span>
                    <span className="urbanist-regular text-center lg:text-left pb-10 text-[16px] sm:text-[18px] md:text-[20px]">
                        For businesses and high valued users, the TagoDenty Verification (TDV) provides double layers
                        of encrypted biometric security and verification for all transactions.
                    </span>
                </div>
                <div className="">
                    <img src={thumbprint} />
                </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-between items-center pt-40 md:px-10 xl:px-20 gap-20 lg:gap-50">
                <div className="">
                    <img src={face} />
                </div>
                <div className="flex flex-col px-10 lg:px-0 lg:w-1/2 text-white">
                    <span className="urbanist-bold text-center lg:text-left pb-10 text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] xl:text-[64px]">
                        Double-Layer Biometric Security
                    </span>
                    <div className="flex flex-col gap-10 urbanist-regular text-[16px] sm:text-[18px] md:text-[20px] py-10">
                        <span className="flex gap-6 items-center">
                            <img src={listingarrow} className="h-fit" />
                            Sub-second settlement from point A to point B.
                        </span>
                        <span className="flex gap-6 items-center">
                            <img src={listingarrow} className="h-fit" />
                            Receiver-side biometric authentication ensures the designated person or entity is verified.                        </span>
                        <span className="flex gap-6 items-center">
                            <img src={listingarrow} className="h-fit" />
                            Beyond KYC and AML — powered by TagoDenty Verification (TDV).
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex justify-center pt-20">
                <Button 
                    background="#ffffff" 
                    color="#235BB2" 
                    buttontext="Learn More About Security" 
                    hoverBackground="linear-gradient(to right, #2A3E9C, #1478C7)"
                    hoverColor="#ffffff"
                    hoverBorder="2px solid #ffffff"
                />
            </div>
        </div>
    )
}

export default Security;