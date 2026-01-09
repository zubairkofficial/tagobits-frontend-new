import { usetagocashcontent } from '../../hooks/usetagocashcontent';
import StarBorder from '../StarBorder';
import NexusOrb from './NexusOrb';

const Partners = () => {
    const { getFieldValue } = usetagocashcontent('partnership');
    const sectionTitle = getFieldValue("sectionTitle") || "Great Partnership Builds Great Services for Users.";

    return (
        <div className="w-full justify-center items-center flex flex-col mb-0 lg:px-8 mx-auto min-h-[200px] py-10 pt-10 bg-white transition-colors duration-300">
            <div className="w-full max-w-[1000px] px-4">
                <div className="border-[5px] border-[#1952A8] rounded-[30px] overflow-hidden">
                    <h2 className="text-[26px] md:text-[34px] text-center font-sans font-[700] text-[#14316A] p-6 lg:p-8">
                        {sectionTitle}
                    </h2>
                </div>
            </div>
            <NexusOrb />
        </div>
    );
};

export default Partners;
