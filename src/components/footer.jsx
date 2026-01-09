import { useState } from 'react';
import footerLogo from '../assets/footerlogo.svg';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTelegram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";
import tagocashaxiosinstance from '../utils/tagocashaxiosinstance';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { usetagocashcontent } from '../hooks/usetagocashcontent';

const Footer = () => {
  const [email, setEmail] = useState('');
  const { getFieldValue, loading } = usetagocashcontent('footer');

  if (loading) {
    return <div>Loading...</div>;
  }

  const subscribeEmail = async (email) => {
    try {
      const response = await tagocashaxiosinstance.post('/subscribe-email', { email });
      console.log("Response is:", response.data);
      if (response.data.success) {
        toast.success('Email subscribed successfully');
        setEmail('');
      } else {
        toast.error(response.data.detail);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(error.response.data.detail || 'An error occurred');
        }
      }
      console.error(error);
    }
  };

  return (
    <footer className="bg-gradient-to-b to-footer from-footer-primary text-white py-6 px-4 text-center w-full lg:px-20 -mt-20 relative z-50">
      <h2 className="max-w-2xl mx-auto mb-4 tracking-widest text-base sm:text-lg" style={{ wordSpacing: '4px' }}>
        {getFieldValue('sectionTitle')}
      </h2>
      <div className="flex flex-wrap justify-center gap-3 mb-4 w-full">
        <a href="https://staging01.tagocash.com/" className="text-white hover:text-primary underline text-xs sm:text-sm">Home</a>
        <span className="text-gray-400 text-xs sm:text-sm">|</span>
        <a href="https://staging01.tagocash.com/privacy" className="text-white hover:text-primary underline text-xs sm:text-sm">Privacy</a>
        <span className="text-gray-400 text-xs sm:text-sm">|</span>
        <a href="https://staging01.tagocash.com/master-service-agreement" className="text-white hover:text-primary underline text-xs sm:text-sm">Master Service Agreement</a>
        <span className="text-gray-400 text-xs sm:text-sm">|</span>
        <a href="https://staging01.tagocash.com/security" className="text-white hover:text-primary underline text-xs sm:text-sm">Security</a>
        <span className="text-gray-400 text-xs sm:text-sm">|</span>
        <a href="https://staging01.tagocash.com/terms" className="text-white hover:text-primary underline text-xs sm:text-sm">Terms of Service</a>
        <span className="text-gray-400 text-xs sm:text-sm">|</span>
        <a href="https://staging01.tagocash.com/personal-data-policy" className="text-white hover:text-primary underline text-xs sm:text-sm">Personal Data Policy</a>
        <span className="text-gray-400 text-xs sm:text-sm">|</span>
        <a href="https://staging01.tagocash.com/report" className="text-white hover:text-primary underline text-xs sm:text-sm">Report</a>
        <span className="text-gray-400 text-xs sm:text-sm">|</span>
        <a href="https://staging01.tagocash.com/compliance" className="text-white hover:text-primary underline text-xs sm:text-sm">Compliance</a>
        <span className="text-gray-400 text-xs sm:text-sm">|</span>
        <a href="https://staging01.tagocash.com/customer-care" className="text-white hover:text-primary underline text-xs sm:text-sm">Customer Care</a>
      </div>
      <div className='flex flex-col lg:flex-row items-center lg:items-start'>
        <div className='w-2/3'>
          <div className="mb-4 flex flex-col sm:flex-row justify-center items-center lg:justify-center gap-1 sm:gap-3">
            <input
              type="text"
              className="py-2 px-4 bg-[rgba(255,255,255,0.05)] rounded-md text-gray-300 placeholder-gray-300 focus:outline-none backdrop-blur-md bg-opacity-10 xs:56 sm:w-96 lg:w-[380px] xl:w-[450px] text-xs sm:text-sm"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={() => subscribeEmail(email)} className="px-2 bg-white text-[#0d1b2a] hover:bg-primary rounded-md hover:text-white transition-colors cursor-pointer w-40 h-9 mt-4 sm:mt-0 py-2 text-xs sm:text-sm">
              Subscribe Us
            </button>
          </div>
          <p className="text-xs font-extralight text-gray-100 text-center lg:text-left max-w-4xl mx-auto mb-4 sm:text-sm lg:max-w-5xl">
            {getFieldValue('sectionDescription2')}
          </p>
        </div>
        <div className='lg:w-1/2 px-5 lg:px-10'>
          <p className='text-xs mb-2 text-center lg:text-start leading-relaxed text-gray-100'>
            TagoBits, Inc. is a fintech company at the frontier of digital and fiat currency. TagoCash is a global community project that provides financial equanimity by preserving money's value while making it efficiently portable and usable worldwide.
          </p>
        </div>
      </div>
      <div className="mt-6 flex flex-col md:flex-row items-center justify-between px-6 lg:px-10 sm:px-4">
        <div className="flex items-center gap-6 mb-6 md:mb-0">
          <img src={footerLogo} alt="TagoCash Logo" className="w-32 sm:w-28" />
          <div className='flex flex-col items-start'>
            <span className="text-start text-xs font-extralight">
              TagoCash &copy; 2023-{new Date().getFullYear()}. TagoCash, Inc.
            </span>
            <span className="text-start text-xs font-extralight">
              All rights reserved
            </span>
          </div>
        </div>
        <p className="text-xs font-extralight text-gray-100 max-w-4xl mx-auto mb-6">
          {getFieldValue('sectionDescription')}
        </p>

        <div className="flex justify-center gap-2 md:gap-4 sm:flex-wrap">
          <a
            href={getFieldValue('whatsappLink')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-primary scale-75 md:scale-100 p-2 rounded-full hover:bg-opacity-80 transition duration-300 sm:p-1"
          >
            <FaWhatsapp size={16} />
          </a>
          <a
            href={getFieldValue('telegramLink')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-primary scale-75 md:scale-100 p-2 rounded-full hover:bg-opacity-80 transition duration-300 sm:p-1"
          >
            <FaTelegram size={16} />
          </a>
          <a
            href={getFieldValue('linkedinLink')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-primary scale-75 md:scale-100 p-2 rounded-full hover:bg-opacity-80 transition duration-300 sm:p-1"
          >
            <FaLinkedinIn size={16} />
          </a>
          <a
            href={getFieldValue('facebookLink')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-primary scale-75 md:scale-100 p-2 rounded-full hover:bg-opacity-80 transition duration-300 sm:p-1"
          >
            <FaFacebookF size={16} />
          </a>
          <a
            href={getFieldValue('instagramLink')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-primary scale-75 md:scale-100 p-2 rounded-full hover:bg-opacity-80 transition duration-300 sm:p-1"
          >
            <FaInstagram size={16} />
          </a>
          <a
            href={getFieldValue('youtubeLink')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-primary scale-75 md:scale-100 p-2 rounded-full hover:bg-opacity-80 transition duration-300 sm:p-1"
          >
            <FiYoutube size={16} />
          </a>
          <a
            href={getFieldValue('twitterLink')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-primary scale-75 md:scale-100 p-2 rounded-full hover:bg-opacity-80 transition duration-300 sm:p-1"
          >
            <FaTwitter size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
