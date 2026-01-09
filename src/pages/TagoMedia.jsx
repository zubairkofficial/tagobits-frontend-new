import React from 'react';
import { motion } from 'framer-motion';
import blogHeaderImage from '../assets/home/worldwide/backimage.png';

// Helper function to extract YouTube video ID
const getYouTubeVideoId = (url) => {
    const match = url.match(/(?:youtu.be\/|youtube.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : null;
};

const TagoMedia = () => {
    // Video data
    const videos = [
        {
            id: 1,
            url: 'https://www.youtube.com/watch?v=UgB1qEjPS9g',
            title: 'Why create TagoCash? An intro',
            description: '💡 TagoCash — a simple, fast, and borderless solution to send, receive, and manage your money anywhere in the world 🌍💸\n\n🔥 With TagoCash, forget about delays and hidden fees!\nWe believe your money should move freely, securely, and without barriers.'
        },
        {
            id: 2,
            url: 'https://www.youtube.com/watch?v=tr52looLSLc',
            title: 'The TagoCash Revolution: Your Money, Your Power!',
            description: 'For too long, our money transfers have been slowed down, taxed, and controlled.\n\n🔥 With TAGOCASH, say goodbye to hidden fees and endless delays — take full control of your money:\n\n✅ Instant transfers\n❌ No hidden fees\n🌍 No borders\n💪 Your money, your power.'
        },
        {
            id: 3,
            url: 'https://www.youtube.com/watch?v=Y35h96kY2Jc',
            title: 'The Story of Akufo using TagoCash',
            description: 'Can TagoCash be used as a remittance app?  Yes!\nDon\'t send cash. TagoCash!'
        },
        {
            id: 4,
            url: 'https://www.youtube.com/watch?v=gTp4qOb7_Qc',
            title: 'INTRODUCTION: TAGOCASH FR',
            description: 'TagoCash est le portefeuille digital qui vous permet de transporter en securite votre argent partout dans le monde et l\'utiliser comme argent locale.'
        },
        {
            id: 5,
            url: 'https://www.youtube.com/watch?v=tfxWECCA1_U',
            title: 'Why TagoCash? An Introduction.',
            description: 'TagoCash is a self custody digital wallet. It preserve your money in US Dollar equivalent, USDC.  Digital money has many benefits over fiat cash, including safety, security, privacy and universality.\nCheck out TagoCash at https://www.tago.cash'
        }
    ];

    return (
        <div className="w-full bg-white mb-8" style={{ minHeight: 'calc(100vh - 403px)', overflowX: 'hidden' }}>
            {/* Header Section */}
            <div className="relative min-h-[140px] sm:min-h-[120px] md:min-h-[140px] lg:h-[120px] mx-4 rounded-2xl overflow-hidden mt-4 sm:mt-6 md:mt-8 lg:my-10">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${blogHeaderImage})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-r from-footer to-footer-primary opacity-80"></div>
                <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4 sm:px-6 md:px-8 py-4 sm:py-2 md:py-4">
                    <div className="max-w-[95%] sm:max-w-[80%] md:max-w-[85%] lg:max-w-[70%] w-full">
                        <motion.h2 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="text-xl sm:text-xl md:text-2xl lg:text-2xl font-bold mb-2 sm:mb-3 md:mb-3 lg:mb-4 break-words leading-tight"
                        >
                            Tago Media
                        </motion.h2>
                        <motion.p 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-xs sm:text-sm md:text-base lg:text-sm font-light whitespace-pre-line break-words leading-relaxed px-1 md:px-2"
                        >
                            Explore news, updates, and stories from the world of TagoCash
                        </motion.p>
                    </div>
                </div>
            </div>

            {/* Videos Grid Section */}
            <div className="h-auto bg-white w-full pb-8 sm:pb-12 md:pb-16">
                <div className="max-w-[1900px] mx-auto px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-8 pb-4 sm:pb-6 md:pb-8 w-full" style={{ boxSizing: 'border-box' }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-6 w-full" style={{ gridAutoRows: '1fr' }}>
                        {videos.map((video, index) => {
                            const videoId = getYouTubeVideoId(video.url);
                            
                            return (
                                <motion.div
                                    key={video.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ 
                                        duration: 0.6, 
                                        delay: index * 0.1,
                                        ease: "easeOut"
                                    }}
                                    whileHover={{ 
                                        scale: 1.05,
                                        transition: { duration: 0.3, ease: "easeOut" }
                                    }}
                                    className="bg-white rounded-lg shadow-lg transform transition-transform w-full flex flex-col overflow-hidden relative z-10"
                                    style={{ maxWidth: '100%', boxSizing: 'border-box' }}
                                >
                                    {/* Video Container */}
                                    <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 relative">
                                        {videoId && (
                                            <iframe
                                                src={`https://www.youtube.com/embed/${videoId}`}
                                                title={video.title}
                                                className="absolute inset-0 w-full h-full rounded-t-lg"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        )}
                                    </div>
                                    
                                    {/* Video Info */}
                                    <div className="p-3 sm:p-4 flex flex-col flex-grow relative z-10">
                                        <h3 className="text-base sm:text-lg font-semibold mb-2 line-clamp-1">
                                            {video.title}
                                        </h3>
                                        <p className="text-gray-600 line-clamp-2 text-xs sm:text-sm whitespace-pre-line">
                                            {video.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TagoMedia;

