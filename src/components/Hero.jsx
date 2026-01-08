// src/components/Hero.jsx
import React, { useState, useEffect } from "react";
import { Github, Linkedin, FileText } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const phrases = [
    "Full Stack Developer",
    "IoT Specialist",
    "UI/UX Designer",
    "Tech Enthusiast",
  ];

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, phrases]);

  return (
    <div className="relative w-full h-full max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-center pointer-events-none">
      {/* --- LEFT COL: Name & Intro --- */}
      <div className="md:col-span-4 flex flex-col justify-center items-start z-20">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="pointer-events-auto pl-2"
        >
          <h2 className="text-4xl text-gray-400 font-script -rotate-2 mb-4 ml-1">
            Hi! I Am
          </h2>
          <h1 className="text-7xl md:text-9xl font-bold text-amber-500 tracking-tighter leading-none drop-shadow-[0_0_25px_rgba(245,158,11,0.4)]">
            Uddesh <br /> Singh
          </h1>

          <div className="mt-6 text-2xl md:text-3xl font-mono text-neonBlue h-10 flex items-center">
            <span>{text}</span>
            <span className="w-[3px] h-8 md:h-10 bg-neonPink ml-2 animate-pulse"></span>
          </div>
        </motion.div>
      </div>

      {/* --- CENTER COL: Portrait --- */}
      <div className="md:col-span-4 flex justify-center items-center relative h-full z-10">
        <div className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full border border-amber-500/20 bg-gradient-to-t from-amber-500/10 to-transparent backdrop-blur-[1px]"></div>

        {/* Placeholder for the "Jumping Man" or Portrait */}
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          src="https://pngimg.com/uploads/man/man_PNG6505.png"
          alt="John Deo"
          className="relative z-10 w-full h-[60vh] md:h-[75vh] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
        />
      </div>

      {/* --- RIGHT COL: Links --- */}
      <div className="md:col-span-4 flex flex-col justify-center items-end z-20">
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-6 pointer-events-auto pr-2"
        >
          <SocialLink icon={<Github size={24} />} label="GitHub" href="#" />
          <SocialLink icon={<Linkedin size={24} />} label="LinkedIn" href="#" />
          <SocialLink
            icon={<FileText size={24} />}
            label="Download CV"
            href="#"
            isPrimary
          />
        </motion.div>
      </div>
    </div>
  );
};

const SocialLink = ({ icon, label, href, isPrimary }) => (
  <a
    href={href}
    className={`flex items-center gap-4 px-8 py-4 rounded-full transition-all duration-300 group
      ${
        isPrimary
          ? "bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-900/40 justify-center font-bold text-lg"
          : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-neonBlue border border-white/10 text-lg"
      }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </a>
);

export default Hero;
