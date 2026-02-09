import React from 'react';
import { motion } from 'framer-motion';
import TextType from '../TextType';
import Navbar from '../navbar';
import { useHomeContent } from '../../hooks/useHomeContent';

const Hero = () => {
    const { getFieldValue } = useHomeContent('money');
    const [isMobile, setIsMobile] = React.useState(false);

    // Detect mobile view
    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768); // standard md breakpoint
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Dynamic data from generic useHomeContent hook
    const moneyTitle = getFieldValue('moneyTitle') || 'MONEY';
    const whatIsIt = getFieldValue('whatIsIt') || 'What is it?';
    const heading = getFieldValue('heading');
    const description = getFieldValue('description');

    // Video URL remains static as it's not currently editable in Admin for this section
    const videoUrl = 'https://fast.wistia.com/embed/medias/1jkulxved5/';

    const getWistiaVideoId = (url) => {
        if (!url) return '';
        const trimmed = url.trim();
        // Check for 10-character alphanumeric ID or 36-character UUID patterns common in Wistia
        if (/^[a-z0-9]{10}$/i.test(trimmed)) return trimmed;

        const wistiaMatch = trimmed.match(/wistia\.com\/(?:embed\/)?medias\/([a-z0-9]+)(?:\/swatch)?\/?/i);
        if (wistiaMatch) return wistiaMatch[1];

        const directIdMatch = trimmed.match(/medias\/([a-zA-Z0-9]+)/);
        if (directIdMatch) return directIdMatch[1];

        const embedMatch = trimmed.match(/wistia\.com\/embed\/(?:medias\/)?([^/?]+?)(?:\.js)?\/?$/);
        if (embedMatch) return embedMatch[1];

        return '';
    };

    const videoId = getWistiaVideoId(videoUrl);

    return (
        <section
            className="relative w-full overflow-visible"
            style={{
                backgroundColor: '#EFF1F2',
                minHeight: isMobile ? '100vh' : 'auto',
                display: isMobile ? 'flex' : 'block',
                flexDirection: 'column',
                justifyContent: isMobile ? 'center' : 'flex-start',
                alignItems: 'center'
            }}
        >
            <div className="w-full hero-section-wrapper">
                <Navbar />
            </div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 pt-24 md:pt-28 lg:pt-32 pb-4 md:pb-6 lg:pb-10 z-10">
                {/* Main Content - Centered */}
                <div className="flex flex-col w-full max-w-6xl relative z-10 items-center text-center">
                    {/* 1. Header Animation - MONEY */}
                    <div className={`flex flex-col items-center justify-center ${isMobile ? 'mb-36' : 'mb-12 sm:mb-16 md:mb-24 lg:mb-56 xl:mb-64'}`}>
                        {/* Line 1: MONEY... - Slides up from bottom */}
                        <motion.h1
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-transparent bg-clip-text leading-[1.1] pb-2"
                            style={{
                                fontFamily: '"Aeonik Black", "Aeonik Black Placeholder", sans-serif',
                                letterSpacing: '-0.02em',
                                backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.25) 0, rgba(255,255,255,0.25) 3px, transparent 3px, transparent 12px), linear-gradient(90deg, #2549A4, #0C8AD4, #186CBE)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            {moneyTitle.replace(/[.…]+$/, '')}...
                        </motion.h1>
                    </div>

                    {/* 2. What is it? + Video Section - Grouped together */}
                    <div className="flex flex-col items-center w-full">
                        {/* Line 2: What is it? */}
                        <div className={`min-h-[40px] sm:min-h-[60px] ${isMobile ? 'mb-2 mt-6' : 'mb-4 md:mb-6'}`}>
                            <TextType
                                text={[`${whatIsIt.replace(/[?.… ]+$/, '')}...?`]}
                                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-black leading-[1.1] pb-2"
                                cursorClassName="text-black font-normal"
                                style={{
                                    fontFamily: '"Aeonik Black", "Aeonik Black Placeholder", sans-serif',
                                    letterSpacing: '-0.02em',
                                    paddingTop: isMobile ? '10px' : '0'
                                }}
                                typingSpeed={80}
                                initialDelay={800}
                                showCursor={true}
                                loop={false}
                                startOnVisible={true}
                            />
                        </div>

                        {/* 3. Video - Slide UP - Starts at 1.5s */}
                        {videoId && (
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, amount: 0.1 }}
                                transition={{ duration: 0.7, delay: 0.8 }}
                                className={`${isMobile ? 'mt-8 scale-[1.15]' : 'mt-2'} mb-0 flex flex-col items-center w-[90%] ${isMobile ? 'px-0' : 'px-2'}`}
                            >
                                <div
                                    className="w-full rounded-2xl shadow-xl overflow-hidden"
                                    style={{
                                        aspectRatio: '16/9',
                                        border: '1px solid rgba(27, 103, 186, 0.2)',
                                        backgroundColor: 'black'
                                    }}
                                >
                                    <iframe
                                        src={`https://fast.wistia.net/embed/iframe/${videoId}?videoFoam=true&autoplay=true&muted=true&loop=true&endVideoBehavior=loop`}
                                        title="Wistia Video Player"
                                        allow="autoplay; fullscreen"
                                        frameBorder="0"
                                        scrolling="no"
                                        className="w-full h-full"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </motion.div>
                        )}

                        {/* 4. Description Text - Rendered dynamically if data exists */}
                        {(heading || description) && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                                transition={{ duration: 0.8, delay: 1.0 }}
                                className="mt-12 md:mt-16 max-w-4xl text-center px-4"
                            >
                                {heading && (
                                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                                        {heading}
                                    </h2>
                                )}
                                {description && (
                                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed whitespace-pre-wrap">
                                        {description}
                                    </p>
                                )}
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
