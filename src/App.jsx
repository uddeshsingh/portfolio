import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SpaceBackground from './components/SpaceBackground';
import DataNetworkBackground from './components/DataNetworkBackground';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Journey from './components/Journey';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="bg-[--dark-bg] selection:bg-[--neon-blue] selection:text-black relative min-h-screen text-white">
      
      {/* THE ENTERPRISE BACKGROUND - Fixed behind content */}
      <div className="fixed inset-0 z-0 opacity-70 pointer-events-none">
        <DataNetworkBackground />
      </div>

      <Navbar />

      <div className="relative z-10">
        <AnimatePresence>
          {/* HERO */}
          <section id="hero" className="relative w-full h-screen overflow-hidden bg-[--dark-bg]">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 1.5 }} 
              className="absolute inset-0 z-0"
            >
               <SpaceBackground onScoreUpdate={setScore} />
            </motion.div>
            
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 1 }}
              className="absolute top-8 right-8 z-50 pointer-events-none text-mono-accent text-xl tracking-wider mix-blend-screen"
            >
               TARGETS HIT: {score}
            </motion.div>
            
            <div className="relative z-10 w-full h-full bg-black/20">
              <Hero />
            </div>
          </section>

          {/* EXPERIENCE */}
          <motion.section 
            id="experience" 
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="section-screen bg-[#0a0a0a]/70"
          >
            <Journey />
          </motion.section>

          {/* SKILLS */}
          <motion.section 
            id="skills" 
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="section-screen border-t border-white/5 bg-[#0a0a0a]/80 relative"
          >
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
             <div className="relative z-10 pt-20">
                 <motion.h2 
                   initial={{ opacity: 0, scale: 0.9 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   className="heading-section"
                 >
                   Technical Arsenal
                 </motion.h2>
                 <Skills />
             </div>
          </motion.section>

          {/* PROJECTS - Removed 'section-screen' to unblock position: sticky */}
          <motion.section 
            id="projects" 
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="w-full min-h-screen relative z-20 bg-[#0a0a0a]/70"
          >
             <Projects />
          </motion.section>

          {/* CONTACT */}
          <motion.section 
            id="contact" 
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="section-screen border-t border-white/10 bg-[#0a0a0a]/80"
          >
             <Contact />
          </motion.section>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;