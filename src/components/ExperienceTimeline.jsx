import React from 'react';
import { motion } from 'framer-motion';
import { experience, education } from '../data/portfolioData';
import { Briefcase, GraduationCap } from 'lucide-react';

const ExperienceTimeline = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Parallax Background specifically for this section */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-fixed bg-center opacity-30 dark:opacity-40"
        style={{ backgroundImage: 'url(/assets/WorkExperiencebackground.png)' }}
      ></div>
      {/* Gradient fade on top and bottom */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-50 via-transparent to-slate-50 dark:from-black dark:via-transparent dark:to-black"></div>

      <div className="relative z-10 px-6 md:px-12 lg:px-24 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Experience Column */}
          <div>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Briefcase className="text-emerald-500" /> Experience
            </h2>
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 dark:before:via-slate-700 before:to-transparent">
              {experience.map((exp, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white dark:border-neutral-800 bg-slate-200 dark:bg-neutral-700 text-slate-500 dark:text-neutral-400 group-hover:text-emerald-500 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 transition duration-300 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
                    <Briefcase size={16} />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-5 rounded-2xl">
                    <div className="flex flex-col mb-2">
                      <h3 className="font-bold text-lg">{exp.title}</h3>
                      <time className="text-sm text-emerald-500 font-medium">{exp.date}</time>
                    </div>
                    <ul className="list-disc ml-4 text-sm text-slate-600 dark:text-neutral-400 space-y-1">
                      {exp.bullets.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <GraduationCap className="text-blue-500" /> Education
            </h2>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass p-6 rounded-2xl"
                >
                  <h3 className="font-bold text-lg">{edu.institution}</h3>
                  <p className="text-blue-500 font-medium text-sm my-1">{edu.degree}</p>
                  <p className="text-slate-500 dark:text-neutral-400 text-sm">{edu.date}</p>
                  <p className="text-slate-600 dark:text-neutral-300 text-sm mt-3 font-semibold">{edu.score}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;
