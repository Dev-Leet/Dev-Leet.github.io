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
        <div className="flex flex-col gap-20">
          
          {/* Experience Section */}
          <div className="flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center justify-center gap-3 w-full">
              <Briefcase className="text-emerald-500" /> Experience
            </h2>
            <div className="w-full max-w-5xl space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 dark:before:via-slate-700 before:to-transparent">
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
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-6 rounded-2xl">
                    <div className="flex flex-col mb-4 md:items-center text-center">
                      <h3 className="font-bold text-xl">{exp.title}</h3>
                      <time className="text-sm text-emerald-500 font-medium mt-1">{exp.date}</time>
                    </div>
                    <ul className="list-disc ml-4 text-sm text-slate-600 dark:text-neutral-400 space-y-2 text-justify">
                      {exp.bullets.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div className="flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center justify-center gap-3 w-full">
              <GraduationCap className="text-blue-500" /> Education
            </h2>
            <div className="w-full max-w-5xl space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 dark:before:via-slate-700 before:to-transparent">
              {education.map((edu, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white dark:border-neutral-800 bg-slate-200 dark:bg-neutral-700 text-slate-500 dark:text-neutral-400 group-hover:text-blue-500 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition duration-300 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
                    <GraduationCap size={16} />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-6 rounded-2xl">
                    <div className="flex flex-col mb-4 md:items-center text-center">
                      <h3 className="font-bold text-xl">{edu.institution}</h3>
                      <p className="text-blue-500 font-medium text-lg mt-1 mb-1">{edu.degree}</p>
                      <time className="text-sm text-slate-500 dark:text-neutral-400 font-medium">{edu.date}</time>
                    </div>
                    <div className="flex justify-center">
                      <div className="inline-block bg-slate-100 dark:bg-neutral-800 px-4 py-2 rounded-lg">
                        <p className="text-slate-700 dark:text-neutral-300 text-sm font-semibold text-center">
                          {edu.score}
                        </p>
                      </div>
                    </div>
                  </div>
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
