import React, { useState } from 'react';
import SpaceBackground from './components/SpaceBackground';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Journey from './components/Journey';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="bg-[--dark-bg]">
      <Navbar />

      {/* HERO */}
      <section id="hero" className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
           <SpaceBackground onScoreUpdate={setScore} />
        </div>
        {/* HUD Score */}
        <div className="absolute top-8 right-8 z-50 pointer-events-none text-mono-accent text-xl tracking-wider mix-blend-screen">
           TARGETS HIT: {score}
        </div>
        <div className="relative z-10 w-full h-full">
          <Hero />
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="section-screen bg-[--dark-bg]">
        <Journey />
      </section>

      {/* SKILLS */}
      <section id="skills" className="section-screen border-t border-white/5">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
         <div className="relative z-10 pt-20">
             <h2 className="heading-section">
               Technical Arsenal
             </h2>
             <Skills />
         </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section-screen bg-[--dark-bg]">
         <Projects />
      </section>

      {/* CONTACT */}
      <section id="contact" className="section-screen border-t border-white/10">
         <Contact />
      </section>
    </div>
  );
}

export default App;