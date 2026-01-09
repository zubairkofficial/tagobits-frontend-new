import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import tagocashaxiosinstance, { API_BASE_URL } from '../../utils/tagocashaxiosinstance';

// Wrapper for individual logos to give them the glassy container style and hover effects
const LogoWrapper = ({ children, className = "", isHighlighted = false, isHovered = false, title = null, delay = 0 }) => {
    const baseClasses = "backdrop-blur-xl rounded-2xl flex items-center justify-center transition-all duration-300 relative";

    const highlightedClasses = isHighlighted
        ? "bg-gray-100/80 border border-blue-400/50 shadow-blue-400/30 shadow-2xl"
        : "bg-white/60 border border-gray-200/50";

    return (
        <motion.div
            className={`${baseClasses} ${highlightedClasses} ${className}`}
            animate={{
                y: [0, -10, 0],
                x: [0, 5, 0]
            }}
            transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay
            }}
            whileHover={{
                scale: 1.25,
                zIndex: 100,
                transition: { duration: 0.3 }
            }}
        >
            {children}
            {isHovered && title && title.trim() !== '' && title !== 'undefined' && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded-md shadow-md whitespace-nowrap z-[110]"
                >
                    {title}
                </motion.div>
            )}
        </motion.div>
    );
};

const LogoGrid = ({ logos }) => {
    const [hoveredId, setHoveredId] = useState(null);
    const displayedLogos = logos;
    const centerLogo = displayedLogos.find(logo => logo.is_center) || null;
    const outerLogos = displayedLogos.filter(logo => !logo.is_center);

    // Constants for layout calculation (Increased for bigger orb)
    const radius = 380;
    const centralIconRadius = 60;
    const outerIconRadius = 80;
    const svgSize = 900;
    const svgCenter = svgSize / 2;

    return (
        <div className="relative w-[900px] h-[900px] scale-[0.4] lg:scale-100 lg:mt-32 lg:mb-10">
            {/* SVG container for all connecting lines */}
            <svg
                width={svgSize}
                height={svgSize}
                className=""
            >
                <g>
                    {outerLogos.map((logo, i) => {
                        const angleInDegrees = -150 + i * (360 / outerLogos.length);
                        const angleInRadians = angleInDegrees * (Math.PI / 180);
                        const startX = svgCenter + centralIconRadius * Math.cos(angleInRadians);
                        const startY = svgCenter + centralIconRadius * Math.sin(angleInRadians);
                        const endX = svgCenter + (radius - outerIconRadius) * Math.cos(angleInRadians);
                        const endY = svgCenter + (radius - outerIconRadius) * Math.sin(angleInRadians);
                        return (
                            <line
                                key={`line-${logo.id}`}
                                x1={startX}
                                y1={startY}
                                x2={endX}
                                y2={endY}
                                stroke={hoveredId === logo.id ? '#3B82F6' : '#6B7280'}
                                strokeWidth="2"
                                className="transition-all duration-300"
                                style={{
                                    opacity: hoveredId === logo.id ? 1 : 0.25,
                                    zIndex: hoveredId === logo.id ? 15 : 0
                                }}
                            />
                        );
                    })}
                </g>
            </svg>

            {/* The main container that acts as the center for the circle */}
            <div className="absolute top-1/2 left-1/2">
                {/* Center Logo */}
                <div className="absolute -translate-x-1/2 -translate-y-1/2 z-10">
                    <LogoWrapper className="w-40 h-40" isHighlighted={true} animationDelay={0} title={centerLogo?.title}>
                        {centerLogo ? (
                            <img
                                src={`${API_BASE_URL}/fetch-partnerlogo/${centerLogo.image_path}`}
                                alt={centerLogo.title || "Center Logo"}
                                className="w-full h-full object-contain p-4"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500">
                                No Logo
                            </div>
                        )}
                    </LogoWrapper>
                </div>

                {/* Outer logos */}
                {outerLogos.map((logo, i) => {
                    const angleInDegrees = -150 + i * (360 / outerLogos.length);
                    const angleInRadians = angleInDegrees * (Math.PI / 180);
                    const x = radius * Math.cos(angleInRadians);
                    const y = radius * Math.sin(angleInRadians);
                    const logoStyle = {
                        transform: `translate(${x}px, ${y}px)`
                    };
                    return (
                        <div
                            key={logo.id}
                            className={`absolute ${hoveredId === logo.id ? 'z-50' : 'z-10'}`}
                            style={logoStyle}
                            onMouseEnter={() => setHoveredId(logo.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            <div className="-translate-x-1/2 -translate-y-1/2">
                                <LogoWrapper
                                    className="w-28 h-28"
                                    isHovered={hoveredId === logo.id}
                                    title={logo.title}
                                    delay={i * 0.2}
                                >
                                    <img
                                        src={`${API_BASE_URL}/fetch-partnerlogo/${logo.image_path}`}
                                        alt={logo.title || "Logo"}
                                        className="w-full h-full object-contain p-2"
                                    />
                                </LogoWrapper>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const NexusOrb = () => {
    const [logos, setLogos] = useState([]);

    useEffect(() => {
        const fetchLogos = async () => {
            try {
                const response = await tagocashaxiosinstance.get("/partnerlogos");
                setLogos(response.data);
            } catch (error) {
                console.error("Error fetching logos:", error);
            }
        };
        fetchLogos();
    }, []);

    return (
        <div className="w-full flex items-center justify-center font-sans p-8 overflow-hidden bg-white transition-colors duration-300">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.05),rgba(255,255,255,0))]"></div>
            </div>

            <div className="relative z-10 container mx-auto flex items-center justify-center">
                <LogoGrid logos={logos} />
            </div>
        </div>
    );
};

export default NexusOrb;

