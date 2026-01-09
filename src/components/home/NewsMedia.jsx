import React, { useState } from 'react';
import { motion } from 'framer-motion';

const NewsMedia = () => {
    const [activeVideo, setActiveVideo] = useState(null);

    const newsData = [
        {
            id: '1',
            title: "Seth's Story",
            message: "TagoCash solved Ghanaian freelancer Seth's payment issues, saving him from frozen accounts and the 20-25% he was losing to fees and poor conversion rates.",
            wistia_id: 'e2zt2r081w',
            thumbnail: "https://fast.wistia.com/embed/medias/e2zt2r081w/swatch"
        },
        {
            id: '2',
            title: "Joanna's Story",
            message: "Joanna, unable to afford a bank, solves her financial stress with the TagoCash app, getting a free digital account for all her needs and achieving true financial freedom.",
            wistia_id: 'qc7qunoojw',
            thumbnail: "https://fast.wistia.com/embed/medias/qc7qunoojw/swatch"
        }
    ];

    const closeModal = () => {
        setActiveVideo(null);
    };

    return (
        <div className="max-w-[1900px] mx-auto px-6 md:px-20 lg:px-32 pb-12 pt-0 -mt-8 relative bg-[#FBFDFF]">
            <motion.div
                className="w-full mb-8"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-[32px] md:text-[42px] font-bold text-[#14316A]">
                    Tago News & Media
                </h2>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-10 items-stretch justify-start">
                {newsData.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        whileHover={{
                            y: -15,
                            scale: 1.02,
                            transition: { duration: 0.6, ease: "easeOut" }
                        }}
                        className="bg-white shadow-[0_4px_25px_rgba(0,0,0,0.06)] rounded-2xl overflow-hidden border border-gray-100 group cursor-pointer flex flex-col w-full md:w-[520px] transition-all duration-700"
                        onClick={() => setActiveVideo(item)}
                    >
                        <div className="relative h-64 md:h-[320px] overflow-hidden">
                            <motion.img
                                src={item.thumbnail}
                                alt={item.title}
                                whileHover={{ scale: 1.15 }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                                className="w-full h-full object-cover"
                            />

                            {/* Play Button Overlay - Simple White Circle */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-black/15 transition-all duration-500">
                                <motion.div
                                    whileHover={{ scale: 1.2 }}
                                    transition={{ duration: 0.8 }}
                                    className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg border border-white/50"
                                >
                                    <svg
                                        className="w-8 h-8 text-black/80 ml-1"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </motion.div>
                            </div>
                        </div>

                        <div className="p-8">
                            <p className="text-[#4B5563] text-[15px] md:text-[17px] leading-relaxed font-medium text-left group-hover:text-primary transition-colors duration-500">
                                {item.message}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Video Modal */}
            {activeVideo && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8 backdrop-blur-sm"
                    onClick={closeModal}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative w-full max-w-6xl bg-black rounded-3xl overflow-hidden shadow-2xl"
                        style={{ aspectRatio: '16/9' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center text-3xl transition-all cursor-pointer backdrop-blur-md"
                        >
                            ×
                        </button>

                        <iframe
                            src={`https://fast.wistia.net/embed/iframe/${activeVideo.wistia_id}?autoplay=1`}
                            title={activeVideo.title}
                            allow="autoplay; fullscreen"
                            allowFullScreen
                            className="w-full h-full border-0"
                        />
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default NewsMedia;
