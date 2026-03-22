import React, { useState, useEffect } from "react";
import { Github, Linkedin, FileText, Mail } from "lucide-react";
import { motion } from "framer-motion";
import profileImg from "../assets/profile.png";
import resume from "../assets/SoftwareEngineer_UddeshSingh.pdf";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
};

const Hero = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const phrases = [
    "Distributed Systems Engineer",
    "High-Concurrency Backend Developer",
    "Cloud-Native Architect",
    "Golang, Python & Java Specialist",
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

      setTypingSpeed(isDeleting ? 30 : 100);

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
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="md:col-span-7 flex flex-col justify-center items-start z-20 pointer-events-auto pl-2 select-none"
      >
        <motion.h2 variants={itemVariants} className="text-4xl text-gray-400 font-script -rotate-2 mb-4 ml-1">
          Hi! I Am
        </motion.h2>
        <motion.h1 variants={itemVariants} className="heading-hero text-amber-500 drop-shadow-[0_0_25px_rgba(245,158,11,0.4)]">
          Uddesh <br /> Singh
        </motion.h1>

        <motion.div variants={itemVariants} className="mt-6 text-2xl md:text-4xl text-mono-accent h-10 flex items-center">
          <span>{text}</span>
          <span className="w-[3px] h-8 md:h-10 bg-[--neon-pink] ml-2 animate-pulse"></span>
        </motion.div>

        <motion.p variants={itemVariants} className="mt-8 text-gray-400 text-lg max-w-lg leading-relaxed">
          MSCS Graduate at UT Dallas (4.0 GPA). Ex-American Express & Paycom. 
          Specializing in architecting high-throughput microservices, event-driven 
          systems, and AI-driven infrastructure.
        </motion.p>
      </motion.div>

      {/* --- CENTER/RIGHT COL: Portrait --- */}
      <div className="md:col-span-5 flex-center relative h-full z-10">
        <div className="absolute w-[350px] h-[350px] bg-amber-500/20 rounded-full blur-[80px] -z-10 animate-pulse" />
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.5, type: "spring" }}
          className="relative z-10 w-full flex justify-center"
        >
          <img
            src={profileImg}
            alt="Uddesh Singh"
            className="w-auto h-[50vh] md:h-[65vh] object-contain drop-shadow-[0_0_30px_rgba(245,158,11,0.3)] mask-image-gradient select-none"
            draggable="false"
          />
        </motion.div>
      </div>

      {/* --- RIGHT FLOAT: Links --- */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute right-6 bottom-20 md:right-12 md:bottom-auto md:top-1/2 md:-translate-y-1/2 flex flex-col gap-6 z-30 pointer-events-auto"
      >
        <SocialLink icon={<Github size={24} />} href="https://github.com/uddeshsingh" label="GitHub" />
        <SocialLink icon={<Linkedin size={24} />} href="https://linkedin.com/in/uddeshsingh" label="LinkedIn" />
        <SocialLink icon={<Mail size={24} />} href="mailto:uddesh@utdallas.edu" label="Email" />
        <SocialLink icon={<FileText size={24} />} href={resume} label="CV" isPrimary />
      </motion.div>
    </div>
  );
};

const SocialLink = ({ icon, href, isPrimary, label }) => (
  <motion.a
    whileHover={{ scale: 1.15, x: -5 }}
    whileTap={{ scale: 0.9 }}
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
  </motion.a>
);

export default Hero;