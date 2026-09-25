import React from "react";
import { motion } from "framer-motion";

const socials = [
  { icon: "ri-mail-fill", href: "mailto:jadwaniprem12@gmail.com", label: "Email" },
  { icon: "ri-linkedin-box-fill", href: "https://linkedin.com/in/prem-jadwani-5b8748221", label: "LinkedIn" },
  { icon: "ri-github-fill", href: "https://github.com/Prem790", label: "GitHub" },
];

function LeftSlider() {
  return (
    <div className="fixed left-6 bottom-0 z-40 sm:static sm:left-0 sm:py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center"
      >
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="grid place-items-center h-10 w-10 rounded-full glass text-gray-400 hover:text-secondary hover:shadow-glow-sm hover:-translate-y-1 transition-all duration-300"
          >
            <i className={`${s.icon} text-lg`} />
          </a>
        ))}
        <div className="w-[1px] h-28 bg-gradient-to-b from-tertiary/50 to-transparent sm:hidden" />
      </motion.div>
    </div>
  );
}

export default LeftSlider;
