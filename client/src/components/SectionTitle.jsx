import React from "react";
import { motion } from "framer-motion";

function SectionTitle({ title }) {
  return (
    <motion.div
      className="flex gap-6 items-center py-10"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl sm:text-2xl font-display font-bold gradient-text whitespace-nowrap">
        {title}
      </h1>
      <div className="h-[1px] w-full bg-gradient-to-r from-tertiary/70 to-transparent" />
    </motion.div>
  );
}

export default SectionTitle;
