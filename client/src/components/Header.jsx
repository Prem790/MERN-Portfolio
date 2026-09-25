import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experiences" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

function Header() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "nav-glass py-3" : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-24 lg:px-12 sm:px-5">
        <a
          href="#top"
          className="flex items-center gap-1 text-2xl font-display font-bold"
        >
          <span className="text-secondary">P</span>
          <i className="ri-code-s-slash-line text-white" />
          <span className="text-tertiary">J</span>
        </a>

        {/* Desktop nav */}
        <nav className="flex items-center gap-7 sm:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-gray-300 hover:text-secondary transition-colors relative group whitespace-nowrap"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-secondary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="/resume.pdf"
            download
            className="ml-1 px-4 py-2 rounded-full bg-secondary text-black text-sm font-semibold hover:shadow-glow transition-shadow whitespace-nowrap"
          >
            Resume
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="hidden sm:flex text-2xl text-white"
        >
          <i className={open ? "ri-close-line" : "ri-menu-line"} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="hidden sm:flex flex-col overflow-hidden glass mt-3 mx-5 rounded-xl"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-6 py-4 text-gray-200 hover:text-secondary hover:bg-white/5 transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/resume.pdf"
              download
              onClick={() => setOpen(false)}
              className="px-6 py-4 text-secondary font-semibold hover:bg-white/5 transition-colors"
            >
              Download Resume
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Header;
