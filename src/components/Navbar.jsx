import React, { useState, useEffect, useRef } from "react";
import {
  Home,
  Briefcase,
  Cpu,
  GraduationCap,
  FolderGit2,
  Mail,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { id: "hero", icon: <Home size={18} />, label: "Home" },
  { id: "experience", icon: <Briefcase size={18} />, label: "Experience" },
  { id: "skills", icon: <Cpu size={18} />, label: "Skills" },
  { id: "projects", icon: <FolderGit2 size={18} />, label: "Projects" },
  { id: "contact", icon: <Mail size={18} />, label: "Contact" },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(true);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => setIsVisible(false), 2000);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.5 }
    );

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100]">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, scale: 0.8, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{
              y: 50,
              scale: 0.8,
              opacity: 0,
              transition: { duration: 0.5 },
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-2 px-3 py-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.5)]"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <div key={item.id} className="relative group">
                  <motion.button
                    onClick={() => scrollToSection(item.id)}
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                      scale: isActive ? 1.1 : 1,
                      backgroundColor: isActive
                        ? "rgba(255, 255, 255, 0.15)"
                        : "transparent",
                    }}
                    className={`p-3 rounded-full transition-colors relative flex-center ${
                      isActive
                        ? "text-[--neon-blue] shadow-[0_0_10px_rgba(0,243,255,0.3)]"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {item.icon}
                  </motion.button>
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
