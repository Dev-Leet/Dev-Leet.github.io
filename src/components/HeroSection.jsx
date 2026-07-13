import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { Mail, MessageCircle, FileText } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="min-h-screen relative overflow-hidden flex items-center justify-center pt-24 pb-12 px-6">
      {/* Parallax Background specifically for this section */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-fixed bg-center opacity-30 dark:opacity-40"
        style={{ backgroundImage: 'url(/assets/Backgroundphoto.jpg)' }}
      ></div>
      {/* Gradient fade to blend nicely with the next section */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-50 via-transparent to-slate-50 dark:from-black dark:via-transparent dark:to-black"></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full px-6 md:px-12 lg:px-24 flex flex-col items-center justify-center gap-8 md:gap-12"
      >
        <motion.div variants={itemVariants} className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full blur opacity-50 group-hover:opacity-75 transition duration-500"></div>
          <img 
            src={personalInfo.image} 
            alt={personalInfo.name} 
            className="relative w-40 h-40 md:w-56 md:h-56 rounded-full object-cover border-4 border-white dark:border-neutral-800 shadow-2xl"
          />
        </motion.div>
        
        <div className="text-center flex-1 flex flex-col items-center">
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
            <span className="text-gradient">{personalInfo.name}</span>
          </motion.h1>
          <motion.h2 variants={itemVariants} className="text-xl md:text-2xl text-slate-600 dark:text-neutral-300 font-medium mb-6">
            {personalInfo.role}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-slate-500 dark:text-neutral-400 text-lg leading-relaxed mb-8 max-w-2xl mx-auto text-justify">
            {personalInfo.description}
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4">
            <a href={`mailto:${personalInfo.email}`} className="btn-primary">
              <Mail size={18} /> Email
            </a>
            <a href="#contact" className="btn-secondary">
              <MessageCircle size={18} /> Contact
            </a>
            <a href={personalInfo.resume} download className="btn-gradient">
              <FileText size={18} /> Resume
            </a>
            
            <div className="flex items-center justify-center gap-4 ml-2">
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="social-icon">
                <FaGithub size={22} />
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="social-icon text-blue-500">
                <FaLinkedin size={22} />
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
