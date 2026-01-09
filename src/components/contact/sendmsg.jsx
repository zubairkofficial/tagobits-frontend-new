import { useState, useRef } from "react";
import tagocashaxiosinstance from "../../utils/tagocashaxiosinstance";
import ReCaptcha from "../ReCaptcha";
import BugBounty from "./BugBounty";

const SendMsg = () => {
    // Commented out old content
    // import { motion } from "framer-motion"
    // import { FaStar } from "react-icons/fa6";
    // 
    // const SendMsg = () => {
    //     return (
    //         <div className="flex flex-col items-center justify-center py-20 pb-24 md:pb-32 mx-15 bg-[#FBFDFF]">
    //             <div className="flex xl:flex-row flex-col items-center justify-center w-full">
    //                 <motion.div 
    //                     className="flex flex-col gap-10 w-1/2 justify-center items-center"
    //                     initial={{ opacity: 0, x: -50 }}
    //                     whileInView={{ opacity: 1, x: 0 }}
    //                     viewport={{ once: false, margin: "-100px" }}
    //                     transition={{ duration: 0.6 }}
    //                 >
    //                     <div className="flex flex-col gap-10 w-1/2">
    //                         <div className="flex flex-col justify-center xl:items-start gap-5">
    //                             <div className="flex flex-row items-center gap-2 urbanist-regular border border-gray-200 p-3 rounded-4xl w-fit bg-white">
    //                                 <div className="text-primary">
    //                                 <FaStar />
    //                                 </div>
    //                                 <span className="text-[#111827]">Connect</span>
    //                             </div>
    //                             <span className="urbanist-bold text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] text-center xl:text-left text-[#111827] leading-[1.1]">
    //                                 Send us a message
    //                             </span>
    //                         </div>
    //                         <div className="flex flex-col justify-center xl:items-start">
    //                             <span className="text-[16px] w-full sm:text-[18px] md:text-[20px] urbanist-regular text-center xl:text-left max-w-[780px] text-gray-600">
    //                             We're here to help! Reach out with your questions, feedback, or suggestions, and we'll get back to you as soon as possible."                            </span>
    //                         </div>
    //                     </div>
    //                 </motion.div>
    //                 <motion.div 
    //                     className="w-1/2 flex justify-center items-center"
    //                     initial={{ opacity: 0, x: 50 }}
    //                     whileInView={{ opacity: 1, x: 0 }}
    //                     viewport={{ once: false, margin: "-100px" }}
    //                     transition={{ duration: 0.6, delay: 0.2 }}
    //                 >
    //                 <form className="border border-gray-200 rounded-2xl p-8 w-full max-w-[560px] h-[598px] bg-white">
    //                     <div className="mb-6">
    //                         <label htmlFor="name" className="block mb-2 urbanist-medium text-[#111827]">
    //                             Name
    //                         </label>
    //                         <input
    //                             type="text"
    //                             id="name"
    //                             name="name"
    //                             className="block w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-primary transition-shadow"
    //                         />
    //                     </div>
    //                     <div className="mb-6">
    //                         <label htmlFor="email" className="block mb-2 urbanist-medium text-[#111827]">
    //                             Email
    //                         </label>
    //                         <input
    //                             type="email"
    //                             id="email"
    //                             name="email"
    //                             className="block w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-primary transition-shadow"
    //                         />
    //                     </div>
    //                     <div className="mb-8">
    //                         <label htmlFor="message" className="block mb-2 urbanist-medium text-[#111827]">
    //                             Message
    //                         </label>
    //                         <textarea
    //                             id="message"
    //                             name="message"
    //                             rows={4}
    //                             className="block w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-primary transition-shadow resize-none"
    //                         ></textarea>
    //                     </div>
    //                     <div className="flex justify-end">
    //                         <button
    //                             type="submit"
    //                             className="urbanist-semibold bg-primary text-white rounded-xl px-6 py-2 hover:bg-[#214AA2] transition-colors"
    //                         >
    //                             Send
    //                         </button>
    //                     </div>
    //                 </form>
    //                 </motion.div>
    //             </div>
    //         </div>
    //     )
    // }

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        company: '',
        country: '',
        profession: '',
        description: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [isReCaptchaVerified, setIsReCaptchaVerified] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, value);
            });

            const response = await tagocashaxiosinstance.post('/reports', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setSuccess(true);
            setFormData({
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                company: '',
                country: '',
                profession: '',
                description: '',
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleReCaptchaVerify = (verified) => {
        setIsReCaptchaVerified(verified);
    };

    const formRef = useRef(null);

    const scrollToInvestorsContact = () => {
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="max-w-[1900px] flex flex-col gap-[40px] mx-auto" style={{ minHeight: 'calc(-403px + 100vh)' }}>
            <div ref={formRef}>
                <div className="max-w-[1900px] mx-auto" style={{ minHeight: 'calc(-403px + 100vh)' }}>
                    <div className="flex flex-col items-center justify-center mx-4 lg:mx-20 my-10 h-full pt-16">
                        <div className="w-full max-w-2xl">
                            <h3 className="font-medium text-primary text-3xl mb-1 text-center">
                                Administrative / Investors Contact
                            </h3>
                            <p className="text-gray-900 font-extralight text-sm mb-6 text-center">
                                Help us improve by reporting any issues or concerns you encounter.
                            </p>
                            <div className="bg-white shadow-lg rounded-lg p-6">
                                {error && (
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                        {error}
                                    </div>
                                )}
                                {success && (
                                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                                        Report submitted successfully!
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className="w-full">
                                            <label className="block text-gray-700 mb-1">First name</label>
                                            <input
                                                type="text"
                                                name="first_name"
                                                value={formData.first_name}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full bg-gray-100 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="First name"
                                            />
                                        </div>
                                        <div className="w-full">
                                            <label className="block text-gray-700 mb-1">Last name</label>
                                            <input
                                                type="text"
                                                name="last_name"
                                                value={formData.last_name}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full bg-gray-100 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Last name"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 mb-1">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full bg-gray-100 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Ex: john.doe@example.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 mb-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full bg-gray-100 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Phone number"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 mb-1">Company</label>
                                        <input
                                            type="text"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleInputChange}
                                            className="w-full bg-gray-100 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Company name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 mb-1">Country</label>
                                        <input
                                            type="text"
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            className="w-full bg-gray-100 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Country"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 mb-1">Profession</label>
                                        <input
                                            type="text"
                                            name="profession"
                                            value={formData.profession}
                                            onChange={handleInputChange}
                                            className="w-full bg-gray-100 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Profession"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 mb-1">Description</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            required
                                            rows={4}
                                            maxLength={600}
                                            className="w-full bg-gray-100 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Please describe your issue or concern"
                                        ></textarea>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {formData.description.length}/600 characters
                                        </p>
                                    </div>

                                    <div className="flex justify-center my-4">
                                        <div>
                                            <ReCaptcha onVerify={handleReCaptchaVerify} />
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <button
                                            type="submit"
                                            disabled={loading || !isReCaptchaVerified}
                                            className="bg-gradient-to-l from-footer-primary to-footer w-full text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-600 transition disabled:opacity-50"
                                        >
                                            {loading ? (
                                                <div className="flex items-center justify-center">
                                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                                                    <span>Submitting...</span>
                                                </div>
                                            ) : (
                                                'Submit Report'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BugBounty scrollToInvestorsContact={scrollToInvestorsContact} />
        </div>
    );
}

export default SendMsg;