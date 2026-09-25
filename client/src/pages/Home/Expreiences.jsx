import React from "react";
import SectionTitle from "../../components/SectionTitle";
import Reveal from "../../components/Reveal";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

function Expreiences() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const { portfolioData } = useSelector((state) => state.root);
  const expreiences = portfolioData?.expreiences || [];

  if (expreiences.length === 0) {
    return (
      <div className="py-16">
        <SectionTitle title="Experience" />
        <p className="text-tertiary py-10">No experiences added yet.</p>
      </div>
    );
  }

  const selected = expreiences[selectedItemIndex] || expreiences[0];

  return (
    <div className="py-16">
      <SectionTitle title="Experience" />
      <div className="flex py-6 gap-12 sm:flex-col">
        {/* Tab list */}
        <div className="flex flex-col gap-2 w-1/3 sm:flex-row sm:overflow-x-auto sm:w-full">
          {expreiences.map((experience, index) => {
            const active = selectedItemIndex === index;
            return (
              <button
                key={experience._id || index}
                onClick={() => setSelectedItemIndex(index)}
                className={`text-left px-5 py-4 rounded-xl whitespace-nowrap transition-all duration-300 relative ${
                  active
                    ? "glass text-white shadow-glow-sm"
                    : "text-tertiary hover:text-white hover:bg-white/5"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="exp-active"
                    className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-secondary"
                  />
                )}
                <span className="text-lg font-medium">{experience.period}</span>
              </button>
            );
          })}
        </div>

        {/* Detail */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedItemIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="glass-card p-8 flex flex-col gap-3"
            >
              <h3 className="text-secondary text-2xl font-display font-semibold">
                {selected.title}
              </h3>
              <h4 className="text-tertiary text-lg">{selected.company}</h4>
              <p className="text-gray-300 leading-relaxed mt-2">
                {selected.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Expreiences;
