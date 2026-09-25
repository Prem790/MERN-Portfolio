import React from "react";
import { motion } from "framer-motion";

/**
 * A frosted-glass panel with an optional hover-lift effect.
 */
function GlassCard({ children, className = "", hover = true, ...rest }) {
  return (
    <motion.div
      whileHover={hover ? { y: -6 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`glass-card p-6 ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export default GlassCard;
