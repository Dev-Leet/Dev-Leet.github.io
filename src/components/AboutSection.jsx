import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { aboutMe, personalInfo } from '../data/portfolioData';

const AboutSection = () => {
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
    <section id="about" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Scroll-reactive Parallax Background specifically for this section */}
      <div 
        ref={bgRef}
        className="absolute -inset-12 z-0 bg-cover bg-center opacity-20 dark:opacity-25 pointer-events-none will-change-transform"
        style={{ backgroundImage: 'url(/assets/aboutmebackground.png)' }}
      ></div>
      {/* Translucent gradient fade on top and bottom to blend with other sections and expose 3D grid */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-slate-50/70 via-transparent to-slate-50/70 dark:from-black/70 dark:via-transparent dark:to-black/70"></div>

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
