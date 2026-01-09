import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHomeContent } from '../../hooks/useHomeContent';
import { useTranslation } from '../../hooks/useTranslation';
import TextType from '../TextType';
import TranslatableText from '../TranslatableText';

// Using public image for logo
const logo = '/logo-DNXW06HV.svg';

const SpinningStar = ({ style }) => (
    <motion.svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        style={{ flexShrink: 0, marginTop: '5px', ...style }}
        animate={{ rotate: [0, 180, 360] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    >
        <path
            d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z"
            fill="#1B67BA"
        />
    </motion.svg>
);

const BulletIcon = ({ style }) => (
    <svg
        width="10"
        height="10"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        style={{ flexShrink: 0, marginTop: '7px', ...style }}
    >
        <path d="M6 0L12 6L6 12L0 6L6 0Z" fill="url(#bullet_gradient)" />
        <defs>
            <linearGradient id="bullet_gradient" x1="0" y1="0" x2="12" y2="12" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2E3293" />
                <stop offset="1" stopColor="#0C8BD5" />
            </linearGradient>
        </defs>
    </svg>
);

const MoneySection = () => {
    // Using static data as requested
    const sectionHeading = 'Borderless digital wallet for instant payments';
    const [openCardIndex, setOpenCardIndex] = useState(0); // First card open by default
    const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);
    const sectionRef = useRef(null);

    // Detect mobile view
    useEffect(() => {
        const checkMobile = () => {
            const width = window.innerWidth;
            setIsMobile(width < 1024); // lg breakpoint
            setIsTablet(width >= 768 && width < 1024); // tablet range
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Reset paragraph index when a card is opened/switched
    useEffect(() => {
        setCurrentParagraphIndex(0);
    }, [openCardIndex]);

    const getWistiaVideoId = (url) => {
        if (!url) return '';
        const trimmed = url.trim();
        if (/^[a-z0-9]{10}$/i.test(trimmed)) return trimmed;

        const wistiaMatch = trimmed.match(/wistia\.com\/(?:embed\/)?medias\/([a-z0-9]+)(?:\/swatch)?\/?/i);
        if (wistiaMatch) return wistiaMatch[1];

        const directIdMatch = trimmed.match(/medias\/([a-zA-Z0-9]+)/);
        if (directIdMatch) return directIdMatch[1];

        const embedMatch = trimmed.match(/wistia\.com\/embed\/(?:medias\/)?([^/?]+?)(?:\.js)?\/?$/);
        if (embedMatch) return embedMatch[1];

        return '';
    };

    const cardTitles = [
        'Digital Wallet',
        'Subtle',
        'Essential',
        'Global'
    ];

    const card1VideoUrl = 'https://fast.wistia.com/embed/medias/8e775zrchi/';
    const card1VideoId = getWistiaVideoId(card1VideoUrl);

    const splitHeading = (heading) => {
        const forIndex = heading.toLowerCase().indexOf(' for ');
        if (forIndex > 0) {
            return {
                firstLine: heading.substring(0, forIndex).trim(),
                secondLine: heading.substring(forIndex + 1).trim()
            };
        }
        const words = heading.split(' ');
        const midPoint = Math.ceil(words.length / 2);
        return {
            firstLine: words.slice(0, midPoint).join(' '),
            secondLine: words.slice(midPoint).join(' ')
        };
    };

    const { firstLine, secondLine } = splitHeading(sectionHeading);

    const cardData = [
        {
            description: "Money is a shared system of trust that allows value to be stored, exchanged and moved across people, time, and borders.\nMoney should be Subtle when it works; Essential when it matters; & Global by default.",
            image: '/card.png', // Using existing card.png as Card_1.png is missing in public
        },
        {
            description: "TagoCash is intentionally unobtrusive.\nWe remove friction, noise, and complexity so money moves naturally in the background of everyday life.\nNo spectacle. No distraction. Just seamless execution.\nSubtlety is not absence it is confidence without excess.\nWhen technology is designed correctly, it disappears.",
            image: '/Card_2.png',
        },
        {
            description: "Money is not optional it is foundational.\nTagoCash is built to be relied upon daily, not experimented with occasionally.\nFrom storing value to settling payments, from individuals to enterprises,\nTagoCash is the quiet constant people trust when certainty matters.\nEssential means dependable. Essential means always on.\nEssential means it works every time.",
            image: '/Card_3.png',
        },
        {
            description: "Value should move as freely as information.\nTagoCash is global by design, connecting people, businesses, and markets across borders in real time.\nBuilt on regulated stablecoin rails,\nTagoCash enables secure, compliant, instant settlement wherever opportunity exists.\nNo Border, No Delay and no unnecessary intermediaries\nGlobal is not an ambition it is a requirement for modern money.",
            image: '/Card_4Global.png',
        },
    ];

    const handleCardClick = (index, e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        const scrollY = window.scrollY;
        const scrollX = window.scrollX;
        setOpenCardIndex(index);
        const restoreScroll = () => {
            window.scrollTo(scrollX, scrollY);
        };
        restoreScroll();
        requestAnimationFrame(() => {
            restoreScroll();
            setTimeout(restoreScroll, 10);
            setTimeout(restoreScroll, 50);
            setTimeout(restoreScroll, 100);
        });
    };

    const isCardOpen = (index) => openCardIndex === index;
    const isCardClosed = (index) => !isCardOpen(index);

    return (
        <section ref={sectionRef} className="relative w-full overflow-hidden" style={{ backgroundColor: '#14316A', marginTop: '0' }}>
            <div
                className="relative w-full px-2 sm:px-3 lg:px-4 flex items-center py-12 md:py-16 lg:py-20 rounded-t-[24px] md:rounded-t-[36px] lg:rounded-t-[48px]"
                style={{
                    background: '#14316A',
                    minHeight: 'auto',
                }}
            >
                <div
                    className="absolute inset-0 pointer-events-none z-0"
                    style={{
                        background: `
              repeating-linear-gradient(
                90deg,
                transparent 0px,
                transparent 29px,
                rgba(20, 100, 180, 0.5) 30px,
                rgba(20, 100, 180, 0.5) 31px,
                transparent 32px,
                transparent 59px
              )
            `,
                        maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,1) 40%, rgba(0,0,0,1) 60%, rgba(0,0,0,0.2) 80%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,1) 40%, rgba(0,0,0,1) 60%, rgba(0,0,0,0.2) 80%, transparent 100%)',
                    }}
                />
                <div
                    className="absolute inset-0 pointer-events-none z-0"
                    style={{
                        background: `
              repeating-linear-gradient(
                90deg,
                transparent 0px,
                transparent 29px,
                rgba(255, 255, 255, 0.1) 30px,
                rgba(255, 255, 255, 0.1) 31px,
                transparent 32px,
                transparent 59px
              ),
              linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.15) 20%, rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0.15) 80%, rgba(255, 255, 255, 0) 100%)
            `,
                        mixBlendMode: 'overlay',
                        maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,1) 40%, rgba(0,0,0,1) 60%, rgba(0,0,0,0.2) 80%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,1) 40%, rgba(0,0,0,1) 60%, rgba(0,0,0,0.2) 80%, transparent 100%)',
                    }}
                />
                <div
                    className="absolute inset-0 pointer-events-none z-0"
                    style={{
                        background: 'linear-gradient(to bottom, rgba(57, 166, 237, 0.2) 0%, rgba(57, 166, 237, 0.6) 50%, rgba(57, 166, 237, 0.2) 100%)',
                        maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,1) 40%, rgba(0,0,0,1) 60%, rgba(0,0,0,0.2) 80%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,1) 40%, rgba(0,0,0,1) 60%, rgba(0,0,0,0.2) 80%, transparent 100%)',
                    }}
                />
                <div
                    className="absolute inset-0 pointer-events-none z-0"
                    style={{
                        background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 40%, transparent 70%)',
                        maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,1) 40%, rgba(0,0,0,1) 60%, rgba(0,0,0,0.2) 80%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,1) 40%, rgba(0,0,0,1) 60%, rgba(0,0,0,0.2) 80%, transparent 100%)',
                    }}
                />

                <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full"
                            style={{
                                width: Math.random() * 40 + 20,
                                height: Math.random() * 40 + 20,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.2), transparent)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                opacity: Math.random() * 0.4 + 0.1
                            }}
                            animate={{
                                y: [0, Math.random() * -50, 0],
                                x: [0, Math.random() * 20 - 10, 0],
                                scale: [1, Math.random() * 0.3 + 0.9, 1],
                            }}
                            transition={{
                                duration: Math.random() * 5 + 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: Math.random() * 5
                            }}
                        />
                    ))}
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                    <motion.div
                        className="text-center mb-8 md:mb-12 lg:mb-16"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <motion.h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                            <motion.span className="block" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ duration: 0.5, delay: 0.3 }}>
                                {firstLine}
                            </motion.span>
                            <motion.span className="block" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ duration: 0.5, delay: 0.4 }}>
                                {secondLine}
                            </motion.span>
                        </motion.h2>
                    </motion.div>

                    <motion.div
                        className="flex flex-col lg:flex-row gap-4 md:gap-6 items-stretch justify-center"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        {cardData.map((card, index) => {
                            const isOpen = isCardOpen(index);
                            const displayTitle = cardTitles[index];
                            const isHovered = hoveredCardIndex === index;
                            const isClosed = isCardClosed(index);

                            return (
                                <motion.div
                                    key={index}
                                    className="relative overflow-hidden cursor-pointer w-full lg:min-w-[100px]"
                                    initial={false}
                                    animate={{
                                        flex: isMobile
                                            ? (isOpen ? 1 : 0)
                                            : (isOpen ? 3.5 : 0.4),
                                        minWidth: isMobile
                                            ? (isOpen ? '100%' : '100%')
                                            : (isOpen ? '752px' : '100px'),
                                        maxWidth: isMobile
                                            ? (isOpen ? '100%' : '100%')
                                            : (isOpen ? 'none' : '150px'),
                                        width: isMobile ? '100%' : undefined,
                                        height: isMobile
                                            ? (isOpen ? (isTablet ? '750px' : (index === 3 ? '600px' : '550px')) : '120px')
                                            : '734px',
                                    }}
                                    onClick={(e) => handleCardClick(index, e)}
                                    onMouseEnter={() => !isMobile && setHoveredCardIndex(index)}
                                    onMouseLeave={() => !isMobile && setHoveredCardIndex(null)}
                                    style={{
                                        backgroundColor: isClosed && isHovered && !isMobile
                                            ? '#BFE0FF'
                                            : '#ECF7FF',
                                        boxShadow: isOpen
                                            ? '0 10px 40px rgba(0, 0, 0, 0.1)'
                                            : isHovered && !isMobile
                                                ? '0 4px 20px rgba(0, 0, 0, 0.08)'
                                                : '0 2px 10px rgba(0, 0, 0, 0.05)',
                                        borderRadius: '1.5rem',
                                        border: '2px solid #1B67BA',
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        ease: [0.4, 0, 0.2, 1],
                                        type: "tween"
                                    }}
                                >
                                    <div className="h-full flex flex-col">
                                        {isOpen ? (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.1 }}
                                                className="p-8 md:p-10 lg:p-12 pb-0 mb-4"
                                            >
                                                {index === 0 ? (
                                                    <motion.img
                                                        src={logo}
                                                        alt="TagoCash"
                                                        className="h-8 sm:h-10 md:h-11 w-auto mx-auto"
                                                        initial={{ opacity: 0, y: 30 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.5, delay: 0.1 }}
                                                    />
                                                ) : (
                                                    <motion.h3
                                                        className="text-xl md:text-2xl lg:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#0D89D3] via-[#1C60B4] to-[#2E3293] text-center"
                                                        style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                                                        initial={{ opacity: 0, y: 30 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.5, delay: 0.1 }}
                                                    >
                                                        {displayTitle}
                                                    </motion.h3>
                                                )}
                                            </motion.div>
                                        ) : (
                                            <div className="h-full flex items-start justify-center p-8 md:pt-[260px] lg:pt-[280px]">
                                                <div className="flex items-center justify-start gap-2 md:gap-3" style={{ flexDirection: !isMobile ? 'column' : 'row' }}>
                                                    <img
                                                        src="/money_section_logo.png"
                                                        alt="TagoCash Logo"
                                                        className="shrink-0 block"
                                                        style={{
                                                            width: isMobile ? '30px' : '40px',
                                                            minWidth: isMobile ? '30px' : '40px',
                                                            maxWidth: isMobile ? '30px' : '40px',
                                                            height: 'auto',
                                                            objectFit: 'contain',
                                                            transform: !isMobile ? 'rotate(90deg)' : 'none',
                                                            marginBottom: !isMobile ? '10px' : '0',
                                                        }}
                                                    />
                                                    <h3
                                                        className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-black text-center"
                                                        style={{
                                                            writingMode: !isMobile ? 'vertical-rl' : 'horizontal-tb',
                                                            textOrientation: !isMobile ? 'mixed' : undefined,
                                                            color: index === 0 ? '#1B67BA' : index === 1 ? '#9333EA' : index === 2 ? '#EA580C' : '#0891B2',
                                                            fontWeight: '900',
                                                            textShadow: '0 2px 4px rgba(0, 0, 0, 0.15)',
                                                            letterSpacing: '0.5px',
                                                        }}
                                                    >
                                                        {displayTitle}
                                                    </h3>
                                                </div>
                                            </div>
                                        )}

                                        <AnimatePresence mode="sync">
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.1 }}
                                                    className={`overflow-hidden flex flex-col flex-1 px-6 md:px-8 lg:px-10 ${index === 3 ? 'pb-0' : 'pb-6 md:pb-8 lg:pb-10'}`}
                                                >
                                                    {index === 0 ? (
                                                        <div className="flex flex-col flex-1 h-full relative pb-16 md:pb-24">
                                                            {card1VideoId && (
                                                                <motion.div className="w-full flex items-center justify-center mb-1 pt-0 flex-shrink-0" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                                                                    <div className="w-full rounded-2xl shadow-xl max-w-[620px] overflow-hidden mx-auto" style={{ aspectRatio: '16/9', border: '1px solid rgba(27, 103, 186, 0.2)', backgroundColor: 'black' }}>
                                                                        <iframe src={`https://fast.wistia.net/embed/iframe/${card1VideoId}?videoFoam=true&autoplay=true&muted=true&loop=true&endVideoBehavior=loop`} title="Wistia Video Player" allow="autoplay; fullscreen" frameBorder="0" scrolling="no" className="w-full h-full" allowFullScreen></iframe>
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                            <div className="flex flex-col mt-4 md:mt-6 mb-8 max-w-[620px] mx-auto w-full">
                                                                {card.description && (
                                                                    <motion.div className="text-base md:text-lg text-gray-900 leading-tight font-normal text-left" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.3 }} style={{ whiteSpace: 'pre-line' }}>
                                                                        {card.description.split(/\n/).map((paragraph, idx) => {
                                                                            if (!paragraph.trim()) return null;
                                                                            const isCurrent = idx === currentParagraphIndex;
                                                                            const isPast = idx < currentParagraphIndex;
                                                                            return (
                                                                                <div key={idx} className="flex items-start gap-3 mb-4 last:mb-0">
                                                                                    <SpinningStar />
                                                                                    <div className="flex-1 grid grid-cols-1 grid-rows-1">
                                                                                        <span className="invisible col-start-1 row-start-1 text-base md:text-lg text-gray-900 leading-tight font-normal">{paragraph.trim()}</span>
                                                                                        <div className="col-start-1 row-start-1">
                                                                                            {isCurrent ? (
                                                                                                <TextType text={paragraph.trim()} className="text-base md:text-lg text-gray-900 leading-normal block" initialDelay={idx === 0 ? 500 : (isMobile ? 300 : 0)} typingSpeed={isMobile ? 40 : 25} showCursor={true} loop={false} startOnVisible={true} onTypingDone={() => { if (idx === currentParagraphIndex) { setTimeout(() => { setCurrentParagraphIndex(prev => prev + 1); }, isMobile ? 200 : 0); } }} />
                                                                                            ) : isPast ? (
                                                                                                <span className="text-base md:text-lg text-gray-900 leading-normal block">{paragraph.trim()}</span>
                                                                                            ) : null}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            );
                                                                        })}
                                                                    </motion.div>
                                                                )}
                                                            </div>
                                                            <motion.div className="absolute bottom-[-35px] md:bottom-[-28px] left-0 right-0 w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}>
                                                                <div className="flex flex-wrap items-center justify-center gap-2 md:gap-6 lg:gap-8 py-2 md:py-4 border-t border-blue-100/50">
                                                                    {['Fast.', 'Secure.', 'Private.', 'Compliant.', 'Trusted.'].map((feature, featureIndex) => (
                                                                        <motion.div key={featureIndex} className="flex items-center gap-1.5 md:gap-2 shrink-0" whileHover={{ scale: 1.05 }}>
                                                                            <SpinningStar style={{ marginTop: '0' }} />
                                                                            <span className="text-sm md:text-base lg:text-lg font-semibold text-gray-900 whitespace-nowrap">{feature}</span>
                                                                        </motion.div>
                                                                    ))}
                                                                </div>
                                                            </motion.div>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col flex-1">
                                                            {card.description && (
                                                                <motion.div className="text-base md:text-lg text-gray-900 leading-relaxed font-normal text-left mt-8 md:mt-12 mb-8 relative z-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ whiteSpace: 'pre-line' }}>
                                                                    {card.description.split(/\n/).map((paragraph, idx) => {
                                                                        if (!paragraph.trim()) return null;
                                                                        const isCurrent = idx === currentParagraphIndex;
                                                                        const isPast = idx < currentParagraphIndex;
                                                                        const cardLineHeight = index === 1 || index === 3 ? '1.5' : '1.8';
                                                                        return (
                                                                            <div key={idx} className="flex items-start gap-3 mb-2" style={{ opacity: (isCurrent || isPast) ? 1 : 0 }}>
                                                                                <SpinningStar />
                                                                                <div className="flex-1 grid grid-cols-1 grid-rows-1">
                                                                                    <span className="invisible col-start-1 row-start-1 text-base md:text-lg text-gray-900 font-normal" style={{ lineHeight: cardLineHeight }}>{paragraph.trim()}</span>
                                                                                    <div className="col-start-1 row-start-1">
                                                                                        {isCurrent ? (
                                                                                            <TextType text={paragraph.trim()} className="text-base md:text-lg text-gray-900 font-normal block" style={{ lineHeight: cardLineHeight }} initialDelay={idx === 0 ? 500 : (isMobile ? 300 : 0)} typingSpeed={isMobile ? 40 : 25} showCursor={true} loop={false} startOnVisible={true} onTypingDone={() => { if (idx === currentParagraphIndex) { setTimeout(() => { setCurrentParagraphIndex(prev => prev + 1); }, isMobile ? 200 : 0); } }} />
                                                                                        ) : isPast ? (
                                                                                            <span className="text-base md:text-lg text-gray-900 font-normal block" style={{ lineHeight: cardLineHeight }}>{paragraph.trim()}</span>
                                                                                        ) : null}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </motion.div>
                                                            )}
                                                            <motion.div className={`w-full flex items-center justify-center ${index === 3 ? (isMobile ? 'relative mt-auto mb-[-2px]' : 'absolute top-[330px] left-1/2 -translate-x-1/2') : 'relative mt-auto'}`} style={{ zIndex: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                                                {/* enhanced blue side gradients for index 2 (Essential) and 3 (Global) */}
                                                                {(index === 2 || index === 3) && (
                                                                    <>
                                                                        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-40 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #ECF7FF 15%, rgba(236, 247, 255, 0.8) 40%, transparent 100%)' }} />
                                                                        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-40 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #ECF7FF 15%, rgba(236, 247, 255, 0.8) 40%, transparent 100%)' }} />
                                                                    </>
                                                                )}
                                                                <img
                                                                    src={card.image}
                                                                    alt={cardTitles[index]}
                                                                    className="object-contain relative z-0 mx-auto block pointer-events-none"
                                                                    style={{
                                                                        width: index === 3 ? (isTablet ? '400px' : isMobile ? '90%' : '420px') : index === 2 ? '550px' : '300px',
                                                                        filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1))',
                                                                        maskImage: (index === 2 || index === 3)
                                                                            ? 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
                                                                            : 'none',
                                                                        WebkitMaskImage: (index === 2 || index === 3)
                                                                            ? 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
                                                                            : 'none',
                                                                        marginBottom: index === 3 && isMobile ? '-2px' : '0',
                                                                        verticalAlign: 'bottom',
                                                                    }}
                                                                />
                                                            </motion.div>
                                                        </div>
                                                    )}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default MoneySection;
