import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/portfolioData';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const ProjectsGrid = () => {
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Parallax Background specifically for this section */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-fixed bg-center opacity-30 dark:opacity-40"
        style={{ backgroundImage: 'url(/assets/Projectbackground.jpg)' }}
      ></div>
      {/* Gradient fade on top and bottom to blend with global background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-50 via-transparent to-slate-50 dark:from-black dark:via-transparent dark:to-black"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative z-10 px-6 md:px-12 lg:px-24 w-full"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Featured Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass p-6 rounded-2xl card-hover flex flex-col h-full"
            >
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-sm text-emerald-500 font-medium mb-4">{project.date}</p>
                <p className="text-sm text-slate-600 dark:text-neutral-400 mb-4 font-mono bg-slate-100 dark:bg-neutral-800 p-2 rounded-lg inline-block">
                  {project.tech}
                </p>
                <p className="text-slate-600 dark:text-neutral-300 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>
              
              <div className="mt-auto pt-4 border-t border-slate-200 dark:border-neutral-700">
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-neutral-200 hover:text-emerald-500 dark:hover:text-emerald-400 transition"
                >
                  <FaGithub size={16} /> View Repository <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectsGrid;
