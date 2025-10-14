import React from 'react';

const Button = ({ 
    background = "#2A3E9C", 
    color = "#ffffff", 
    buttontext, 
    padding, // Remove default padding to use responsive classes
    border = "none", 
    hoverBackground, 
    hoverColor,
    hoverBorder,
    borderRadius = "12.27px"
}) => {
    
    const buttonRef = React.useRef(null);
    
    React.useEffect(() => {
        const button = buttonRef.current;
        if (!button) return;
        
        const handleMouseEnter = () => {
            if (hoverBackground) {
                button.style.background = hoverBackground;
            }
            if (hoverColor) {
                button.style.color = hoverColor;
            }
            if (hoverBorder) {
                button.style.border = hoverBorder;
            }
        };
        
        const handleMouseLeave = () => {
            button.style.background = background;
            button.style.color = color;
            button.style.border = border === "none" ? "2px solid transparent" : border;
        };
        
        button.addEventListener('mouseenter', handleMouseEnter);
        button.addEventListener('mouseleave', handleMouseLeave);
        
        return () => {
            button.removeEventListener('mouseenter', handleMouseEnter);
            button.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [background, color, border, hoverBackground, hoverColor, hoverBorder]);
    
    // Check if padding is Tailwind classes or CSS values
    const isTailwindPadding = padding && padding.includes('px-') || padding && padding.includes('py-');
    
    // Responsive padding classes: smaller on mobile, larger on desktop
    const responsivePaddingClass = padding && !isTailwindPadding ? '' : 
        padding && isTailwindPadding ? padding : 
        'px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-3 lg:px-10 lg:py-3';
    
    const styles = {
        background: background,
        color: color,
        padding: padding && !isTailwindPadding ? padding : undefined, // Only use inline padding for CSS values, not Tailwind classes
        border: border === "none" ? "2px solid transparent" : border,
        borderRadius: borderRadius,
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out',
        display: 'inline-block',
        textAlign: 'center',
        fontFamily: 'Roboto, sans-serif',
        fontWeight: '500',
        textDecoration: 'none',
        outline: 'none',
        userSelect: 'none'
    };
    
    return (
        <div 
            ref={buttonRef}
            style={styles}
            className={responsivePaddingClass}
        >
            {buttontext}
        </div>
    );
};

export default Button;