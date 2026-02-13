import React, { useState, useRef, Suspense } from 'react';
// Force rebuild after image copy
import { motion } from 'framer-motion';
import backimage from '../../assets/jurisdictions/backimage.png';
import lightbluepin from '../../assets/jurisdictions/lightbluepin.png';
import darkbluepin from '../../assets/jurisdictions/darkbluepin.png';
import redpin from '../../assets/jurisdictions/redpin.png';
import orangepin from '../../assets/jurisdictions/orangepin.png';
import purplepin from '../../assets/jurisdictions/purplepin.png';

import { useHomeContent } from '../../hooks/useHomeContent';

const Jurisdictions = () => {
    const { getFieldValue } = useHomeContent('jurisdictions');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterOption, setFilterOption] = useState('all');

    const heading = getFieldValue('heading') || "Where & How can I use TagoCash?";

    // Import Flags just for this section
    const Flag = React.lazy(() => import('react-world-flags'));

    // Static data representing a subset of supported countries for display
    const countries = [
        { name: "Afghanistan", code: "AF" }, { name: "Albania", code: "AL" }, { name: "Algeria", code: "DZ" },
        { name: "Andorra", code: "AD" }, { name: "Angola", code: "AO" }, { name: "Argentina", code: "AR" },
        { name: "Australia", code: "AU" }, { name: "Austria", code: "AT" }, { name: "Bahrain", code: "BH" },
        { name: "Bangladesh", code: "BD" }, { name: "Belgium", code: "BE" }, { name: "Benin", code: "BJ" },
        { name: "Botswana", code: "BW" }, { name: "Brazil", code: "BR" }, { name: "Bulgaria", code: "BG" },
        { name: "Burkina Faso", code: "BF" }, { name: "Cameroon", code: "CM" }, { name: "Canada", code: "CA" },
        { name: "China", code: "CN" }, { name: "Colombia", code: "CO" }, { name: "Congo", code: "CG" },
        { name: "France", code: "FR" }, { name: "Germany", code: "DE" }, { name: "Ghana", code: "GH" },
        { name: "India", code: "IN" }, { name: "Indonesia", code: "ID" }, { name: "Italy", code: "IT" },
        { name: "Japan", code: "JP" }, { name: "Kenya", code: "KE" }, { name: "Mexico", code: "MX" },
        { name: "Nigeria", code: "NG" }, { name: "Pakistan", code: "PK" }, { name: "Russia", code: "RU" },
        { name: "Rwanda", code: "RW" }, { name: "Saudi Arabia", code: "SA" }, { name: "Senegal", code: "SN" },
        { name: "South Africa", code: "ZA" }, { name: "Spain", code: "ES" }, { name: "Tanzania", code: "TZ" },
        { name: "Togo", code: "TG" }, { name: "Turkey", code: "TR" }, { name: "Uganda", code: "UG" },
        { name: "United Kingdom", code: "GB" }, { name: "United States", code: "US" }, { name: "Zambia", code: "ZM" }
    ].sort((a, b) => a.name.localeCompare(b.name));

    const filteredCountries = countries.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='flex justify-center bg-gray-50' style={{ backgroundColor: '#FBFDFF' }}>
            <div className="max-w-[1900px] w-full min-h-[550px] p-8 rounded-xl flex flex-col lg:flex-row items-center gap-6 lg:gap-20 px-4">
                <motion.div
                    className="relative max-w-[950px] md:w-180 lg:w-1/2 lg:h-full bg-cover bg-center rounded-lg"
                    initial={{ y: 100 }}
                    whileInView={{ y: 0 }}
                    viewport={{ amount: 0.2 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className='absolute xss:top-3 xss:left-2 xs:top-10 xs:left-7 sm:top-10 sm:left-5 md:top-0 md:left-0 w-full h-full z-10'>
                        <img src={lightbluepin} alt="Pin" className="absolute left-[20%] top-[-57%] sm:left-[30%] sm:top-[-35%] md:left-[32%] md:top-[-15%] lg:left-[30%] lg:top-[-20%] xl:left-[34%] xl:top-[-12%] scale-60 hover:scale-67 xs:scale-75 xs:hover:scale-85 sm:scale-105 sm:hover:scale-112 transition-all duration-300" />
                        <img src={darkbluepin} alt="Pin" className="absolute left-[30%] top-[-25%] sm:left-[38%] sm:top-[0%] md:left-[45%] md:top-[19%] lg:left-[42%] lg:top-[4%] xl:left-[44%] xl:top-[22%] scale-50 hover:scale-57 xs:scale-65 xs:hover:scale-72 sm:scale-100 sm:hover:scale-107 transition-all duration-300" />
                        <img src={redpin} alt="Pin" className="absolute left-[37%] top-[10%] sm:left-[47%] sm:top-[30%] md:left-[52%] md:top-[50%] lg:left-[50%] lg:top-[36%] xl:left-[52%] xl:top-[52%] scale-50 hover:scale-57 xs:scale-65 xs:hover:scale-72 sm:scale-100 sm:hover:scale-107 transition-all duration-300" />
                        <img src={orangepin} alt="Pin" className="absolute left-[48%] top-[-35%] sm:left-[60%] sm:top-[-10%] md:left-[63%] md:top-[10%] lg:left-[60%] lg:top-[-5%] xl:left-[64%] xl:top-[13%] scale-40 hover:scale-47 xs:scale-55 xs:hover:scale-62 sm:scale-92 sm:hover:scale-100 transition-all duration-300" />
                        <img src={purplepin} alt="Pin" className="absolute left-[60%] top-[-45%] sm:left-[70%] sm:top-[-25%] md:left-[71%] md:top-[-3%] lg:left-[67%] lg:top-[-18%] xl:left-[71%] xl:top-[0%] scale-60 hover:scale-67 xs:scale-75 xs:hover:scale-85 sm:scale-105 sm:hover:scale-112 transition-all duration-300" />
                        <img src={lightbluepin} alt="Pin" className="absolute left-[73%] top-[20%] sm:left-[85%] sm:top-[40%] md:left-[87%] md:top-[55%] lg:left-[83%] lg:top-[52%] xl:left-[87%] xl:top-[60%] scale-50 hover:scale-57 xs:scale-65 xs:hover:scale-72 sm:scale-100 sm:hover:scale-107 transition-all duration-300" />
                        <img src={redpin} alt="Pin" className="absolute left-[-8%] top-[-35%] sm:left-[0%] sm:top-[-10%] md:left-[5%] md:top-[6%] lg:left-[4%] lg:top-[-2%] xl:left-[4%] xl:top-[11%] scale-60 hover:scale-67 xs:scale-75 xs:hover:scale-85 sm:scale-105 sm:hover:scale-112 transition-all duration-300" />
                        <img src={orangepin} alt="Pin" className="absolute left-[12%] top-[10%] sm:left-[20%] sm:top-[30%] md:left-[25%] md:top-[50%] lg:left-[25%] lg:top-[40%] xl:left-[27%] xl:top-[55%] scale-50 hover:scale-57 xs:scale-65 xs:hover:scale-72 sm:scale-100 sm:hover:scale-107 transition-all duration-300" />
                        <img src={purplepin} alt="Pin" className="absolute left-[-3%] top-[-20%] sm:left-[8%] sm:top-[2%] md:left-[12%] md:top-[20%] lg:left-[10%] lg:top-[10%] xl:left-[13%] xl:top-[23%] scale-40 hover:scale-47 xs:scale-55 xs:hover:scale-62 sm:scale-92 sm:hover:scale-100 transition-all duration-300" />
                    </div>
                    <motion.img
                        initial={{ y: 100 }}
                        whileInView={{ y: 0 }}
                        viewport={{ amount: 0.2 }}
                        transition={{ duration: 0.3 }}
                        src={backimage} alt="World Map" className="w-full h-full object-contain relative z-0"
                    />
                </motion.div>

                <div className="flex flex-col max-w-[950px] w-full lg:w-1/2">
                    <motion.h3
                        className="text-[32px] font-[700] text-transparent bg-clip-text bg-gradient-to-r from-primary-dark to-primary text-center md:text-left lg:text-center xl:text-left mb-6"
                    >
                        {heading}
                    </motion.h3>

                    <div className="h-full p-5 rounded-xl shadow-sm bg-white border border-gray-100">
                        <div className="flex flex-col sm:flex-row gap-4 mb-4">
                            <input
                                type="text"
                                placeholder="Search countries..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full sm:w-1/2 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                            />
                            <select
                                value={filterOption}
                                onChange={(e) => setFilterOption(e.target.value)}
                                className="w-full sm:w-1/2 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm bg-white"
                            >
                                <option value="all">All Methods</option>
                                <option value="deposit">Deposit Methods</option>
                                <option value="withdrawal">Withdrawal Methods</option>
                            </select>
                        </div>

                        <div className="max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Suspense fallback={<div>Loading...</div>}>
                                    {filteredCountries.map((country, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-default transition-colors"
                                        >
                                            <Flag code={country.code} className="w-6 h-4 shadow-sm object-cover" />
                                            <span className="text-gray-700 text-sm font-medium">{country.name}</span>
                                        </div>
                                    ))}
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jurisdictions;
