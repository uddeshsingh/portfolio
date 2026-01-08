import React, { useState } from 'react';
import SpaceBackground from './components/SpaceBackground';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Journey from './components/Journey'; // Import the new component
import { motion } from 'framer-motion';

function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="bg-darkBg text-white font-sans selection:bg-neonBlue selection:text-black">
      
      <Navbar />

      <section id="hero" className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
           <SpaceBackground onScoreUpdate={setScore} />
        </div>
        <div className="absolute top-8 right-8 z-50 pointer-events-none text-neonBlue font-mono text-xl tracking-wider mix-blend-screen">
           TARGETS HIT: {score}
        </div>
        <div className="relative z-10 w-full h-full">
          <Hero />
        </div>
      </section>

      {/* --- MY JOURNEY (Replaces Exp & Edu) --- */}
      <section id="experience" className="w-full min-h-screen relative z-20 bg-darkBg">
        <Journey />
      </section>

      {/* --- OTHER SECTIONS --- */}
      <SectionPlaceholder id="skills" title="Skills" />
      <SectionPlaceholder id="projects" title="Projects" />
      <SectionPlaceholder id="contact" title="Contact Me" />

    </div>
  );
}

const SectionPlaceholder = ({ id, title }) => (
  <section id={id} className="w-full min-h-screen bg-[#0a0a0a] border-t border-white/5 flex items-center justify-center relative z-20">
    <div className="max-w-4xl w-full text-center">
      <h2 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 mb-6">
        {title}
      </h2>
      <p className="text-gray-500 text-xl">
        Content coming soon...
      </p>
    </div>
  </section>
);

export default App;