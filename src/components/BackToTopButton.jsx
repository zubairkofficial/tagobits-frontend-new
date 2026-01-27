import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set the top cordinate to 0
    // make scrolling smooth
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    transition={{ duration: 0.3 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-6 z-50 cursor-pointer shadow-lg shadow-blue-500/30"
                >
                    <div className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors duration-300 md:p-4 group">
                        <FaArrowUp className="text-xl md:text-2xl group-hover:-translate-y-1 transition-transform duration-300" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BackToTopButton;
