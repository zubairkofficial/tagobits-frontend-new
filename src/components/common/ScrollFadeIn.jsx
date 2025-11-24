import { motion } from 'framer-motion';

const ScrollFadeIn = ({
  children,
  delay = 0,
  duration = 0.7,
  offset = 40,
  className = '',
  once = true,
  amount = 0.2
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: offset, filter: 'blur(8px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once, amount }}
    transition={{
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1]
    }}
  >
    {children}
  </motion.div>
);

export default ScrollFadeIn;

