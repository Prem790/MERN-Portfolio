import React from "react";
import { motion } from "framer-motion";

/**
 * Reveals its children with a smooth entrance animation when scrolled into view.
 * Usage: <Reveal delay={0.1}><YourContent /></Reveal>
 */
function Reveal({ children, delay = 0, y = 28, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;
