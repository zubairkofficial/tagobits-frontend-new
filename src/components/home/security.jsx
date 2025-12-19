import { motion } from "framer-motion"
import listingarrow from "../../assets/home/security/listingarrow.png"

const Security = () => {
    return (
        <div className="max-w-[1980px] mx-auto w-full top-5 my-10 lg:my-20 px-0">
            <motion.div
                className="w-full rounded-3xl bg-[#C4DEFF] dark:bg-[#1D314E] shadow-lg shadow-black/10 px-6 md:px-10 lg:px-14 py-8 md:py-12 lg:py-16 flex flex-col md:flex-row items-center gap-10 md:gap-14"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-150px" }}
                transition={{ 
                    duration: 0.7, 
                    ease: "easeOut",
                    opacity: { duration: 0.6 },
                    y: { duration: 0.7, ease: "easeOut" }
                }}
            >
                {/* Left text column */}
                <motion.div 
                    className="flex-1 flex flex-col gap-8"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {/* Block 1 */}
                    <motion.div 
                        className="flex flex-col gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h2 className="urbanist-bold text-[26px] sm:text-[32px] md:text-[40px] lg:text-[48px] text-[#111827] dark:text-white leading-[1.1]">
                            <div>Double-Layer Biometric</div>
                            <div>Security</div>
                        </h2>
                        <p className="urbanist-regular text-[16px] sm:text-[18px] md:text-[20px] text-[#1F2933] dark:text-gray-200 max-w-xl">
                            For businesses and high valued users, the TagoDenty Verification (TDV) provides double layers of
                            encrypted biometric security and verification for all transactions.
                        </p>
                    </motion.div>

                    {/* Block 2 */}
                    <motion.div 
                        className="flex flex-col gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <h3 className="urbanist-bold text-[26px] sm:text-[32px] md:text-[40px] lg:text-[48px] text-[#111827] dark:text-white leading-[1.1]">
                            <div>Double-Layer Biometric</div>
                            <div>Security</div>
                        </h3>
                        <div className="flex flex-col gap-3 urbanist-regular text-[15px] sm:text-[16px] md:text-[18px] text-[#1F2933] dark:text-gray-100">
                            <span className="flex gap-3 items-start">
                                <img src={listingarrow} className="mt-1 h-4 w-4 flex-shrink-0" />
                                <span>Sub-second settlement from point A to point B.</span>
                            </span>
                            <span className="flex gap-3 items-start">
                                <img src={listingarrow} className="mt-1 h-4 w-4 flex-shrink-0" />
                                <span>Receiver-side biometric authentication ensures the designated person or entity is verified.</span>
                            </span>
                            <span className="flex gap-3 items-start">
                                <img src={listingarrow} className="mt-1 h-4 w-4 flex-shrink-0" />
                                <span>Beyond KYC and AML — powered by TagoDenty Verification (TDV).</span>
                            </span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right GIF column */}
                <motion.div 
                    className="flex-1 flex justify-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                >
                    <div className="w-full max-w-[420px] rounded-2xl overflow-hidden shadow-xl shadow-black/30">
                        <img
                            src="/1b42b3fe385b30bcb6ef88e224b56959006fe8c1.gif"
                            alt="Face recognition is under way"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default Security;