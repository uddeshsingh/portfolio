import React, { useState, useEffect, useMemo, useRef } from "react";
import { Code2, Server, Database, Terminal, Cloud, Cpu, Box, Globe, Layers, Hash } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { COLORS } from "./theme";

const GLOBE_RADIUS = 180;
const AUTO_ROTATE_SPEED = 0.002;
const CONNECTION_DISTANCE = 110;
const DRAG_SENSITIVITY = 0.005;

const skillsData = [
  { id: 1, name: "Golang", icon: <Terminal size={24} />, color: "#00ADD8", level: "Expert", desc: "High-concurrency backend services, gRPC, and microservices." },
  { id: 2, name: "Python", icon: <Code2 size={24} />, color: "#3776AB", level: "Expert", desc: "AI/ML integration, FastAPI backends, and data ingestion." },
  { id: 3, name: "React & Next.js", icon: <Globe size={24} />, color: "#61DAFB", level: "Advanced", desc: "Modern frontend interfaces, SSR, and complex state management." },
  { id: 4, name: "Angular v17", icon: <Globe size={24} />, color: "#DD0031", level: "Advanced", desc: "Enterprise Single Page Applications (SPAs) and component architecture." },
  { id: 5, name: "Java & Spring", icon: <Server size={24} />, color: "#5382A1", level: "Advanced", desc: "Enterprise metadata services, REST/GraphQL APIs, and JUnit TDD." },
  { id: 6, name: "Kubernetes", icon: <Box size={24} />, color: "#326CE5", level: "Advanced", desc: "Container orchestration, deployment scaling, and management." },
  { id: 7, name: "AWS & GCP", icon: <Cloud size={24} />, color: "#FF9900", level: "Intermediate", desc: "Cloud-native deployments, serverless architecture, and S3/EC2." },
  { id: 8, name: "SQL & PostgreSQL", icon: <Database size={24} />, color: "#F29111", level: "Advanced", desc: "Complex queries, database normalization, and query optimization." },
  { id: 9, name: "Node.js", icon: <Server size={24} />, color: "#339933", level: "Intermediate", desc: "Asynchronous event-driven JavaScript backends." },
  { id: 10, name: "C# & .NET", icon: <Hash size={24} />, color: "#239120", level: "Intermediate", desc: "Enterprise full-stack document extraction services." },
  { id: 11, name: "Kafka", icon: <Layers size={24} />, color: "#FFFFFF", level: "Advanced", desc: "Event-driven architectures and high-throughput messaging." },
  { id: 12, name: "Docker & CI/CD", icon: <Box size={24} />, color: "#2496ED", level: "Advanced", desc: "Containerization, GitHub Actions, and Jenkins automation." },
  { id: 13, name: "Vector DBs", icon: <Cpu size={24} />, color: "#10B981", level: "Advanced", desc: "FAISS, pgvector for semantic search and AI embedding retrieval." },
  { id: 14, name: "Redis", icon: <Layers size={24} />, color: "#DC382D", level: "Advanced", desc: "Multi-level caching strategies and ephemeral state management." },
];

const Skills = () => {
  const [activeSkill, setActiveSkill] = useState(null);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 md:px-10 py-20 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 min-h-[600px]">
      <div className="w-full md:w-1/2 flex-center relative h-[400px] md:h-[500px]">
        <div className="absolute inset-0 bg-[#00f3ff]/5 blur-[100px] rounded-full pointer-events-none" />
        <SkillsGlobe skills={skillsData} onHover={setActiveSkill} activeSkill={activeSkill} />
      </div>

      <div className="w-full md:w-1/2 h-[300px] flex-center md:justify-start perspective-1000">
        <AnimatePresence mode="wait">
          {activeSkill ? (
            <SkillCard key={activeSkill.id} skill={activeSkill} />
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center md:text-left text-gray-500">
              <p className="text-xl font-mono animate-pulse">&lt; Drag globe or hover skills /&gt;</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const SkillCard = ({ skill }) => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 50, rotateY: shouldReduceMotion ? 0 : -20 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -20, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="glass-panel relative w-full max-w-md p-8 rounded-3xl overflow-hidden group bg-[#0f1014]/80"
    >
      <div className="absolute -top-10 -right-10 w-40 h-40 blur-[80px] rounded-full opacity-20 transition-colors duration-500" style={{ backgroundColor: skill.color }} />
      <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
        <div className="mb-6 p-5 rounded-2xl bg-white/5 border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500" style={{ color: skill.color, boxShadow: `0 0 20px ${skill.color}20` }}>
          {React.cloneElement(skill.icon, { size: 48 })}
        </div>
        <h3 className="text-3xl font-bold text-white mb-2">{skill.name}</h3>
        <p className="text-mono-accent text-sm mb-6 px-3 py-1 rounded-full bg-[#00f3ff]/10 border border-[#00f3ff]/20 inline-block">{skill.level}</p>
        <p className="text-gray-400 leading-relaxed text-lg">{skill.desc}</p>
      </div>
    </motion.div>
  );
};

const SkillsGlobe = ({ skills, onHover, activeSkill }) => {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const previousMouse = useRef({ x: 0, y: 0 });
  const requestRef = useRef();
  const shouldReduceMotion = useReducedMotion();

  const points = useMemo(() => {
    const phi = Math.PI * (3 - Math.sqrt(5));
    return skills.map((skill, i) => {
      const y = 1 - (i / (skills.length - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;
      return { ...skill, x: Math.cos(theta) * radius * GLOBE_RADIUS, y: y * GLOBE_RADIUS, z: Math.sin(theta) * radius * GLOBE_RADIUS };
    });
  }, [skills]);

  const handleMouseDown = (e) => { isDragging.current = true; previousMouse.current = { x: e.clientX, y: e.clientY }; };
  const handleMouseUp = () => { isDragging.current = false; };
  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - previousMouse.current.x;
    const dy = e.clientY - previousMouse.current.y;
    setRotation((prev) => ({ x: prev.x + dx * DRAG_SENSITIVITY, y: prev.y + dy * DRAG_SENSITIVITY }));
    previousMouse.current = { x: e.clientX, y: e.clientY };
  };

  const animate = () => {
    // HIGH PERFORMANCE SHORT-CIRCUIT:
    // Only calculate rotation if the container is on-screen
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.top > window.innerHeight || rect.bottom < 0) {
      requestRef.current = requestAnimationFrame(animate);
      return;
    }

    if (!activeSkill && !isDragging.current && !shouldReduceMotion) {
      setRotation((prev) => ({ x: prev.x + AUTO_ROTATE_SPEED, y: prev.y + AUTO_ROTATE_SPEED * 0.5 }));
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [activeSkill, shouldReduceMotion]);

  const projectedPoints = useMemo(() => {
    const cosX = Math.cos(rotation.x); const sinX = Math.sin(rotation.x);
    const cosY = Math.cos(rotation.y); const sinY = Math.sin(rotation.y);
    return points.map((point) => {
      let x1 = point.x * cosX - point.z * sinX; let z1 = point.z * cosX + point.x * sinX;
      let y1 = point.y * cosY - z1 * sinY; let z2 = z1 * cosY + point.y * sinY;
      const scale = 400 / (400 - z2);
      return { ...point, projectedX: x1 * scale, projectedY: y1 * scale, scale, zIndex: z2, opacity: Math.max(0.1, (z2 + GLOBE_RADIUS) / (2 * GLOBE_RADIUS) + 0.2) };
    });
  }, [points, rotation]);

  return (
    <div ref={containerRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} className={`relative flex-center w-[400px] h-[400px] select-none ${isDragging.current ? "cursor-grabbing" : "cursor-grab"}`}>
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
        {projectedPoints.map((p1, i) =>
          projectedPoints.slice(i + 1).map((p2, j) => {
            const dist = Math.sqrt(Math.pow(p1.projectedX - p2.projectedX, 2) + Math.pow(p1.projectedY - p2.projectedY, 2));
            if (dist < CONNECTION_DISTANCE) {
              return (
                <line key={`${i}-${j}`} x1={p1.projectedX + 200} y1={p1.projectedY + 200} x2={p2.projectedX + 200} y2={p2.projectedY + 200} stroke={COLORS.neonBlue} strokeWidth="1" strokeOpacity={(1 - dist / CONNECTION_DISTANCE) * 0.15 * ((p1.opacity + p2.opacity) / 2)} />
              );
            }
            return null;
          })
        )}
      </svg>
      {projectedPoints.map((point) => (
        <div key={point.id} onMouseEnter={() => !isDragging.current && onHover(point)} onMouseLeave={() => onHover(null)} className="absolute flex-center transition-transform duration-75" style={{ transform: `translate(${point.projectedX}px, ${point.projectedY}px) scale(${point.scale})`, opacity: activeSkill ? activeSkill.id === point.id ? 1 : 0.2 : point.opacity, zIndex: Math.round(point.zIndex) + 1000 }}>
          <div className={`p-3 rounded-full border backdrop-blur-sm transition-all duration-300 ${activeSkill?.id === point.id ? "border-[#00f3ff] shadow-[0_0_20px_#00f3ff] bg-[#00f3ff]/10" : "bg-black/80 border-white/10 hover:border-[#00f3ff]/50"}`}>
            <div style={{ color: activeSkill?.id === point.id ? COLORS.neonBlue : point.color }}>{point.icon}</div>
          </div>
          {(point.scale > 0.8 || activeSkill?.id === point.id) && (
            <span className={`absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-mono whitespace-nowrap pointer-events-none ${activeSkill?.id === point.id ? "text-mono-accent font-bold" : "text-gray-400"}`}>{point.name}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Skills;