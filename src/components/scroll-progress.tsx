'use client';

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, reduceMotion ? { stiffness: 1000, damping: 1000 } : { stiffness: 180, damping: 28, mass: 0.24 });

  return <motion.div aria-hidden="true" className="scroll-progress" style={{ scaleX }} />;
}
