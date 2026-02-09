
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useHomeContent } from '../../hooks/useHomeContent';

const VideoSection = () => {
    const { getFieldValue } = useHomeContent('platformsecurity');
    const [playVideo, setPlayVideo] = useState(false);

    // Dynamic content from Admin Panel (using platformsecurity section's video fields)
    const videoTitle = getFieldValue('videoHeader') || "Send Love with TagoCash❤️";
    const videoDescription = getFieldValue('videoDescription') || "because every dollar deserves to arrive home whole.";
    const videoWistiaUrl = getFieldValue('videoUrl') || "https://fast.wistia.com/embed/medias/41fgwutfck/";

    // Extract video ID from URL
    const getVideoId = (url) => {
        const match = url.match(/medias\/([a-zA-Z0-9]+)/);
        return match ? match[1] : null;
    };

    const videoId = getVideoId(videoWistiaUrl);

    const handlePlayClick = () => {
        setPlayVideo(true);
    };

    if (!videoId) return null;

    return (
        <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 py-12 md:py-20 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.3,
                                delayChildren: 0.2
                            }
                        }
                    }}
                    className="max-w-5xl mx-auto text-center"
                >
                    {/* Header */}
                    <motion.div
                        className="mb-10 md:mb-14 space-y-6"
                        variants={{
                            hidden: { opacity: 0, y: 60 },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: {
                                    type: "spring",
                                    stiffness: 50,
                                    damping: 20,
                                    duration: 1
                                }
                            }
                        }}
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
                            {videoTitle}
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-600 font-medium whitespace-pre-line">
                            {videoDescription}
                        </p>
                    </motion.div>

                    {/* Video Container Wrapper with Custom Borders */}
                    <motion.div
                        className="relative max-w-5xl mx-auto"
                        variants={{
                            hidden: { opacity: 0, y: 60 },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: {
                                    type: "spring",
                                    stiffness: 50,
                                    damping: 20,
                                    duration: 1
                                }
                            }
                        }}
                    >
                        {/* Custom Corner Borders */}
                        <div className="absolute -top-1 -left-1 w-16 h-16 border-t-[6px] border-l-[6px] border-[#3B82F6] rounded-tl-3xl z-10 pointer-events-none"></div>
                        <div className="absolute -bottom-1 -right-1 w-16 h-16 border-b-[6px] border-r-[6px] border-[#3B82F6] rounded-br-3xl z-10 pointer-events-none"></div>

                        <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl aspect-video bg-gray-900">
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
                                    className="absolute inset-0 cursor-pointer"
                                    onClick={handlePlayClick}
                                >
                                    <img
                                        src={`https://fast.wistia.com/embed/medias/${videoId}/swatch`}
                                        alt="Video Thumbnail"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/20 transition-colors duration-500" />

                                    {/* Play Button */}
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                        <div className="w-20 h-20 md:w-24 md:h-24 bg-[#3B82F6] rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm">
                                            <svg
                                                className="w-8 h-8 md:w-10 md:h-10 text-white ml-1"
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
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default VideoSection;
