import React from 'react';
import { motion } from 'framer-motion';
import { skills, competitiveProgramming } from '../data/portfolioData';

const SkillsSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Parallax Background specifically for this section */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-fixed bg-center opacity-30 dark:opacity-40"
        style={{ backgroundImage: 'url(/assets/TechnicalArsensalBackground.png)' }}
      ></div>
      {/* Gradient fade on top and bottom */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-50 via-transparent to-slate-50 dark:from-black dark:via-transparent dark:to-black"></div>

      <div className="relative z-10 px-6 md:px-12 lg:px-24 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
        >
        <h2 className="text-3xl font-bold mb-8">Technical Arsenal</h2>
        
        {/* Skills Pills */}
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto mb-16">
          {skills.map((skill, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="px-4 py-2 bg-slate-100 dark:bg-neutral-800 text-slate-800 dark:text-neutral-200 rounded-full text-sm font-medium border border-slate-200 dark:border-neutral-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition cursor-default"
            >
              {skill}
            </motion.span>
          ))}
        </div>

        {/* Competitive Programming */}
        <h3 className="text-xl font-bold mb-6 text-slate-500 dark:text-neutral-400">Competitive Programming Profiles</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {competitiveProgramming.map((cp, index) => (
            <a
              key={index}
              href={cp.link}
              target="_blank"
              rel="noreferrer"
              className={`px-6 py-3 rounded-xl text-white font-semibold shadow-lg hover:-translate-y-1 transition duration-300`}
              style={{
                backgroundColor: 
                  cp.color === 'orange' ? '#f97316' :
                  cp.color === 'blue' ? '#3b82f6' :
                  cp.color === 'purple' ? '#9333ea' :
                  '#16a34a'
              }}
            >
              {cp.platform}
            </a>
          ))}
        </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
