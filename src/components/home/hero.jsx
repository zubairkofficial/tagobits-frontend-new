import { useEffect, useState } from 'react';

// components
import Button from '../button';
import LiquidEther from '../LiquidEther';
import TextType from '../TextType';
import { useTheme } from '../../context/ThemeContext';

const HERO_CARDS = [
    {
        id: 'qr',
        src: '/qr code.png',
        alt: 'QR code payment',
    },
    {
        id: 'secure',
        src: '/secure payment.png',
        alt: 'Secure payment confirmation',
    },
    {
        id: 'card',
        src: '/card.png',
        alt: 'Tagobits virtual card',
    },
];

const Hero = () => {
    const { theme } = useTheme();
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % HERO_CARDS.length);
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    const centerCard = HERO_CARDS[activeIndex];
    const rightCard = HERO_CARDS[(activeIndex + 1) % HERO_CARDS.length];
    const leftCard = HERO_CARDS[(activeIndex + 2) % HERO_CARDS.length];

    // Rotation helpers so side cards stay tilted,
    // but images inside the phone stay perfectly straight.
    const getSideRotationClass = (id, position) => {
        if (id === 'card') {
            // Card strongly tilted on both sides (side positions only)
            return position === 'left' ? 'rotate-[-18deg]' : 'rotate-[18deg]';
        }
        if (id === 'secure') {
            // Secure payment slightly tilted
            return position === 'left' ? 'rotate-[-14deg]' : 'rotate-[10deg]';
        }
        // QR code very light tilt
        return position === 'left' ? 'rotate-[-8deg]' : 'rotate-[6deg]';
    };

    const getCenterRotationClass = (id) => {
        // Counter‑rotate the pre‑tilted assets so they look straight INSIDE the phone
        if (id === 'card') return 'rotate-[9deg]';
        if (id === 'secure') return 'rotate-[-9deg]';
        return '';
    };

    return (
        <div className='relative overflow-hidden bg-white dark:bg-transparent transition-colors duration-300 -mt-3 w-full'>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 dark:hidden overflow-hidden">
                <div className="w-[800px] h-[800px] bg-[radial-gradient(circle,_rgba(59,130,246,0.2)_0%,_transparent_70%)] rounded-full"></div>
            </div>
            <div className="absolute inset-0 hidden dark:block z-0 overflow-hidden">
                <LiquidEther
                    className="w-full h-full"
                    colors={['#218DCD', '#2A63AA', '#2E388E']}
                    autoDemo={true}
                    autoSpeed={0.35}
                    autoIntensity={2}
                />
            </div>
            <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 md:px-10 pt-10 sm:pt-12 md:pt-14 w-full max-w-6xl mx-auto">
                <h1
                    className={`text-[36px] sm:text-[44px] md:text-[52px] lg:text-[60px] xl:text-[64px] roboto-medium text-center max-w-[872px] leading-[1.1] ${
                        theme === 'dark' ? 'text-white' : 'text-primary'
                    }`}
                >
                    The Digital Money for{' '}
                    <TextType
                        as="span"
                        text={[
                            'Global payments',
                            'Borderless payments',
                            'Global transactions',
                        ]}
                        typingSpeed={55}
                        deletingSpeed={35}
                        pauseDuration={1500}
                        showCursor={true}
                        cursorClassName={theme === 'dark' ? 'text-white' : 'text-primary'}
                        className="inline-block whitespace-nowrap align-bottom"
                        style={{ minWidth: '22ch', display: 'inline-block' }}
                        renderContent={(currentText, { fullText }) => {
                            const spaceIndex = fullText.indexOf(' ');
                            const firstWordColor = theme === 'dark' ? 'text-[#60A5FA]' : 'text-black';
                            const restColor = theme === 'dark' ? 'text-white' : 'text-primary';

                            if (spaceIndex === -1) {
                                return <span className={firstWordColor}>{currentText}</span>;
                            }
                            const firstWordEnd = spaceIndex;
                            const firstWordLength = Math.min(currentText.length, firstWordEnd);
                            const firstPart = currentText.slice(0, firstWordLength);
                            const restPart = currentText.slice(firstWordLength);
                            return (
                                <>
                                    <span className={firstWordColor}>{firstPart}</span>
                                    <span className={restColor}>{restPart}</span>
                                </>
                            );
                        }}
                    />
                </h1>


                <div className=" w-full max-w-5xl flex items-center justify-center">
                    <div className="relative w-full flex items-center justify-center">
                        {/* Left floating card (desktop only) */}
                        <div className="hidden md:block absolute left-0 lg:-left-10 top-1/2 -translate-y-1/2">
                            <img
                                key={leftCard.id}
                                src={leftCard.src}
                                alt={leftCard.alt}
                                className={`w-[110px] lg:w-[140px] xl:w-[160px] drop-shadow-xl rounded-2xl ${getSideRotationClass(leftCard.id, 'left')}`}
                            />
                        </div>

                        {/* Right floating card (desktop only) */}
                        <div className="hidden md:block absolute right-0 lg:-right-10 top-1/2 -translate-y-1/2">
                            <img
                                key={rightCard.id}
                                src={rightCard.src}
                                alt={rightCard.alt}
                                className={`w-[110px] lg:w-[140px] xl:w-[160px] drop-shadow-xl rounded-2xl ${getSideRotationClass(rightCard.id, 'right')}`}
                            />
                        </div>

                        {/* Center phone with animated screen */}
                        <div className="relative w-[260px] sm:w-[330px] md:w-[350px] lg:w-[360px] xl:w-[385px] mx-auto">
                            <img
                                src="/Iphone 14 - 2.png"
                                alt="Tagobits mobile app"
                                className="w-full drop-shadow-2xl"
                            />
                            {/* Screen content (uses active card) */}
                            <div className="absolute right-[31%] top-[26%] flex items-center justify-center pointer-events-none">
                                <img
                                    key={centerCard.id}
                                    src={centerCard.src}
                                    alt={centerCard.alt}
                                    className={`max-w-[110px] sm:max-w-[162px] hero-center-slide ${getCenterRotationClass(centerCard.id)}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero;