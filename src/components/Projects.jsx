import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MessageSquare, Video, TrendingUp, Layout } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "WatchParty",
    category: "Distributed Backend",
    tech: ["Golang", "Kafka", "Redis", "WebSockets"],
    description: "High-concurrency streaming engine supporting 500k+ concurrent events with sub-50ms latency using Goroutines.",
    color: "#00ADD8",
    icon: <MessageSquare size={80} strokeWidth={1} />,
  },
  {
    id: 2,
    title: "AutoVid",
    category: "Cloud & DevOps",
    tech: ["Kubernetes", "Docker", "Python", "FastAPI", "GCP"],
    description: "Cloud-native AI video generator orchestrating 100+ distributed rendering pods to improve throughput by 5x.",
    color: "#FF9900",
    icon: <Video size={80} strokeWidth={1} />,
  },
  {
    id: 3,
    title: "SIA",
    category: "Full-Stack AI",
    tech: ["Next.js", "React", "RAG", "FAISS", "Python"],
    description: "End-to-end AI financial analyst cutting inference latency by 40% using RAG pipelines and vector embeddings.",
    color: "#10B981",
    icon: <TrendingUp size={80} strokeWidth={1} />,
  },
  {
    id: 4,
    title: "Vision Guard",
    category: "Frontend Arch",
    tech: ["TypeScript", "React", "Browser APIs", "Tailwind"],
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
    <div ref={containerRef} onMouseMove={handleMouseMove} className="w-full max-w-7xl mx-auto px-6 py-32 relative min-h-screen">
      
      <div className="flex flex-col lg:flex-row gap-16 relative items-start">
        
        {/* LEFT COLUMN: The Vertical Lock */}
        <div className="w-full lg:w-1/3 lg:sticky lg:top-40 z-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[--neon-blue] to-purple-500 mb-6"
          >
            Technical Showcase
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg leading-relaxed"
          >
            A curated selection of my recent work, showcasing my expertise in distributed systems, cloud architecture, and AI-driven solutions. Each project highlights my ability to design and implement high-performance applications that solve real-world problems.
          </motion.p>
        </div>

        {/* RIGHT COLUMN: The Scrolling Rows */}
        <div className="w-full lg:w-2/3 flex flex-col border-t border-white/10 relative z-10 mt-10 lg:mt-0">
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

      </div>

      {/* FLOATING CURSOR CARD (Restored to its original glory) */}
      {!shouldReduceMotion && (
        <div className="hidden md:block pointer-events-none absolute top-0 left-0 w-full h-full overflow-hidden z-30">
          <AnimatePresence>
            {activeProject && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, x: cursor.x - 150, y: cursor.y - 120 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
                className="absolute w-[300px] h-[240px] rounded-2xl overflow-hidden glass-panel bg-[#0f1014]/90 flex flex-col items-center justify-center"
                style={{ boxShadow: `0 0 30px ${activeProject.color}40` }}
              >
                <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at center, ${activeProject.color}, transparent 70%)` }} />
                <div className="relative z-10 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] mb-4">
                  {activeProject.icon}
                </div>
                <div className="relative z-10 w-[80%] text-center">
                  <p className="text-sm text-gray-300 line-clamp-3 leading-snug">
                    {activeProject.description}
                  </p>
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
      initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setActiveProject(project)}
      onMouseLeave={() => setActiveProject(null)}
      whileHover={!shouldReduceMotion ? { x: -10, backgroundColor: "rgba(255,255,255,0.02)" } : { backgroundColor: "rgba(255,255,255,0.02)" }}
      className="group relative border-b border-white/10 py-10 px-4 cursor-pointer transition-colors"
    >
      <motion.div 
        animate={{ opacity: activeProject && activeProject.id !== project.id ? 0.3 : 1 }}
        className="flex flex-col md:flex-row justify-between gap-6 z-10 relative"
      >
        <div className="flex items-start md:items-center gap-6">
          <span className="font-mono text-gray-600 text-xl group-hover:text-white/50 transition-colors pt-1 md:pt-0">0{project.id}</span>
          <div>
            <h3 className={`text-3xl md:text-4xl font-bold transition-all duration-300 ${activeProject?.id === project.id ? "text-transparent bg-clip-text" : "text-gray-300 group-hover:text-white"}`}
                style={activeProject?.id === project.id ? { backgroundImage: `linear-gradient(to right, #fff, ${project.color})` } : {}}
            >
              {project.title}
            </h3>
            <p className="md:hidden text-sm text-gray-500 font-mono uppercase tracking-widest mt-2">{project.category}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-start md:justify-end w-full md:w-auto md:min-w-[300px]">
          <span className="hidden md:block uppercase tracking-wider text-sm font-mono text-gray-500 mr-6 whitespace-nowrap">{project.category}</span>
          <span className="hidden md:block w-[1px] h-4 bg-gray-700 mr-6"></span>
          
          <div className="w-[200px] overflow-hidden flex relative mask-image-gradient" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
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