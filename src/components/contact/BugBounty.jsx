import { motion } from 'framer-motion';
import TranslatableText from '../TranslatableText';

const BugBounty = ({ scrollToInvestorsContact }) => {
  return (
    <div className="w-full justify-center items-center flex flex-col mb-5 lg:px-8 min-h-[200px]">
      <motion.h2
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.2 }}
        transition={{ duration: 0.2 }}
        className="px-8 text-[30px] md:text-[38px] font-sans leading-[60px] font-[700] text-transparent bg-clip-text bg-gradient-to-r from-primary-dark to-primary md:mb-5 lg:mb-8"
      >
        <TranslatableText translateKey="bugbounty.title">Bug Bounty</TranslatableText>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.2 }}
        transition={{ duration: 0.3 }}
        className="max-w-[1900px] mx-auto flex flex-col xl:flex-row px-4 sm:px-8 md:px-20 py-6 md:py-10"
      >
        <div className="flex-1 flex items-center lg:justify-center mb-6 md:mb-0">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md h-64 bg-gradient-to-br from-[#FF6B35] to-[#FF8E53] rounded-2xl flex items-center justify-center"
          >
            <div className="text-center text-white">
              <h4 className="text-2xl font-bold mb-2"><TranslatableText translateKey="bugbounty.card_title">Bug Bounty</TranslatableText></h4>
              <p className="text-sm opacity-90"><TranslatableText translateKey="bugbounty.card_subtitle">Help us improve security</TranslatableText></p>
            </div>
          </motion.div>
        </div>

        <div className="flex-1 p-2 sm:p-4">
          <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-primary-dark to-primary text-left mb-4 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold">
            <TranslatableText translateKey="bugbounty.security_first_title">Security First Approach</TranslatableText>
          </h3>
          <p className="text-gray-500 text-left mb-2 sm:mb-6 font-sans text-sm sm:text-base">
            <TranslatableText translateKey="bugbounty.security_first_desc">We believe in the power of community-driven security. Our bug bounty program rewards security researchers who help us identify and fix vulnerabilities in our platform.</TranslatableText>
          </p>

          <div className="space-y-4 sm:space-y-6">
            <motion.div
              className="p-3 sm:p-6 rounded-2xl bg-[#FFF5F0] hover:shadow-md duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start sm:items-center w-full">
                <div className="text-white font-bold p-3 sm:p-4 px-4 sm:px-6 rounded-2xl mr-3 sm:mr-4 bg-[#FF6B35]">
                  $
                </div>
                <div className="flex-1">
                  <p className="text-[#0F2137] font-sans font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
                    <TranslatableText translateKey="bugbounty.rewards_title">Rewards Program</TranslatableText>
                  </p>
                  <p className="text-[#686868] font-sans text-xs sm:text-sm">
                    <TranslatableText translateKey="bugbounty.rewards_desc">Earn rewards ranging from $100 to $10,000 for valid security vulnerabilities.</TranslatableText>
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="p-3 sm:p-6 rounded-2xl bg-[#F0F7FF] hover:shadow-md duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="flex items-start sm:items-center w-full">
                <div className="text-white font-bold p-3 sm:p-4 px-4 sm:px-6 rounded-2xl mr-3 sm:mr-4 bg-[#48A7FF]">
                  ⚡
                </div>
                <div className="flex-1">
                  <p className="text-[#0F2137] font-sans font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
                    <TranslatableText translateKey="bugbounty.response_title">Quick Response</TranslatableText>
                  </p>
                  <p className="text-[#686868] font-sans text-xs sm:text-sm">
                    <TranslatableText translateKey="bugbounty.response_desc">Our security team responds to submissions within 24-48 hours.</TranslatableText>
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="p-3 sm:p-6 rounded-2xl bg-[#F5F0FF] hover:shadow-md duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="flex items-start sm:items-center w-full">
                <div className="text-white font-bold p-3 sm:p-4 px-4 sm:px-6 rounded-2xl mr-3 sm:mr-4 bg-[#7531CC]">
                  🛡️
                </div>
                <div className="flex-1">
                  <p className="text-[#0F2137] font-sans font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
                    <TranslatableText translateKey="bugbounty.disclosure_title">Responsible Disclosure</TranslatableText>
                  </p>
                  <p className="text-[#686868] font-sans text-xs sm:text-sm">
                    <TranslatableText translateKey="bugbounty.disclosure_desc">We follow responsible disclosure practices and credit researchers.</TranslatableText>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="mt-8 p-6 bg-gradient-to-r from-[#FFF5F0] to-[#FFF0F0] rounded-2xl border-l-4 border-[#FF6B35]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.4 }}
          >
            <h4 className="text-xl font-bold text-[#0F2137] mb-3"><TranslatableText translateKey="bugbounty.participate_title">How to Participate</TranslatableText></h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• <TranslatableText translateKey="bugbounty.participate_1">Submit detailed reports with proof-of-concept</TranslatableText></p>
              <p>• <TranslatableText translateKey="bugbounty.participate_2">Include steps to reproduce the vulnerability</TranslatableText></p>
              <p>• <TranslatableText translateKey="bugbounty.participate_3">Provide impact assessment and potential fixes</TranslatableText></p>
              <p>• <TranslatableText translateKey="bugbounty.participate_4">Follow our responsible disclosure guidelines</TranslatableText></p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToInvestorsContact}
              className="mt-4 px-6 py-2 bg-[#FF6B35] text-white rounded-lg font-medium hover:bg-[#E55A2B] transition-colors"
            >
              <TranslatableText translateKey="bugbounty.submit_btn">Submit Report</TranslatableText>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default BugBounty;

