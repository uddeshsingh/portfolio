import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, GraduationCap, Code2, BookOpen } from "lucide-react";

const journeyData = [
  {
    year: "2025",
    title: "Program Analyst Trainee",
    company: "Cognizant Technology Solutions",
    duration: "July 2025 - Present | Chennai",
    description:
      "Developing full-stack web applications using Java, Spring Boot, and MySQL. Implementing RESTful APIs and backend services while participating in Agile sprints. Contributing to database design and integrating frontend components.",
    icon: <Briefcase size={20} />,
    tags: ["Java", "Spring Boot", "MySQL"],
  },
  {
    year: "2025",
    title: "Bachelor of Computer Science",
    company: "Cambridge Institute of Technology",
    duration: "May 2025 | Visvesvaraya Technological University",
    description:
      "Graduated with First Class Distinction. GPA: 8.33. Built a strong academic foundation in software engineering principles.",
    icon: <GraduationCap size={20} />,
    tags: ["CS", "Engineering", "GPA 8.33"],
  },
  {
    year: "2024",
    title: "Java Full Stack Developer Trainee",
    company: "Wipro Limited",
    duration: "Jan 2024 - Sept 2024 | Bengaluru",
    description:
      "Completed comprehensive training in Java Full Stack development. Successfully passed three milestone assessments with coding scores of 90%, ranking within the top 10% of the cohort.",
    icon: <Code2 size={20} />,
    tags: ["Java", "Full Stack", "Azure AI"],
  },
  {
    year: "2023",
    title: "Academic Foundation",
    company: "Self-Driven / Academic",
    duration: "2023",
    description:
      "Built strong foundation in computer science fundamentals including Software Engineering Practice, Applied Machine Learning, Operating Systems, Computer Architecture, and Algorithms.",
    icon: <BookOpen size={20} />,
    tags: ["Algorithms", "Machine Learning", "OS"],
  },
];

const Journey = () => {
  const containerRef = useRef(null);

  // Track overall progress for the connecting line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-6xl mx-auto px-6 py-20"
    >
      <h2 className="text-5xl font-bold text-center mb-20 text-transparent bg-clip-text bg-gradient-to-r from-neonBlue to-purple-500">
        My Journey
      </h2>

      {/* Main Container */}
      <div className="relative pl-4 md:pl-0">
        {/* --- LEFT-SIDED TIMELINE LINE --- */}
        {/* Positioned 120px from left on desktop, 30px on mobile */}
        <div className="absolute left-[30px] md:left-[120px] top-0 bottom-0 w-[2px] bg-white/10">
          <motion.div
            style={{ height: heightTransform }}
            className="w-full bg-gradient-to-b from-neonBlue to-neonPink shadow-[0_0_15px_#00f3ff] origin-top"
          />
        </div>

        {/* --- ITEMS --- */}
        <div className="flex flex-col gap-16">
          {journeyData.map((item, index) => (
            <TimelineItem key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

const TimelineItem = ({ item }) => {
  return (
    // GRID: [Year/Dot (150px)]  [Content (Auto)]
    <div className="grid grid-cols-[60px_1fr] md:grid-cols-[150px_1fr] gap-8 items-start relative">
      {/* 1. LEFT COLUMN: Year & Dot */}
      <div className="relative flex flex-col items-end pr-4 md:pr-0">
        {/* Year (Desktop Only) */}
        <span className="hidden md:block text-4xl font-bold text-gray-500 pr-10 pt-2 opacity-50">
          {item.year}
        </span>

        {/* The Dot - Absolute positioned to sit exactly on the line */}
        {/* left-[30px] matches the line position calculated above */}
        <div className="absolute top-[10px] right-[-11px] z-10">
          <motion.div
            initial={{ scale: 0, backgroundColor: "#0a0a0a" }}
            whileInView={{
              scale: 1,
              backgroundColor: "#0a0a0a",
              borderColor: "#00f3ff",
              boxShadow: "0 0 15px rgba(0, 243, 255, 0.8)",
            }}
            viewport={{ once: true, margin: "-100px" }} // Dot stays visible once hit
            transition={{ duration: 0.3 }}
            className="w-6 h-6 rounded-full border-4 border-gray-700 bg-darkBg"
          />
        </div>
      </div>

      {/* 2. RIGHT COLUMN: Content Card */}
      <div>
        {/* Mobile Year */}
        <span className="md:hidden text-2xl font-bold text-gray-500 mb-2 block">
          {item.year}
        </span>

        <ScrollRevealCard>
          <div className="group relative border border-white/5 bg-white/5 p-8 rounded-2xl transition-all duration-300 hover:border-neonBlue/30 hover:bg-white/10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start gap-4 mb-4">
              <div className="p-3 w-fit rounded-lg bg-neonBlue/10 text-neonBlue group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white group-hover:text-neonBlue transition-colors">
                  {item.company}
                </h3>
                <h4 className="text-lg text-gray-300 font-medium">
                  {item.title}
                </h4>
                <p className="text-sm text-neonPink/80 mt-1 font-mono">
                  {item.duration}
                </p>
              </div>
            </div>

            <p className="text-gray-400 leading-relaxed mb-6">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-3 py-1 rounded-full bg-black/40 border border-white/10 text-gray-400 group-hover:text-white transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </ScrollRevealCard>
      </div>
    </div>
  );
};

// Custom Animation Component for "Persist Down, Fade Up" logic
const ScrollRevealCard = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      // 'once: false' allows it to re-animate if we scroll away
      // 'amount: 0.1' triggers it as soon as 10% is visible
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default Journey;
