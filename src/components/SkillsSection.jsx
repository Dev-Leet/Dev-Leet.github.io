import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { skills, competitiveProgramming } from '../data/portfolioData';

const SkillsSection = () => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    let rafId = 0;
    const updateParallax = () => {
      if (!sectionRef.current || !bgRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewH = window.innerHeight || 1;
      const centerOffset = (rect.top + rect.height / 2 - viewH / 2) / viewH;
      const translateY = Math.max(-80, Math.min(80, centerOffset * -85));
      bgRef.current.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0) scale(1.12)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Scroll-reactive Parallax Background specifically for this section */}
      <div 
        ref={bgRef}
        className="absolute -inset-12 z-0 bg-cover bg-center opacity-20 dark:opacity-25 pointer-events-none will-change-transform"
        style={{ backgroundImage: 'url(/assets/TechnicalArsensalBackground.png)' }}
      ></div>
      {/* Translucent gradient fade on top and bottom */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-slate-50/70 via-transparent to-slate-50/70 dark:from-black/70 dark:via-transparent dark:to-black/70"></div>

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
