import { motion } from "framer-motion"
import thumbprint from "../../assets/home/security/thumbprint.png"
import face from "../../assets/home/security/facestructure.png"
import listingarrow from "../../assets/home/security/listingarrow.png"
import Button from "../../components/button"

const Security = () => {
    return (
        <div className="flex flex-col items-center my-40 w-full lg:px-30 xl:px-30 bg-primary overflow-hidden">
            <motion.div 
                className="flex justify-center w-full"
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.6 }}
            >
                <div className="w-[847px] flex flex-col items-center text-center px-2 lg:px-10 ">
                    <div className="relative w-full max-w-[400px] h-[200px] sm:h-[250px] md:h-[300px] flex items-center justify-center mb-4 md:mb-6">
                        <img 
                            src="/ezgif.com-video-to-gif-converter (6).gif" 
                            alt="Security Animation" 
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <span className="border border-[#FFFFFF33] p-2 rounded-4xl text-white">Tago Security</span>
                    <span className="urbanist-bold text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] text-white">Security Beyond Compliance</span>
                    <span className="urbanist-medium text-[16px] sm:text-[18px] md:text-[20px] text-white">TagoDenty Verification (TDV) ensures only the right person receives the funds — going beyond KYC and AML.</span>
                </div>
            </motion.div>
            <motion.div 
                className="flex flex-col lg:flex-row items-center lg:gap-0 lg:justify-between pt-10 md:pt-15 lg:pt-25 md:px-10 xl:px-20"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.6 }}
            >
                <motion.div 
                    className="flex flex-col px-10 lg:px-0 lg:w-1/2 text-white"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="urbanist-bold text-center lg:text-left pb-10 lg:pb-0 text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] xl:text-[64px] leading-[1.1]">
                        <div>Double-Layer</div>
                        <div>Biometric</div>
                        <div>Security</div>
                    </div>
                    <span className="urbanist-regular text-center lg:text-left pb-10 text-[16px] sm:text-[18px] md:text-[20px]">
                        For businesses and high valued users, the TagoDenty Verification (TDV) provides double layers
                        of encrypted biometric security and verification for all transactions.
                    </span>
                </motion.div>
                <motion.div 
                    className=""
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <img src={thumbprint} alt="Thumbprint" />
                </motion.div>
            </motion.div>
            <motion.div 
                className="flex flex-col lg:flex-row items-center lg:gap-0 lg:justify-between pt-20 px-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.6 }}
            >
                <motion.div 
                    className=""
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <img src={face} className="w-full object-contain" alt="Face Structure" />
                </motion.div>
                <motion.div 
                    className="flex flex-col px-10 lg:px-0 lg:w-1/2 text-white"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <div className="urbanist-bold text-center lg:text-left pb-10 px-10 lg:px-0 lg:pb-0 text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] xl:text-[64px] leading-[1.1]">
                        <div>Double-Layer</div>
                        <div>Biometric</div>
                        <div>Security</div>
                    </div>
                    <div className="flex flex-col gap-10 urbanist-regular text-center lg:text-left text-[16px] sm:text-[18px] md:text-[20px]">
                        <span className="flex gap-6 items-center justify-center lg:justify-start">
                            <img src={listingarrow} className="h-fit" />
                            Sub-second settlement from point A to point B.
                        </span>
                        <span className="flex gap-6 items-center justify-center lg:justify-start">
                            <img src={listingarrow} className="h-fit" />
                            Receiver-side biometric authentication ensures the designated person or entity is verified.
                        </span>
                        <span className="flex gap-6 items-center justify-center lg:justify-start">
                            <img src={listingarrow} className="h-fit" />
                            Beyond KYC and AML — powered by TagoDenty Verification (TDV).
                        </span>
                    </div>
                </motion.div>
            </motion.div>
            <motion.div 
                className="flex justify-center py-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <Button 
                    background="#ffffff" 
                    color="#235BB2" 
                    buttontext="Learn More About Security" 
                    hoverBackground="linear-gradient(to right, #2A3E9C, #1478C7)"
                    hoverColor="#ffffff"
                    hoverBorder="2px solid #ffffff"
                />
            </motion.div>
        </div>
    )
}

export default Security;