import React from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { siteConfig } from "../siteConfig";

function Counter({ value, suffix }) {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const mv = useMotionValue(0);
  const [display, setDisplay] = React.useState("0");
  const isFloat = !Number.isInteger(value);

  React.useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(isFloat ? v.toFixed(1) : Math.round(v).toString()),
    });
    return controls.stop;
  }, [inView, value, mv, isFloat]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

function Stats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-3 sm:grid-cols-1 gap-6 py-8"
    >
      {siteConfig.stats.map((s) => (
        <div
          key={s.label}
          className="glass-card p-6 text-center flex flex-col gap-1"
        >
          <span className="text-4xl sm:text-3xl font-display font-bold gradient-text">
            <Counter value={s.value} suffix={s.suffix} />
          </span>
          <span className="text-sm text-gray-400">{s.label}</span>
        </div>
      ))}
    </motion.div>
  );
}

export default Stats;
