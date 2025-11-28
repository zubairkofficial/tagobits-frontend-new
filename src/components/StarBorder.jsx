const StarBorder = ({
  className = '',
  color = '#00ffff',
  speed = '6s',
  thickness = 2,
  children,
  ...rest
}) => {
  const { style, ...restProps } = rest;
  const colorValue = color === 'cyan' ? '#00ffff' : color;

  return (
    <div
      className={`relative inline-block overflow-hidden rounded-[20px] ${className}`}
      style={{
        padding: `${thickness}px`,
        borderRadius: '20px',
        ...style
      }}
      {...restProps}
    >
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{
          background: `radial-gradient(circle, ${colorValue}, transparent 10%)`,
          animationDuration: speed
        }}
      />
      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{
          background: `radial-gradient(circle, ${colorValue}, transparent 10%)`,
          animationDuration: speed
        }}
      />
      <div className="relative z-10 bg-white/80 dark:bg-gray-900/60 border-2 rounded-[20px]" style={{ borderColor: colorValue }}>
        {children}
      </div>
    </div>
  );
};

export default StarBorder;

