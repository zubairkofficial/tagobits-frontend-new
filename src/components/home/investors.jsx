import { motion } from "framer-motion"
import hero from "../../assets/home/investors/hero.png";
import adidas from "../../assets/home/investors/adidas.png";
import myntra from "../../assets/home/investors/myntra.png";
import hm from "../../assets/home/investors/hm.png";
import tata from "../../assets/home/investors/tata.png";
import Button from "../../components/button";

const Investors = () => {
    const logos = [
        { src: adidas, alt: "Adidas" },
        { src: hero, alt: "Hero" },
        { src: myntra, alt: "Myntra" },
        { src: hm, alt: "H&M" },
        { src: tata, alt: "Tata" },
        { src: hero, alt: "Hero" } // Adding 6th logo to match 6 circles
    ];

    return (
        <div className="flex flex-col items-center w-full px-5 lg:px-30 xl:px-30 bg-white dark:bg-[#111827] pt-0 pb-10 md:pb-12 lg:pb-16 transition-colors duration-300">
            {/* Heading */}
            <motion.h2
                className="urbanist-bold text-center text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] xl:text-[44px] text-[#111827] dark:text-white leading-[1.2] mb-6 md:mb-8 max-w-4xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            >
                TagoCash and its <span className="text-primary dark:text-[#60A5FA]">affiliated entities</span> are still raising funds to expand
            </motion.h2>

            {/* Six Circles with Logos */}
            <motion.div
                className="grid grid-cols-3 md:flex md:flex-wrap md:justify-center items-center gap-4 md:gap-6 lg:gap-8 mb-6 md:mb-8 max-w-md md:max-w-none mx-auto"
            >
                {logos.map((logo, index) => (
                    <motion.div
                        key={index}
                        className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-[#D9D9D9] flex items-center justify-center mx-auto"
                        initial={{ opacity: 0, x: -100, y: 60 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{ once: false, margin: "-50px" }}
                        transition={{
                            duration: 0.6,
                            delay: 0.2 + index * 0.12,
                            ease: "easeOut"
                        }}
                    >
                        <img
                            src={logo.src}
                            alt={logo.alt}
                            className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain"
                        />
                    </motion.div>
                ))}
            </motion.div>

            {/* Sub-heading */}
            <motion.p
                className="urbanist-regular text-center text-[16px] sm:text-[18px] md:text-[20px] text-[#111827] dark:text-white mb-6 md:mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                Interested Entities Contact us
            </motion.p>

            {/* Contact Us Button */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.5 }}
            >
                <Button
                    background="linear-gradient(to right, #2A3E9C, #1478C7)"
                    color="#ffffff"
                    buttontext="Contact Us"
                    to="/contactus"
                    hoverBackground="white"
                    hoverColor="#235BB2"
                    hoverBorder="2px solid #235BB2"
                />
            </motion.div>
        </div>
    );
};

export default Investors;