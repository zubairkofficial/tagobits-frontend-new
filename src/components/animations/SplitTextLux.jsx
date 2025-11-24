import { useLayoutEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';

const SplitTextLux = ({
  text,
  as: Component = 'h1',
  className = '',
  stagger = 0.025,
  duration = 1,
  delay = 0,
  animateOnce = true
}) => {
  const containerRef = useRef(null);

  const characters = useMemo(
    () =>
      text.split('').map((char, index) => ({
        char: char === ' ' ? '\u00A0' : char,
        key: `${char}-${index}`
      })),
    [text]
  );

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const targets = containerRef.current?.querySelectorAll('.split-char');
      if (!targets || targets.length === 0) return;

      gsap.fromTo(
        targets,
        {
          yPercent: 120,
          opacity: 0,
          rotateX: 30,
          filter: 'blur(8px)'
        },
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          filter: 'blur(0px)',
          ease: 'power4.out',
          duration,
          stagger,
          delay
        }
      );
    }, containerRef);

    return () => {
      if (animateOnce) {
        ctx.kill();
      }
    };
  }, [delay, duration, stagger, animateOnce]);

  return (
    <Component
      ref={containerRef}
      className={`inline-flex flex-wrap will-change-transform ${className}`}
    >
      {characters.map(({ char, key }) => (
        <span
          key={key}
          className="split-char inline-block will-change-transform"
          aria-hidden="true"
        >
          {char}
        </span>
      ))}
      <span className="sr-only">{text}</span>
    </Component>
  );
};

export default SplitTextLux;

