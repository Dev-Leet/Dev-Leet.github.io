import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { Mail, Send } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 px-6 md:px-12 lg:px-24 w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="glass rounded-3xl p-8 md:p-12"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Let's Connect</h2>
          <p className="text-slate-600 dark:text-neutral-400">
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </p>
          <a href={`mailto:${personalInfo.email}`} className="inline-flex items-center gap-2 mt-4 text-emerald-500 font-semibold hover:underline">
            <Mail size={18} /> {personalInfo.email}
          </a>
        </div>

        <form action="https://formspree.io/f/movnynnn" method="POST" className="space-y-6 max-w-2xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-neutral-300 mb-2">Name</label>
              <input 
                type="text" 
                id="name"
                name="name" 
                required 
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-neutral-900/50 border border-slate-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-neutral-300 mb-2">Email</label>
              <input 
                type="email" 
                id="email"
                name="email" 
                required 
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-neutral-900/50 border border-slate-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                placeholder="john@example.com"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-neutral-300 mb-2">Message</label>
            <textarea 
              id="message"
              name="message" 
              required 
              rows="5"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-neutral-900/50 border border-slate-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition resize-none"
              placeholder="How can I help you?"
            ></textarea>
          </div>
          
          {/* Honeypot */}
          <input type="text" name="_gotcha" style={{ display: 'none' }} />

          <button 
            type="submit" 
            className="w-full btn-gradient flex justify-center py-4 text-lg"
          >
            Send Message <Send size={20} />
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default ContactSection;
