import { usetagocashcontent } from '../../hooks/usetagocashcontent';
import { motion } from 'framer-motion';
import NexusOrb from './NexusOrb';

const Partners = () => {
    const { getFieldValue } = usetagocashcontent('partnership');

    return (
        <div className="w-full justify-center items-center flex flex-col mb-5 lg:px-8 mx-auto min-h-[200px] py-[20px] pt-20 ">
            <motion.h2
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.2 }}
                transition={{ duration: 0.2 }}
                className="lg:px-8 text-[26px] md:text-[34px] text-center font-sans font-[700] text-transparent bg-clip-text bg-gradient-to-r from-primary-dark to-primary p-5 lg:p-7 border-4 border-footer rounded-4xl hover:border-primary active:border-primary w-fit mx-5 lg:mx-0"
            >
                {getFieldValue("sectionTitle") || "Great Partnership Builds Great Service"}
            </motion.h2>
            <NexusOrb />
        </div>
    );
};

export default Partners;
