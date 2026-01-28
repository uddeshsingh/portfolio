import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, GraduationCap, Code2, Server } from "lucide-react";
import { COLORS } from "../theme"; // Using centralized color

const journeyData = [
  {
    year: "2026",
    title: "MS in Computer Science",
    company: "University of Texas at Dallas",
    duration: "Exp. June 2026 | GPA: 4.0",
    description:
      "Specializing in Advanced Algorithms, Cloud Computing, and Machine Learning. Satish and Yasmin Gupta Fellow.",
    icon: <GraduationCap size={20} />,
    tags: ["Algorithms", "ML", "Cloud"],
  },
  {
    year: "2025",
    title: "Software Development Intern",
    company: "Paycom",
    duration: "May 2025 - Aug 2025",
    description:
      "Engineered a full-stack application using .NET, React, and OCR for document data extraction. Achieved 120x processing efficiency.",
    icon: <Code2 size={20} />,
    tags: [".NET", "React", "MySQL", "OCR"],
  },
  {
    year: "2024",
    title: "Senior Associate Digital Development",
    company: "American Express",
    duration: "Nov 2022 - July 2024",
    description:
      "Developed scalable data routing apps in Golang, deployed containerized services on GCP, and optimized high-traffic APIs using Redis.",
    icon: <Server size={20} />,
    tags: ["Golang", "GCP", "Redis", "React"],
  },
  {
    year: "2022",
    title: "Programmer Analyst",
    company: "American Express",
    duration: "Sept 2020 - Oct 2022",
    description:
      "Built metadata health-checkers for MySQL databases boosting developer onboarding by 400%. Implemented TDD with 98% code coverage.",
    icon: <Briefcase size={20} />,
    tags: ["MySQL", "Python", "TDD", "React"],
  },
  {
    year: "2020",
    title: "B.Tech in Computer Science",
    company: "NIT Allahabad",
    duration: "July 2016 - June 2020",
    description:
      "Completed Bachelor's degree in Computer Science & Engineering. Built foundation in Systems and Software Engineering.",
    icon: <GraduationCap size={20} />,
    tags: ["CS", "Engineering"],
  },
];

const Journey = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  const heightTransform = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="container-default">
      <h2 className="heading-section">My Journey</h2>

      <div className="relative pl-4 md:pl-0">
        <div className="absolute left-[30px] md:left-[120px] top-0 bottom-0 w-[2px] bg-white/10">
          <motion.div
            style={{ height: heightTransform }}
            className="w-full bg-gradient-to-b from-[--neon-blue] to-[--neon-pink] shadow-[0_0_15px_#00f3ff] origin-top"
          />
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
          whileInView={{
            opacity: 1,
            color: COLORS.neonBlue,
            textShadow: "0 0 15px rgba(0, 243, 255, 0.5)",
            x: 0,
          }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.4 }}
          className="hidden md:block text-4xl font-bold pr-10 pt-2"
        >
          {item.year}
        </motion.div>

        <div className="absolute top-[10px] right-[-11px] z-10">
          <motion.div
            initial={{ scale: 0, backgroundColor: COLORS.darkBg }}
            whileInView={{
              scale: 1,
              backgroundColor: COLORS.darkBg,
              borderColor: COLORS.neonBlue,
              boxShadow: "0 0 15px rgba(0, 243, 255, 0.8)",
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="w-6 h-6 rounded-full border-4 border-gray-700 bg-[--dark-bg]"
          />
        </div>
      </div>

      <div>
        <span className="md:hidden text-2xl font-bold text-gray-500 mb-2 block">
          {item.year}
        </span>
        <ScrollRevealCard>
          <div className="group relative rounded-2xl p-8 glass-card-hover border border-white/5 bg-white/5">
            <div className="flex flex-col md:flex-row md:items-start gap-4 mb-4">
              <div className="p-3 w-fit rounded-lg bg-[#00f3ff]/10 text-[--neon-blue] group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white group-hover:text-[--neon-blue] transition-colors">
                  {item.company}
                </h3>
                <h4 className="text-lg text-gray-300 font-medium">
                  {item.title}
                </h4>
                <p className="text-sm text-[--neon-pink]/80 mt-1 font-mono">
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

const ScrollRevealCard = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: false, amount: 0.1 }}
    transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
  >
    {children}
  </motion.div>
);

export default Journey;
