import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { siteConfig } from "../../siteConfig";

const cleanUrl = (link) => `https://${link.replace(/(^\w+:|^)\/\//, "")}`;
const gradients = [
  "from-secondary/30 to-tertiary/10",
  "from-tertiary/30 to-secondary/10",
  "from-cyan-500/25 to-teal-500/10",
  "from-teal-400/25 to-cyan-600/10",
];

function Projects() {
  const { portfolioData } = useSelector((state) => state.root);
  const projects = portfolioData?.projects || [];
  const featured = projects.slice(0, 4);

  return (
    <div className="py-16">
      <SectionTitle title="Featured Projects" />

      {featured.length === 0 ? (
        <p className="text-tertiary py-10">No projects added yet.</p>
      ) : (
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-1 gap-8 py-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          {featured.map((project, index) => {
            const live = project.liveLink || project.link;
            const repo = project.githubLink;
            return (
              <motion.article
                key={project._id || index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                whileHover={{ y: -8 }}
                className="glass-card group overflow-hidden !p-0 flex flex-col"
              >
                {/* Banner: real image if present, else a gradient cover */}
                <div className="relative h-40 overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div
                      className={`h-full w-full bg-gradient-to-br ${
                        gradients[index % gradients.length]
                      } flex items-center justify-center`}
                    >
                      <span className="font-display text-6xl font-bold text-white/15">
                        0{index + 1}
                      </span>
                      <i className="ri-terminal-box-line absolute text-4xl text-secondary/70" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-base/80 to-transparent" />
                </div>

                <div className="flex flex-col gap-4 p-6 flex-1">
                  <h3 className="text-secondary text-xl font-display font-semibold leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed flex-1">
                    {project.description}
                  </p>

                  {Array.isArray(project.technologies) &&
                    project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="text-xs px-3 py-1 rounded-full border border-tertiary/40 text-tertiary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                  {(live || repo) && (
                    <div className="flex gap-4 mt-1">
                      {live && live.trim() && (
                        <a
                          href={cleanUrl(live)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-secondary font-semibold text-sm hover:gap-2.5 transition-all"
                        >
                          Live <i className="ri-external-link-line" />
                        </a>
                      )}
                      {repo && repo.trim() && (
                        <a
                          href={cleanUrl(repo)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-gray-300 font-semibold text-sm hover:text-secondary transition-colors"
                        >
                          Code <i className="ri-github-line" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      )}

      <div className="flex justify-center pt-6">
        <a
          href={siteConfig.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full glass text-secondary font-semibold hover:shadow-glow hover:border-secondary/60 transition-all"
        >
          <i className="ri-github-fill text-lg" /> View all projects on GitHub
        </a>
      </div>
    </div>
  );
}

export default Projects;
