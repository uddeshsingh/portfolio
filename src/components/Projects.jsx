import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MessageSquare, Video, TrendingUp, Shield, Layout } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "WatchParty",
    category: "Distributed Backend",
    tech: ["Golang", "Kafka", "Redis", "WebSockets"],
    year: "2024",
    description: "High-concurrency streaming engine supporting 500k+ concurrent events with sub-50ms latency using Goroutines.",
    color: "#00ADD8",
    icon: <MessageSquare size={80} strokeWidth={1} />,
  },
  {
    id: 2,
    title: "AutoVid",
    category: "Cloud & DevOps",
    tech: ["Kubernetes", "Docker", "Python", "FastAPI", "GCP"],
    year: "2024",
    description: "Cloud-native AI video generator orchestrating 100+ distributed rendering pods to improve throughput by 5x.",
    color: "#FF9900",
    icon: <Video size={80} strokeWidth={1} />,
  },
  {
    id: 3,
    title: "SIA",
    category: "Full-Stack AI",
    tech: ["Next.js", "React", "RAG", "FAISS", "Python"],
    year: "2025",
    description: "End-to-end AI financial analyst cutting inference latency by 40% using RAG pipelines and vector embeddings.",
    color: "#10B981",
    icon: <TrendingUp size={80} strokeWidth={1} />,
  },
  {
    id: 4,
    title: "Vision Guard",
    category: "Frontend Architecture",
    tech: ["TypeScript", "React", "Browser APIs", "Tailwind"],
    year: "2025",
    description: "Highly responsive, low-latency client-side content moderation application optimizing DOM rendering and state management.",
    color: "#8B5CF6",
    icon: <Layout size={80} strokeWidth={1} />,
  },
];

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e) => {
    if (containerRef.current && !shouldReduceMotion) {
      const rect = containerRef.current.getBoundingClientRect();
      setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className="container-default flex flex-col justify-center min-h-screen">
      <h2 className="heading-section">Selected Works</h2>

      <div className="flex flex-col border-t border-white/10 relative z-10">
        {projects.map((project, index) => (
          <ProjectItem
            key={project.id}
            project={project}
            index={index}
            setActiveProject={setActiveProject}
            activeProject={activeProject}
          />
        ))}
      </div>

      {!shouldReduceMotion && (
        <div className="hidden md:block pointer-events-none absolute top-0 left-0 w-full h-full overflow-hidden z-20">
          <AnimatePresence>
            {activeProject && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, x: cursor.x - 150, y: cursor.y - 120 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
                className="absolute w-[300px] h-[240px] rounded-2xl overflow-hidden glass-panel bg-[#0f1014]/90 flex-center"
                style={{ boxShadow: `0 0 30px ${activeProject.color}40` }}
              >
                <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at center, ${activeProject.color}, transparent 70%)` }} />
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
      )}
    </div>
  );
};

const ProjectItem = ({ project, index, setActiveProject, activeProject }) => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setActiveProject(project)}
      onMouseLeave={() => setActiveProject(null)}
      whileHover={!shouldReduceMotion ? { x: 20, backgroundColor: "rgba(255,255,255,0.02)" } : { backgroundColor: "rgba(255,255,255,0.02)" }}
      className="group relative border-b border-white/10 py-12 px-4 cursor-pointer transition-colors"
    >
      <motion.div 
        animate={{ opacity: activeProject && activeProject.id !== project.id ? 0.3 : 1 }}
        className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 z-10 relative"
      >
        <div className="flex items-center gap-6">
          <span className="font-mono text-gray-600 text-xl group-hover:text-white/50 transition-colors">0{project.id}</span>
          <h3 className={`text-3xl md:text-5xl font-bold transition-all duration-300 ${activeProject?.id === project.id ? "text-transparent bg-clip-text translate-x-4" : "text-gray-400 group-hover:text-white"}`}
              style={activeProject?.id === project.id ? { backgroundImage: `linear-gradient(to right, #fff, ${project.color})` } : {}}
          >
            {project.title}
          </h3>
        </div>
        <div className="flex items-center justify-end w-full md:w-auto md:min-w-[400px]">
          <span className="hidden md:block uppercase tracking-wider text-sm font-mono text-gray-500 mr-6 whitespace-nowrap">{project.category}</span>
          <span className="hidden md:block w-[1px] h-4 bg-gray-700 mr-6"></span>
          <div className="w-[200px] md:w-[250px] overflow-hidden flex relative mask-image-gradient" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
            <motion.div className="flex gap-6 whitespace-nowrap" animate={!shouldReduceMotion ? { x: "-50%" } : {}} transition={{ repeat: Infinity, ease: "linear", duration: 10 }}>
              {[...project.tech, ...project.tech].map((item, i) => (
                <span key={i} className="text-sm font-mono text-gray-500 hover:text-[--neon-blue] transition-colors">{item}</span>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Projects;