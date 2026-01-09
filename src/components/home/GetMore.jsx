import React from 'react';
import { motion } from 'framer-motion';
import { FaUniversity, FaStore, FaGlobeAmericas, FaRocket } from "react-icons/fa";

const GetMore = () => {
    // Static content as requested
    const features = [
        {
            icon: <FaUniversity className="w-8 h-8 text-white" />,
            title: "Deposit & Withdrawal to and from Bank, Mobile Money and Digital Wallet",
            description: "Add or withdraw funds to your TagoCash wallet via bank , debit card, mobile money or digital wallets.",
            gradient: "from-[#1A69BC] to-[#29419F]"
        },
        {
            icon: <FaStore className="w-8 h-8 text-white" />,
            title: "Payments & Local Cash Withdrawal",
            description: "Embedded QuickPay & TagoPat for store & online payments at more than 36,000 merchants & local stores.",
            gradient: "from-primary-dark to-primary"
        },
        {
            icon: <FaRocket className="w-8 h-8 text-white" />,
            title: "TagoMe, GetPaid, QuickCollect & Raise Funds are Next Generation of Stablecoin Instant Global Payment Tools",
            description: "TagoCash is about real-life use cases - Whatever you want to do with money is made easier, simpler, faster and cheaper with TagoCash.",
            gradient: "from-[#29419F] to-[#1A69BC]"
        },
        {
            icon: <FaGlobeAmericas className="w-8 h-8 text-white" />,
            title: "Borderless & Global Availability",
            description: "TagoCash operates without financial border barriers. It is natively blockchain and borderless.",
            gradient: "from-primary to-primary-dark"
        }
    ];

    return (
        <div className="flex justify-center" style={{ backgroundColor: '#FBFDFF' }}>
            <div className="max-w-[1900px] w-full px-4 lg:px-20 pb-16">
                <div className="w-full max-w-[800px] mx-auto">
                    <motion.h2
                        className="text-center font-bold text-2xl sm:text-3xl md:text-4xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-primary-dark to-primary leading-relaxed"
                        initial={{ y: 50 }}
                        whileInView={{ y: 0 }}
                        viewport={{ amount: 0.2 }}
                        transition={{ duration: 0.3 }}
                        style={{ WebkitBackgroundClip: "text" }}
                    >
                        Wherever you go, Tago
                    </motion.h2>
                    <motion.h2
                        className="text-center font-bold text-2xl sm:text-3xl md:text-4xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-primary-dark to-primary pb-4 lg:pb-0 leading-relaxed"
                        initial={{ y: 100 }}
                        whileInView={{ y: 0 }}
                        viewport={{ amount: 0.2 }}
                        transition={{ duration: 0.3 }}
                        style={{ WebkitBackgroundClip: "text" }}
                    >
                        Get More with TagoCash
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6 lg:mt-[30px] w-full">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className={`bg-gradient-to-r ${feature.gradient} p-6 rounded-2xl hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col items-start text-left`}
                            initial={{ y: 100 }}
                            whileInView={{ y: 0 }}
                            viewport={{ amount: 0.2 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-white text-xl font-semibold mb-3">{feature.title}</h3>
                            <p className="text-white/90 font-light text-lg">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default GetMore;
