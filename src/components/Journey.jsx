import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Briefcase, GraduationCap, Code2, Server, Database, LayoutTemplate } from "lucide-react";
import { COLORS } from "./theme";

const journeyData = [
  {
    year: "2026",
    title: "MS in Computer Science",
    company: "University of Texas at Dallas",
    duration: "Aug 2024 - June 2026 | GPA: 4.0",
    description: "Specializing in Advanced Algorithms, Cloud Computing, and Machine Learning. Satish and Yasmin Gupta Fellow.",
    icon: <GraduationCap size={20} />,
    tags: ["Algorithms", "ML", "Cloud Architecture"],
  },
  {
    year: "2025",
    title: "Software Development Intern",
    company: "Paycom",
    duration: "May 2025 - Aug 2025",
    description: "Developed full-stack document extraction services utilizing C#, .NET Core, React, and MySQL. Engineered automated CI/CD workflows and AWS containerization, accelerating high-volume data processing by 120x.",
    icon: <Code2 size={20} />,
    tags: ["Full-Stack", ".NET Core", "React", "AWS", "CI/CD"],
  },
  {
    year: "2024",
    title: "Technical Product Owner",
    company: "American Express",
    duration: "Jan 2024 - July 2024",
    description: "Scaled internal risk monitoring systems utilizing PostgreSQL and complex data analytics. Managed cross-functional requirements for critical pipeline migrations, ensuring zero-downtime enterprise deployments.",
    icon: <Database size={20} />,
    tags: ["PostgreSQL", "Data Analytics", "Agile", "System Monitoring"],
  },
  {
    year: "2022",
    title: "Software Engineer II",
    company: "American Express",
    duration: "Nov 2022 - Jan 2024",
    description: "Engineered highly scalable backend microservices using Golang, Python, and event-driven Apache Kafka on GCP. Collaborated on designing modular REST and GraphQL APIs utilizing Java Spring Boot.",
    icon: <Server size={20} />,
    tags: ["Backend", "Golang", "Java", "Python", "Kafka", "GCP"],
  },
  {
    year: "2020",
    title: "Software Engineer I",
    company: "American Express",
    duration: "Sept 2020 - Oct 2022",
    description: "Modernized legacy internal portals into responsive Single Page Applications (SPAs) using Angular v17 and React. Built robust Java metadata services and enforced fault tolerance through PyTest and JUnit TDD.",
    icon: <LayoutTemplate size={20} />,
    tags: ["Frontend", "Angular v17", "React", "Java", "TDD"],
  },
  {
    year: "2019",
    title: "Business Tech Analyst Intern",
    company: "Deloitte USI",
    duration: "May 2019 - July 2019",
    description: "Collaborated on the migration of a mission-critical warehousing application to Android (Java). Supported CI/CD automation by integrating 183+ automated Selenium test cases.",
    icon: <Briefcase size={20} />,
    tags: ["Android", "Java", "Selenium", "SDLC"],
  },
];

const Journey = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start center", "end center"] });
  const heightTransform = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div ref={containerRef} className="container-default">
      <h2 className="heading-section">Professional Trajectory</h2>
      <div className="relative pl-4 md:pl-0">
        <div className="absolute left-[30px] md:left-[120px] top-0 bottom-0 w-[2px] bg-white/10">
          {!shouldReduceMotion && (
            <motion.div style={{ height: heightTransform }} className="w-full bg-gradient-to-b from-[--neon-blue] to-[--neon-pink] shadow-[0_0_15px_#00f3ff] origin-top" />
          )}
        </div>
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
    <div className="grid grid-cols-[60px_1fr] md:grid-cols-[150px_1fr] gap-8 items-start relative">
      <div className="relative flex flex-col items-end pr-4 md:pr-0">
        <motion.div
          initial={{ opacity: 0.2, color: COLORS.textGray, x: -10 }}
          whileInView={{ opacity: 1, color: COLORS.neonBlue, textShadow: "0 0 15px rgba(0, 243, 255, 0.5)", x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4 }}
          className="hidden md:block text-4xl font-bold pr-10 pt-2"
        >
          {item.year}
        </motion.div>
        <div className="absolute top-[10px] right-[-11px] z-10">
          <motion.div
            initial={{ scale: 0, backgroundColor: COLORS.darkBg }}
            whileInView={{ scale: 1, backgroundColor: COLORS.darkBg, borderColor: COLORS.neonBlue, boxShadow: "0 0 15px rgba(0, 243, 255, 0.8)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="w-6 h-6 rounded-full border-4 border-gray-700 bg-[--dark-bg]"
          />
        </div>
      </div>
      <div>
        <span className="md:hidden text-2xl font-bold text-gray-500 mb-2 block">{item.year}</span>
        <ScrollRevealCard>
          <div className="group relative rounded-2xl p-8 glass-card-hover border border-white/5 bg-white/5">
            <div className="flex flex-col md:flex-row md:items-start gap-4 mb-4">
              <div className="p-3 w-fit rounded-lg bg-[#00f3ff]/10 text-[--neon-blue] group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white group-hover:text-[--neon-blue] transition-colors">{item.company}</h3>
                <h4 className="text-lg text-gray-300 font-medium">{item.title}</h4>
                <p className="text-sm text-[--neon-pink]/80 mt-1 font-mono">{item.duration}</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">{item.description}</p>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span key={tag} className="text-xs font-mono px-3 py-1 rounded-full bg-black/40 border border-white/10 text-gray-400 group-hover:text-white transition-colors">
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

const ScrollRevealCard = ({ children }) => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default Journey;