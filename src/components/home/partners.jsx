import { useRef } from 'react';
import { usetagocashcontent } from '../../hooks/usetagocashcontent';
import { motion } from 'framer-motion';
import VariableProximity from '../VariableProximity';
import StarBorder from '../StarBorder';
import NexusOrb from './NexusOrb';

const Partners = () => {
    const { getFieldValue } = usetagocashcontent('partnership');
    const containerRef = useRef(null);
    const sectionTitle = getFieldValue("sectionTitle") || "Great Partnership Builds Great Services for Users.";

    return (
        <div ref={containerRef} className="w-full justify-center items-center flex flex-col mb-5 lg:px-8 mx-auto min-h-[200px] py-[20px] pt-20 bg-white dark:bg-gray-900 transition-colors duration-300">
            <StarBorder
                color="#0ac8ff"
                thickness={3}
                className="w-full max-w-[1200px] px-4"
                speed="7s"
            >
                <motion.h2
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.2 }}
                    transition={{ duration: 0.3 }}
                    className="text-[26px] md:text-[34px] text-center font-sans font-[700] text-transparent bg-clip-text bg-gradient-to-r from-primary-dark to-primary dark:from-blue-300 dark:to-cyan-400 p-6 lg:p-8 rounded-[20px]"
                >
                    <VariableProximity
                        label={sectionTitle}
                        fromFontVariationSettings="'wght' 650"
                        toFontVariationSettings="'wght' 900"
                        containerRef={containerRef}
                        radius={220}
                        falloff="gaussian"
                        className="block"
                    />
                </motion.h2>
            </StarBorder>
            <NexusOrb />
        </div>
    );
};

export default Partners;
