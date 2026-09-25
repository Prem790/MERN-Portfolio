import React from "react";
import SectionTitle from "../../components/SectionTitle";
import Reveal from "../../components/Reveal";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

function About() {
  const { portfolioData } = useSelector((state) => state.root);
  const { about } = portfolioData;
  const { skills, lottieURL, description1, description2 } = about;

  return (
    <div className="py-16">
      <SectionTitle title="About Me" />

      <div className="flex w-full items-center gap-10 sm:flex-col">
        <Reveal className="w-1/2 sm:w-full">
          <div className="glass-card p-4 h-[52vh] flex items-center justify-center">
            <dotlottie-player
              src={lottieURL}
              background="transparent"
              speed="1"
              style={{ width: "100%", height: "100%" }}
              loop
              autoplay
            ></dotlottie-player>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="w-1/2 sm:w-full">
          <div className="flex flex-col gap-5">
            <p className="text-gray-300 leading-relaxed">{description1 || ""}</p>
            <p className="text-gray-300 leading-relaxed">{description2 || ""}</p>
          </div>
        </Reveal>
      </div>

      <div className="py-10">
        <Reveal>
          <h3 className="text-tertiary text-lg mb-8">
            The tools & technologies I build with:
          </h3>
        </Reveal>
        <motion.div
          className="flex flex-wrap gap-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
        >
          {skills.map((skill, index) => (
            <motion.span
              key={index}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                show: { opacity: 1, scale: 1 },
              }}
              whileHover={{ y: -4 }}
              className="glass px-5 py-2.5 rounded-full text-sm font-semibold uppercase tracking-wide text-secondary hover:shadow-glow-sm transition-shadow"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default About;
