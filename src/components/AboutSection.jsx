import React from 'react';
import { motion } from 'framer-motion';
import { aboutMe, personalInfo } from '../data/portfolioData';

const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Parallax Background specifically for this section */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-fixed bg-center opacity-30 dark:opacity-40"
        style={{ backgroundImage: 'url(/assets/aboutmebackground.png)' }}
      ></div>
      {/* Gradient fade on top and bottom to blend with other sections */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-50 via-transparent to-slate-50 dark:from-black dark:via-transparent dark:to-black"></div>

      <div className="relative z-10 px-6 md:px-12 lg:px-24 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">{aboutMe.title}</h2>
          <p className="text-lg text-slate-600 dark:text-neutral-300 leading-relaxed mb-10 max-w-3xl mx-auto text-justify">
            {aboutMe.description}
          </p>

          <div className="w-full max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-neutral-700 bg-black group relative">
            <video 
              controls 
              className="w-full h-full object-cover"
              poster={personalInfo.videoPoster}
            >
              <source src={personalInfo.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
