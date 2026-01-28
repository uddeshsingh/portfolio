import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  MessageSquare,
  Video,
  TrendingUp,
  Shield,
} from "lucide-react";
import { COLORS } from "./theme";

const projects = [
  {
    id: 1,
    title: "Real-Time Chat App",
    category: "High Concurrency",
    tech: ["Golang", "Redis", "Django", "React", "WebSockets"],
    year: "2024",
    description:
      "High-performance chat platform supporting 10,000+ users per room with low-latency delivery.",
    color: "#00ADD8",
    icon: <MessageSquare size={80} strokeWidth={1} />,
  },
  {
    id: 2,
    title: "Auto Content Gen",
    category: "AI Pipeline",
    tech: ["AWS", "Kubernetes", "Python", "FFmpeg", "Cloud"],
    year: "2024",
    description:
      "Automated video production pipeline reducing manual effort by 90% using cloud orchestration.",
    color: "#FF9900",
    icon: <Video size={80} strokeWidth={1} />,
  },
  {
    id: 3,
    title: "Stock Investment Bot",
    category: "FinTech AI",
    tech: ["Gemini AI", "FAISS", "GroqAI", "Python", "RAG"],
    year: "2025",
    description:
      "AI chatbot analyzing official reports for stock recommendations with 20% increased accuracy.",
    color: "#10B981",
    icon: <TrendingUp size={80} strokeWidth={1} />,
  },
  {
    id: 4,
    title: "Vision Guard",
    category: "Security Tool",
    tech: ["TypeScript", "React", "Chrome Ext", "AI"],
    year: "2025",
    description:
      "AI-powered content moderation tool for safer browsing experiences.",
    color: "#8B5CF6",
    icon: <Shield size={80} strokeWidth={1} />,
  },
];

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="container-default flex flex-col justify-center min-h-screen"
    >
      <h2 className="heading-section">Selected Works</h2>

      <div className="flex flex-col border-t border-white/10">
        {projects.map((project) => (
          <ProjectItem
            key={project.id}
            project={project}
            setActiveProject={setActiveProject}
            activeProject={activeProject}
          />
        ))}
      </div>

      <div className="hidden md:block pointer-events-none absolute top-0 left-0 w-full h-full overflow-hidden z-20">
        <AnimatePresence>
          {activeProject && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                x: cursor.x - 150,
                y: cursor.y - 120,
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              className="absolute w-[300px] h-[240px] rounded-2xl overflow-hidden glass-panel bg-[#0f1014]/90 flex-center"
              style={{ boxShadow: `0 0 30px ${activeProject.color}40` }}
            >
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background: `radial-gradient(circle at center, ${activeProject.color}, transparent 70%)`,
                }}
              />
              <div className="relative z-10 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                {activeProject.icon}
              </div>
              <div className="absolute bottom-4 left-0 w-full text-center">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-widest opacity-60">
                  {activeProject.tech.slice(0, 3).join(" • ")}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ProjectItem = ({ project, setActiveProject, activeProject }) => (
  <motion.div
    onMouseEnter={() => setActiveProject(project)}
    onMouseLeave={() => setActiveProject(null)}
    className="group relative border-b border-white/10 py-12 px-4 cursor-pointer transition-colors hover:bg-white/5"
  >
    <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 z-10 relative">
      <div className="flex items-center gap-6">
        <span className="font-mono text-gray-600 text-xl group-hover:text-white/50 transition-colors">
          0{project.id}
        </span>
        <h3
          className={`text-3xl md:text-5xl font-bold transition-all duration-300 ${
            activeProject?.id === project.id
              ? "text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 translate-x-4"
              : "text-gray-400 group-hover:text-white"
          }`}
        >
          {project.title}
        </h3>
      </div>
      <div className="flex items-center justify-end w-full md:w-auto md:min-w-[400px]">
        <span className="hidden md:block uppercase tracking-wider text-sm font-mono text-gray-500 mr-6 whitespace-nowrap">
          {project.category}
        </span>
        <span className="hidden md:block w-[1px] h-4 bg-gray-700 mr-6"></span>
        <div
          className="w-[200px] md:w-[250px] overflow-hidden flex relative mask-image-gradient"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <motion.div
            className="flex gap-6 whitespace-nowrap"
            animate={{ x: "-50%" }}
            transition={{ repeat: Infinity, ease: "linear", duration: 10 }}
          >
            {[...project.tech, ...project.tech].map((item, i) => (
              <span
                key={i}
                className="text-sm font-mono text-gray-500 hover:text-[--neon-blue] transition-colors"
              >
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  </motion.div>
);

export default Projects;
