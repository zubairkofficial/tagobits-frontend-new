import React, { Suspense, useRef, useState, useEffect } from 'react';
import { LoaderFull } from './loader';

const HomeComponentLoader = ({
  component: Component,
  fallback = <LoaderFull />,
  threshold = 0.1,
  rootMargin = '0px',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div ref={ref} className="w-full">
      {isVisible ? (
        <Suspense fallback={fallback}>
          <Component />
        </Suspense>
      ) : (
        <div className="w-full h-32 bg-gray-100 animate-pulse rounded-lg" />
      )}
    </div>
  );
};

export default HomeComponentLoader;
