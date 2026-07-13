import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsGrid from './components/ProjectsGrid';
import ExperienceTimeline from './components/ExperienceTimeline';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import InteractiveGrid from './interactive_grid_background';

function App() {
  return (
    <div className="min-h-screen selection:bg-emerald-500/30 relative text-slate-900 dark:text-neutral-100">
      <InteractiveGrid />
      <Navbar />
      
      <main className="space-y-12 relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectsGrid />
        <ExperienceTimeline />
        <SkillsSection />
        <ContactSection />
      </main>
      
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

export default App;
