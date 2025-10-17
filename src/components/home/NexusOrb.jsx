import { useState, useEffect } from 'react';
import tagocashaxiosinstance, { API_BASE_URL } from '../../utils/tagocashaxiosinstance';

// Wrapper for individual logos to give them the glassy container style and hover effects
const LogoWrapper = ({ children, className = "", isHighlighted = false, isHovered = false, animationDelay = 0, title = null }) => (
    <div className={`
        backdrop-blur-xl rounded-2xl flex items-center justify-center transition-all duration-300 relative
        ${isHighlighted
            ? 'dark:bg-gray-700/50 bg-gray-100/80 border border-blue-400/50 dark:shadow-blue-500/20 shadow-blue-400/30 shadow-2xl animate-breathing-glow'
            : `dark:bg-white/5 bg-white/60 border border-gray-200/50 dark:border-white/10 ${!isHovered && 'animate-float'}`
        }
        ${isHovered
            ? 'dark:bg-gray-600/50 bg-gray-200/80 border-blue-400/60 scale-110 dark:shadow-blue-400/30 shadow-blue-400/40 shadow-2xl z-999'
            : 'dark:hover:bg-white/10 hover:bg-gray-100/80 dark:hover:border-white/20 hover:border-gray-300/60 z-10'
        }
        ${className}
    `}
        style={{ animationDelay: `${animationDelay}s` }}
    >
        {children}
        {isHovered && title && title.trim() !== '' && title !== 'undefined' && (
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded-md shadow-md opacity-0 animate-slide-up">
                {title}
            </div>
        )}
    </div>
);

const LogoGrid = ({ logos }) => {
    const [hoveredId, setHoveredId] = useState(null);
    const displayedLogos = logos;
    const centerLogo = displayedLogos.find(logo => logo.is_center) || null;
    const outerLogos = displayedLogos.filter(logo => !logo.is_center);
    
    // Constants for layout calculation
    const radius = 300;
    const centralIconRadius = 48;
    const outerIconRadius = 60;
    const svgSize = 500;
    const svgCenter = svgSize / 2;

    return (
        <div className="relative w-[500px] h-[500px] scale-55 lg:scale-100 lg:my-40">
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
                                className="transition-all duration-300 dark:stroke-gray-600"
                                style={{
                                    opacity: hoveredId === logo.id ? 1 : 0.3,
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
                                className="w-full h-full object-contain p-2"
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
                                    className="w-30 h-30"
                                    isHovered={hoveredId === logo.id}
                                    animationDelay={i * 0.2}
                                    title={logo.title}
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
        <div className="w-full flex items-center justify-center font-sans p-8 overflow-hidden">
            <style>
                {`
                    @keyframes float {
                        0% { transform: translateY(0px); }
                        50% { transform: translateY(-10px); }
                        100% { transform: translateY(0px); }
                    }
                    .animate-float {
                        animation: float 4s ease-in-out infinite;
                    }

                    @keyframes breathing-glow {
                        0% { box-shadow: 0 0 20px 0px rgba(59, 130, 246, 0.3); }
                        50% { box-shadow: 0 0 35px 10px rgba(59, 130, 246, 0.1); }
                        100% { box-shadow: 0 0 20px 0px rgba(59, 130, 246, 0.3); }
                    }
                    @keyframes breathing-glow-light {
                        0% { box-shadow: 0 0 20px 0px rgba(59, 130, 246, 0.2); }
                        50% { box-shadow: 0 0 35px 10px rgba(59, 130, 246, 0.05); }
                        100% { box-shadow: 0 0 20px 0px rgba(59, 130, 246, 0.2); }
                    }
                    .animate-breathing-glow {
                        animation: breathing-glow 3s ease-in-out infinite;
                    }
                    .dark .animate-breathing-glow {
                        animation: breathing-glow 3s ease-in-out infinite;
                    }
                    :not(.dark) .animate-breathing-glow {
                        animation: breathing-glow-light 3s ease-in-out infinite;
                    }
                    @keyframes slide-up {
                        0% { opacity: 0; transform: translateY(10px); }
                        100% { opacity: 1; transform: translateY(0); }
                    }
                    .animate-slide-up {
                        animation: slide-up 0.3s ease-out forwards;
                    }
                `}
            </style>

            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
            </div>

            <div className="relative z-10 container mx-auto flex items-center justify-center">
                <LogoGrid logos={logos} />
            </div>
        </div>
    );
};

export default NexusOrb;

