// src/components/Hero.jsx
import React, { useState, useEffect } from "react";
import { Github, Linkedin, FileText, Mail } from "lucide-react";
import { motion } from "framer-motion";
import profileImg from "../assets/profile.png";
import resume from "../assets/SoftwareEngineer_UddeshSingh.pdf";

const Hero = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const phrases = [
    "Full Stack Developer",
    "Cloud Engineer",
    "AI/ML Enthusiast",
    "Golang & Python Expert",
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
      <div className="md:col-span-7 flex flex-col justify-center items-start z-20">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          // ADDED: select-none to prevent text highlighting while clicking
          className="pointer-events-auto pl-2 select-none"
        >
          <h2 className="text-4xl text-gray-400 font-script -rotate-2 mb-4 ml-1">
            Hi! I Am
          </h2>
          <h1 className="heading-hero text-amber-500 drop-shadow-[0_0_25px_rgba(245,158,11,0.4)]">
            Uddesh <br /> Singh
          </h1>

          <div className="mt-6 text-2xl md:text-4xl text-mono-accent h-10 flex items-center">
            <span>{text}</span>
            <span className="w-[3px] h-8 md:h-10 bg-[--neon-pink] ml-2 animate-pulse"></span>
          </div>

          <p className="mt-8 text-gray-400 text-lg max-w-lg leading-relaxed">
            Graduate student at UT Dallas specializing in scalable software
            architectures, cloud computing, and AI integration.
          </p>
        </motion.div>
      </div>

      {/* --- CENTER/RIGHT COL: Portrait --- */}
      <div className="md:col-span-5 flex-center relative h-full z-10">
        <div className="absolute w-[350px] h-[350px] bg-amber-500/20 rounded-full blur-[80px] -z-10 animate-pulse" />
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full flex justify-center"
        >
          <img
            src={profileImg}
            alt="Uddesh Singh"
            // ADDED: select-none and draggable="false"
            className="w-auto h-[50vh] md:h-[65vh] object-contain drop-shadow-[0_0_30px_rgba(245,158,11,0.3)] mask-image-gradient select-none"
            draggable="false"
          />
        </motion.div>
      </div>

      {/* --- RIGHT FLOAT: Links --- */}
      <div className="absolute right-6 bottom-20 md:right-12 md:bottom-auto md:top-1/2 md:-translate-y-1/2 flex flex-col gap-6 z-30 pointer-events-auto">
        <SocialLink
          icon={<Github size={24} />}
          href="https://github.com/uddeshsingh"
          label="GitHub"
        />
        <SocialLink
          icon={<Linkedin size={24} />}
          href="https://linkedin.com/in/uddesh-singh"
          label="LinkedIn"
        />
        <SocialLink
          icon={<Mail size={24} />}
          href="mailto:uxs230004@utdallas.edu"
          label="Email"
        />
        <SocialLink
          icon={<FileText size={24} />}
          href={resume}
          label="CV"
          isPrimary
        />
      </div>
    </div>
  );
};

const SocialLink = ({ icon, href, isPrimary, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    title={label}
    className={`social-icon ${
      isPrimary
        ? "bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-900/40 border-0"
        : ""
    }`}
  >
    {icon}
  </a>
);

export default Hero;
