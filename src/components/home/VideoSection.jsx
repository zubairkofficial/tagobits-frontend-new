import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useHomeContent } from '../../hooks/useHomeContent';

const VideoSection = () => {
    const { getFieldValue } = useHomeContent('videoSection');
    const [playVideo, setPlayVideo] = useState(false);

    // Dynamic content from Admin Panel
    const videoTitle = getFieldValue('videoTitle') || "Send Love with TagoCash❤️";
    const videoDescription = getFieldValue('videoDescription') || "because every dollar deserves to arrive home whole.";
    const videoWistiaUrl = getFieldValue('videoUrl') || "https://fast.wistia.com/embed/medias/41fgwutfck/";

    // Extract video ID from URL
    const getVideoId = (url) => {
        if (!url) return null;
        const match = url.match(/medias\/([a-zA-Z0-9]+)/);
        return match ? match[1] : url.split('/').filter(Boolean).pop();
    };

    const videoId = getVideoId(videoWistiaUrl);

    const handlePlayClick = () => {
        setPlayVideo(true);
    };

    if (!videoId) return null;

    return (
        <section className="w-full bg-white py-16 md:py-24 lg:py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-20">

                    {/* Video Container - Left Side on Desktop */}
                    <motion.div
                        className="w-full lg:w-1/2 order-2 lg:order-1"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="relative group h-full">
                            {/* Decorative elements */}
                            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-blue-600 rounded-tl-3xl opacity-20 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-blue-600 rounded-br-3xl opacity-20 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-900 h-full min-h-[300px] lg:min-h-full aspect-video lg:aspect-auto">
                                {playVideo ? (
                                    <iframe
                                        src={`https://fast.wistia.net/embed/iframe/${videoId}?videoFoam=true&autoplay=true`}
                                        title="Wistia Video Player"
                                        allow="autoplay; fullscreen"
                                        allowFullScreen
                                        className="absolute top-0 left-0 w-full h-full border-0"
                                    />
                                ) : (
                                    <div
                                        className="absolute inset-0 cursor-pointer group h-full"
                                        onClick={handlePlayClick}
                                    >
                                        <img
                                            src={`https://fast.wistia.com/embed/medias/${videoId}/swatch`}
                                            alt="Video Thumbnail"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500" />

                                        {/* Play Button */}
                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                            <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-600/90 text-white rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm transform transition-transform duration-300 group-hover:scale-110">
                                                <svg
                                                    className="w-10 h-10 ml-1.5"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Section - Right Side on Desktop */}
                    <motion.div
                        className="w-full lg:w-1/2 order-1 lg:order-2 flex flex-col justify-center space-y-8 py-4"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    >
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl lg:text-5xl font-black text-gray-900 leading-[1.1] tracking-tight">
                                {videoTitle}
                            </h2>
                            <div className="h-1.5 w-20 bg-blue-600 rounded-full"></div>
                        </div>

                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed whitespace-pre-line font-medium">
                            {videoDescription}
                        </p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default VideoSection;
