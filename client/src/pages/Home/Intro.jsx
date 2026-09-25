import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Typewriter from "../../components/Typewriter";
import Stats from "../../components/Stats";
import { siteConfig } from "../../siteConfig";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function Intro() {
  const { portfolioData } = useSelector((state) => state.root);
  const { intro } = portfolioData;
  const { firstName, lastName, welcomeText, description } = intro;

  return (
    <div className="relative min-h-[92vh] flex flex-col justify-center gap-6 py-24 overflow-hidden">
      {/* Floating glow blobs */}
      <div className="pointer-events-none absolute -top-10 right-0 h-80 w-80 rounded-full bg-secondary/20 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute bottom-10 left-1/4 h-72 w-72 rounded-full bg-tertiary/20 blur-3xl animate-blob [animation-delay:4s]" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col gap-5"
      >
        <motion.span
          variants={item}
          className="inline-flex items-center gap-2 self-start glass px-4 py-2 rounded-full text-sm text-secondary"
        >
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          {siteConfig.availability}
        </motion.span>

        <motion.p variants={item} className="text-gray-400 text-lg">
          {welcomeText || "Hi, I'm"}
        </motion.p>

        <motion.h1
          variants={item}
          className="text-7xl sm:text-4xl lg:text-6xl font-display font-bold leading-[1.05]"
        >
          <span className="gradient-text">
            {firstName || ""} {lastName || ""}
          </span>
        </motion.h1>

        <motion.h2
          variants={item}
          className="text-3xl sm:text-xl lg:text-2xl text-white/80 font-display font-medium min-h-[1.4em]"
        >
          <Typewriter words={siteConfig.roles} />
        </motion.h2>

        <motion.p variants={item} className="text-gray-300 max-w-2xl leading-relaxed">
          {description || ""}
        </motion.p>

        <motion.div variants={item} className="flex gap-4 sm:flex-col mt-2">
          <a
            href="#projects"
            className="px-8 py-3 rounded-full bg-secondary text-base font-semibold text-black hover:shadow-glow transition-shadow"
          >
            View my work
          </a>
          <a
            href={siteConfig.resumeUrl}
            download
            className="px-8 py-3 rounded-full glass text-secondary font-semibold hover:border-secondary/60 transition-colors inline-flex items-center gap-2 justify-center"
          >
            <i className="ri-download-line" /> Download Resume
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-full text-white/80 font-semibold hover:text-secondary transition-colors inline-flex items-center gap-2 justify-center"
          >
            Get in touch
          </a>
        </motion.div>
      </motion.div>

      {/* Stats */}
      <div className="relative z-10 mt-6">
        <Stats />
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1, duration: 1.6, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-secondary text-2xl sm:hidden"
      >
        <i className="ri-arrow-down-line" />
      </motion.a>
    </div>
  );
}

export default Intro;
